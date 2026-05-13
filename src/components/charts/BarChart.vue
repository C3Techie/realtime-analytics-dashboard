<script setup lang="ts">
import { computed } from 'vue';
import { useUIStore } from '../../store';

const props = defineProps<{
  data: { name: string; value: number }[];
  title: string;
}>();

const uiStore = useUIStore();

const chartOptions = computed(() => ({
  backgroundColor: 'transparent',
  grid: {
    top: 10,
    right: 20,
    bottom: 20,
    left: 40,

  },
  tooltip: {
    trigger: 'item',
    backgroundColor: uiStore.isDark ? '#1c1f27' : '#ffffff',
    borderColor: 'rgba(174, 198, 255, 0.2)',
    textStyle: { color: uiStore.isDark ? '#e0e2ed' : '#0f172a' }
  },
  xAxis: {
    type: 'category',
    data: props.data.map(d => d.name),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#8b90a0', fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    axisLabel: { color: '#8b90a0', fontSize: 10 }
  },
  series: [{
    type: 'bar',
    data: props.data.map(d => ({
      value: d.value,
      itemStyle: {
        color: d.name === 'BTC' ? '#aec6ff' : 
               d.name === 'ETH' ? '#4edea3' : 
               d.name === 'SOL' ? '#ffb596' : '#d1d5db'
      }
    })),
    itemStyle: {
      borderRadius: [4, 4, 0, 0]
    },
    barWidth: '40%'
  }]
}));
</script>

<template>
  <div class="glass-panel rounded-lg p-widget-padding flex flex-col gap-4">
    <div class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">{{ title }}</div>
    <div class="h-[180px] w-full">
      <VChart :option="chartOptions" autoresize />
    </div>
  </div>
</template>
