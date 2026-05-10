<script setup lang="ts">
import { useBreakpoint } from '../../composables/useBreakpoint';
import { useUIStore, useStreamingStore } from '../../store';

const { isMobile } = useBreakpoint();
const uiStore = useUIStore();
const streamingStore = useStreamingStore();

const handleNotImplemented = (moduleName: string) => {
  uiStore.addToast(`Access Denied: ${moduleName} is restricted at your current clearance level.`, 'error');
};
</script>

<template>
  <header class="bg-surface/80 backdrop-blur-xl border-b border-outline/10 shadow-[0_0_20px_rgba(0,112,243,0.1)] flex justify-between items-center px-margin h-16 w-full z-50 fixed top-0 left-0 transition-all duration-300"
    :class="{ 
      'md:left-60 md:w-[calc(100%-240px)]': !isMobile && uiStore.isSidebarOpen,
      'md:left-16 md:w-[calc(100%-64px)]': !isMobile && !uiStore.isSidebarOpen
    }">
    
    <div class="flex items-center gap-4">
      <button class="hidden md:block text-on-surface-variant p-2 rounded-default hover:bg-white/5 active:scale-95 duration-100" @click="uiStore.isSidebarOpen = !uiStore.isSidebarOpen">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <div class="flex items-center gap-3">
        <img src="/src/assets/logo.png" alt="Logo" class="w-8 h-8 object-contain">
        <h1 class="font-display-lg text-[18px] md:text-[20px] font-bold tracking-tighter text-primary">C3Tchie Nexus</h1>
      </div>
    </div>

    <!-- Center Section: Stream Controls -->
    <div class="hidden lg:flex items-center gap-6 bg-surface-container-low px-4 py-1.5 rounded-full border border-outline/5">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" :class="streamingStore.status === 'connected' ? 'bg-secondary animate-pulse-glow' : 'bg-error'"></div>
        <span class="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-widest">{{ streamingStore.status }}</span>
      </div>
      <div class="h-4 w-px bg-outline/20"></div>
      <div class="flex items-center gap-4">
        <button 
          @click="streamingStore.setStatus(streamingStore.status === 'paused' ? 'connected' : 'paused')"
          class="flex items-center gap-2 text-[11px] font-label-caps text-on-surface-variant hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">{{ streamingStore.status === 'paused' ? 'play_arrow' : 'pause' }}</span>
          <span>{{ streamingStore.status === 'paused' ? 'RESUME STREAM' : 'PAUSE STREAM' }}</span>
        </button>
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

      <button @click="handleNotImplemented('Sensors')" class="p-2 text-on-surface-variant hover:bg-white/5 transition-colors rounded-default">
        <span class="material-symbols-outlined">sensors</span>
      </button>
      <button @click="handleNotImplemented('Notifications')" class="p-2 text-on-surface-variant hover:bg-white/5 transition-colors rounded-default relative">
        <span class="material-symbols-outlined">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
      </button>
      <div @click="handleNotImplemented('Profile Settings')" class="ml-2 pl-4 border-l border-white/10 hidden md:block cursor-pointer hover:opacity-80 transition-opacity">
        <img alt="Profile" class="w-8 h-8 rounded-default border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwbNsUtQOAfv2h23MqjCcGMGxY_fKBBbB__zt4oF8XfGqD560f9d7OW6xv0-ws2P3nMnRiifB6MKzzZjqlSgkoL7dn1nvlGkvzMeNqpM3YY4gBmr-VLMqWP-C-RbJX3QZHHAsTuoQfTtwixAHE1Hgqpm1iL55QpY57JkrXAlwGsG_ec8-mfHRxTzPu6fDmj7A9Wbj5XEo6x4vQGXtjlgHTkJ8XZUOXC5JyXpuPNgAIbvSVCUdOrwCSQOyx7ODusDGR-b1JuePr1e4"/>
      </div>
    </div>
  </header>
</template>
