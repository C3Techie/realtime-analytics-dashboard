<script setup lang="ts">
import TopNavBar from '../../components/layout/TopNavBar.vue';
import BottomNavBar from '../../components/layout/BottomNavBar.vue';
import MetricCarousel from '../../components/metrics/MetricCarousel.vue';
import MarketChart from '../../components/charts/MarketChart.vue';
import ActivityFeed from '../../components/feed/ActivityFeed.vue';
import SystemHealthSummary from '../../components/metrics/SystemHealthSummary.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen pt-16 pb-20 bg-grid-pattern">
    <TopNavBar />
    
    <main class="flex-1 flex flex-col gap-margin p-gutter overflow-x-hidden">
      <!-- Key Metrics Carousel -->
      <section class="w-full">
        <h2 class="font-label-caps text-[11px] font-bold text-on-surface-variant mb-unit ml-1 tracking-wider">KEY METRICS</h2>
        <MetricCarousel />
      </section>

      <!-- Market Analysis Chart -->
      <section class="widget-glass rounded-lg p-widget-padding flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2 class="font-label-caps text-[11px] font-bold text-on-surface-variant tracking-wider">MARKET ANALYSIS</h2>
          <div class="flex gap-2">
            <button class="font-data-tabular text-[13px] text-on-surface bg-surface-variant px-2 py-1 rounded-default">1H</button>
            <button class="font-data-tabular text-[13px] text-primary-container bg-primary-container/10 px-2 py-1 rounded-default border border-primary-container/30">1D</button>
          </div>
        </div>
        <div class="w-full h-48">
          <MarketChart simplified />
        </div>
        <div class="flex gap-gutter mt-4">
          <button class="flex-1 bg-primary-container text-on-primary-container font-label-caps text-[11px] font-bold py-3 rounded-lg flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-[16px]">add_circle</span>
            LONG
          </button>
          <button class="flex-1 bg-transparent text-on-surface font-label-caps text-[11px] font-bold py-3 rounded-lg border border-white/15 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-[16px]">remove_circle</span>
            SHORT
          </button>
        </div>
      </section>

      <div class="flex flex-col gap-margin">
        <ActivityFeed simplified />
        <SystemHealthSummary />
      </div>
    </main>

    <BottomNavBar />
  </div>
</template>
