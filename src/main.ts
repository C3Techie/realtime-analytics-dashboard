import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/global.css';

// ECharts Imports
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart, PictorialBarChart, HeatmapChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent
} from 'echarts/components';

// Register ECharts modules
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PictorialBarChart,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent
]);

const app = createApp(App);
const pinia = createPinia();

app.component('VChart', ECharts);
app.use(pinia);
app.mount('#app');
