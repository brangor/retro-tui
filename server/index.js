/**
 * RetroTUI Push Server
 * 
 * A tiny WebSocket server that:
 * 1. Accepts WebSocket connections from browsers
 * 2. Accepts HTTP POST requests from scripts
 * 3. Broadcasts messages to connected clients
 * 
 * Usage:
 *   node server/index.js
 * 
 * Push from curl:
 *   curl -X POST http://localhost:3001/push \
 *     -H "Content-Type: application/json" \
 *     -d '{"channel":"build","type":"log","data":"Hello!"}'
 */

import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 3001;

// Track connected clients
const clients = new Set();

// Create HTTP server for POST endpoint
const httpServer = createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      clients: clients.size,
      uptime: process.uptime(),
    }));
    return;
  }

  // Push endpoint
  if (req.method === 'POST' && req.url === '/push') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const message = JSON.parse(body);
        
        // Validate message structure
        if (!message.channel) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing channel' }));
          return;
        }

        // Broadcast to all connected clients
        const payload = JSON.stringify({
          channel: message.channel,
          type: message.type || 'message',
          data: message.data,
          timestamp: Date.now(),
        });

        let delivered = 0;
        for (const client of clients) {
          if (client.readyState === 1) { // WebSocket.OPEN
            client.send(payload);
            delivered++;
          }
        }

        console.log(`[push] ${message.channel}/${message.type}: delivered to ${delivered} clients`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, delivered }));
      } catch (e) {
        console.error('[push] Invalid JSON:', e.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // 404 for everything else
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Create WebSocket server
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws, req) => {
  const clientId = req.socket.remoteAddress + ':' + req.socket.remotePort;
  console.log(`[ws] Client connected: ${clientId}`);
  clients.add(ws);

  ws.on('close', () => {
    console.log(`[ws] Client disconnected: ${clientId}`);
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error(`[ws] Client error: ${clientId}`, error.message);
  });

  // Send welcome message
  ws.send(JSON.stringify({
    channel: '_system',
    type: 'connected',
    data: { message: 'Connected to RetroTUI push server' },
    timestamp: Date.now(),
  }));
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║  RetroTUI Push Server                             ║
╠═══════════════════════════════════════════════════╣
║  WebSocket: ws://localhost:${PORT}                   ║
║  HTTP POST: http://localhost:${PORT}/push            ║
║  Health:    http://localhost:${PORT}/health          ║
╚═══════════════════════════════════════════════════╝
  `);
});
