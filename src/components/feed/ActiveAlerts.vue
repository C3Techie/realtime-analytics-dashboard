<script setup lang="ts">
import { computed } from 'vue';
import { useStreamingStore } from '../../store';

const streamingStore = useStreamingStore();

const alerts = computed(() => {
  return streamingStore.logs
    .filter(log => log.level === 'ERROR' || log.level === 'WARN')
    .slice(0, 3) // Show top 3 recent alerts
    .map(log => ({
      id: log.id,
      type: log.level === 'ERROR' ? 'CRITICAL' : 'WARNING',
      title: log.message.split(' ').slice(0, 2).join('_').toUpperCase(), // Generate a title from message
      message: log.message,
      time: 'JUST NOW',
      status: 'active'
    }));
});
</script>

<template>
  <div class="glass-panel rounded-lg flex flex-col h-full overflow-hidden">
    <div class="p-4 border-b border-outline/10 flex justify-between items-center bg-surface-container-low/50">
      <div class="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">warning</span>
        SYSTEM_ALERTS
      </div>
      <span class="px-2 py-0.5 rounded-full bg-error/10 text-error text-[10px] font-bold">3 ACTIVE</span>
    </div>

    <div class="p-4 space-y-4">
      <div v-for="alert in alerts" :key="alert.id" 
        class="relative pl-4 border-l-2 transition-all duration-300 hover:translate-x-1"
        :class="alert.type === 'CRITICAL' ? 'border-error' : alert.type === 'WARNING' ? 'border-tertiary' : 'border-primary'">
        
        <div class="flex justify-between items-start mb-1">
          <div class="text-[10px] font-label-caps tracking-widest font-bold"
            :class="alert.type === 'CRITICAL' ? 'text-error' : alert.type === 'WARNING' ? 'text-tertiary' : 'text-primary'">
            {{ alert.type }}
          </div>
          <div class="text-[9px] font-data-tabular text-outline">{{ alert.time }}</div>
        </div>
        
        <div class="text-[13px] font-bold text-on-surface leading-tight mb-1">{{ alert.title }}</div>
        <div class="text-[12px] font-body-base text-on-surface-variant leading-snug">{{ alert.message }}</div>
      </div>
    </div>
    
    <div class="mt-auto p-4 bg-surface-container-low/30 border-t border-outline/5">
      <button class="w-full py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-[11px] font-label-caps rounded-default transition-all duration-200 border border-outline/10 uppercase tracking-widest">
        VIEW ALL PROTOCOLS
      </button>
    </div>
  </div>
</template>
