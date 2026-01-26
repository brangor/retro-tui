#!/usr/bin/env node
/**
 * push.js - Send messages to RetroTUI from Node scripts
 * 
 * Usage:
 *   node push.js --channel=build --type=log --data="Hello world"
 *   node push.js log "Build started..."
 *   node push.js --channel=status status '{"cpu": 45}'
 * 
 * As a module:
 *   import { push } from './push.js';
 *   await push({ channel: 'build', type: 'log', data: 'Hello!' });
 */

const URL = process.env.RETRO_PUSH_URL || 'http://localhost:3001/push';

/**
 * Push a message to the RetroTUI server
 * @param {Object} message
 * @param {string} message.channel - Channel name
 * @param {string} [message.type] - Message type (log, status, etc.)
 * @param {any} message.data - Message data
 */
export async function push(message) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Push failed');
  }

  return response.json();
}

/**
 * Convenience function to log a message
 */
export async function log(data, channel = 'build') {
  return push({ channel, type: 'log', data });
}

/**
 * Convenience function to send status update
 */
export async function status(data, channel = 'status') {
  return push({ channel, type: 'status', data });
}

// CLI handling
if (process.argv[1].endsWith('push.js')) {
  const args = process.argv.slice(2);
  
  let channel = 'build';
  let type = 'log';
  let data = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--channel=')) {
      channel = arg.split('=')[1];
    } else if (arg.startsWith('--type=')) {
      type = arg.split('=')[1];
    } else if (arg.startsWith('--data=')) {
      data = arg.split('=')[1];
    } else if (['log', 'status', 'error', 'warn', 'info', 'table', 'clear'].includes(arg)) {
      type = arg;
    } else if (!data) {
      data = arg;
    }
  }

  if (!data) {
    console.error('Usage: node push.js [--channel=NAME] [TYPE] DATA');
    process.exit(1);
  }

  push({ channel, type, data })
    .then(result => {
      console.log(`✓ Sent to ${result.delivered} client(s)`);
    })
    .catch(err => {
      console.error(`✗ Failed: ${err.message}`);
      process.exit(1);
    });
}
