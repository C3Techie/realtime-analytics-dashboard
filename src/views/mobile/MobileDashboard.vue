<script setup lang="ts">
import { useStreamingStore } from '../../store';
import TopNavBar from '../../components/layout/TopNavBar.vue';
import SideNavBar from '../../components/layout/SideNavBar.vue';
import MetricCard from '../../components/metrics/MetricCard.vue';
import MarketChart from '../../components/charts/MarketChart.vue';
import ActivityFeed from '../../components/feed/ActivityFeed.vue';
import BarChart from '../../components/charts/BarChart.vue';
import SystemHealthHeatmap from '../../components/metrics/SystemHealthHeatmap.vue';
import ActiveAlerts from '../../components/feed/ActiveAlerts.vue';
import { computed } from 'vue';

const streamingStore = useStreamingStore();

const distributionData = computed(() => {
  const assets = [
    { name: 'BTC', qty: 0.1, value: streamingStore.metrics['BTC']?.value || 64000 },
    { name: 'ETH', qty: 2.0, value: streamingStore.metrics['ETH']?.value || 3400 },
    { name: 'SOL', qty: 50.0, value: streamingStore.metrics['SOL']?.value || 145 },
    { name: 'BNB', qty: 10.0, value: streamingStore.metrics['BNB']?.value || 590 }
  ];
  
  const totalValue = assets.reduce((sum, a) => sum + (a.value * a.qty), 0);
  if (totalValue === 0) return [];
  
  return assets.map(a => ({
    name: a.name,
    value: Math.round(((a.value * a.qty) / totalValue) * 100)
  })).filter(d => d.value > 0);
});
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden bg-background">
    <SideNavBar />
    <TopNavBar />
    
    <main class="flex-1 overflow-y-auto pt-20 p-4 pb-10 space-y-6 hide-scrollbar">
      <!-- Horizontal Scroll Metrics -->
      <div class="flex overflow-x-auto gap-4 pb-2 hide-scrollbar snap-x">
        <div v-for="metric in Object.values(streamingStore.metrics)" :key="metric.symbol" class="min-w-[280px] snap-center">
          <MetricCard :metric="metric" />
        </div>
      </div>

      <!-- Main Chart -->
      <MarketChart />

      <!-- Asset Distribution & Node Health -->
      <div class="grid grid-cols-1 gap-6">
        <BarChart :data="distributionData" title="Asset Distribution" />
        <SystemHealthHeatmap />
      </div>

      <!-- Activity Feed -->
      <div class="h-[500px]">
        <ActivityFeed />
      </div>

      <!-- Active Alerts -->
      <ActiveAlerts />
    </main>
  </div>
</template>
