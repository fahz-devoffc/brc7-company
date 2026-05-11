import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <a
          href="#"
          className="text-white font-bold text-lg tracking-wide"
          style={{ fontFamily: "'Funnel Display', sans-serif", fontSize: '18px', fontWeight: 700 }}
        >
          BRC7
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white transition-colors duration-300"
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: '14px',
                fontWeight: 400,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 text-black font-bold transition-transform hover:scale-105"
            style={{
              background: '#ffcba4',
              borderRadius: '10px',
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: '14px',
            }}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white flex flex-col gap-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg px-6 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: "'Funnel Display', sans-serif", fontSize: '16px' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block mt-4 px-5 py-3 text-black font-bold text-center"
            style={{ background: '#ffcba4', borderRadius: '10px', fontFamily: "'Funnel Display', sans-serif" }}
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
          </a>
        </div>
      )}
    </nav>
  );
}
