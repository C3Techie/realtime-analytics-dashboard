<script setup lang="ts">
import { useUIStore, useStreamingStore } from '../../store';
import TopNavBar from '../../components/layout/TopNavBar.vue';
import SideNavBar from '../../components/layout/SideNavBar.vue';
import MetricCard from '../../components/metrics/MetricCard.vue';
import MarketChart from '../../components/charts/MarketChart.vue';
import BarChart from '../../components/charts/BarChart.vue';
import ActivityFeed from '../../components/feed/ActivityFeed.vue';
import ActiveAlerts from '../../components/feed/ActiveAlerts.vue';
import SystemHealthHeatmap from '../../components/metrics/SystemHealthHeatmap.vue';

const uiStore = useUIStore();
const streamingStore = useStreamingStore();

const distributionData = [
  { name: 'BTC', value: 45 },
  { name: 'ETH', value: 30 },
  { name: 'USDT', value: 15 },
  { name: 'BNB', value: 10 }
];
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <SideNavBar />
    
    <div 
      class="flex-1 flex flex-col min-w-0 transition-all duration-300"
      :style="{ marginLeft: uiStore.isSidebarOpen ? '240px' : '64px' }"
    >
      <TopNavBar />
      
      <main class="flex-1 overflow-y-auto pt-20 p-6 space-y-6 hide-scrollbar">
        <!-- Dashboard Header -->
        <div class="flex justify-between items-end mb-2">
          <div>
            <h2 class="text-[24px] font-bold text-on-surface tracking-tight">OPERATIONS_COMMAND</h2>
            <p class="text-[12px] text-on-surface-variant font-body-base">Real-time surveillance of nexus nodes and market volatility.</p>
          </div>
          <div class="flex gap-2">
             <div class="bg-surface-container-low px-3 py-1.5 rounded-default border border-outline/10 flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-secondary animate-pulse-glow"></span>
               <span class="text-[10px] font-data-tabular text-on-surface uppercase tracking-widest">System Optimal</span>
             </div>
          </div>
        </div>

        <!-- Top Metrics Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            v-for="metric in Object.values(streamingStore.metrics)" 
            :key="metric.symbol"
            :metric="metric"
          />
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-12 gap-6">
          <!-- Left Column: Charts -->
          <div class="col-span-12 lg:col-span-8 space-y-6">
            <MarketChart />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BarChart :data="distributionData" title="Asset Distribution" />
              <SystemHealthHeatmap />
            </div>
          </div>

          <!-- Right Column: Feeds -->
          <div class="col-span-12 lg:col-span-4 space-y-6 flex flex-col">
             <div class="h-[400px] lg:h-[calc(100vh-380px)] lg:min-h-[400px]">
               <ActivityFeed />
             </div>
             <div class="shrink-0">
               <ActiveAlerts />
             </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
