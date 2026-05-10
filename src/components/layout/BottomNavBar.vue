<script setup lang="ts">
import { useUIStore } from '../../store';

const uiStore = useUIStore();

const tabs = [
  { id: 'overview', icon: 'dashboard', label: 'Overview' }
];

const handleTabClick = (tabId: string) => {
  uiStore.activeTab = tabId;
};
</script>

<template>
  <nav class="fixed bottom-0 left-0 w-full bg-surface-container-lowest/90 backdrop-blur-2xl z-40 flex justify-around items-center py-2 px-4 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] border-t border-white/5 md:hidden">
    <button 
      v-for="tab in tabs" 
      :key="tab.id"
      @click="handleTabClick(tab.id)"
      class="flex flex-col items-center gap-1 p-2 transition-colors duration-200"
      :class="uiStore.activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant'"
    >
      <div :class="{ 'bg-primary-container/20 px-4 rounded-full mb-1': uiStore.activeTab === tab.id }">
        <span class="material-symbols-outlined" :style="uiStore.activeTab === tab.id ? 'font-variation-settings: \'FILL\' 1' : ''">
          {{ tab.icon }}
        </span>
      </div>
      <span class="font-label-caps text-[10px] font-bold">{{ tab.label }}</span>
    </button>
  </nav>
</template>
