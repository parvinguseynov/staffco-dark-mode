# Quick Start Guide

## 🚀 Run the macOS Desktop Simulation

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit: http://localhost:5173
```

## 🎯 What You'll See

### First Screen: Login
The browser will show a **complete macOS desktop**:
- Menu bar at the top with live clock
- Beautiful gradient wallpaper
- StaffCo window in the center showing login screen
- Dock at the bottom with app icons

### Try This:
1. **Hover over dock icons** → They'll scale up with smooth animation
2. **Click "Sign in" or OAuth buttons** → Go to tasks screen
3. **Play with the live clock** → Updates every second

### Second Screen: Tasks
After logging in, you'll see:
- Active task banner with large timer (03:03:03)
- List of tasks with play/pause buttons
- Search functionality
- Project badges and team avatars

### Try This:
1. **Click play/pause on tasks** → Start/stop timer
2. **Click settings icon** (⚙️) → Go to settings
3. **Watch the timer** → See live counting

### Third Screen: Settings
In settings, you can:
- Toggle Launch at Start
- Toggle Always-On Timer
- **Toggle Dark Mode** → Watch entire desktop change!

### Try This:
1. **Toggle Dark Mode** → Wallpaper gradient changes
2. **Click "Back"** → Return to tasks
3. **Test theme persistence** → Refresh page, theme stays

## 🎨 Theme Toggle Demo

**Light Mode:**
- Wallpaper: Purple → Pink → Blue gradient
- Window: White background
- Dock: Light frosted glass

**Dark Mode:**
- Wallpaper: Navy → Dark Blue gradient
- Window: Dark gray background
- Dock: Dark frosted glass

## 🖱️ Interactive Elements

### Menu Bar
- Live clock (updates every second)
- Shows: "Thu Feb 20  12:34 PM" format

### Dock
- Hover over icons to see magnification
- Click StaffCo icon (just visual, not functional yet)
- Tooltip appears on hover

### Window
- Traffic lights are just visual (red, yellow, green)
- Window is centered and shadowed
- Smooth fade-in animation on load

### App Features
- ✅ Login form with validation
- ✅ Task timer play/pause
- ✅ Dark mode toggle (persists!)
- ✅ Smooth screen transitions
- ✅ Search tasks
- ✅ Settings toggles

## 📱 Navigation Flow

```
Login Screen
    ↓ (click Sign in)
Tasks Screen ⟷ Settings Screen
    ↑             ↓
    └─── (Back) ──┘
```

## 🎯 Key Shortcuts to Try

1. **Test Live Clock**: Wait and watch the menu bar
2. **Test Dock Hover**: Move mouse over dock icons slowly
3. **Test Dark Mode**: Go to Settings → Toggle Dark Mode
4. **Test Timer**: Click play/pause on any task
5. **Test Persistence**: Toggle dark mode → Refresh page → Still dark!

## 🏗️ Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview

# Visit: http://localhost:4173
```

Production build creates:
- Minified JavaScript (92 KB gzipped)
- Optimized CSS (5.36 KB gzipped)
- Ready to deploy anywhere

## 🐛 Troubleshooting

**Issue**: Dev server won't start
```bash
# Kill any existing Vite processes
pkill -f vite
# Try again
npm run dev
```

**Issue**: Styles look broken
```bash
# Rebuild Tailwind
npm run build
npm run dev
```

**Issue**: Dark mode doesn't work
- Check browser console for errors
- Try clearing localStorage: `localStorage.clear()`
- Refresh the page

## 📸 Screenshot Checklist

Perfect for screenshots/demos:
- ✅ Full screen mode (F11)
- ✅ Window size: 1920x1080 or higher
- ✅ Toggle to light mode for colorful wallpaper
- ✅ Go to Tasks screen with active timer
- ✅ Hover over dock for magnification effect

## 🎬 Demo Script

**1. Show Desktop Environment** (5 sec)
"This is a complete macOS desktop simulation in the browser"

**2. Show Dock Hover** (5 sec)
*Move mouse over dock icons*
"Notice the realistic magnification effect"

**3. Show Live Clock** (5 sec)
*Point to menu bar*
"The clock updates in real-time"

**4. Show Login** (10 sec)
"Here's the StaffCo app login screen"
*Click Sign in*

**5. Show Tasks** (15 sec)
"Active task timer, task list, play/pause controls"
*Click play on a task*

**6. Show Dark Mode** (10 sec)
*Go to Settings → Toggle Dark Mode*
"Watch the entire desktop transform"

**7. Show Persistence** (5 sec)
*Refresh page*
"Theme persists across page loads"

Total demo time: ~55 seconds

## 🚢 Deployment

Deploy to any static host:

**Vercel:**
```bash
npm run build
vercel --prod
```

**Netlify:**
```bash
npm run build
# Drag dist/ folder to Netlify
```

**GitHub Pages:**
```bash
npm run build
# Copy dist/ to gh-pages branch
```

## 📚 Next Steps

Want to extend this?
1. Add more screens (Projects, Company Selector)
2. Add keyboard shortcuts
3. Make window draggable
4. Add desktop icons
5. Multiple windows support
6. Wrap in Electron for native app

---

**Enjoy your macOS desktop simulation!** 🎉
