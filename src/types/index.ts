export type Trend = 'up' | 'down' | 'stable';
export type LogLevel = 'INFO' | 'WARN' | 'ERROR';
export type StreamStatus = 'connected' | 'reconnecting' | 'paused' | 'error';
export type TimeRange = '1m' | '5m' | '1h' | 'live';

export interface MetricData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  trend: Trend;
  history: number[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
}

export interface HealthNode {
  id: number;
  status: 'active' | 'warning' | 'error';
}

export interface ChartPoint {
  timestamp: number;
  value: number;
  label?: string;
}

export interface StreamPayload {
  type: 'metric' | 'log' | 'health' | 'market';
  data: any;
  timestamp: number;
}
