import { useState, useEffect, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from './AnimatedButton';
import { navigationConfig } from '@/config';

export function Navigation() {
  if (!navigationConfig.logo && navigationConfig.links.length === 0) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const darkNav = isScrolled;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-circ',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
          darkNav ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="w-full px-5 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* LEFT: hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-8 h-8 flex flex-col justify-center gap-[5px] flex-shrink-0 z-[60] p-1"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  'w-full h-0.5 transition-all duration-500 ease-out-quad origin-center',
                  isMenuOpen ? 'bg-exvia-black translate-y-[7px] rotate-[-45deg]' : darkNav ? 'bg-exvia-black' : 'bg-white'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 transition-all duration-300 ease-out-quad',
                  isMenuOpen ? 'bg-exvia-black scale-0 opacity-0' : darkNav ? 'bg-exvia-black' : 'bg-white'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 transition-all duration-500 ease-out-quad origin-center',
                  isMenuOpen ? 'bg-exvia-black -translate-y-[7px] rotate-[45deg]' : darkNav ? 'bg-exvia-black' : 'bg-white'
                )}
              />
            </button>

            {/* RIGHT: logo + CTA */}
            <div className="flex items-center gap-4 lg:gap-6">
              {navigationConfig.logo && (
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <span className={cn(
                    'text-xl lg:text-2xl font-lora font-semibold tracking-tight transition-colors duration-500',
                    darkNav ? 'text-psych-green-dark' : 'text-white'
                  )}>
                    {navigationConfig.logo}
                  </span>
                </a>
              )}
              {navigationConfig.contactLabel && (
                /* Glow wrapper — only active when nav is dark (scrolled) */
                <div className={cn(darkNav ? 'animate-cta-glow' : '')}>
                  <AnimatedButton
                    href={navigationConfig.contactHref || '#contact'}
                    variant={darkNav ? 'primary' : 'outline-white'}
                    size="md"
                  >
                    {navigationConfig.contactLabel}
                  </AnimatedButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white transition-all duration-500 ease-out-cubic',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 lg:gap-8 px-6">
          {navigationConfig.links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                'text-3xl sm:text-4xl lg:text-5xl font-raleway font-bold text-exvia-black transition-all duration-500 ease-out-quart hover:text-psych-green',
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          {navigationConfig.contactLabel && (
            <a
              href={navigationConfig.contactHref || '#contact'}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'mt-4 w-full max-w-xs py-5 text-center bg-psych-green text-white font-raleway font-bold text-lg rounded-2xl transition-all duration-500 ease-out-quart active:scale-95',
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isMenuOpen ? `${navigationConfig.links.length * 80}ms` : '0ms' }}
            >
              {navigationConfig.contactLabel}
            </a>
          )}
        </div>
      </div>

      {/* Mobile sticky bottom CTA — visible on small screens when scrolled */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ease-out-quart',
          isScrolled && !isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-exvia-border px-5 py-3 safe-area-bottom">
          <a
            href={navigationConfig.contactHref || '#contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 text-center bg-psych-green text-white font-raleway font-bold text-base rounded-xl active:scale-[0.98] transition-transform"
          >
            Записаться на консультацию
          </a>
        </div>
      </div>
    </>
  );
}
