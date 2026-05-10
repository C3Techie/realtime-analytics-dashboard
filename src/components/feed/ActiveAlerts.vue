<script setup lang="ts">
const alerts = [
  { id: '1', type: 'error', title: 'Critical DB Latency', message: 'Cluster A read times > 500ms', icon: 'warning' },
  { id: '2', type: 'warning', title: 'API Rate Limit Nearing', message: 'Binance endpoint at 85% capacity', icon: 'priority_high' }
];
</script>

<template>
  <div class="widget-glass rounded-lg p-widget-padding flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h3 class="font-headline-md text-[20px] font-bold text-on-surface flex items-center gap-2">
        Active Alerts
        <span class="bg-error text-on-error font-label-caps text-[11px] font-bold px-2 py-0.5 rounded-full">2</span>
      </h3>
    </div>

    <div class="space-y-2">
      <div 
        v-for="alert in alerts" 
        :key="alert.id"
        class="flex items-center justify-between p-3 rounded-default border"
        :class="{
          'bg-error/10 border-error/30 text-error': alert.type === 'error',
          'bg-tertiary/10 border-tertiary/30 text-tertiary': alert.type === 'warning'
        }"
      >
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined">{{ alert.icon }}</span>
          <div>
            <div class="font-body-base text-[14px] font-bold">{{ alert.title }}</div>
            <div class="font-data-tabular text-[12px] opacity-80">{{ alert.message }}</div>
          </div>
        </div>
        <button class="opacity-60 hover:opacity-100 transition-opacity">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  </div>
</template>
