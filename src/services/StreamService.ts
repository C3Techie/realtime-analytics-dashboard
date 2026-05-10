import type { StreamPayload, LogLevel } from '../types';

export class MockStreamService {
  private intervalId: number | null = null;
  private subscribers: ((payload: StreamPayload) => void)[] = [];
  private isPaused = false;
  private reconnectionAttempt = 0;
  private maxReconnectionAttempts = 5;
  private frequencyMs: number;

  constructor(frequencyMs: number = 500) {
    this.frequencyMs = frequencyMs;
  }

  public subscribe(callback: (payload: StreamPayload) => void) {
    this.subscribers.push(callback);
    if (!this.intervalId) {
      this.start();
    }
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== callback);
      if (this.subscribers.length === 0) {
        this.stop();
      }
    };
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
  }

  private start() {
    this.intervalId = window.setInterval(() => {
      if (this.isPaused) return;

      // Simulate occasional connection issues (0.5% chance)
      if (Math.random() < 0.005) {
        this.simulateDisconnection();
        return;
      }

      this.generateData();
    }, this.frequencyMs);
  }

  private stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private generateData() {
    const timestamp = Date.now();
    
    // Broadcast Metric Update
    const symbols = ['BTC', 'ETH', 'VOL', 'TPS'];
    symbols.forEach(symbol => {
      this.broadcast({
        type: 'metric',
        timestamp,
        data: {
          symbol,
          value: this.getRandomValue(symbol),
          change: (Math.random() * 2 - 1).toFixed(2)
        }
      });
    });

    // Broadcast Market Chart Point
    this.broadcast({
      type: 'market',
      timestamp,
      data: {
        timestamp,
        value: 64000 + Math.random() * 1000
      }
    });

    // Random Logs (Occasional)
    if (Math.random() > 0.9) {
      const levels: LogLevel[] = ['INFO', 'WARN', 'ERROR'];
      const messages = [
        'High frequency trade executed',
        'API latency detected above 200ms',
        'Block propagation delay',
        'Validator node mismatch',
        'Memory threshold exceeded'
      ];
      this.broadcast({
        type: 'log',
        timestamp,
        data: {
          id: Math.random().toString(36).substr(2, 9),
          level: levels[Math.floor(Math.random() * levels.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date().toLocaleTimeString()
        }
      });
    }
  }

  private broadcast(payload: StreamPayload) {
    // Basic Schema Validation
    if (!payload.type || !payload.data || !payload.timestamp) {
      console.warn('[StreamService] Malformed payload dropped', payload);
      return;
    }

    this.subscribers.forEach(callback => callback(payload));
  }

  private getRandomValue(symbol: string) {
    const bases: Record<string, number> = { 'BTC': 64000, 'ETH': 3400, 'VOL': 1200000, 'TPS': 4200 };
    return bases[symbol] + (Math.random() * 100 - 50);
  }

  private simulateDisconnection() {
    console.warn('[StreamService] Connection lost. Attempting reconnection...');
    this.stop();
    this.reconnectionAttempt = 1;
    this.attemptReconnection();
  }

  private attemptReconnection() {
    if (this.reconnectionAttempt > this.maxReconnectionAttempts) {
      console.error('[StreamService] Max reconnection attempts reached.');
      return;
    }

    // Exponential Backoff
    const delay = Math.pow(2, this.reconnectionAttempt) * 1000;
    setTimeout(() => {
      console.log(`[StreamService] Reconnection attempt ${this.reconnectionAttempt}...`);
      if (Math.random() > 0.3) {
        console.log('[StreamService] Reconnected successfully.');
        this.start();
      } else {
        this.reconnectionAttempt++;
        this.attemptReconnection();
      }
    }, delay);
  }
}

export const streamService = new MockStreamService();
