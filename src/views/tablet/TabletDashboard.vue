<script setup lang="ts">
import { useUIStore, useStreamingStore } from '../../store';
import TopNavBar from '../../components/layout/TopNavBar.vue';
import SideNavBar from '../../components/layout/SideNavBar.vue';
import MetricCard from '../../components/metrics/MetricCard.vue';
import MarketChart from '../../components/charts/MarketChart.vue';
import SystemHealthHeatmap from '../../components/metrics/SystemHealthHeatmap.vue';
import ActivityFeed from '../../components/feed/ActivityFeed.vue';
import ActiveAlerts from '../../components/feed/ActiveAlerts.vue';

const uiStore = useUIStore();
const streamingStore = useStreamingStore();
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <SideNavBar />
    
    <div 
      class="flex-1 flex flex-col min-w-0 transition-all duration-300"
      :style="{ marginLeft: uiStore.isSidebarOpen ? '240px' : '64px' }"
    >
      <TopNavBar />
      
      <main class="flex-1 overflow-y-auto pt-20 p-4 space-y-6 hide-scrollbar">
        <!-- Top Metrics (2x2 Grid on Tablet) -->
        <div class="grid grid-cols-2 gap-4">
          <MetricCard 
            v-for="metric in Object.values(streamingStore.metrics)" 
            :key="metric.symbol"
            :metric="metric"
          />
        </div>

        <!-- Main Chart -->
        <MarketChart />

        <!-- Split Row: Health & Alerts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SystemHealthHeatmap />
          <ActiveAlerts />
        </div>

        <!-- Activity Feed (Full width on Tablet bottom) -->
        <div class="h-[400px]">
          <ActivityFeed />
        </div>
      </main>
    </div>
  </div>
</template>
