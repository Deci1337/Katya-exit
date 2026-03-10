import { type MouseEvent, type ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, Send, Circle, type LucideProps } from 'lucide-react';
import { footerConfig } from '@/config';

const VkIcon = (props: LucideProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .44-.135.703-1.27.703-1.863 0-3.93-1.135-5.388-3.254C4.717 10.96 4.14 8.995 4.14 8.537c0-.254.101-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.491 2.303 4.675 2.896 4.675.22 0 .322-.101.322-.66V10.27c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.457c0 .373.17.508.271.508.22 0 .406-.135.813-.542 1.253-1.405 2.15-3.558 2.15-3.558.119-.254.322-.491.762-.491h1.744c.525 0 .644.271.525.643-.22 1.388-2.354 4.033-2.354 4.033-.186.305-.254.44 0 .78.186.27.796.813 1.202 1.304.745.847 1.32 1.558 1.473 2.05.153.474-.085.712-.576.712z"/>
  </svg>
);

const iconMap: Record<string, ComponentType<LucideProps>> = { Send, VK: VkIcon as ComponentType<LucideProps> };

function getIcon(iconName: string): ComponentType<LucideProps> {
  return iconMap[iconName] || Circle;
}

export function Footer() {
  if (!footerConfig.logo && footerConfig.columns.length === 0 && footerConfig.socialLinks.length === 0) return null;

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer ref={ref} className="w-full bg-[#0F1F1A] text-white py-12 sm:py-16 lg:py-24 pb-24 md:pb-16 lg:pb-24">
      <div className="container-large px-5 sm:px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand Column */}
          <div
            className={cn(
              'lg:col-span-4 space-y-6 transition-all duration-800 ease-out-quart',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            {footerConfig.logo && (
              <a href="#" className="inline-block">
                <span className="text-2xl font-lora font-semibold tracking-tight text-psych-sage">{footerConfig.logo}</span>
              </a>
            )}
            {footerConfig.description && (
              <p className="text-sm text-white/60 max-w-xs leading-relaxed">
                {footerConfig.description}
              </p>
            )}

            {/* Social Links */}
            {footerConfig.socialLinks.length > 0 && (
              <div className="flex gap-3 pt-2">
                {footerConfig.socialLinks.map((social) => {
                  const Icon = getIcon(social.iconName);
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-psych-sage/30 rounded-full flex items-center justify-center hover:bg-psych-green hover:border-psych-green transition-all duration-300 cursor-pointer"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Links Columns */}
          {footerConfig.columns.map((column, colIndex) => (
            <div
              key={column.title}
              className={cn(
                'lg:col-span-2 sm:col-span-1 transition-all duration-800 ease-out-quart',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${(colIndex + 1) * 100}ms` }}
            >
              <h4 className="text-xs font-geist-mono uppercase tracking-widest text-white/40 mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          {footerConfig.newsletterHeading && (
            <div
              className={cn(
                'lg:col-span-2 transition-all duration-800 ease-out-quart',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '400ms' }}
            >
              <h4 className="text-xs font-geist-mono uppercase tracking-widest text-white/40 mb-4">
                {footerConfig.newsletterHeading}
              </h4>
              {footerConfig.newsletterDescription && (
                <p className="text-sm text-white/60 mb-4">
                  {footerConfig.newsletterDescription}
                </p>
              )}
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={footerConfig.newsletterPlaceholder || "your@email.com"}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                />
                {footerConfig.newsletterButtonText && (
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-white text-exvia-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
                  >
                    {footerConfig.newsletterButtonText}
                  </button>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        {(footerConfig.copyright || footerConfig.credit) && (
          <div
            className={cn(
              'mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-800 ease-out-quart',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            {footerConfig.copyright && (
              <p className="text-xs text-white/40">
                {footerConfig.copyright}
              </p>
            )}
            {footerConfig.credit && (
              <p className="text-xs text-white/40">
                {footerConfig.credit}
              </p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
