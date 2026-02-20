# macOS Desktop Simulation - Features Guide

## Visual Components

### 1. Menu Bar (Top)
```
┌─────────────────────────────────────────────────────────────┐
│  StaffCo  File  Edit  View  Window  Help    🔋 📶  12:34 PM │
└─────────────────────────────────────────────────────────────┘
```
- Frosted glass with backdrop blur
- Live clock that updates every second
- Apple logo, app menus, system icons

### 2. Desktop Wallpaper
- **Light Mode**: Purple → Pink → Blue gradient
- **Dark Mode**: Navy → Dark Blue gradient
- Radial gradient overlays for depth
- Subtle noise texture

### 3. StaffCo App Window
```
┌─────────────────────────────────────────────┐
│ 🔴 🟡 🟢              StaffCo               │
├─────────────────────────────────────────────┤
│  [Logo] StaffCo    📤 💬 ⚙️ [HI]          │
├─────────────────────────────────────────────┤
│                                             │
│  [Content: Login/Tasks/Settings]            │
│                                             │
├─────────────────────────────────────────────┤
│  v1.0.3                   Open Dashboard →  │
└─────────────────────────────────────────────┘
```

### 4. Dock (Bottom)
```
┌──────────────────────────────────────────┐
│  📁 ✉️ 📅 💬 🌐 🎵 [StaffCo]          │
└──────────────────────────────────────────┘
```
- Frosted glass container
- 7 app icons with colors
- Hover: Icons scale up to 1.5x
- Magnification effect spreads to neighbors
- StaffCo icon: Blue → Green gradient

## Screen Layouts

### Login Screen
```
┌─ StaffCo Logo ─────────────────────────┐

       Welcome to StaffCo
       Enter your email and password to continue.

       Email
       [____________________________]

       Password
       [____________________________]

       □ Remember me    Forgot Password?

       [    Sign in    ]

       ─── Or login with ───

       [ Google ]  [ Github ]

       Don't have an account? Register

       v1.0.3          Open Dashboard →
└────────────────────────────────────────┘
```

### Tasks Screen (with active task)
```
┌─ Header: StaffCo Logo │ 📤 💬 ⚙️ [HI] ─┐

╔════════════════════════════════════════╗
║ Active task                            ║
║ Fix login redirect issue               ║
║ • StaffCo  CG     03:03:03  [⏸]       ║
║                   Total: 4:35:12       ║
╚════════════════════════════════════════╝

[Recent Tasks]  Projects

🔍 Search by task
[_________________________________]

⭐ Fix login redirect issue
   • StaffCo  CG          1:21:53  [▶]

⭐ Design landing page v2
   • Maverick  ACA        0:20:12  [▶]

⭐ Implement dark mode toggle
   • Sigma  ACAGC         1:43:38  [▶]

v1.0.3                Open Dashboard →
└────────────────────────────────────────┘
```

### Settings Screen
```
┌─ Header: ← Back │ StaffCo │ 📤 💬 ⚙️ [HI] ─┐

       Settings
       Configure how the app works for you

       ┌─ ⚙️ Main ──────────────────────┐
       │                                 │
       │ Launch at Start              ◉ │
       │ Automatically start the app...  │
       │                                 │
       │ Always-On Timer              ◉ │
       │ A small floating timer...       │
       │                                 │
       │ Dark Mode                    ◉ │
       │ Use dark theme across the app   │
       │                                 │
       └─────────────────────────────────┘

       v1.0.3          Open Dashboard →
└────────────────────────────────────────┘
```

## Interactions

### Dock Hover Animation
```
Normal:  📁 ✉️ 📅 💬 🌐 🎵 🔵
         ↓
Hover:   📁 ✉️ 📅 💬💬💬 🌐 🎵 🔵
                  ↑↑↑
              (scaled 1.5x)
```

### Dark Mode Toggle
**Before (Light):**
- Wallpaper: Purple/Pink/Blue gradient
- Window: White background
- Text: Dark gray

**After (Dark):**
- Wallpaper: Navy/Dark Blue gradient
- Window: Dark gray background
- Text: Light gray

### Timer States
**Stopped:**  03:03:03  [▶ Play]
**Running:**  03:03:03  [⏸ Pause] (in green)

## Technical Details

### Component Tree
```
App
└── Desktop
    ├── Wallpaper (dynamic gradient)
    ├── MenuBar (with live clock)
    ├── MacWindow
    │   ├── StaffCoHeader
    │   └── [LoginScreen | TasksScreen | SettingsScreen]
    └── Dock (with hover effects)
```

### State Management
- Theme: Context API + localStorage
- Navigation: useState in App.jsx
- Timer: Local state in TasksScreen
- Settings toggles: Local state

### Animations
- Window: Fade in + scale on mount
- Screen transitions: Fade crossfade
- Dock icons: Spring physics (stiffness: 400)
- Buttons: Scale on hover/tap

## Color Palette

### Light Mode
- Background: #FFFFFF
- Text Primary: #111827
- Text Secondary: #6B7280
- Border: #E5E7EB
- Accent: #3B82F6 (blue)

### Dark Mode
- Background: #111827
- Text Primary: #F9FAFB
- Text Secondary: #9CA3AF
- Border: #374151
- Accent: #3B82F6 (blue)

### Brand Colors
- Logo Gradient: #3B82F6 → #10B981
- Active Timer: #10B981 (green)
- Project Badges: Various (per project)

## Performance

- Production bundle: 288 KB (92 KB gzipped)
- Animation frame rate: 60 FPS
- Clock updates: Every 1000ms
- Theme persistence: Instant (localStorage)

## Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
⚠️ Best viewed at 1920x1080 or higher

## Keyboard Shortcuts (Future)

- `Cmd + ,` → Settings
- `Cmd + N` → New Task
- `Space` → Play/Pause timer
- `Cmd + D` → Toggle Dark Mode
