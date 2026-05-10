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
1. **Service Layer (`StreamService.ts`):** Isolated mock streaming engine that simulates WebSocket/SSE traffic. It handles reconnection logic, exponential backoff, and payload validation.
2. **Composable Layer (`useStreamSubscription.ts`):** Orchestrates the connection between the service and the store. Implements **Update Batching** to reduce reactive overhead.
3. **State Layer (Pinia):** Centralized hub for metrics, market data, and activity logs. Uses `shallowRef` for high-frequency time-series data to optimize memory usage.
4. **Component Layer:** Reusable, theme-aware ECharts wrappers and high-density KPI cards.

## ⚡ Performance Optimizations
- **Metric Batching:** Instead of updating the UI on every message, updates are batched into 250ms cycles (4Hz) to prevent UI thread choking while maintaining a "live" feel.
- **Reactivity Tuning:** Used `shallowRef` for large arrays (Market Data) to avoid the overhead of recursive proxying.
- **Chart Throttling:** ECharts animations are disabled for real-time series to ensure frame stability during rapid data shifts.
- **Efficient Slicing:** Continuous array slicing ensures that memory usage remains constant regardless of session duration.

## 📡 Data Streaming Strategy
- **Simulation:** A class-based `MockStreamService` broadcasts `StreamPayload` objects.
- **Resilience:** Built-in simulation for connection drops with a 5-step exponential backoff retry strategy.
- **Validation:** Every payload is sanitized and validated against a schema before being accepted into the state.

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
- **Mock Service vs API:** Implemented a sophisticated mock service to guarantee high-frequency "chaos" testing (disconnections, malformed data) which is often harder to simulate with stable public APIs.
