<script setup lang="ts">
import { useBreakpoint } from './composables/useBreakpoint';
import MobileView from './views/mobile/MobileDashboard.vue';
import TabletView from './views/tablet/TabletDashboard.vue';
import DesktopView from './views/desktop/DesktopDashboard.vue';
import ToastContainer from './components/ui/ToastContainer.vue';
import { useStreamSubscription } from './composables/useStreamSubscription';
import { useUIStore } from './store';
import { onMounted } from 'vue';

const { isMobile, isTablet } = useBreakpoint();
const uiStore = useUIStore();

// Initialize the data stream and theme
onMounted(() => {
  uiStore.updateDocumentTheme();
});
useStreamSubscription();
</script>

<template>
  <div class="min-h-screen w-full bg-background text-on-surface">
    <ToastContainer />
    <MobileView v-if="isMobile" />
    <TabletView v-else-if="isTablet" />
    <DesktopView v-else />
  </div>
</template>
