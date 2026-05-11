import { useState, useRef, useEffect } from 'react';

export default function OrbitRingText() {
  const tilt = 63;
  const ringRadius = 90;
  const particleCount = 350;

  const [rotation, setRotation] = useState(0);
  const [hovered, setHovered] = useState(false);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(Date.now());
  const particles = useRef<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[]>([]);
  const [particlePositions, setParticlePositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticlePositions(particles.current.map((p) => ({ x: p.x, y: p.y })));
  }, []);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!isDragging.current) {
        setRotation((r) => r + (hovered ? 0.3 : 0.05));
      }

      const now = Date.now();
      const timeSinceMove = now - lastMoveTime.current;

      if (timeSinceMove > 100) {
        dragVelocity.current.x *= 0.95;
        dragVelocity.current.y *= 0.95;
      }

      const updatedParticles = particles.current.map((p) => {
        const distance = Math.sqrt(p.x * p.x + p.y * p.y);
        const _angle = Math.atan2(p.y, p.x);
        void _angle;
        const force = distance > 0 ? Math.min(500 / (distance * distance), 1) : 0;

        let newX = p.x + p.speedX + dragVelocity.current.x * force * 0.5;
        let newY = p.y + p.speedY + dragVelocity.current.y * force * 0.5;

        if (distance > 200) {
          newX *= 0.98;
          newY *= 0.98;
        }

        return { x: newX, y: newY };
      });

      setParticlePositions(updatedParticles);
      particles.current = particles.current.map((p, i) => ({
        ...p,
        x: updatedParticles[i].x,
        y: updatedParticles[i].y,
      }));

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [hovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
    lastMoveTime.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - prevMouse.current.x;
    const deltaY = e.clientY - prevMouse.current.y;
    prevMouse.current = { x: e.clientX, y: e.clientY };
    lastMoveTime.current = Date.now();

    dragVelocity.current = { x: deltaX * 0.5, y: deltaY * 0.5 };
    setRotation((r) => r + deltaX * 0.2);

    particles.current = particles.current.map((p) => {
      p.speedX += deltaY * 0.001;
      p.speedY -= deltaX * 0.001;
      return p;
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const chars = Array.from({ length: 120 }, (_, i) => i);

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ minHeight: '100vh' }}>
      {/* Particle layer */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '400px' }}>
        {particlePositions.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: `${particles.current[i]?.size || 3}px`,
              height: `${particles.current[i]?.size || 3}px`,
              background: 'white',
              borderRadius: '50%',
              opacity: particles.current[i]?.opacity || 0.5,
              transform: `translate(${p.x}px, ${p.y}px)`,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Ring container */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseEnter={() => setHovered(true)}
      >
        <div className="relative" style={{ width: 400, height: 400, perspective: 400 }}>
          <div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              animation: 'rotate 20s linear infinite',
              transform: `rotateX(${tilt}deg) rotateZ(${rotation}deg)`,
            }}
          >
            {chars.map((i) => (
              <div
                key={i}
                className="absolute top-0 left-0 w-full text-center"
                style={{
                  transform: `rotateY(${i * 3}deg) translateZ(${ringRadius}px)`,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {'BRC7'[i % 4]}
              </div>
            ))}
          </div>

          {/* Decorative arcs */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
            style={{ width: '300px', height: '300px', transform: 'rotateX(70deg)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
            style={{ width: '200px', height: '200px', transform: 'rotateX(70deg)' }}
          />
        </div>
      </div>

      {/* CTA Text */}
      <div className="relative z-10 flex flex-col items-center justify-end h-screen pb-20 pointer-events-none">
        <h2
          className="text-center mb-8"
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#ffffff',
          }}
        >
          Ready to build something extraordinary?
        </h2>
        <a
          href="#contact"
          className="pointer-events-auto inline-block px-8 py-4 font-bold text-black transition-transform hover:scale-105"
          style={{
            background: '#ffcba4',
            borderRadius: '10px',
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: '16px',
          }}
        >
          Start a Conversation
        </a>
      </div>
    </div>
  );
}
