<script setup lang="ts">
import { useUIStore } from '../../store';
import { useBreakpoint } from '../../composables/useBreakpoint';

const uiStore = useUIStore();
const { isDesktop } = useBreakpoint();

const navItems = [
  { id: 'overview', icon: 'dashboard', label: 'Overview' },
  { id: 'markets', icon: 'monitoring', label: 'Markets' },
  { id: 'analytics', icon: 'query_stats', label: 'Analytics' },
  { id: 'alerts', icon: 'notification_important', label: 'Alerts' },
  { id: 'health', icon: 'memory', label: 'Health' }
];
</script>

<template>
  <nav 
    class="hidden md:flex fixed left-0 top-0 h-full flex-col pt-20 z-40 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-white/5 transition-all duration-300 overflow-y-auto overflow-x-hidden group"
    :class="[uiStore.isSidebarOpen ? 'w-60' : 'w-16']"
  >
    <div class="px-4 mb-8 flex items-center" :class="uiStore.isSidebarOpen ? 'justify-start' : 'justify-center'">
      <img src="/src/assets/logo.png" alt="Logo" class="w-8 h-8 object-contain">
      <div 
        class="font-headline-md text-primary truncate transition-all duration-300 font-bold"
        :class="uiStore.isSidebarOpen ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0'"
      >
        NEXUS
      </div>
    </div>

    <div class="flex flex-col flex-grow">
      <button 
        v-for="item in navItems" 
        :key="item.id"
        @click="uiStore.activeTab = item.id"
        class="flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-all relative"
        :class="[
          uiStore.activeTab === item.id ? 'text-secondary bg-secondary-container/20 border-r-2 border-secondary' : 'text-on-surface-variant hover:text-on-surface',
          uiStore.isSidebarOpen ? 'px-6' : 'px-4'
        ]"
      >
        <span class="material-symbols-outlined w-6 text-center" :style="uiStore.activeTab === item.id ? 'font-variation-settings: \'FILL\' 1' : ''">
          {{ item.icon }}
        </span>
        <span 
          class="font-label-caps text-[11px] font-bold whitespace-nowrap transition-all duration-300"
          :class="uiStore.isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'"
        >
          {{ item.label }}
        </span>
      </button>
    </div>

    <div class="mt-auto border-t border-white/5 p-4 flex items-center gap-3" :class="uiStore.isSidebarOpen ? 'justify-start' : 'justify-center'">
      <img alt="User" class="w-8 h-8 rounded-full border border-white/20 object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4ksl1DzX3cXtnXErd2wpOb2rAizetWvk9C5iFP2rTELU9I2-S4uQtnu2R-CEYg0z6VsAQ4fnjdllJ05eZGJeKQIaxCm-JPEqGCI_YbFJABcq0oWAFj6Mj0vuGu-jAYQzwCZPi1WB5avDMKNo_dJ8SA2hUnzH09cPxGxarGaz5PkGbGzBLIW7vpjp63AUNfMyrBA36kQBqDb53umxJh_JxJofbzsW3r09pvvfXpqE9AkMZ4sQsJ5h1y4sVG1AtYhuclcpzkaqbXpA"/>
      <div v-if="uiStore.isSidebarOpen" class="flex flex-col overflow-hidden">
        <div class="font-label-caps text-[10px] text-on-surface truncate font-bold uppercase">Terminal v2.4</div>
        <div class="font-label-caps text-[9px] text-secondary truncate flex items-center gap-1 font-bold">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> WS: CONNECTED
        </div>
      </div>
    </div>
  </nav>
</template>
