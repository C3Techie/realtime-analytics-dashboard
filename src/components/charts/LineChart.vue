<script setup lang="ts">
import { computed } from 'vue';
import { useUIStore } from '../../store';

const props = defineProps<{
  data: { timestamp: number; value: number }[];
  color?: string;
  height?: string;
}>();

const uiStore = useUIStore();

const chartOptions = computed(() => {
  const isDark = uiStore.isDark;
  const primaryColor = props.color === 'var(--primary)' 
    ? (isDark ? '#aec6ff' : '#0059c5')
    : (props.color || '#aec6ff');

  return {
    backgroundColor: 'transparent',
    grid: {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? '#1c1f27' : '#ffffff',
      borderColor: 'rgba(174, 198, 255, 0.2)',
      textStyle: {
        color: isDark ? '#e0e2ed' : '#0f172a',
        fontFamily: 'Inter'
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: isDark ? '#8b90a0' : '#475569',
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
        }
      },
      axisLabel: {
        color: isDark ? '#8b90a0' : '#475569',
        fontSize: 10
      }
    },
    series: [
      {
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: (() => {
          const now = Date.now();
          const rangeMs = {
            '1m': 60 * 1000,
            '5m': 5 * 60 * 1000,
            '1h': 60 * 60 * 1000,
            'live': 0
          }[uiStore.timeRange as string || 'live'] || 0;

          if (rangeMs === 0) return props.data.map(p => [p.timestamp, p.value]);
          
          return props.data
            .filter(p => now - p.timestamp <= rangeMs)
            .map(p => [p.timestamp, p.value]);
        })(),
        lineStyle: {
          width: 2,
          color: primaryColor
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: primaryColor + '44' }, // Add alpha for area
              { offset: 1, color: 'transparent' }
            ]
          }
        },
        animation: false
      }
    ]
  };
});
</script>

<template>
  <div :style="{ height: height || '200px' }" class="w-full">
    <VChart :option="chartOptions" autoresize />
  </div>
</template>
