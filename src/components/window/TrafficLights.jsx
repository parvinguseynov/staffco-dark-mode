import { useState } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

export function TrafficLights() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="flex items-center gap-2 pl-3">
      {/* Red - Close */}
      <div
        className="w-3 h-3 rounded-full cursor-pointer flex items-center justify-center relative transition-all"
        style={{ background: '#FF5F57' }}
        onMouseEnter={() => setHoveredButton('close')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === 'close' && (
          <X size={8} color="white" strokeWidth={3} className="absolute" />
        )}
      </div>

      {/* Yellow - Minimize */}
      <div
        className="w-3 h-3 rounded-full cursor-pointer flex items-center justify-center relative transition-all"
        style={{ background: '#FFBD2E' }}
        onMouseEnter={() => setHoveredButton('minimize')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === 'minimize' && (
          <Minus size={8} color="white" strokeWidth={3} className="absolute" />
        )}
      </div>

      {/* Green - Maximize */}
      <div
        className="w-3 h-3 rounded-full cursor-pointer flex items-center justify-center relative transition-all"
        style={{ background: '#28CA42' }}
        onMouseEnter={() => setHoveredButton('maximize')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === 'maximize' && (
          <Maximize2 size={6} color="white" strokeWidth={3} className="absolute" />
        )}
      </div>
    </div>
  );
}
