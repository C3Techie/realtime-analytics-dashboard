import { onMounted, onUnmounted } from 'vue';
import { streamService } from '../services/StreamService';
import { useStreamingStore } from '../store';
import type { StreamPayload } from '../types';

export function useStreamSubscription() {
  const store = useStreamingStore();
  
  // Performance Optimization: Batching buffer
  let metricBatch: Record<string, { value: number; change: number }> = {};
  let batchInterval: number | null = null;

  const handleMessage = (payload: StreamPayload) => {
    switch (payload.type) {
      case 'metric':
        // Buffer metric updates to prevent excessive re-renders
        metricBatch[payload.data.symbol] = {
          value: payload.data.value,
          change: payload.data.change
        };
        break;
      case 'market':
        store.addMarketPoint(payload.data);
        break;
      case 'log':
        store.addLog(payload.data);
        break;
    }
  };

  const processBatch = () => {
    if (Object.keys(metricBatch).length > 0) {
      Object.entries(metricBatch).forEach(([symbol, data]) => {
        store.updateMetric(symbol, data.value, data.change);
      });
      metricBatch = {};
    }
  };

  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = streamService.subscribe(handleMessage);
    // Process metric updates every 250ms (4 updates per second) for optimal performance
    batchInterval = window.setInterval(processBatch, 250);
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
    if (batchInterval) clearInterval(batchInterval);
  });
}
