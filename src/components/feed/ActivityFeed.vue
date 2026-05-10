<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStreamingStore } from '../../store';

const streamingStore = useStreamingStore();
const searchQuery = ref('');
const selectedLevel = ref('ALL');

const filteredLogs = computed(() => {
  return streamingStore.logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesLevel = selectedLevel.value === 'ALL' || log.level === selectedLevel.value;
    return matchesSearch && matchesLevel;
  });
});

const getLevelClass = (level: string) => {
  switch (level) {
    case 'ERROR': return 'text-error bg-error/10 border-error/20';
    case 'WARN': return 'text-tertiary bg-tertiary/10 border-tertiary/20';
    default: return 'text-secondary bg-secondary/10 border-secondary/20';
  }
};
</script>

<template>
  <div class="glass-panel rounded-lg flex flex-col h-full overflow-hidden">
    <!-- Header -->
    <div class="p-4 border-b border-outline/10 space-y-4 shrink-0 bg-surface-container-low/30">
      <div class="flex justify-between items-center">
        <div class="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-glow"></span>
          LIVE_ACTIVITY_FEED
        </div>
        <div class="text-[10px] font-data-tabular text-outline uppercase tracking-tighter">{{ filteredLogs.length }} EVENTS</div>
      </div>

      <!-- Filters -->
      <div class="flex gap-2">
        <div class="relative flex-1">
          <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[14px] text-outline">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="FILTER_LOGS..." 
            class="w-full bg-surface-container-low border border-outline/5 rounded-default py-1 pl-7 pr-2 text-[10px] font-data-tabular text-on-surface placeholder-outline/50 focus:border-primary/30 transition-all outline-none"
          />
        </div>
        <select 
          v-model="selectedLevel"
          class="bg-surface-container-low border border-outline/5 rounded-default px-2 py-1 text-[10px] font-label-caps text-on-surface-variant outline-none"
        >
          <option value="ALL">ALL_LEVELS</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>
      </div>
    </div>

    <!-- Feed Content -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
      <TransitionGroup name="list">
        <div 
          v-for="log in filteredLogs" 
          :key="log.id"
          class="p-3 border rounded-default bg-surface-container-low transition-all duration-300 hover:bg-surface-container-high group"
        >
          <div class="flex justify-between items-start mb-1">
            <span 
              class="px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold tracking-widest border"
              :class="getLevelClass(log.level)"
            >
              {{ log.level }}
            </span>
            <span class="font-data-tabular text-[10px] text-outline group-hover:text-on-surface-variant transition-colors">
              {{ log.timestamp }}
            </span>
          </div>
          <div class="text-[12px] font-body-base text-on-surface-variant group-hover:text-on-surface leading-snug">
            {{ log.message }}
          </div>
        </div>
      </TransitionGroup>

      <div v-if="filteredLogs.length === 0" class="h-full flex flex-col items-center justify-center text-outline gap-2 opacity-40 py-10">
        <span class="material-symbols-outlined text-[32px]">manage_search</span>
        <span class="text-[11px] font-label-caps">NO_MATCHING_PROTOCOLS</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
