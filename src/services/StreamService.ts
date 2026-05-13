import type { StreamPayload } from '../types';

export class BinanceStreamService {
  private ws: WebSocket | null = null;
  private subscribers: ((payload: StreamPayload) => void)[] = [];
  private isPaused = false;
  private reconnectionAttempt = 0;
  private maxReconnectionAttempts = 5;
  // Use the binance.vision endpoint which is often more accessible
  private baseUrl = 'wss://data-stream.binance.vision/stream?streams=btcusdt@ticker/ethusdt@ticker/solusdt@ticker/bnbusdt@ticker';
  private receivedRealSymbols = new Set<string>();

  constructor() {
    this.connect();
    this.startEngine();
  }

  public subscribe(callback: (payload: StreamPayload) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== callback);
    };
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
  }

  private connect() {
    if (this.ws) {
      this.ws.close();
    }

    try {
      this.ws = new WebSocket(this.baseUrl);

      this.ws.onopen = () => {
        console.log('[BinanceStreamService] Connected to Real-Time Stream');
        this.reconnectionAttempt = 0;
      };

      this.ws.onmessage = (event) => {
        if (this.isPaused) return;
        try {
          const message = JSON.parse(event.data);
          this.handleBinanceMessage(message);
        } catch (error) {
          console.error('[BinanceStreamService] Parsing Error', error);
        }
      };

      this.ws.onerror = () => {
        // Silently handle error, startSimulation will provide fallback data
      };

      this.ws.onclose = () => {
        this.attemptReconnection();
      };
    } catch (e) {
      console.error('[BinanceStreamService] Connection Failed', e);
    }
  }

  private attemptReconnection() {
    if (this.reconnectionAttempt >= this.maxReconnectionAttempts) return;
    this.reconnectionAttempt++;
    setTimeout(() => this.connect(), 5000);
  }

  private handleBinanceMessage(message: any) {
    const data = message.data || message;
    if (!data || !data.s) return;

    const symbol = data.s.toUpperCase();
    const symbolMap: Record<string, string> = {
      'BTCUSDT': 'BTC', 'ETHUSDT': 'ETH', 'SOLUSDT': 'SOL', 'BNBUSDT': 'BNB'
    };

    const internalSymbol = symbolMap[symbol];
    if (!internalSymbol) return;

    this.receivedRealSymbols.add(internalSymbol);
    const timestamp = Date.now();
    this.broadcast({
      type: 'metric',
      timestamp,
      data: {
        symbol: internalSymbol,
        value: parseFloat(data.c),
        change: parseFloat(data.P)
      }
    });

    this.broadcast({
      type: 'market',
      timestamp,
      data: { symbol: internalSymbol, timestamp, value: parseFloat(data.c) }
    });

    if (internalSymbol === 'BTC') {
      this.broadcast({
        type: 'metric',
        timestamp,
        data: { symbol: 'VOL', value: parseFloat(data.q), change: parseFloat(data.P) }
      });
    }
  }

  private startEngine() {
    window.setInterval(() => {
      if (this.isPaused) return;
      const timestamp = Date.now();

      // Always simulate logs and TPS (System metrics)
      if (Math.random() > 0.6) {
        this.generateLog(timestamp);
      }

      this.broadcast({
        type: 'metric',
        timestamp,
        data: { symbol: 'TPS', value: 4100 + Math.random() * 300, change: (Math.random() * 0.4 - 0.2).toFixed(2) }
      });

      // Simulate Health Node Updates
      if (Math.random() > 0.8) {
        this.broadcast({
          type: 'health',
          timestamp,
          data: {
            id: Math.floor(Math.random() * 60),
            status: Math.random() > 0.95 ? 'error' : Math.random() > 0.8 ? 'warning' : 'active'
          }
        });
      }

      // Simulate System Summary Metrics
      this.broadcast({
        type: 'system',
        timestamp,
        data: {
          latency: 15 + Math.floor(Math.random() * 15),
          uptime: 99.95 + (Math.random() * 0.04),
          load: Math.random() > 0.9 ? 'HEAVY' : Math.random() > 0.7 ? 'STABLE' : 'OPTIMAL'
        }
      });

      // ONLY simulate market data for symbols that haven't received real data
      this.generateFallbackMarketData(timestamp);
    }, 1500);
  }

  private generateFallbackMarketData(timestamp: number) {
    const fallbacks = [
      { s: 'BTC', v: 64000, c: 1.2 },
      { s: 'ETH', v: 3400, c: -0.5 },
      { s: 'SOL', v: 145, c: 4.2 },
      { s: 'BNB', v: 590, c: 0.8 },
      { s: 'VOL', v: 1200000000, c: 2.1 }
    ];

    fallbacks.forEach(f => {
      if (this.receivedRealSymbols.has(f.s)) return;
      
      const value = f.v + (Math.random() * (f.v * 0.001) - (f.v * 0.0005));
      this.broadcast({
        type: 'metric',
        timestamp,
        data: { symbol: f.s, value, change: (f.c + (Math.random() * 0.2 - 0.1)).toFixed(2) }
      });
      this.broadcast({
        type: 'market',
        timestamp,
        data: { symbol: f.s, timestamp, value }
      });
    });
  }

  private generateLog(timestamp: number) {
    const messages = [
      'High frequency trade executed', 'API latency stabilized', 'Block propagation delay detected',
      'Validator node handshake', 'Memory threshold nominal', 'Liquidity pool balanced',
      'Nexus node sync complete', 'Encrypted tunnel established'
    ];
    this.broadcast({
      type: 'log',
      timestamp,
      data: {
        id: Math.random().toString(36).substring(2, 11),
        level: Math.random() > 0.8 ? 'ERROR' : Math.random() > 0.4 ? 'WARN' : 'INFO',
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date().toLocaleTimeString()
      }
    });
  }

  private broadcast(payload: StreamPayload) {
    if (this.isPaused) return;
    this.subscribers.forEach(callback => callback(payload));
  }
}

export const streamService = new BinanceStreamService();

