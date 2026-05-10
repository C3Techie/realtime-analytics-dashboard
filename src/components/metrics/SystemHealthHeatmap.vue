<script setup lang="ts">
import { useStreamingStore } from '../../store';

const store = useStreamingStore();
</script>

<template>
  <div class="widget-glass rounded-lg p-widget-padding flex flex-col gap-4">
    <h3 class="font-headline-md text-[20px] font-bold text-on-surface mb-4 pt-2 uppercase tracking-tight">System Health Heatmap</h3>
    
    <div class="grid grid-cols-10 gap-1 h-48">
      <div 
        v-for="node in store.healthNodes" 
        :key="node.id"
        class="rounded-sm transition-all duration-500"
        :class="{
          'bg-secondary/80': node.status === 'active',
          'bg-primary/60': node.status === 'warning',
          'bg-error/80 animate-pulse': node.status === 'error',
          'bg-white/10': node.status === 'inactive'
        }"
      ></div>
    </div>
  </div>
</template>
