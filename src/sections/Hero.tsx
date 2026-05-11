import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DualWaveText from '../components/DualWaveText';
import StarField from '../components/StarField';

export default function Hero() {
  const captionRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    if (captionRef.current) {
      tl.fromTo(
        captionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 30%)',
          zIndex: 2,
        }}
      />

      {/* Star Field */}
      <StarField />

      {/* Content */}
      <div
        className="relative flex flex-col justify-end h-full px-6 md:px-20 pb-16 md:pb-24"
        style={{ zIndex: 3, maxWidth: '1280px' }}
      >
        {/* Caption */}
        <p
          ref={captionRef}
          className="mb-4 opacity-0"
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          Creative Technology Studio
        </p>

        {/* Headline */}
        <div ref={headlineRef} className="opacity-0">
          <h1
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: 'clamp(40px, 7vw, 76px)',
              fontWeight: 400,
              lineHeight: 1,
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            We Craft
            <br />
            Digital Universes
          </h1>
        </div>

        {/* Tagline with DualWaveText */}
        <div className="mt-6" style={{ maxWidth: '480px' }}>
          <p
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: '0.5px',
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            <DualWaveText
              text="BRC7 is a company that operates in the technology sector, such as Web Apps, Web Design, Games, and many more. BRC7 was founded in 2025 by a team currently known as Fahz-TeamOFFC."
              waveHeight={0.5}
              waveSpeed={2.5}
            />
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10 opacity-0">
          <a
            href="#work"
            className="inline-block px-8 py-4 text-black font-bold transition-transform hover:scale-105"
            style={{
              background: '#ffcba4',
              borderRadius: '10px',
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: '16px',
            }}
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-4 text-white font-bold transition-all hover:bg-white/10"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '10px',
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: '16px',
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Hidden text alternative for video */}
      <span className="sr-only">
        A cinematic view of a glowing celestial body with planetary rings orbiting in deep space
      </span>
    </section>
  );
}
