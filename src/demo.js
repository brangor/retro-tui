/**
 * Demo page logic - connects components to the push server
 */
import { retroPush } from './utils/push-client.js';

// Get component references
const buildOutput = document.getElementById('build-output');
const statusTable = document.getElementById('status-table');
const consoleEl = document.getElementById('console');

// Initialize status table with example data
statusTable?.setData(
  ['Service', 'Status', 'Latency'],
  [
    { Service: 'API', Status: 'online', Latency: '23ms' },
    { Service: 'Database', Status: 'online', Latency: '5ms' },
    { Service: 'Cache', Status: 'online', Latency: '1ms' },
  ]
);

// Connect to push server
retroPush.connect();

// Handle connection status
retroPush.on('_connected', () => {
  buildOutput?.append('\x1b[32m✓\x1b[0m Connected to push server');
});

retroPush.on('_disconnected', () => {
  buildOutput?.append('\x1b[31m✗\x1b[0m Disconnected from push server');
});

// Handle build channel
retroPush.on('build', ({ type, data }) => {
  switch (type) {
    case 'log':
      buildOutput?.append(data);
      break;
    case 'error':
      buildOutput?.append(`\x1b[31m✗ ${data}\x1b[0m`);
      break;
    case 'warn':
      buildOutput?.append(`\x1b[33m⚠ ${data}\x1b[0m`);
      break;
    case 'info':
      buildOutput?.append(`\x1b[36mℹ ${data}\x1b[0m`);
      break;
    case 'clear':
      buildOutput?.clear();
      break;
  }
});

// Handle status channel
retroPush.on('status', ({ type, data }) => {
  if (type === 'update') {
    try {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      statusTable?.upsertRow(parsed.Service, parsed);
    } catch (e) {
      console.error('Invalid status data:', e);
    }
  }
});

// Handle console commands
consoleEl?.addEventListener('command', (e) => {
  const cmd = e.detail;
  
  // Simple built-in commands
  if (cmd === 'help') {
    consoleEl.print('Available commands:');
    consoleEl.print('  help     - Show this help');
    consoleEl.print('  clear    - Clear console');
    consoleEl.print('  status   - Show connection status');
    consoleEl.print('  echo     - Echo text back');
    return;
  }
  
  if (cmd === 'clear') {
    consoleEl.clear();
    return;
  }
  
  if (cmd === 'status') {
    consoleEl.print(`Push server: ${retroPush.ws?.readyState === 1 ? '\x1b[32mconnected\x1b[0m' : '\x1b[31mdisconnected\x1b[0m'}`);
    return;
  }
  
  if (cmd.startsWith('echo ')) {
    consoleEl.print(cmd.slice(5));
    return;
  }
  
  consoleEl.print(`\x1b[31mUnknown command: ${cmd}\x1b[0m`);
  consoleEl.print('Type "help" for available commands');
});

// Log startup
console.log('[RetroTUI Demo] Initialized');
buildOutput?.append('RetroTUI Demo initialized');
buildOutput?.append('Waiting for push messages...');
buildOutput?.append('');
buildOutput?.append('\x1b[36mTry:\x1b[0m curl -X POST http://localhost:3001/push \\');
buildOutput?.append('  -H "Content-Type: application/json" \\');
buildOutput?.append('  -d \'{"channel":"build","type":"log","data":"Hello!"}\'');
