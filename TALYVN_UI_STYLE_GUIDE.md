# talyvn UI Style Guide - 2025 Modern Design System

## Design Principles

1. **Glassmorphism** - Semi-transparent backgrounds with blur
2. **Gradient Accents** - Colorful gradients for visual hierarchy
3. **Glow Effects** - Subtle glows for depth and emphasis
4. **Spring Animations** - Natural, bouncy micro-interactions
5. **Typography Hierarchy** - Clear, bold headings with DM Sans

---

## Color Palette

### Gradients

```js
// Blue (Primary Actions, Info)
linearGradient: '135deg, #60A5FA, #3B82F6'
accentLine: '90deg, #60A5FA, #3B82F6, #60A5FA'

// Green (Success, Resume, Continue)
linearGradient: '135deg, #34D399, #10B981'
accentLine: '90deg, #34D399, #10B981, #34D399'

// Red (Danger, Stop, Delete)
linearGradient: '135deg, #F87171, #EF4444'
accentLine: '90deg, #F87171, #EF4444, #F87171'

// Orange/Yellow (Warning, Idle)
linearGradient: '135deg, #FBBF24, #F59E0B'
accentLine: '90deg, #FBBF24, #F59E0B, #FBBF24'

// Purple (Special Features)
linearGradient: '135deg, #A78BFA, #8B5CF6'
accentLine: '90deg, #A78BFA, #8B5CF6, #A78BFA'

// Gray (Neutral, Secondary)
linearGradient: '145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9)'
```

### Semantic Colors

```js
colors = {
  // Backgrounds
  windowBg: '#0F172A',
  cardBg: '#1E293B',
  elevatedBg: '#334155',

  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  // Borders
  border: '#334155',

  // Accents
  accentBlue: '#60A5FA',
  accentGreen: '#34D399',
  accentRed: '#F87171',
  accentOrange: '#FBBF24',
  accentPurple: '#A78BFA',
}
```

---

## Typography

### Font Family
```css
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Ubuntu', sans-serif;
```

### Hierarchy

```js
// Headings
h1: { fontSize: '24px', fontWeight: 700, letterSpacing: '-0.01em' }
h2: { fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }
h3: { fontSize: '18px', fontWeight: 600 }

// Body
body: { fontSize: '14px', fontWeight: 400, lineHeight: '1.5' }
small: { fontSize: '12px', fontWeight: 400 }
caption: { fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }
```

---

## Components

### 1. Modals

**Structure:**
```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  {/* Backdrop */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0"
    style={{
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}
  />

  {/* Modal Content */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 20 }}
    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    className="relative w-full max-w-sm rounded-3xl overflow-hidden"
    style={{
      background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      boxShadow: `
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        0 0 100px rgba(96, 165, 250, 0.15)
      `,
    }}
  >
    {/* Gradient accent line */}
    <div
      className="h-1 w-full"
      style={{ background: 'linear-gradient(90deg, #60A5FA, #3B82F6, #60A5FA)' }}
    />

    <div className="p-8">
      {/* Content */}
    </div>
  </motion.div>
</div>
```

### 2. Buttons

**Primary Button:**
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="py-4 rounded-2xl text-sm font-semibold"
  style={{
    background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(96, 165, 250, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  }}
>
  Button Text
</motion.button>
```

**Secondary Button:**
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="py-3 rounded-2xl text-sm font-semibold"
  style={{
    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
    color: '#F1F5F9',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  }}
>
  Button Text
</motion.button>
```

### 3. Cards

**Glassmorphism Card:**
```jsx
<motion.div
  whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)' }}
  transition={{ duration: 0.2 }}
  className="rounded-2xl p-4"
  style={{
    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.03),
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 10px 20px rgba(0, 0, 0, 0.15)
    `,
  }}
>
  {/* Card content */}
</motion.div>
```

### 4. Circular Timer

```jsx
<div className="relative w-36 h-36">
  {/* Glow effect */}
  <div
    className="absolute inset-0 rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)',
      filter: 'blur(20px)',
    }}
  />

  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
    {/* Background circle */}
    <circle
      cx="60" cy="60" r="52"
      fill="none"
      stroke="rgba(148, 163, 184, 0.1)"
      strokeWidth="8"
    />

    {/* Progress circle with gradient */}
    <defs>
      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <circle
      cx="60" cy="60" r="52"
      fill="none"
      stroke="url(#timerGradient)"
      strokeWidth="8"
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={circumference - (progress / 100) * circumference}
      style={{
        transition: 'stroke-dashoffset 1s linear',
        filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.5))',
      }}
    />
  </svg>

  {/* Timer text */}
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <span className="text-3xl font-bold tabular-nums" style={{ color: '#F1F5F9' }}>
      {formatTime(timeLeft)}
    </span>
    <span className="text-xs mt-1" style={{ color: '#64748B' }}>
      remaining
    </span>
  </div>
</div>
```

### 5. Icon Containers

```jsx
<motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.1, type: 'spring' }}
  className="w-16 h-16 rounded-full flex items-center justify-center"
  style={{
    background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(59, 130, 246, 0.2))',
    border: '1px solid rgba(96, 165, 250, 0.3)',
    boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
  }}
>
  <Icon width={32} height={32} style={{ color: '#60A5FA' }} />
</motion.div>
```

---

## Animations

### Spring Animation (Default)
```js
transition={{ type: 'spring', damping: 25, stiffness: 300 }}
```

### Hover Effect
```js
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

### Card Lift
```js
whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)' }}
transition={{ duration: 0.2 }}
```

### Pulse Animation (Active State)
```jsx
<motion.div
  animate={{
    boxShadow: [
      '0 0 0 0 rgba(52, 211, 153, 0.4)',
      '0 0 0 10px rgba(52, 211, 153, 0)',
    ]
  }}
  transition={{ duration: 1.5, repeat: Infinity }}
>
  {/* Active content */}
</motion.div>
```

### Icon Pulse
```jsx
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
>
  <Icon />
</motion.div>
```

### Staggered Entrance
```jsx
<motion.h3
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  Title
</motion.h3>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.15 }}
>
  Description
</motion.p>
```

---

## Effects

### Backdrop Blur
```css
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
```

### Glow Shadow
```css
box-shadow: 0 0 30px rgba(96, 165, 250, 0.3);
```

### Layered Shadows
```css
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.05),
  0 25px 50px -12px rgba(0, 0, 0, 0.5),
  0 0 100px rgba(96, 165, 250, 0.15);
```

### Button Inset Highlight
```css
box-shadow:
  0 4px 15px rgba(96, 165, 250, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
```

---

## Usage Examples

### Idle Modal with Duration
See: `src/components/modals/IdlePromptWithDuration.jsx`

### Success Modal
See: `src/components/modals/DesktopTrackingModal.jsx`

### Warning Modal
See: `src/components/modals/ActiveTaskLogoutModal.jsx`

### Info Modal
See: `src/components/modals/UpdateAvailableModal.jsx`

---

## Best Practices

1. **Always use spring animations** for modal entrances
2. **Add whileHover/whileTap** to all interactive elements
3. **Use backdrop blur** for all overlays
4. **Include gradient accent lines** at the top of modals
5. **Add glow effects** to emphasized elements (icons, timers)
6. **Use layered shadows** for depth
7. **Implement staggered animations** for content entrance
8. **Always use rounded-3xl (24px)** for modal corners
9. **Use rounded-2xl (16px)** for cards and buttons
10. **Add pulse animations** to active states

---

## Accessibility

- Maintain minimum contrast ratio of 4.5:1 for text
- Use semantic HTML elements
- Include aria-labels for interactive elements
- Ensure keyboard navigation works
- Test with screen readers
- Avoid animations that could cause motion sickness (use `prefers-reduced-motion`)

---

Last updated: 2026-03-13
Version: 1.0.0
