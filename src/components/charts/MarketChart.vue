<script setup lang="ts">
import { useStreamingStore } from '../../store';
import { computed } from 'vue';

const props = defineProps<{
  simplified?: boolean;
}>();

const store = useStreamingStore();

const chartPath = computed(() => {
  if (store.marketData.length < 2) return '';
  const data = store.marketData;
  const values = data.map(p => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const width = 1000;
  const height = props.simplified ? 200 : 300;

  return data.map((p, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((p.value - min) / range) * height;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
});

const areaPath = computed(() => {
  if (store.marketData.length < 2) return '';
  const path = chartPath.value;
  const height = props.simplified ? 200 : 300;
  return `${path} L 1000 ${height} L 0 ${height} Z`;
});
</script>

<template>
  <div class="w-full h-full relative overflow-hidden border-l border-b border-white/10">
    <!-- Grid Lines -->
    <div class="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none opacity-20">
      <div v-for="i in 4" :key="i" class="w-full border-t border-white/20"></div>
    </div>

    <!-- Chart SVG -->
    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
      <defs>
        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#0070f3" stop-opacity="0.3"></stop>
          <stop offset="100%" stop-color="#0070f3" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      
      <!-- Area Fill -->
      <path :d="areaPath" fill="url(#chartGradient)"></path>
      
      <!-- Main Line -->
      <path 
        class="chart-glow-primary transition-all duration-300" 
        :d="chartPath" 
        fill="none" 
        stroke="#0070f3" 
        stroke-width="2"
      ></path>
    </svg>

    <!-- Active Point Indicator -->
    <div v-if="store.marketData.length > 0" 
      class="absolute right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(174,198,255,1)]"
      style="transform: translate(50%, -50%);"
    ></div>
  </div>
</template>
