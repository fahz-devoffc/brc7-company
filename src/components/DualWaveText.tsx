import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface DualWaveTextProps {
  text: string;
  className?: string;
  waveDelayMultiplier?: number;
  waveSpeed?: number;
  waveAngleMultiplier?: number;
  waveHeight?: number;
  waveType?: string;
  waveFunction?: string;
  waveEasing?: string;
}

export default function DualWaveText({
  text,
  className = '',
  waveDelayMultiplier = 0.03,
  waveSpeed = 2.5,
  waveAngleMultiplier = 1.5,
  waveHeight = 0.5,
  waveType = 'settle',
  waveFunction = 'sin',
  waveEasing: _waveEasing = 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
}: DualWaveTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll('.dual-wave-char');
    if (!chars) return;

    chars.forEach((char, index) => {
      gsap.fromTo(
        char,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: index * 0.03, ease: 'power3.out' }
      );
    });
  }, [text]);

  const animateWave = useCallback(
    (isHovered: boolean) => {
      const chars = containerRef.current?.querySelectorAll('.dual-wave-char');
      if (!chars) return;

      chars.forEach((char, index) => {
        const delay = index * waveDelayMultiplier;
        const angle = index * waveAngleMultiplier;
        const baseOffset = waveFunction === 'sin' ? Math.sin(angle) : Math.cos(angle);
        const targetY = isHovered ? baseOffset * waveHeight : 0;
        const duration = waveType === 'settle' && !isHovered ? waveSpeed * 2 : waveSpeed;

        gsap.to(char, {
          y: `${targetY}em`,
          duration,
          delay,
          ease: 'power2.out',
        });
      });
    },
    [waveDelayMultiplier, waveSpeed, waveAngleMultiplier, waveHeight, waveType, waveFunction]
  );

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    animateWave(true);
  }, [animateWave]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    animateWave(false);
  }, [animateWave]);

  return (
    <span
      ref={containerRef}
      className={`dual-wave-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="dual-wave-char"
          style={{ '--char-index': index } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
