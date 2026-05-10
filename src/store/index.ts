import { defineStore } from 'pinia';
import { ref, reactive, shallowRef } from 'vue';
import type { MetricData, LogEntry, HealthNode, ChartPoint } from '../types';

export const useStreamingStore = defineStore('streaming', () => {
  const isStreaming = ref(true);
  
  const metrics = reactive<Record<string, MetricData>>({
    'BTC': { symbol: 'BTC', name: 'Bitcoin', value: 64231.50, change: 2.4, trend: 'up', history: Array(10).fill(64000).map(v => v + Math.random() * 500) },
    'ETH': { symbol: 'ETH', name: 'Ethereum', value: 3450.12, change: -0.5, trend: 'down', history: Array(10).fill(3400).map(v => v + Math.random() * 100) },
    'VOL': { symbol: 'VOL', name: 'Volume 24H', value: 1200000000, change: 12, trend: 'up', history: Array(10).fill(1).map(() => Math.random()) },
    'TPS': { symbol: 'TPS', name: 'System TPS', value: 4250, change: 0, trend: 'stable', history: Array(10).fill(4000).map(v => v + Math.random() * 500) }
  });

  const logs = ref<LogEntry[]>([
    { id: '1', timestamp: '14:23:01', level: 'INFO', message: 'Terminal initialized' },
    { id: '2', timestamp: '14:23:05', level: 'INFO', message: 'WebSocket connected' }
  ]);

  const marketData = shallowRef<ChartPoint[]>([]);
  const healthNodes = ref<HealthNode[]>(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'error' : 'warning') : 'active'
    }))
  );

  function updateMetric(symbol: string, data: Partial<MetricData>) {
    if (metrics[symbol]) {
      Object.assign(metrics[symbol], data);
      if (data.value !== undefined) {
        metrics[symbol].history.push(data.value);
        if (metrics[symbol].history.length > 20) metrics[symbol].history.shift();
      }
    }
  }

  function addLog(log: LogEntry) {
    logs.value.unshift(log);
    if (logs.value.length > 50) logs.value.pop();
  }

  function addMarketPoint(point: ChartPoint) {
    const newData = [...marketData.value, point];
    if (newData.length > 100) newData.shift();
    marketData.value = newData;
  }

  function toggleStreaming() {
    isStreaming.value = !isStreaming.value;
  }

  return {
    isStreaming,
    metrics,
    logs,
    marketData,
    healthNodes,
    updateMetric,
    addLog,
    addMarketPoint,
    toggleStreaming
  };
});

export const useUIStore = defineStore('ui', () => {
  const activeTab = ref('overview');
  const isSidebarOpen = ref(true);
  const isSearchFocused = ref(false);
  const isDark = ref(localStorage.getItem('theme') !== 'light');

  function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    updateDocumentTheme();
  }

  function updateDocumentTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return {
    activeTab,
    isSidebarOpen,
    isSearchFocused,
    isDark,
    toggleTheme,
    updateDocumentTheme
  };
});
