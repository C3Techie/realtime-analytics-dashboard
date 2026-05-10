<script setup lang="ts">
import SideNavBar from '../../components/layout/SideNavBar.vue';
import TopNavBar from '../../components/layout/TopNavBar.vue';
import MetricCard from '../../components/metrics/MetricCard.vue';
import MarketChart from '../../components/charts/MarketChart.vue';
import ActivityFeed from '../../components/feed/ActivityFeed.vue';
import ActiveAlerts from '../../components/feed/ActiveAlerts.vue';
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
        <div class="flex flex-col gap-gutter">
          <!-- Top Row: Metrics -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-gutter shrink-0">
            <MetricCard 
              v-for="metric in store.metrics" 
              :key="metric.symbol"
              :metric="metric"
            />
          </div>

          <!-- Main Area: 2:1 Split -->
          <div class="flex flex-col lg:flex-row gap-gutter flex-1 min-h-0">
            <!-- Market Chart -->
            <div class="widget-glass rounded-lg flex-1 flex flex-col min-h-[400px]">
              <div class="p-widget-padding flex justify-between items-center border-b border-white/5">
                <div>
                  <h2 class="font-headline-md text-[20px] font-bold text-on-surface">Global Liquidity Pool</h2>
                  <p class="font-label-caps text-[11px] font-bold text-on-surface-variant mt-1">REAL-TIME STREAM (AGGREGATED)</p>
                </div>
                <div class="flex gap-2">
                  <button class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-default font-data-tabular text-[12px]">1H</button>
                  <button class="text-on-surface-variant border border-white/10 px-3 py-1 rounded-default font-data-tabular text-[12px]">24H</button>
                </div>
              </div>
              <div class="flex-1 p-widget-padding relative">
                <MarketChart />
              </div>
            </div>

            <!-- Side Column -->
            <div class="lg:w-1/3 flex flex-col gap-gutter min-w-[300px]">
              <ActivityFeed />
              <ActiveAlerts />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
