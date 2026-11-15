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
    <footer ref={ref} className="w-full bg-cocoa-900 py-16 text-milk lg:py-20">
      <div className={cn('reveal container-large px-5 sm:px-8 lg:px-12', isVisible && 'is-in')}>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 sm:col-span-2 lg:col-span-6">
            <a href="#" className="font-display text-3xl font-semibold">{footerConfig.logo}</a>
            <p className="max-w-xs text-[15px] leading-relaxed text-milk/60">{footerConfig.description}</p>
            <div className="flex gap-2 pt-1">
              {footerConfig.socialLinks.map((social) => {
                const Icon = getIcon(social.iconName);
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-milk/15 text-milk/80 transition-colors hover:border-milk hover:text-milk"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {footerConfig.columns.map((column) => (
            <div key={column.title} className="lg:col-span-3">
              <h4 className="font-sans text-sm text-milk/45">{column.title}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-1 text-[15px] text-milk/75 transition-colors hover:text-milk"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {footerConfig.copyright && (
          <p className="mt-16 border-t border-milk/10 pt-8 text-sm text-milk/45">{footerConfig.copyright}</p>
        )}
      </div>
    </footer>
  );
}
