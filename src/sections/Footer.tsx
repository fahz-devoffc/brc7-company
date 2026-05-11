export default function Footer() {
  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      className="w-full"
      style={{
        background: '#1b1e26',
        padding: '40px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ maxWidth: '1440px', margin: '0 auto' }}
      >
        <p
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.5px',
          }}
        >
          By Fahz | BRC7 Company All Rights Reserved 2026
        </p>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/50 hover:text-white transition-colors duration-300"
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.5px',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
