<script setup lang="ts">
const alerts = [
  { id: 1, type: 'CRITICAL', title: 'LATENCY SPIKE', message: 'Mainnet nodes showing 450ms+ delay', time: 'JUST NOW', status: 'active' },
  { id: 2, type: 'WARNING', title: 'CAPACITY', message: 'Storage Cluster B at 88% utilization', time: '12M AGO', status: 'pending' },
  { id: 3, type: 'SECURITY', title: 'FIREWALL', message: 'IP 192.168.1.104 blocked after 3 attempts', time: '1H AGO', status: 'resolved' }
];
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
