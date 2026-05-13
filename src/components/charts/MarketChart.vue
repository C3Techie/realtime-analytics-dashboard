<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStreamingStore, useUIStore } from '../../store';
import type { TimeRange } from '../../types';
import LineChart from './LineChart.vue';

const streamingStore = useStreamingStore();
const uiStore = useUIStore();

const timeRanges: TimeRange[] = ['1m', '5m', '1h', 'live'];
const selectedSymbol = ref('BTC');

const toggleSeries = (symbol: string) => {
  selectedSymbol.value = symbol;
};

const currentMetric = computed(() => streamingStore.metrics[selectedSymbol.value]);
const currentMarketData = computed(() => streamingStore.marketData[selectedSymbol.value] || []);
</script>

<template>
  <div class="glass-panel rounded-lg p-widget-padding flex flex-col gap-4 min-h-[300px]">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <div class="font-label-caps text-label-caps text-on-surface-variant">MARKET_TERMINAL</div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-display-lg font-bold text-on-surface tabular-nums">
            <template v-if="currentMarketData.length > 0">
              ${{ currentMetric?.value.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
            </template>
            <template v-else>
              <span class="opacity-20 animate-pulse">CONNECTING...</span>
            </template>
          </span>
          <span 
            v-if="currentMarketData.length > 0" 
            class="font-data-tabular text-[13px] font-bold"
            :class="currentMetric?.change >= 0 ? 'text-secondary' : 'text-error'"
          >
            {{ currentMetric?.change >= 0 ? '+' : '' }}{{ currentMetric?.change }}%
          </span>
        </div>
      </div>
      
      <div class="flex bg-surface-container-low p-1 rounded-default">
        <button 
          v-for="range in timeRanges" 
          :key="range"
          class="px-3 py-1 text-[11px] font-label-caps rounded-default transition-all duration-200"
          :class="uiStore.timeRange === range ? 'bg-primary text-on-primary-container shadow-lg' : 'text-on-surface-variant hover:text-on-surface'"
          @click="uiStore.timeRange = range"
        >
          {{ range.toUpperCase() }}
        </button>
      </div>
    </div>

    <div class="flex-1 w-full relative min-h-[240px] flex items-center justify-center">
      <template v-if="currentMarketData.length > 0">
        <LineChart 
          :data="currentMarketData" 
          :color="selectedSymbol === 'BTC' ? 'var(--primary)' : 'var(--secondary)'"
          height="240px"
        />
      </template>
      <div v-else class="flex flex-col items-center gap-4 text-outline">
        <div class="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <span class="text-[11px] font-label-caps tracking-widest">Establishing Secure Stream...</span>
      </div>
    </div>

    <div class="flex justify-between items-center pt-4 border-t border-outline/10 text-[11px] font-label-caps text-on-surface-variant gap-4">
      <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-1 pr-4">
        <button @click="toggleSeries('BTC')" class="flex items-center gap-1.5 transition-opacity shrink-0" :class="selectedSymbol === 'BTC' ? 'opacity-100' : 'opacity-30'">
          <span class="w-2 h-2 rounded-full bg-primary neon-glow-primary"></span>
          <span class="whitespace-nowrap">BTC/USD</span>
        </button>
        <button @click="toggleSeries('ETH')" class="flex items-center gap-1.5 transition-opacity shrink-0" :class="selectedSymbol === 'ETH' ? 'opacity-100' : 'opacity-30'">
          <span class="w-2 h-2 rounded-full bg-secondary neon-glow-secondary"></span>
          <span class="whitespace-nowrap">ETH/USD</span>
        </button>
        <button @click="toggleSeries('SOL')" class="flex items-center gap-1.5 transition-opacity shrink-0" :class="selectedSymbol === 'SOL' ? 'opacity-100' : 'opacity-30'">
          <span class="w-2 h-2 rounded-full bg-tertiary neon-glow-tertiary"></span>
          <span class="whitespace-nowrap">SOL/USD</span>
        </button>
        <button @click="toggleSeries('BNB')" class="flex items-center gap-1.5 transition-opacity shrink-0" :class="selectedSymbol === 'BNB' ? 'opacity-100' : 'opacity-30'">
          <span class="w-2 h-2 rounded-full bg-[#f3ba2f] shadow-[0_0_8px_rgba(243,186,47,0.5)]"></span>
          <span class="whitespace-nowrap">BNB/USD</span>
        </button>
      </div>
      <div class="hidden sm:flex items-center gap-2 shrink-0">
        <span class="material-symbols-outlined text-[14px]">history</span>
        <span class="whitespace-nowrap">NODE: NEXUS_01_WEST</span>
      </div>
    </div>
  </div>
</template>
