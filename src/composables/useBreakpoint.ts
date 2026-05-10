import { ref, onMounted, onUnmounted } from 'vue';

export function useBreakpoint() {
  const width = ref(window.innerWidth);
  
  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => window.addEventListener('resize', updateWidth));
  onUnmounted(() => window.removeEventListener('resize', updateWidth));

  const isMobile = ref(width.value < 768);
  const isTablet = ref(width.value >= 768 && width.value < 1024);
  const isDesktop = ref(width.value >= 1024);

  // Use watch to update derived refs
  import('vue').then(({ watch }) => {
    watch(width, (newWidth) => {
      isMobile.value = newWidth < 768;
      isTablet.value = newWidth >= 768 && newWidth < 1024;
      isDesktop.value = newWidth >= 1024;
    });
  });

  return { width, isMobile, isTablet, isDesktop };
}
