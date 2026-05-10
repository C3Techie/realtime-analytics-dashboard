export interface MetricData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  history: number[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERR';
  message: string;
}

export interface HealthNode {
  id: number;
  status: 'active' | 'warning' | 'error' | 'inactive';
}

export interface ChartPoint {
  timestamp: number;
  value: number;
}

export interface DashboardState {
  metrics: Record<string, MetricData>;
  logs: LogEntry[];
  healthNodes: HealthNode[];
  marketData: ChartPoint[];
  isStreaming: boolean;
}
