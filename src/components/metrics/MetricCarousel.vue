<script setup lang="ts">
import { useStreamingStore } from '../../store';
import MetricCard from './MetricCard.vue';

const store = useStreamingStore();
</script>

<template>
  <div class="flex overflow-x-auto hide-scrollbar gap-gutter pb-2 snap-x">
    <MetricCard 
      v-for="metric in store.metrics" 
      :key="metric.symbol"
      :metric="metric"
      class="min-w-[220px] flex-shrink-0 snap-center"
    />
  </div>
</template>
