<script setup lang="ts">



</script>

<template>
  <section class="widget-glass rounded-lg p-widget-padding flex flex-col gap-4">
    <h2 class="font-label-caps text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">System Health</h2>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1 border border-white/5 p-3 rounded-lg bg-surface/50">
        <span class="font-label-caps text-[10px] text-on-surface-variant font-bold">LATENCY</span>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.8)]"></div>
          <span class="font-data-tabular text-[13px] text-on-surface font-medium">12ms</span>
        </div>
      </div>
      
      <div class="flex flex-col gap-1 border border-white/5 p-3 rounded-lg bg-surface/50">
        <span class="font-label-caps text-[10px] text-on-surface-variant font-bold">API STATUS</span>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.8)]"></div>
          <span class="font-data-tabular text-[13px] text-on-surface font-medium">99.9%</span>
        </div>
      </div>
    </div>
  </section>
</template>
