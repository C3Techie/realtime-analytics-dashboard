<script setup lang="ts">
import { computed } from 'vue';
import { useStreamingStore, useUIStore } from '../../store';

const streamingStore = useStreamingStore();
const uiStore = useUIStore();

const chartOptions = computed(() => {
  const data = streamingStore.healthNodes.map((node, index) => {
    const x = index % 10;
    const y = Math.floor(index / 10);
    let value = 2; // active
    if (node.status === 'warning') value = 1;
    if (node.status === 'error') value = 0;
    return [x, y, value];
  });

  return {
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        const index = params.data[1] * 10 + params.data[0];
        const node = streamingStore.healthNodes[index];
        return `Node ID: ${node.id}<br/>Status: ${node.status.toUpperCase()}`;
      }
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    xAxis: { type: 'category', show: false },
    yAxis: { type: 'category', show: false },
    visualMap: {
      show: false,
      min: 0,
      max: 2,
      inRange: {
        color: ['#ffb4ab', '#ffb596', '#4edea3']
      }
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: { show: false },
      itemStyle: {
        borderColor: uiStore.isDark ? '#10131b' : '#ffffff',
        borderWidth: 2,
        borderRadius: 2
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
});
</script>

<template>
  <div class="glass-panel rounded-lg p-widget-padding flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div class="font-label-caps text-label-caps text-on-surface-variant">NODE_CLUSTER_HEALTH</div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        <span class="text-[10px] font-data-tabular text-on-surface">60/60 ONLINE</span>
      </div>
    </div>

    <div class="h-[180px] w-full">
      <VChart :option="chartOptions" autoresize />
    </div>

    <div class="grid grid-cols-3 gap-2 mt-auto">
      <div class="bg-surface-container-low p-2 rounded-default border border-outline/5">
        <div class="text-[9px] font-label-caps text-outline mb-1 uppercase tracking-tighter">Latency</div>
        <div class="text-[12px] font-data-tabular text-on-surface">24ms</div>
      </div>
      <div class="bg-surface-container-low p-2 rounded-default border border-outline/5">
        <div class="text-[9px] font-label-caps text-outline mb-1 uppercase tracking-tighter">Uptime</div>
        <div class="text-[12px] font-data-tabular text-on-surface">99.98%</div>
      </div>
      <div class="bg-surface-container-low p-2 rounded-default border border-outline/5">
        <div class="text-[9px] font-label-caps text-outline mb-1 uppercase tracking-tighter">Load</div>
        <div class="text-[12px] font-data-tabular text-secondary">Optimal</div>
      </div>
    </div>
  </div>
</template>
