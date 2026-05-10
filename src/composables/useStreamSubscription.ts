import { onMounted, onUnmounted } from 'vue';
import { streamService } from '../services/StreamService';
import { useStreamingStore } from '../store';

export function useStreamSubscription() {
  const store = useStreamingStore();

  onMounted(() => {
    const unsubscribe = streamService.subscribe((payload) => {
      if (!store.isStreaming) return;

      switch (payload.type) {
        case 'METRICS':
          Object.entries(payload.data).forEach(([symbol, data]) => {
            store.updateMetric(symbol, data as any);
          });
          break;
        case 'LOG':
          store.addLog(payload.data);
          break;
        case 'MARKET_POINT':
          store.addMarketPoint(payload.data);
          break;
      }
    });

    onUnmounted(() => unsubscribe());
  });
}
