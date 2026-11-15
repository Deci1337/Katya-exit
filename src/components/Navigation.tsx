import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from './AnimatedButton';
import { useContent } from '@/content/ContentContext';
import { EditableText } from '@/content/EditableText';

export function Navigation() {
  const navigationConfig = useContent().content.navigation;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          isScrolled || isMenuOpen ? 'border-cocoa/10 bg-milk/90 backdrop-blur-md' : 'border-transparent bg-transparent'
        )}
      >
        <div className="container-large flex h-16 items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-display text-2xl font-semibold text-cocoa"
          >
            <EditableText path="navigation.logo" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navigationConfig.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[15px] text-cocoa/75 transition-colors hover:text-cocoa"
              >
                <EditableText path={`navigation.links.${i}.label`} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <AnimatedButton href={navigationConfig.contactHref} size="sm" className="hidden sm:inline-flex">
              <EditableText path="navigation.contactLabel" />
            </AnimatedButton>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-cocoa md:hidden"
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-milk transition-opacity duration-300 md:hidden',
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="flex h-full flex-col justify-between px-5 pb-10 pt-28">
          <div className="flex flex-col gap-2">
            {navigationConfig.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="border-b border-cocoa/10 py-4 font-display text-4xl text-cocoa"
              >
                {link.label}
              </a>
            ))}
          </div>
          <AnimatedButton href={navigationConfig.contactHref} size="lg" className="w-full">
            {navigationConfig.contactLabel}
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
