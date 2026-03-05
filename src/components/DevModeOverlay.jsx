import { useState, useEffect } from 'react';

export function DevModeOverlay({ enabled, onNotification }) {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [elementSpecs, setElementSpecs] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setHoveredElement(null);
      setElementSpecs(null);
      return;
    }

    const handleMouseMove = (e) => {
      // Check if hovering over Design System Panel or its children
      const designPanel = document.querySelector('[data-design-panel]');
      if (designPanel && designPanel.contains(e.target)) {
        setHoveredElement(null);
        setElementSpecs(null);
        return;
      }

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && element !== hoveredElement) {
        setHoveredElement(element);
        setTooltipPosition({ x: e.clientX + 15, y: e.clientY + 15 });

        // Get computed styles
        const styles = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        setElementSpecs({
          // Dimensions
          width: Math.round(rect.width),
          height: Math.round(rect.height),

          // Spacing
          padding: styles.padding,
          paddingTop: styles.paddingTop,
          paddingRight: styles.paddingRight,
          paddingBottom: styles.paddingBottom,
          paddingLeft: styles.paddingLeft,
          margin: styles.margin,
          gap: styles.gap,

          // Colors
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor,

          // Border
          borderRadius: styles.borderRadius,
          borderWidth: styles.borderWidth,

          // Typography
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          fontFamily: styles.fontFamily,

          // Other
          display: styles.display,
          position: styles.position,
        });
      }
    };

    const handleClick = (e) => {
      // Don't intercept clicks on Design System Panel - let them through normally
      const designPanel = document.querySelector('[data-design-panel]');
      if (designPanel && designPanel.contains(e.target)) {
        return;
      }

      if (enabled && elementSpecs) {
        e.preventDefault();
        e.stopPropagation();

        // Generate CSS string
        const css = generateCSS(elementSpecs);
        navigator.clipboard.writeText(css);

        // Show copied notification
        if (onNotification) {
          onNotification('CSS copied to clipboard!');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
    };
  }, [enabled, hoveredElement, elementSpecs, onNotification]);

  // Convert RGB to HEX
  const rgbToHex = (rgb) => {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return 'transparent';
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return rgb;
    const [r, g, b] = match;
    return '#' + [r, g, b].map(x => parseInt(x).toString(16).padStart(2, '0')).join('').toUpperCase();
  };

  const generateCSS = (specs) => {
    return `/* Dimensions */
width: ${specs.width}px;
height: ${specs.height}px;

/* Spacing */
padding: ${specs.padding};
margin: ${specs.margin};
${specs.gap !== 'normal' ? `gap: ${specs.gap};` : ''}

/* Colors */
background-color: ${rgbToHex(specs.backgroundColor)};
color: ${rgbToHex(specs.color)};
${specs.borderWidth !== '0px' ? `border: ${specs.borderWidth} solid ${rgbToHex(specs.borderColor)};` : ''}

/* Border Radius */
border-radius: ${specs.borderRadius};

/* Typography */
font-size: ${specs.fontSize};
font-weight: ${specs.fontWeight};
line-height: ${specs.lineHeight};`;
  };

  if (!enabled || !elementSpecs) return null;

  return (
    <>
      {/* Highlight box around hovered element */}
      {hoveredElement && (
        <div
          style={{
            position: 'fixed',
            top: hoveredElement.getBoundingClientRect().top,
            left: hoveredElement.getBoundingClientRect().left,
            width: hoveredElement.getBoundingClientRect().width,
            height: hoveredElement.getBoundingClientRect().height,
            border: '2px solid #A78BFA',
            backgroundColor: 'rgba(167, 139, 250, 0.1)',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      )}

      {/* Specs Tooltip */}
      <div
        style={{
          position: 'fixed',
          top: tooltipPosition.y,
          left: tooltipPosition.x,
          background: '#1E1E2E',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '11px',
          fontFamily: 'Monaco, Consolas, monospace',
          color: '#E0E0E0',
          zIndex: 10000,
          pointerEvents: 'none',
          maxWidth: '300px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Dimensions */}
        <div style={{ marginBottom: '8px', color: '#60A5FA', fontWeight: 'bold' }}>
          📐 {elementSpecs.width} × {elementSpecs.height}px
        </div>

        {/* Spacing */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ color: '#F472B6', marginBottom: '2px' }}>Padding:</div>
          <div style={{ paddingLeft: '8px' }}>
            {elementSpecs.paddingTop} / {elementSpecs.paddingRight} / {elementSpecs.paddingBottom} / {elementSpecs.paddingLeft}
          </div>
        </div>

        {elementSpecs.gap !== 'normal' && (
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#FBBF24' }}>Gap: </span>{elementSpecs.gap}
          </div>
        )}

        {/* Colors */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '2px',
              background: elementSpecs.backgroundColor,
              border: '1px solid #555',
            }} />
            <span style={{ color: '#34D399' }}>BG: </span>
            <span>{rgbToHex(elementSpecs.backgroundColor)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '2px',
              background: elementSpecs.color,
              border: '1px solid #555',
            }} />
            <span style={{ color: '#34D399' }}>Text: </span>
            <span>{rgbToHex(elementSpecs.color)}</span>
          </div>
        </div>

        {/* Border */}
        {elementSpecs.borderRadius !== '0px' && (
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#FB923C' }}>Radius: </span>{elementSpecs.borderRadius}
          </div>
        )}

        {/* Typography */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{ color: '#A78BFA' }}>Font: </span>
          {elementSpecs.fontSize} / {elementSpecs.fontWeight}
        </div>

        {/* Click hint */}
        <div style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #333',
          color: '#64748B',
          fontSize: '10px',
        }}>
          💡 Click to copy CSS
        </div>
      </div>
    </>
  );
}
