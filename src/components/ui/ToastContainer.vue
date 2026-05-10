<script setup lang="ts">
import { useUIStore } from '../../store';

const uiStore = useUIStore();

const getTypeClasses = (type: string) => {
  switch (type) {
    case 'error': return 'border-error text-error bg-error/10';
    case 'warning': return 'border-tertiary text-tertiary bg-tertiary/10';
    case 'success': return 'border-secondary text-secondary bg-secondary/10';
    default: return 'border-primary text-primary bg-primary/10';
  }
};
</script>

<template>
  <div class="fixed top-20 right-6 z-[100] flex flex-col gap-3 pointer-events-none w-72">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in uiStore.toasts" 
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 p-3 rounded-lg border backdrop-blur-xl shadow-lg transition-all duration-300 transform"
        :class="getTypeClasses(toast.type)"
      >
        <span class="material-symbols-outlined text-[18px]">
          {{ toast.type === 'error' ? 'error' : toast.type === 'warning' ? 'warning' : 'info' }}
        </span>
        <span class="font-body-base text-[13px] font-medium leading-tight">
          {{ toast.message }}
        </span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
</style>
