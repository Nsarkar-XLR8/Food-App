# CulinaryHub (Food App)

A modern, mobile-responsive, industry-grade recipe platform built with **React**, **Vite**, **Lucide Icons**, and the **Spoonacular API**.

![CulinaryHub Banner](https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80)

## 🌟 Key Features

- **📱 Mobile-First Responsive Design**: Optimized layouts with bottom navigation tabs, slide-over recipe drawer on mobile, and smooth touch targets.
- **⚡ Smart Debounced Search**: 300ms live debounced search prevents API rate-limit exhaustion.
- **🥗 Filter by Diet & Cuisine**: Filter recipes by Vegetarian, Vegan, Gluten-Free, Ketogenic, Paleo, Italian, Asian, Mexican, Mediterranean, Indian, and more.
- **⚖️ Dynamic Servings Scaler**: Automatically recalculates ingredient quantities when scaling servings up or down.
- **📏 US Imperial vs Metric Converter**: Instant toggle between Metric (grams, ml) and US Customary (cups, oz) measurements.
- **🛒 Grocery Shopping Checklist**: Save ingredients across recipes into a personal interactive shopping list (persisted in `localStorage`).
- **⏱️ Built-in Kitchen Cooking Timer**: Interactive countdown timer with chime notification to time baking and simmering steps.
- **📊 Nutritional Breakdown & Allergen Alerts**: Macro breakdown (Calories, Carbs, Protein, Fat), Health Score, and allergen warning badges.
- **❤️ Persisted Favorites**: Save recipes to your personal cookbook (persisted in `localStorage`).
- **🤹 "What Should I Eat?" Randomizer**: One-tap quick recipe generator for undecided foodies.
- **🛡️ Resilient Offline Fallback Engine**: Automatic fallback to rich offline mock datasets when Spoonacular API limit (150 calls/day) is reached or network is unavailable.
- **🌙 Dark & Light Theme**: Built-in sleek dark mode toggle with CSS custom properties.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Vanilla CSS Variables, Modular Design Tokens, Glassmorphism
- **Icons**: Lucide React
- **API**: Spoonacular API with Mock Data Resilience Layer

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Navigate to the `food app` directory:
   ```bash
   cd "food app"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `food app/`:
   ```env
   VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`.

---

## 📄 License
This project is licensed under the MIT License.
