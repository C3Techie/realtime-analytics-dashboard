<script setup lang="ts">
import type { MetricData } from '../../types';
import { computed } from 'vue';

const props = defineProps<{
  metric: MetricData;
}>();

const isPositive = computed(() => props.metric.trend === 'up');

const sparklinePath = computed(() => {
  if (!props.metric.history.length) return '';
  const data = props.metric.history;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 20;
  
  return data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
});

const formattedValue = computed(() => {
  if (props.metric.symbol === 'VOL') {
    return '$' + (props.metric.value / 1e9).toFixed(1) + 'B';
  }
  if (props.metric.symbol === 'TPS') {
    return props.metric.value.toLocaleString();
  }
  return '$' + props.metric.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
});
</script>

<template>
  <div class="widget-glass rounded-lg p-gutter flex flex-col gap-2 relative group cursor-pointer hover:border-white/15 transition-colors">
    <div class="flex justify-between items-center">
      <span class="font-label-caps text-[11px] font-bold text-on-surface-variant tracking-wider">{{ metric.symbol }}/USD</span>
      <div class="flex items-center gap-1" :class="isPositive ? 'text-secondary' : 'text-error'">
        <span class="material-symbols-outlined text-[14px]">{{ isPositive ? 'trending_up' : 'trending_down' }}</span>
        <span class="font-data-tabular text-[13px] font-medium">{{ isPositive ? '+' : '' }}{{ metric.change.toFixed(1) }}%</span>
      </div>
    </div>
    
    <div class="font-display-lg text-[24px] font-bold text-on-surface tracking-tight">{{ formattedValue }}</div>
    
    <div class="w-full h-8 mt-2 flex items-end">
      <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
        <path 
          :d="sparklinePath" 
          fill="none" 
          :stroke="isPositive ? '#4edea3' : '#ffb4ab'" 
          stroke-width="2"
          :class="isPositive ? 'neon-glow-secondary' : 'neon-glow-error'"
        />
      </svg>
    </div>
  </div>
</template>
