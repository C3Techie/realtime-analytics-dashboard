# 🚀 C3Tchie Nexus - Real-Time Analytics Dashboard

A high-performance, production-grade real-time monitoring terminal built for HNG Stage 5A. C3Tchie Nexus visualizes high-frequency streaming data with sub-second latency, robust state management, and a premium "Quantum Terminal" aesthetic.

## 🎯 Project Objective
To demonstrate frontend engineering maturity through the implementation of a scalable real-time visualization platform that remains performant under continuous data ingestion.

## 🛠️ Technical Stack
- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS 4 (Custom Design Tokens)
- **State Management:** Pinia
- **Visualizations:** ECharts (via vue-echarts)
- **Build Tool:** Vite

## 🏗️ Architecture Explanation
The project follows a clean, unidirectional data flow architecture:
1. **Service Layer (`StreamService.ts`):** Resilient streaming engine that connects to the **Binance WebSocket API** (`wss://data-stream.binance.vision`). It handles real-time ticker data, reconnection logic with exponential backoff, and provides a fallback simulation if the primary stream is unreachable.
2. **Composable Layer (`useStreamSubscription.ts`):** Orchestrates the connection between the service and the store. Implements **High-Frequency Update Batching** (4Hz) to reduce reactive overhead.
3. **State Layer (Pinia):** Centralized hub for metrics, market data, and activity logs. Optimized for high-frequency time-series data with a 1,000-point circular buffer per asset to ensure smooth historical trends.
4. **Component Layer:** Reusable, theme-aware ECharts wrappers and high-density KPI cards that react instantly to state changes.

## 🕹️ Interactive Features
- **Asset Terminal:** Toggle between BTC, ETH, SOL, and BNB with real-time price synchronization and color-coded visuals.
- **Time-Range Filtering:** Switch between 1m, 5m, 1h, and LIVE views for historical market analysis.
- **Node Cluster Telemetry:** A 60-node real-time heatmap simulating backend cluster health with instant status updates.
- **Security Protocols:** Interactive "View All Protocols" action protected by a theme-aware toast notification system (simulating permission-based access).
- **Log Management:** Real-time Activity Feed with severity-based filtering (Info, Warn, Error).

## ⚡ Performance Optimizations
- **Metric Batching:** Instead of updating the UI on every message, updates are batched into 250ms cycles (4Hz) to prevent UI thread choking while maintaining a "live" feel.
- **Data Buffering:** Uses a 1,000-point window for market data history, balanced across multiple assets to maintain memory efficiency.
- **Chart Throttling:** ECharts animations are disabled for real-time series to ensure frame stability during rapid data shifts.
- **Hex Color Mapping:** Dynamic resolution of CSS variables to hex codes for ECharts gradients, preventing canvas rendering crashes.

## 📡 Data Streaming Strategy
- **Real-Time API:** Consumes live market data from Binance for major pairs (BTC, ETH, SOL, BNB).
- **Hybrid Streaming:** Implements a hybrid approach where real-time market data is merged with simulated system telemetry (Node health, logs) to create a comprehensive "alive" dashboard.
- **Resilience:** Built-in connection monitoring with a 5-step exponential backoff retry strategy and seamless fallback to simulated data during API outages.

## 📱 Responsive Strategy
The system uses a custom responsive engine via the `useBreakpoint` composable to handle layout shifts dynamically:
- **Desktop:** Full 12-column grid with a collapsible rail sidebar.
- **Tablet:** Hybrid grid optimized for information density.
- **Mobile:** Vertical stack with a gesture-friendly bottom navigation bar.

## 🚀 Setup Instructions
1. **Clone the repo:**
   ```bash
   git clone [repository-url]
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Run development server:**
   ```bash
   pnpm dev
   ```
4. **Build for production:**
   ```bash
   pnpm build
   ```

## ⚖️ Trade-offs & Decisions
- **ECharts vs D3:** Chose ECharts for its superior out-of-the-box performance with large datasets and built-in Canvas/SVG rendering flexibility.
- **Binance API vs Custom Backend:** Utilized the public Binance WebSocket API to demonstrate high-frequency data handling, while simulating system-specific metrics (Node Cluster Health) to provide a complete "Command Center" experience.
- **Color Logic:** Implemented a custom hex-resolver for CSS variables to ensure ECharts compatibility with modern CSS design systems.
