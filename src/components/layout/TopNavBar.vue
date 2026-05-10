<script setup lang="ts">
import { useBreakpoint } from '../../composables/useBreakpoint';
import { useUIStore } from '../../store';

const { isMobile } = useBreakpoint();
const uiStore = useUIStore();
</script>

<template>
  <header class="bg-surface/80 backdrop-blur-xl border-b border-outline/10 shadow-[0_0_20px_rgba(0,112,243,0.1)] flex justify-between items-center px-margin h-16 w-full z-50 fixed top-0 left-0 transition-all duration-300"
    :class="{ 
      'md:left-60 md:w-[calc(100%-240px)]': !isMobile && uiStore.isSidebarOpen,
      'md:left-16 md:w-[calc(100%-64px)]': !isMobile && !uiStore.isSidebarOpen
    }">
    
    <div class="flex items-center gap-4">
      <button class="hidden md:block text-on-surface-variant p-2 rounded-default active:scale-95 duration-100" @click="uiStore.isSidebarOpen = !uiStore.isSidebarOpen">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <div class="flex items-center gap-3">
        <img src="/src/assets/logo.png" alt="Logo" class="w-8 h-8 object-contain">
        <h1 class="font-display-lg text-[20px] font-bold tracking-tighter text-primary">C3Tchie Nexus</h1>
      </div>
    </div>

    <!-- Search Bar (Desktop only) -->
    <div v-if="!isMobile" class="flex-1 max-w-md mx-8 hidden lg:block">
      <div class="relative w-full">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">search</span>
        <input 
          class="w-full bg-surface-container-low border border-outline/10 rounded-default py-1.5 pl-10 pr-4 text-on-surface placeholder-outline-variant font-data-tabular text-[13px] input-glow focus:border-transparent transition-all" 
          placeholder="Search parameters..." 
          type="text"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- Theme Toggle -->
      <button 
        class="p-2 text-on-surface-variant hover:bg-white/5 transition-colors rounded-default"
        @click="uiStore.toggleTheme()"
        :title="uiStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <span class="material-symbols-outlined">{{ uiStore.isDark ? 'light_mode' : 'dark_mode' }}</span>
      </button>

      <button class="p-2 text-on-surface-variant hover:bg-white/5 transition-colors rounded-default">
        <span class="material-symbols-outlined">sensors</span>
      </button>
      <button class="p-2 text-on-surface-variant hover:bg-white/5 transition-colors rounded-default relative">
        <span class="material-symbols-outlined">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
      </button>
      <div class="ml-2 pl-4 border-l border-white/10 hidden md:block">
        <img alt="Profile" class="w-8 h-8 rounded-default border border-outline/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwbNsUtQOAfv2h23MqjCcGMGxY_fKBBbB__zt4oF8XfGqD560f9d7OW6xv0-ws2P3nMnRiifB6MKzzZjqlSgkoL7dn1nvlGkvzMeNqpM3YY4gBmr-VLMqWP-C-RbJX3QZHHAsTuoQfTtwixAHE1Hgqpm1iL55QpY57JkrXAlwGsG_ec8-mfHRxTzPu6fDmj7A9Wbj5XEo6x4vQGXtjlgHTkJ8XZUOXC5JyXpuPNgAIbvSVCUdOrwCSQOyx7ODusDGR-b1JuePr1e4"/>
      </div>
    </div>
  </header>
</template>
