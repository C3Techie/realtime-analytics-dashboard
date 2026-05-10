<script setup lang="ts">
import SideNavBar from '../../components/layout/SideNavBar.vue';
import TopNavBar from '../../components/layout/TopNavBar.vue';
import MetricCard from '../../components/metrics/MetricCard.vue';
import MarketChart from '../../components/charts/MarketChart.vue';
import ActivityFeed from '../../components/feed/ActivityFeed.vue';
import ActiveAlerts from '../../components/feed/ActiveAlerts.vue';
import SystemHealthHeatmap from '../../components/metrics/SystemHealthHeatmap.vue';
import { useStreamingStore, useUIStore } from '../../store';

const store = useStreamingStore();
const uiStore = useUIStore();
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-grid-pattern">
    <SideNavBar />
    
    <div class="flex-1 flex flex-col min-w-0 transition-all duration-300" 
      :class="[uiStore.isSidebarOpen ? 'md:ml-60' : 'md:ml-16']">
      <TopNavBar />
      
      <main class="flex-1 overflow-y-auto pt-20 px-margin pb-margin">
        <div class="grid grid-cols-12 gap-gutter h-full pb-10">
          <!-- Top Row: Metrics (Span 3 each) -->
          <div v-for="metric in store.metrics" :key="metric.symbol" class="col-span-12 lg:col-span-3">
            <MetricCard :metric="metric" />
          </div>

          <!-- Middle Row: Chart (Span 8) and Feed (Span 4) -->
          <div class="col-span-12 lg:col-span-8 widget-glass rounded-lg flex flex-col min-h-[360px]">
            <div class="p-widget-padding flex justify-between items-center border-b border-white/5">
              <h3 class="font-headline-md text-[20px] font-bold text-on-surface">Market Analysis</h3>
              <div class="flex gap-2">
                <button class="px-3 py-1 text-[13px] font-data-tabular text-on-surface-variant hover:text-primary bg-white/5 hover:bg-white/10 rounded-default border border-transparent transition-all">1m</button>
                <button class="px-3 py-1 text-[13px] font-data-tabular text-primary bg-primary/10 border border-primary/30 rounded-default transition-all inner-glow">5m</button>
                <button class="px-3 py-1 text-[13px] font-data-tabular text-on-surface-variant hover:text-primary bg-white/5 hover:bg-white/10 rounded-default border border-transparent transition-all">1h</button>
              </div>
            </div>
            <div class="flex-1 p-widget-padding relative">
              <MarketChart />
            </div>
          </div>

          <div class="col-span-12 lg:col-span-4">
            <ActivityFeed class="h-full" />
          </div>

          <!-- Bottom Row: Heatmap (Span 6) and Alerts (Span 6) -->
          <div class="col-span-12 lg:col-span-6">
            <SystemHealthHeatmap />
          </div>

          <div class="col-span-12 lg:col-span-6">
            <ActiveAlerts class="h-full" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
