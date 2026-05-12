import { defineStore } from 'pinia';
import { ref, reactive, shallowRef } from 'vue';
import type { MetricData, LogEntry, HealthNode, ChartPoint, StreamStatus, TimeRange } from '../types';
import { streamService } from '../services/StreamService';

export const useStreamingStore = defineStore('streaming', () => {
  const status = ref<StreamStatus>('connected');

  const metrics = reactive<Record<string, MetricData>>({
    'BTC': { symbol: 'BTC', name: 'Bitcoin', value: 0, change: 0, trend: 'stable', history: [] },
    'ETH': { symbol: 'ETH', name: 'Ethereum', value: 0, change: 0, trend: 'stable', history: [] },
    'SOL': { symbol: 'SOL', name: 'Solana', value: 0, change: 0, trend: 'stable', history: [] },
    'BNB': { symbol: 'BNB', name: 'Binance Coin', value: 0, change: 0, trend: 'stable', history: [] },
    'VOL': { symbol: 'VOL', name: 'Volume 24H', value: 0, change: 0, trend: 'stable', history: [] },
    'TPS': { symbol: 'TPS', name: 'System TPS', value: 0, change: 0, trend: 'stable', history: [] }
  });

  const logs = ref<LogEntry[]>([]);
  // Use shallowRef for high-frequency time-series to optimize performance
  const marketData = shallowRef<ChartPoint[]>([]);
  const healthNodes = ref<HealthNode[]>(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      status: 'active'
    }))
  );

  function updateMetric(symbol: string, value: number, change: number) {
    if (metrics[symbol]) {
      metrics[symbol].value = value;
      metrics[symbol].change = change;
      metrics[symbol].trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

      metrics[symbol].history.push(value);
      if (metrics[symbol].history.length > 30) metrics[symbol].history.shift();
    }
  }

  function addMarketPoint(point: ChartPoint) {
    const newData = [...marketData.value, point];
    // Keep last 100 points for live view
    if (newData.length > 100) newData.shift();
    marketData.value = newData;
  }

  function addLog(log: LogEntry) {
    logs.value.unshift(log);
    if (logs.value.length > 50) logs.value.pop();
  }

  function updateHealthNode(id: number, status: 'active' | 'warning' | 'error') {
    const node = healthNodes.value.find(n => n.id === id);
    if (node) node.status = status;
  }

  function setStatus(newStatus: StreamStatus) {
    status.value = newStatus;
    if (newStatus === 'paused') streamService.pause();
    else if (newStatus === 'connected') streamService.resume();
  }

  return {
    status,
    metrics,
    logs,
    marketData,
    healthNodes,
    updateMetric,
    addMarketPoint,
    addLog,
    updateHealthNode,
    setStatus
  };
});

export const useUIStore = defineStore('ui', () => {
  const activeTab = ref('overview');
  const isSidebarOpen = ref(true);
  const timeRange = ref<TimeRange>('live');
  const isDark = ref(localStorage.getItem('theme') !== 'light');
  
  const toasts = ref<{ id: number; message: string; type: 'info' | 'success' | 'warning' | 'error' }[]>([]);

  function addToast(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    const id = Date.now();
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, 3000);
  }

  function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    updateDocumentTheme();
  }

  function updateDocumentTheme() {
    if (isDark.value) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  return {
    activeTab,
    isSidebarOpen,
    timeRange,
    isDark,
    toasts,
    addToast,
    toggleTheme,
    updateDocumentTheme
  };
});
