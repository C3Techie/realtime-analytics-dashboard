<script setup lang="ts">
import { computed } from 'vue';
import type { MetricData } from '../../types';


const props = defineProps<{
  metric: MetricData;
}>();

const isPositive = computed(() => props.metric.change >= 0);

const chartOptions = computed(() => ({
  grid: { top: 0, bottom: 0, left: 0, right: 0 },
  xAxis: { type: 'category', show: false },
  yAxis: { type: 'value', show: false, scale: true },
  series: [{
    type: 'line',
    data: props.metric.history,
    smooth: true,
    symbol: 'none',
    lineStyle: {
      width: 2,
      color: isPositive.value ? '#4edea3' : '#ffb4ab'
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: isPositive.value ? '#4edea333' : '#ffb4ab33' },
          { offset: 1, color: 'transparent' }
        ]
      }
    },
    animation: false
  }]
}));
</script>

<template>
  <div class="glass-panel rounded-lg p-widget-padding flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:bg-surface-container-high group cursor-pointer">
    <!-- Hover interaction: Drag Handle -->
    <div class="absolute top-0 left-0 w-full h-6 cursor-grab opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white/5 transition-opacity duration-300">
      <span class="material-symbols-outlined text-[16px] text-on-surface-variant">drag_handle</span>
    </div>

    <div class="flex justify-between items-start mt-2">
      <span class="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">{{ metric.name }}</span>
      <span class="material-symbols-outlined text-[18px]" :class="isPositive ? 'text-secondary' : 'text-error'">
        {{ isPositive ? 'trending_up' : 'trending_down' }}
      </span>
    </div>

    <div class="font-data-tabular text-[24px] lg:text-[28px] font-bold text-on-surface tracking-tight tabular-nums">
      <span v-if="metric.symbol === 'VOL'" class="text-[14px] text-outline mr-1">$</span>
      {{ metric.value.toLocaleString(undefined, { maximumFractionDigits: metric.symbol === 'BTC' ? 2 : 0 }) }}
      <span v-if="metric.symbol === 'TPS'" class="text-[12px] text-outline ml-1">tps</span>
    </div>

    <div class="flex items-center gap-3 mt-auto">
      <div class="flex items-center px-1.5 py-0.5 rounded-default border" 
        :class="isPositive ? 'text-secondary bg-secondary/10 border-secondary/20' : 'text-error bg-error/10 border-error/20'">
        <span class="material-symbols-outlined text-[14px]">{{ isPositive ? 'arrow_upward' : 'arrow_downward' }}</span>
        <span class="font-data-tabular text-[11px] font-bold ml-0.5">{{ Math.abs(metric.change) }}%</span>
      </div>
      
      <!-- Sparkline -->
      <div class="h-10 flex-1 relative min-w-[60px]">
        <VChart :option="chartOptions" autoresize />
      </div>
    </div>
    
    <!-- Neon Accent Bar -->
    <div class="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
      :class="isPositive ? 'bg-secondary neon-glow-secondary' : 'bg-error neon-glow-error'">
    </div>
  </div>
</template>
