<script setup lang="ts">
import { useStreamingStore } from '../../store';
import TopNavBar from '../../components/layout/TopNavBar.vue';
import BottomNavBar from '../../components/layout/BottomNavBar.vue';
import MetricCard from '../../components/metrics/MetricCard.vue';
import MarketChart from '../../components/charts/MarketChart.vue';
import ActivityFeed from '../../components/feed/ActivityFeed.vue';

const streamingStore = useStreamingStore();
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden bg-background">
    <TopNavBar />
    
    <main class="flex-1 overflow-y-auto pt-20 p-4 pb-24 space-y-6 hide-scrollbar">
      <!-- Horizontal Scroll Metrics -->
      <div class="flex overflow-x-auto gap-4 pb-2 hide-scrollbar snap-x">
        <div v-for="metric in Object.values(streamingStore.metrics)" :key="metric.symbol" class="min-w-[280px] snap-center">
          <MetricCard :metric="metric" />
        </div>
      </div>

      <!-- Main Chart -->
      <MarketChart />

      <!-- Activity Feed -->
      <div class="h-[400px]">
        <ActivityFeed />
      </div>
    </main>

    <BottomNavBar />
  </div>
</template>
