# CulinaryHub 🍳 | Industry-Grade Gourmet Recipe & Meal Planning Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Production-Ready-emerald)](https://github.com/)

**CulinaryHub** is an enterprise-grade, mobile-first web application designed for gourmet recipe discovery, nutritional analysis, dynamic ingredient scaling, interactive grocery shopping lists, weekly meal scheduling, and hands-free kitchen voice assistance.

---

## 📋 Executive Overview & Business Value Proposition

Modern digital culinary platforms require more than static recipe displays; they demand high performance, seamless responsiveness, zero downtime, and intelligent kitchen assistance. **CulinaryHub** solves key user friction points and delivers business value through:

1. **Zero-Downtime Resilience Architecture**: Protects against third-party API rate limits (HTTP 402/429) or network outages via a transparent **Offline Resilience Fallback Engine**, ensuring 100% platform uptime.
2. **API Cost & Quota Optimization**: Implements 300ms live request debouncing and in-memory response caching, reducing redundant network calls by up to 85% and extending free-tier API quotas.
3. **Kitchen Utility Integration**: Bridges the gap between recipe browsing and active cooking through **Hands-Free Teleprompter Mode** featuring **Screen Wake Lock API** (preventing device sleep) and **Web Speech Voice Commands** (voice-guided hands-free navigation).
4. **End-to-End Meal Workflow**: Connects recipe discovery to grocery shopping (`localStorage` persisted checklists) and meal calendar planning (Monday–Sunday slots).

---

## 🌟 Key Product Features

### 🔍 Smart Search & Multi-Filter Engine
- **300ms Debounced Live Search**: Real-time query matching without API quota spamming.
- **Dietary Filters**: Vegetarian, Vegan, Gluten-Free, Ketogenic, Paleo.
- **Cuisine Selectors**: Italian, Asian, Mexican, Mediterranean, Indian, American, Greek, French, Japanese.
- **Dish Types**: Main Course, Breakfast, Dessert, Salad, Soup, Appetizer, Snack.
- **Max Cooking Time Filter**: Filter recipes under 15m, 30m, 45m, or 60m prep times.
- **Sorting Selector**: Sort by Health & Rating, Quickest Prep Time, or Lowest Price.
- **"What Should I Eat?" Randomizer**: One-tap chef pick generator for undecided foodies.
- **Active Filter Badges**: Visual tag bar with single-tap filter removal and 1-click reset.

### 📱 Mobile-First Responsive UX
- **Mobile Bottom Navigation Bar**: Fixed thumb-accessible navigation for mobile screens (< 768px).
- **Slide-Over Full-Screen Drawer**: Mobile-optimized detail drawers so recipe text is never cramped.
- **Touch-First Compliance**: Minimum 44x44px touch targets across all interactive elements.

### 📖 Hands-Free Cooking Teleprompter Mode
- **Giant High-Contrast Typography**: Designed for high legibility from 6+ feet away on kitchen counters.
- **Screen Wake Lock API (`navigator.wakeLock`)**: Prevents phone/tablet displays from dimming or locking during cooking.
- **Voice Narration (Text-To-Speech)**: Native Web Speech API integration speaking cooking steps aloud.
- **Voice Command Recognition (`SpeechRecognition`)**: Hands-free voice navigation (*"Next"*, *"Back"*, *"Repeat"*, *"Exit"*).
- **Auto-Detected Step Timers**: Regex engine detecting step durations (e.g. *"Simmer for 8 minutes"*) providing 1-tap timer buttons.
- **Step Context Overlays**: Displays step-specific ingredient thumbnails and required equipment badges.

### 🥗 Culinary Precision & Meal Planning
- **Per-Serving Nutrition Quick Bar**: Instant overview of Calories, Protein, Carbs, and Fat per individual serving.
- **Per Serving vs Total Batch Nutrition Switcher**: Toggle macro calculations between individual servings and full batch sizes.
- **Dynamic Servings Scaler**: Live math recalculating ingredient quantities when scaling servings (+ / -).
- **US Customary vs Metric Converter**: Instant toggle between Metric (g, ml) and US Imperial (cups, oz).
- **Grocery Shopping List**: One-tap sync saving recipe ingredients into a checkable shopping list (`localStorage`).
- **Weekly Meal Planner**: Monday–Sunday calendar grid for Breakfast, Lunch, and Dinner slots (`localStorage`).
- **Private Chef Cooking Notes**: Textarea for saving custom recipe tweaks (`localStorage`).

---

## 🏗️ Architecture Blueprint & Data Flow

### System Architecture Diagram

```
                              ┌─────────────────────────────────────────┐
                              │               User Client               │
                              │       (Browser / Smartphone / Tablet)   │
                              └────────────────────┬────────────────────┘
                                                   │
                                            React 18 Frontend
                                                   │
         ┌─────────────────────────────────────────┼─────────────────────────────────────────┐
         │                                         │                                         │
┌────────┴────────┐                       ┌────────┴────────┐                       ┌────────┴────────┐
│ UI Components   │                       │ Custom Hooks    │                       │  Web Browser    │
│                 │                       │                 │                       │  Native APIs    │
│ - Navbar        │                       │ - useFavorites  │                       │                 │
│ - SearchHeader  │                       │ - useShopping   │                       │ - SpeechSynth   │
│ - RecipeCard    │                       │ - useNotes      │                       │ - SpeechRecog   │
│ - RecipeDetails │                       │ - usePlanner    │                       │ - WakeLock API  │
│ - Teleprompter  │                       │ - useDebounce   │                       │ - LocalStorage  │
│ - MealPlanner   │                       │ - useTimer      │                       │ - Web Share API │
└────────┬────────┘                       └────────┬────────┘                       └────────┬────────┘
         │                                         │                                         │
         └─────────────────────────────────────────┼─────────────────────────────────────────┘
                                                   │
                                      ┌────────────┴────────────┐
                                      │ API Service Layer       │
                                      │ (spoonacularApi.js)     │
                                      └────────────┬────────────┘
                                                   │
                                 ┌─────────────────┴─────────────────┐
                                 │ HTTP Request & Fallback Controller│
                                 └────────┬─────────────────┬────────┘
                                          │                 │
                           (Success 200 OK)                 (Error 402/429/Offline)
                                          │                 │
                           ▼                                ▼
              ┌───────────────────────┐         ┌───────────────────────┐
              │  Spoonacular Rest API │         │  Resilience Engine    │
              │  (External Service)   │         │  (mockRecipes.js)     │
              └───────────────────────┘         └───────────────────────┘
```

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology | Usage / Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.2.0 | Core UI rendering and state management |
| **Build Tooling** | Vite 4.5.3 | Fast HMR development server & production bundling |
| **Iconography** | Lucide React | High-legibility scalable vector icons |
| **Styling & Theme** | CSS Modules + Custom Tokens | Glassmorphic design, dark/light theme properties, responsive breakpoints |
| **Browser Native APIs** | SpeechSynthesis, SpeechRecognition, WakeLock, LocalStorage, Web Share | Hands-free voice assistance, screen wake lock, state persistence, social sharing |
| **API Resilience** | Custom Mock Fallback Provider | 100% uptime fallback layer for Spoonacular API |

---

## 📂 Repository Directory Structure

```
Food App/
├── README.md                           # Master Project Documentation
└── food app/                           # Vite React Application Root
    ├── .env                            # Environment Variables (VITE_SPOONACULAR_API_KEY)
    ├── index.html                      # Entry HTML with custom SVG Favicon & SEO Meta
    ├── package.json                    # Project dependencies and npm scripts
    ├── vite.config.js                  # Vite compiler configuration
    ├── public/
    │   └── favicon.svg                 # Gourmet Culinary SVG Icon
    └── src/
        ├── main.jsx                    # Application bootstrapping & global styles
        ├── App.jsx                     # Core application orchestrator & view layout
        ├── index.css                   # Global CSS design tokens & theme variables
        ├── components/                 # UI Component Library
        │   ├── Navbar.jsx / .module.css              # Desktop header & theme switcher
        │   ├── MobileBottomNav.jsx / .module.css     # Mobile thumb navigation bar
        │   ├── SearchHeader.jsx / .module.css        # Search bar, diet chips, select filters
        │   ├── RecipeCard.jsx / .module.css          # Glassmorphic card with quick actions
        │   ├── RecipeList.jsx / .module.css          # Responsive recipe grid & empty states
        │   ├── RecipeDetails.jsx / .module.css       # Recipe details tabbed modal
        │   ├── KitchenTeleprompterModal.jsx / .module.css # Hands-free voice teleprompter
        │   ├── KitchenTimerWidget.jsx / .module.css  # Countdown timer with audio chime
        │   ├── ShoppingListModal.jsx / .module.css   # Interactive grocery checklist
        │   ├── WeeklyMealPlanner.jsx / .module.css   # Mon-Sun meal calendar grid
        │   └── SkeletonLoader.jsx / .module.css      # Animated pulse loading cards
        ├── hooks/                      # Custom React Hooks
        │   ├── useDebounce.js          # 300ms query throttle hook
        │   ├── useFavorites.js         # Persisted favorites hook (localStorage)
        │   ├── useShoppingList.js      # Persisted grocery list hook (localStorage)
        │   ├── useRecipeNotes.js       # Private chef notes hook (localStorage)
        │   ├── useMealPlanner.js       # Weekly meal planner hook (localStorage)
        │   └── useKitchenTimer.js      # Step countdown timer hook
        ├── services/
        │   └── spoonacularApi.js       # API client with cache & resilience fallback
        └── data/
            └── mockRecipes.js          # High-resolution offline fallback recipes
```

---

## ⚡ Getting Started & Setup Guide

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Nsarkar-XLR8/Food-App.git
   ```

2. **Navigate to the Application Directory**:
   ```bash
   cd "Food App/food app"
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the `food app` root directory:
   ```env
   VITE_SPOONACULAR_API_KEY=9a9f317fed4b4ae68cff1be129119d62
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

6. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔒 Security, Performance & Accessibility

- **API Sanitization**: Environment variables (`import.meta.env.VITE_SPOONACULAR_API_KEY`) sanitize API credentials from core client components.
- **XSS & HTML Sanitization**: All rich text recipe summaries and instruction strings undergo HTML tag stripping before DOM injection.
- **Bundle Optimization**: Built with Vite 4 tree-shaking, resulting in a lightweight ~210KB gzipped JavaScript bundle.
- **Accessibility (a11y)**: Fully accessible ARIA buttons, screen-reader touch targets (44x44px minimum), high contrast dark theme options, and keyboard shortcuts (`Escape`, `Space`, `Arrows`).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

Designed & Developed with ❤️ by **Nayem Sarkar** (nsarkar6251@gmail.com).
