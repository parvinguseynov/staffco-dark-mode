# StaffCo Desktop App - macOS Simulation Specification

## IMPORTANT: Read this ENTIRE file before writing any code.

This document contains the EXACT specification for building a macOS desktop simulation with the StaffCo app. The result must look like a screenshot of a real Mac running the StaffCo desktop app.

---

## 1. OVERALL LAYOUT

The browser viewport (100vw x 100vh) represents a macOS desktop.

```
┌─────────────────────────────────────────────────────────────────┐
│  Menu Bar (height: 28px, fixed top)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     Desktop Wallpaper                           │
│                     (full background)                           │
│                                                                 │
│              ┌─────────────────────────┐                        │
│              │    StaffCo App Window   │                        │
│              │    (width: 420px)       │                        │
│              │    (centered)           │                        │
│              └─────────────────────────┘                        │
│                                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Dock (height: 70px, centered at bottom, floating above)        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. COLOR SYSTEM

### Dark Mode (default):

```javascript
const darkTheme = {
  // macOS Desktop
  desktop: {
    wallpaper: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)',
    menuBar: 'rgba(22, 22, 30, 0.85)',
    menuBarBorder: 'rgba(255, 255, 255, 0.1)',
    dock: 'rgba(30, 30, 40, 0.75)',
    dockBorder: 'rgba(255, 255, 255, 0.15)',
  },
  
  // StaffCo App
  app: {
    windowBg: '#0F172A',
    cardBg: '#1E293B',
    elevatedBg: '#334155',
    hoverBg: '#3B4963',
    border: '#334155',
    
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#0F172A',
    
    accentBlue: '#60A5FA',
    accentGreen: '#34D399',
    accentRed: '#F87171',
    accentOrange: '#FBBF24',
    accentPurple: '#A78BFA',
    accentPink: '#F472B6',
    accentTeal: '#2DD4BF',
  }
};
```

### Light Mode:

```javascript
const lightTheme = {
  // macOS Desktop
  desktop: {
    wallpaper: 'linear-gradient(145deg, #89CFF0 0%, #a0c4ff 30%, #cdb4db 60%, #ffc8dd 100%)',
    menuBar: 'rgba(255, 255, 255, 0.85)',
    menuBarBorder: 'rgba(0, 0, 0, 0.1)',
    dock: 'rgba(255, 255, 255, 0.75)',
    dockBorder: 'rgba(0, 0, 0, 0.1)',
  },
  
  // StaffCo App
  app: {
    windowBg: '#F8FAFC',
    cardBg: '#FFFFFF',
    elevatedBg: '#F1F5F9',
    hoverBg: '#E2E8F0',
    border: '#E2E8F0',
    
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',
    
    accentBlue: '#3B82F6',
    accentGreen: '#10B981',
    accentRed: '#EF4444',
    accentOrange: '#F59E0B',
    accentPurple: '#8B5CF6',
    accentPink: '#EC4899',
    accentTeal: '#14B8A6',
  }
};
```

---

## 3. MENU BAR SPECIFICATION

Position: Fixed, top: 0, left: 0, right: 0
Height: 28px
Background: Frosted glass (backdrop-filter: blur(20px))

### Left side:
1. Apple logo: "" or use SF Symbol style icon (padding-left: 16px)
2. App name: "StaffCo" (font-weight: 600, font-size: 13px)
3. Menu items: "File", "Edit", "View", "Window", "Help" (font-weight: 400, font-size: 13px, gap: 16px)

### Right side:
1. Control Center icons (simplified): Battery, WiFi, Search
2. Date/Time: "Fri Feb 20 1:40 PM" format (updates live every minute)

Font: -apple-system, SF Pro Text, or Inter
Text color: Dark mode = rgba(255,255,255,0.9), Light mode = rgba(0,0,0,0.85)

---

## 4. DOCK SPECIFICATION

Position: Fixed, bottom: 8px, centered horizontally
Height: 60px (icons) + padding
Background: Frosted glass with rounded corners (border-radius: 16px)
Padding: 4px 8px

### Dock Items (left to right):
1. Finder (blue/white face icon)
2. Safari (compass icon)
3. Messages (green chat bubble)
4. Mail (blue envelope)
5. Calendar (red calendar icon showing current date)
6. Notes (yellow notepad)
7. DIVIDER (thin vertical line, 1px, 50% height)
8. StaffCo App (our logo - gradient square with checkmark) - HAS ACTIVE DOT
9. DIVIDER
10. Trash (gray trash can)

### Dock Icon Behavior:
- Size: 48px x 48px
- On hover: scale(1.4) with transition (transform 0.15s ease-out)
- Adjacent icons also scale slightly: scale(1.15)
- Active app indicator: small white dot below icon (4px diameter)

### Dock Icons (use simple CSS/SVG representations):
```css
/* Example Finder icon */
.finder-icon {
  background: linear-gradient(180deg, #5AC8FA 0%, #007AFF 100%);
  border-radius: 10px;
}

/* StaffCo icon */
.staffco-icon {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%);
  border-radius: 10px;
}
```

---

## 5. APP WINDOW SPECIFICATION

Position: Centered in viewport (use flexbox)
Width: 420px
Min-height: 600px
Background: app.windowBg
Border-radius: 12px
Box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)

### Window Title Bar:
Height: 40px
Background: app.cardBg
Border-bottom: 1px solid app.border
Border-radius: 12px 12px 0 0

Traffic Lights (left side, 12px from left, centered vertically):
- Red: #FF5F57 (close)
- Yellow: #FFBD2E (minimize)  
- Green: #28CA42 (maximize)
- Size: 12px diameter each
- Gap: 8px between them
- On window unfocus: all become #3a3a3c (gray)

Title: "StaffCo" centered, font-size: 13px, font-weight: 500, color: textSecondary

---

## 6. APP SCREENS

### Screen 1: Tasks (Default)

```
┌─────────────────────────────────────┐
│ 🔴🟡🟢         StaffCo              │  <- Title bar
├─────────────────────────────────────┤
│ [Logo] StaffCo     💬  ⚙️  [PH]    │  <- Header
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Active task                     │ │  <- Active Task Card
│ │ TimeOff - New Feature...        │ │     (red/pink gradient bg)
│ │ [• StaffCo]                     │ │
│ │                    00:01:07  🔴 │ │
│ │                    Total: 2h 28m│ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Recent Tasks]  [Projects]          │  <- Tabs
│                                     │
│ 🔍 Search by task      [+ Add task] │  <- Search + Button
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ☆ UX/UI Improvements...         │ │  <- Task List
│ │   [• StaffCo]        ⓘ 00:30:05│ │
│ ├─────────────────────────────────┤ │
│ │ ☆ General - StaffCo             │ │
│ │   [• StaffCo]        ⓘ 00:36:00│ │
│ ├─────────────────────────────────┤ │
│ │ ☆ Meetings & Communication      │ │
│ │   [• StaffCo]        ⓘ 01:21:08│ │
│ ├─────────────────────────────────┤ │
│ │ ☆ TimeOff - New Feature...      │ │
│ │   [• StaffCo]  [00:01:07] ⏸     │ │  <- Active (green badge)
│ └─────────────────────────────────┘ │
│                                     │
│ v2.1.0.2          Open Dashboard ↗  │  <- Footer
└─────────────────────────────────────┘
```

### Active Task Card:
- Background: linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)
- Border: 1px solid rgba(239,68,68,0.2)
- Border-radius: 16px
- Padding: 20px

### Project Badge:
- Background: rgba(52,211,153,0.15) (dark) or rgba(16,185,129,0.1) (light)
- Border: 1px solid rgba(52,211,153,0.3)
- Border-radius: 20px
- Padding: 4px 12px
- Green dot (6px) + "StaffCo" text in green

### Tab Navigation:
- Active tab: textPrimary color, blue bottom border (2px)
- Inactive tab: textMuted color

### Add Task Button:
- Background: accentBlue
- Color: textInverse
- Border-radius: 12px
- Padding: 10px 18px
- Box-shadow: 0 4px 12px rgba(96,165,250,0.3)

### Task List Item:
- Hover background: cardBg (on transparent base)
- Border-radius: 12px
- Padding: 14px 16px
- Star icon (outline) on left
- Task name + project badge
- Info icon + time on right
- Active task: green time badge + red pause bars

---

### Screen 2: Projects Tab

Same layout as Tasks, but list shows projects:

```
│ ┌─────────────────────────────────┐ │
│ │ [S]  StaffCo                    │ │  <- Green square avatar
│ │      54 tasks        ⓘ 02:28:55│ │
│ ├─────────────────────────────────┤ │
│ │ [P]  Paid Time Off (Only HR... │ │  <- Purple square avatar
│ │      3 tasks         ⓘ 00:00:00│ │
│ ├─────────────────────────────────┤ │
│ │ [B]  BP - BitPlay         [T]   │ │  <- Pink avatar + Team badge
│ │      259 tasks       ⓘ 00:00:00│ │
│ └─────────────────────────────────┘ │
```

Project Avatar: 40px, border-radius: 12px, colored background, white initial letter

---

### Screen 3: Settings

```
┌─────────────────────────────────────┐
│ 🔴🟡🟢         StaffCo              │
├─────────────────────────────────────┤
│ ← Back               💬  ⚙️  [PH]  │
├─────────────────────────────────────┤
│                                     │
│ Settings                            │  <- 24px, bold
│ Configure how the app works for you │  <- 14px, secondary
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⚙️ Main                         │ │  <- Section header
│ ├─────────────────────────────────┤ │
│ │ Launch at Startup          [●━] │ │  <- Toggle ON (blue)
│ │ Auto start when computer...     │ │
│ ├─────────────────────────────────┤ │
│ │ Always-On Timer            [●━] │ │  <- Toggle ON
│ │ Small floating timer...         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Appearance                      │ │
│ │ Choose theme       [☀️] [🌙]   │ │  <- Theme toggle
│ └─────────────────────────────────┘ │
│                                     │
│ v2.1.0.2          Open Dashboard ↗  │
└─────────────────────────────────────┘
```

Toggle Switch:
- Width: 44px, Height: 24px
- Border-radius: 12px
- ON: accentBlue background, white circle right
- OFF: elevatedBg background, white circle left
- Transition: 0.2s ease

Theme Toggle:
- Two buttons side by side
- Active: elevatedBg background
- Sun icon for light, Moon icon for dark

---

### Screen 4: Login

```
┌─────────────────────────────────────┐
│ 🔴🟡🟢         StaffCo              │
├─────────────────────────────────────┤
│ [Logo] StaffCo                      │
├─────────────────────────────────────┤
│                                     │
│ Welcome to StaffCo                  │  <- 26px, bold
│ Enter your email and password...    │  <- 14px, secondary
│                                     │
│ Email                               │
│ ┌─────────────────────────────────┐ │
│ │ Enter your email address        │ │  <- Input field
│ └─────────────────────────────────┘ │
│                                     │
│ Password                            │
│ ┌─────────────────────────────────┐ │
│ │ Enter your password         👁  │ │  <- Input + eye icon
│ └─────────────────────────────────┘ │
│                                     │
│ ☐ Remember me     Forgot password?  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │           Sign in               │ │  <- Blue button
│ └─────────────────────────────────┘ │
│                                     │
│ ──────── Or login with ──────────   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │       G   Google                │ │  <- White/gray button
│ └─────────────────────────────────┘ │
│                                     │
│ v2.1.0.2          Open Dashboard ↗  │
└─────────────────────────────────────┘
```

Input Fields:
- Background: cardBg
- Border: 1px solid border
- Border-radius: 12px
- Padding: 14px 16px
- Focus: border-color: accentBlue

---

### Screen 5: Company Selector

```
┌─────────────────────────────────────┐
│ 🔴🟡🟢         StaffCo              │
├─────────────────────────────────────┤
│ ← Back                              │
├─────────────────────────────────────┤
│                                     │
│ Choose a Company                    │  <- 24px, bold
│ The email is associated with...     │  <- 14px, secondary
│ Select the company you'd like...    │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [🔷]  StaffCo LLC               │ │  <- Company row
│ │       Owner                   › │ │
│ ├─────────────────────────────────┤ │
│ │ [⊞]   Random                    │ │
│ │       Owner                   › │ │
│ ├─────────────────────────────────┤ │
│ │ [⊞]   W7                        │ │
│ │       Owner                   › │ │
│ ├─────────────────────────────────┤ │
│ │ [TI]  Thinking IT          ✓   │ │  <- Active company
│ │       Owner                   › │ │
│ ├─────────────────────────────────┤ │
│ │ [🌸]  Company Testt             │ │
│ │       Owner                   › │ │
│ └─────────────────────────────────┘ │
│                                     │
│ v2.1.0.2          Open Dashboard ↗  │
└─────────────────────────────────────┘
```

Company Row:
- Hover: cardBg background
- Active company: blue border, cardBg background
- Logo: 44px, border-radius: 12px
- Chevron right on far right

---

## 7. NAVIGATION & STATE

```javascript
// App state
const [currentScreen, setCurrentScreen] = useState('tasks'); // 'tasks', 'settings', 'login', 'company'
const [activeTab, setActiveTab] = useState('tasks'); // 'tasks', 'projects'
const [isDarkMode, setIsDarkMode] = useState(true);

// Navigation:
// - Header settings icon -> settings screen
// - Settings back button -> tasks screen
// - Login sign in -> company screen
// - Company select -> tasks screen
// - Tab click -> switch tab (same screen)
```

---

## 8. ANIMATIONS (Framer Motion)

```javascript
// Window appear
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}

// Screen transition
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
transition={{ duration: 0.2 }}

// Dock icon hover
whileHover={{ scale: 1.4, y: -10 }}
transition={{ type: "spring", stiffness: 400, damping: 17 }}

// Toggle switch
transition={{ type: "spring", stiffness: 500, damping: 30 }}

// Theme change
transition={{ duration: 0.3 }}
```

---

## 9. PROJECT STRUCTURE

```
src/
├── components/
│   ├── macos/
│   │   ├── Desktop.jsx        # Main container with wallpaper
│   │   ├── MenuBar.jsx        # Top menu bar
│   │   ├── Dock.jsx           # Bottom dock
│   │   └── DockIcon.jsx       # Individual dock icon
│   │
│   ├── window/
│   │   ├── AppWindow.jsx      # Window frame with traffic lights
│   │   └── TrafficLights.jsx  # Red/yellow/green buttons
│   │
│   ├── app/
│   │   ├── Header.jsx         # App header (logo, icons, avatar)
│   │   ├── Footer.jsx         # App footer (version, link)
│   │   ├── ActiveTaskCard.jsx # The red gradient task card
│   │   ├── TabNavigation.jsx  # Tasks/Projects tabs
│   │   ├── TaskList.jsx       # List of tasks
│   │   ├── ProjectList.jsx    # List of projects
│   │   └── SearchBar.jsx      # Search input + Add button
│   │
│   ├── screens/
│   │   ├── TasksScreen.jsx    # Main tasks/projects screen
│   │   ├── SettingsScreen.jsx # Settings screen
│   │   ├── LoginScreen.jsx    # Login screen
│   │   └── CompanyScreen.jsx  # Company selector screen
│   │
│   └── ui/
│       ├── Toggle.jsx         # Toggle switch component
│       ├── ThemeToggle.jsx    # Light/dark mode toggle
│       ├── Button.jsx         # Reusable button
│       └── Input.jsx          # Reusable input field
│
├── context/
│   └── ThemeContext.jsx       # Theme state & toggle function
│
├── theme/
│   └── colors.js              # All color definitions
│
├── App.jsx                    # Main app component
├── main.jsx                   # Entry point
└── index.css                  # Global styles + Tailwind
```

---

## 10. TECH STACK

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## 11. CRITICAL REQUIREMENTS

1. **NO browser UI visible** - the simulation IS the entire viewport
2. **Pixel-perfect** - match the exact spacing, colors, and styles
3. **Smooth animations** - 60fps, no jank
4. **Theme persistence** - save to localStorage
5. **Live clock** - updates every minute in menu bar
6. **Dock magnification** - icons scale on hover like real macOS
7. **Proper layering** - menu bar (z-50) > window (z-10) > dock (z-40)

---

## 12. BUILD STEPS

1. Create Vite project: `npm create vite@latest . -- --template react`
2. Install dependencies: `npm install framer-motion lucide-react`
3. Setup Tailwind: `npx tailwindcss init -p`
4. Configure tailwind.config.js with custom colors
5. Setup theme context
6. Build Desktop (wallpaper + menu bar + dock)
7. Build AppWindow with traffic lights
8. Build each screen one by one
9. Add navigation between screens
10. Add animations
11. Test dark/light mode
12. Verify everything matches spec

START BUILDING NOW. Read this spec carefully and follow it exactly.
