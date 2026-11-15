import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Send } from 'lucide-react';
import { useContent } from '@/content/ContentContext';
import { EditableText } from '@/content/EditableText';
import { EditableImage } from '@/content/EditableImage';

export function CTA() {
  const { content } = useContent();
  const cta = content.cta;
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-cocoa py-28 lg:py-40">
      <div className="absolute inset-0">
        <EditableImage id="cta" toolbar="top" loading="lazy" className="opacity-50 mix-blend-luminosity" />
        <div className="pointer-events-none absolute inset-0 bg-cocoa/55" />
      </div>

      <div ref={ref} className={cn('reveal pointer-events-none relative container-large px-5 text-center sm:px-8 lg:px-12', isVisible && 'is-in')}>
        <div className="pointer-events-auto mx-auto max-w-3xl">
          {cta.tags.length > 0 && (
            <p className="text-sm text-nude">
              {cta.tags.map((_, i) => (
                <span key={i}>
                  {i > 0 && ' · '}
                  <EditableText path={`cta.tags.${i}`} />
                </span>
              ))}
            </p>
          )}
          <EditableText path="cta.heading" as="h2" className="mt-6 block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-milk" />
          <EditableText path="cta.description" multiline as="p" className="mx-auto mt-6 block max-w-xl text-lg leading-relaxed text-milk/75" />

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <AnimatedButton href={cta.buttonHref} variant="light" size="lg" showIcon>
              <EditableText path="cta.buttonText" />
            </AnimatedButton>
            <a
              href={cta.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] text-milk/75 transition-colors hover:text-milk"
            >
              <Send className="h-4 w-4" strokeWidth={1.5} />
              @{cta.buttonHref.replace(/^https?:\/\/t\.me\//, '')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
