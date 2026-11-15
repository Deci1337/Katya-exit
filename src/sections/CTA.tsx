import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Send } from 'lucide-react';
import { ctaConfig } from '@/config';

export function CTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-cocoa py-28 lg:py-40">
      <div className="absolute inset-0">
        <img src={ctaConfig.backgroundImage} alt="" className="h-full w-full object-cover object-[center_40%] opacity-50 mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-0 bg-cocoa/55" />
      </div>

      <div ref={ref} className={cn('reveal relative container-large px-5 text-center sm:px-8 lg:px-12', isVisible && 'is-in')}>
        {ctaConfig.tags.length > 0 && (
          <p className="text-sm text-nude">{ctaConfig.tags.join(' · ')}</p>
        )}
        <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-milk">{ctaConfig.heading}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-milk/75">{ctaConfig.description}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <AnimatedButton href={ctaConfig.buttonHref} variant="light" size="lg" showIcon>
            {ctaConfig.buttonText}
          </AnimatedButton>
          <a
            href={ctaConfig.buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[15px] text-milk/75 transition-colors hover:text-milk"
          >
            <Send className="h-4 w-4" strokeWidth={1.5} />
            @ekaterina_sovet
          </a>
        </div>
      </div>
    </section>
  );
}
