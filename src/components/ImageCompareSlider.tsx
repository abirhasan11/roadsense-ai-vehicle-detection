import React, { useState, useRef, useCallback } from 'react';

interface ImageCompareSliderProps {
  rawImageUri?: string;
  annotatedContent: React.ReactNode;
  rawContent: React.ReactNode;
  className?: string;
}

export const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  rawContent,
  annotatedContent,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      className={`relative w-full h-full select-none overflow-hidden rounded-2xl cursor-col-resize ${className}`}
    >
      {/* Background (Full Width) - AI Analyzed Overlay View */}
      <div className="absolute inset-0 w-full h-full">
        {annotatedContent}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-[#5A41DE]/90 text-white text-[10px] font-bold shadow-md pointer-events-none uppercase tracking-wider">
          AI Analyzed
        </div>
      </div>

      {/* Foreground (Clipped Left Side) - Raw Unannotated View */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div
          className="absolute inset-0 h-full"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        >
          {rawContent}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-200 text-[10px] font-bold shadow-md pointer-events-none uppercase tracking-wider border border-slate-700">
            Raw Image
          </div>
        </div>
      </div>

      {/* Draggable Vertical Handle Line */}
      <div
        className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-[#5A41DE] text-[#5A41DE] flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};
