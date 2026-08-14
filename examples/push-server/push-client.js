/**
 * RetroPush - WebSocket client for receiving real-time updates
 * 
 * Connects to the retro-tui push server and dispatches events
 * to registered handlers.
 */
export class RetroPush {
  constructor(url = 'ws://localhost:3001') {
    this.url = url;
    this.ws = null;
    this.handlers = new Map();
    this.reconnectDelay = 1000;
    this.maxReconnectDelay = 30000;
    this.shouldReconnect = true;
  }

  /**
   * Connect to the push server
   */
  connect() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('[RetroPush] Connected to', this.url);
        this.reconnectDelay = 1000; // Reset delay on successful connect
        this.emit('_connected', {});
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { channel, type, data } = message;
          
          // Emit to channel-specific handlers
          this.emit(channel, { type, data });
          
          // Emit to wildcard handlers
          this.emit('*', { channel, type, data });
        } catch (e) {
          console.error('[RetroPush] Invalid message:', e);
        }
      };

      this.ws.onclose = () => {
        console.log('[RetroPush] Disconnected');
        this.emit('_disconnected', {});
        
        if (this.shouldReconnect) {
          setTimeout(() => this.connect(), this.reconnectDelay);
          this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[RetroPush] Error:', error);
      };
    } catch (e) {
      console.error('[RetroPush] Connection failed:', e);
      if (this.shouldReconnect) {
        setTimeout(() => this.connect(), this.reconnectDelay);
      }
    }
  }

  /**
   * Disconnect from the push server
   */
  disconnect() {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Subscribe to a channel
   * @param {string} channel - Channel name (or '*' for all)
   * @param {function} handler - Handler function({ type, data })
   * @returns {function} Unsubscribe function
   */
  on(channel, handler) {
    if (!this.handlers.has(channel)) {
      this.handlers.set(channel, new Set());
    }
    this.handlers.get(channel).add(handler);

    // Return unsubscribe function
    return () => {
      this.handlers.get(channel)?.delete(handler);
    };
  }

  /**
   * Emit to handlers
   */
  emit(channel, data) {
    const handlers = this.handlers.get(channel);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(data);
        } catch (e) {
          console.error('[RetroPush] Handler error:', e);
        }
      }
    }
  }
}

// Singleton instance for convenience
export const retroPush = new RetroPush();
