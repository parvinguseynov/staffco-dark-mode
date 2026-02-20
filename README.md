# StaffCo - macOS Desktop Simulation

A pixel-perfect macOS desktop simulation built exactly to specification. The entire browser viewport becomes a Mac desktop with StaffCo app running inside.

**Built for stakeholder demos** - looks like a real macOS screenshot.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:5173
```

The entire viewport transforms into macOS - no browser UI visible!

## Features

### Full macOS Environment

- **Menu Bar** - Live clock, Apple logo, app menus, system icons
- **Wallpaper** - Beautiful gradients that change with theme
- **Dock** - Frosted glass with realistic magnification on hover
- **Window** - Traffic lights, shadows, spring animations

### StaffCo App (5 Screens)

1. **Tasks** - Active task timer, task list, search
2. **Projects** - Project grid view
3. **Settings** - Theme toggle, app preferences
4. **Login** - Email/password + OAuth
5. **Company Selector** - Multi-company support

### Interactive Features

- **Dock Magnification** - Hover over icons like real macOS
- **Live Clock** - Updates every minute in menu bar
- **Dark/Light Mode** - Toggle in settings, persists on refresh
- **Smooth Animations** - Framer Motion throughout
- **Theme Persistence** - LocalStorage integration

## Tech Stack

- React 18.3.1
- Vite 7.3.1
- Tailwind CSS 3.4.17
- Framer Motion 11.0.0
- lucide-react 0.344.0

## Project Structure

Built following exact specification in `SPEC.md`:

```
src/
├── components/
│   ├── macos/           # Desktop shell (MenuBar, Dock, Desktop)
│   ├── window/          # App window (Traffic lights, frame)
│   ├── app/             # App components (Header, Footer)
│   ├── screens/         # All 5 screens
│   └── ui/              # Reusable components
├── context/             # Theme management
├── theme/               # Color definitions
└── App.jsx              # Main orchestration
```

## Navigation Flow

```
Login Screen
    ↓ (Sign in)
Company Selector
    ↓ (Select company)
Tasks Screen ⟷ Settings Screen
    ↓               ↑
Projects Tab    (Back button)
```

## Color System

### Dark Mode (default)
- Desktop: Deep blue gradient
- App: Slate grays (#0F172A, #1E293B, #334155)
- Accents: Blue (#60A5FA), Green (#34D399), Red (#F87171)

### Light Mode
- Desktop: Pastel gradient (blue → pink)
- App: Whites and light grays
- Accents: Brighter versions

Toggle theme in: Settings → Appearance → Sun/Moon icons

## Key Interactions

1. **Hover dock icons** - Watch them scale up with spring physics
2. **Click settings icon** - Navigate to settings screen
3. **Toggle dark mode** - In settings, click Sun/Moon
4. **Watch live clock** - Menu bar updates every minute
5. **Click back button** - From settings to tasks

## Build for Production

```bash
npm run build
npm run preview
```

Output:
- 285 KB JavaScript (91 KB gzipped)
- 23 KB CSS (4.6 KB gzipped)
- Builds in ~1 second

## Development Notes

- Window is 420px wide (as per spec)
- Menu bar is 28px tall
- All colors from `src/theme/colors.js`
- Theme state in `ThemeContext`
- Navigation in `App.jsx`
- No React Router needed (state-based navigation)

## What Makes This Special

- **Pixel-perfect** - Matches SPEC.md exactly
- **Full immersion** - Entire viewport is the desktop
- **Production-ready** - Clean code, optimized build
- **Smooth 60fps** - All animations buttery smooth
- **Theme system** - Complete dark/light support
- **macOS authenticity** - Frosted glass, traffic lights, dock magnification

Perfect for:
- Stakeholder presentations
- Portfolio showcases
- Desktop app prototypes
- Design demonstrations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Best viewed at 1920x1080 or higher.

---

**Built with precision. Ready for demo.** 🎯
