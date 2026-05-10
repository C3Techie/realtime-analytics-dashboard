<script setup lang="ts">
import { useStreamingStore } from '../../store';

defineProps<{
  simplified?: boolean;
}>();

const store = useStreamingStore();
</script>

<template>
  <section class="widget-glass rounded-lg p-widget-padding flex flex-col gap-4 min-h-[300px]">
    <div class="flex justify-between items-center">
      <h2 class="font-label-caps text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">Live Activity Feed</h2>
      <span class="material-symbols-outlined text-on-surface-variant text-[18px]">filter_list</span>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
      <TransitionGroup name="list">
        <div 
          v-for="log in store.logs" 
          :key="log.id"
          class="flex items-start gap-3 py-1.5 border-b border-white/5 font-data-tabular text-[13px]"
        >
          <span class="text-outline-variant w-16 shrink-0">{{ log.timestamp }}</span>
          
          <span 
            class="px-1 rounded-sm text-[10px] font-bold shrink-0 w-10 text-center"
            :class="{
              'text-primary bg-primary/10': log.level === 'INFO',
              'text-tertiary bg-tertiary/10': log.level === 'WARN',
              'text-error bg-error/10': log.level === 'ERR'
            }"
          >
            {{ log.level }}
          </span>
          
          <span class="text-on-surface-variant truncate">{{ log.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
