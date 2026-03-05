import { Navigation } from '@/components/Navigation';
import { PageOverlay } from '@/components/PageOverlay';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Benefits } from '@/sections/Benefits';
import { Services } from '@/sections/Services';
import { Testimonials } from '@/sections/Testimonials';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { usePageLoad } from '@/hooks/usePageLoad';

function App() {
  const { showOverlay } = usePageLoad(500);

  return (
    <div className="min-h-screen bg-psych-cream">
      <PageOverlay isVisible={showOverlay} />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Benefits />
        <Services />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
