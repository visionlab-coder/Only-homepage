# Smart Construction 2026 MVP

A premium Next.js platform showcasing the latest trends and global exhibitions in smart construction for 2026.

## 🌟 Features

- 🏗️ **Trends Overview**: Explore 4 key trends in smart construction including AI, robotics, and modular methods
- 🌍 **Global Exhibitions**: Real-time updates on 8+ major exhibitions across USA, Germany, and China
- 🎨 **Premium Design**: Dark theme with glassmorphism, gradient effects, and smooth animations
- 🔍 **Advanced Filtering**: Filter trends by category and exhibitions by category/country
- 📱 **Responsive**: Fully responsive design for all devices
- ⚡ **Fast**: Built with Next.js for optimal performance

## 📊 Key Trends Covered

1. **New Construction Methods (OSC & Modular)** - Advanced precast concrete and factory automation
2. **AI-Based Smart Construction** - Digital twins and AI-driven framework optimization
3. **AI Safety Management** - Predictive safety and real-time monitoring systems
4. **AI-Powered Robot Services** - Automation for rebar tying, concrete pouring, and inspection

## 🌐 Global Exhibitions 2026

- **CES 2026** (Las Vegas, USA) - Jan 6-10
- **World of Concrete** (Las Vegas, USA) - Jan 19-22
- **DigitalBAU 2026** (Munich, Germany) - Mar 24-26
- **Hannover Messe** (Hannover, Germany) - Apr 20-24
- **Central China Smart City Expo** (Wuhan, China) - May 15-17
- **Beijing International AI and Robotics Expo** (Beijing, China) - May 14-16
- **Automate 2026** (Detroit, USA) - June 22-25
- **Shanghai SSHT & SIBT** (Shanghai, China) - Sep 1-3

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Fonts**: Google Fonts (Inter)
- **Architecture**: Pages Router with dynamic routing

## 📁 Project Structure

```
my-construction-2026-mvp/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── SharedUI/
│   │   ├── Button.tsx
│   │   └── Spinner.tsx
│   ├── TrendCard.tsx
│   └── ExhibitionCard.tsx
├── data/
│   ├── trends.ts
│   └── exhibitions.ts
├── interfaces/
│   ├── Trend.ts
│   └── Exhibition.ts
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── exhibitions.tsx
│   └── trends/
│       └── [id].tsx
├── styles/
│   └── globals.css
└── public/
```

## 💡 Features Highlight

### Interactive Filters
- Category-based filtering on trends page
- Dual filters (category + country) on exhibitions page
- Real-time results count

### Premium UI/UX
- Glassmorphism cards with backdrop blur
- Gradient text and buttons
- Hover animations and micro-interactions
- Smooth page transitions
- Dark theme optimized for readability

### SEO Optimized
- Meta tags on all pages
- Semantic HTML structure
- Descriptive titles and descriptions
- Google Fonts preconnect for performance

## 📈 Market Insights

- Global smart construction market: **$15.81 billion by 2026**
- **BIM mandatory** for public projects from 2026
- Focus on **AI-first** construction approaches

## 🛠️ Development

- **Lint**: `npm run lint`
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`

## 📄 License

This project is for educational and demonstration purposes.

---

Built with ❤️ for the future of smart construction
