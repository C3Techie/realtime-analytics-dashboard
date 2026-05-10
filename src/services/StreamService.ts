import type { MetricData, LogEntry, HealthNode, ChartPoint } from '../types';

type StreamCallback = (data: any) => void;

class StreamService {
  private intervals: any[] = [];
  private subscribers: Set<StreamCallback> = new Set();
  private isPaused: boolean = false;

  constructor() {
    this.startStreaming();
  }

  public subscribe(callback: StreamCallback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
  }

  private startStreaming() {
    // Metrics update every 2s
    this.intervals.push(setInterval(() => this.emitMetrics(), 2000));
    
    // Logs update randomly
    this.intervals.push(setInterval(() => {
      if (Math.random() > 0.7) this.emitLog();
    }, 3000));

    // Market chart update every 1s
    this.intervals.push(setInterval(() => this.emitMarketPoint(), 1000));
  }

  private emitMetrics() {
    if (this.isPaused) return;
    
    const metrics: Record<string, Partial<MetricData>> = {
      'BTC': { 
        value: 64000 + Math.random() * 500, 
        change: 2.4 + (Math.random() - 0.5),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      },
      'ETH': { 
        value: 3400 + Math.random() * 100, 
        change: -0.5 + (Math.random() - 0.5),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      },
      'TPS': {
        value: 4000 + Math.floor(Math.random() * 500),
        trend: 'stable'
      }
    };

    this.notify({ type: 'METRICS', data: metrics });
  }

  private emitLog() {
    if (this.isPaused) return;

    const levels: LogEntry['level'][] = ['INFO', 'WARN', 'ERR'];
    const messages = [
      "Block #842019 validated",
      "Latency spike detected in EU-West",
      "Connection lost to Node-7A",
      "Syncing state with peer array",
      "Trade engine calibration complete",
      "High memory usage on Worker-02"
    ];

    const log: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      level: levels[Math.floor(Math.random() * levels.length)],
      message: messages[Math.floor(Math.random() * messages.length)]
    };

    this.notify({ type: 'LOG', data: log });
  }

  private emitMarketPoint() {
    if (this.isPaused) return;

    const point: ChartPoint = {
      timestamp: Date.now(),
      value: 64000 + Math.random() * 1000
    };

    this.notify({ type: 'MARKET_POINT', data: point });
  }

  private notify(payload: { type: string; data: any }) {
    this.subscribers.forEach(callback => callback(payload));
  }

  public cleanup() {
    this.intervals.forEach(clearInterval);
    this.subscribers.clear();
  }
}

export const streamService = new StreamService();
