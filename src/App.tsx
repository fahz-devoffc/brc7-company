import { useEffect } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Services from './sections/Services';
import OrbitRingText from './components/OrbitRingText';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: 'none' }}>
      <CustomCursor />
      <Navigation />
      <Hero />
      <Work />
      <Services />
      <div id="cta-ring">
        <OrbitRingText />
      </div>
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
