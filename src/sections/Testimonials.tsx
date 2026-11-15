import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonialsConfig } from '@/config';

export function Testimonials() {
  const testimonials = testimonialsConfig.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  if (testimonials.length === 0) return null;

  const total = testimonials.length;
  const go = (delta: number) => setActiveIndex((i) => (i + delta + total) % total);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="testimonials" className="w-full scroll-mt-16 bg-milk py-24 lg:py-32">
      <div ref={ref} className="container-large grid gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className={cn('reveal lg:col-span-4', isVisible && 'is-in')}>
          <p className="eyebrow">{testimonialsConfig.label}</p>
          <h2 className="mt-6 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-cocoa">{testimonialsConfig.heading}</h2>
        </div>

        <figure className={cn('reveal lg:col-span-8', isVisible && 'is-in')} style={{ transitionDelay: '100ms' }}>
          <span aria-hidden className="block font-display text-[96px] leading-[0.6] text-wine">“</span>
          <blockquote key={activeIndex} className="mt-4 animate-in fade-in duration-500 lg:min-h-[280px]">
            <p className="font-display text-[22px] font-medium leading-[1.4] text-cocoa sm:text-[26px]">{testimonials[activeIndex].quote}</p>
          </blockquote>

          <figcaption className="mt-10 flex items-center justify-between gap-6 border-t border-cocoa/15 pt-6">
            <span className="text-sm text-cocoa/60">
              Отзыв клиента · <span className="tabular-nums">{pad(activeIndex + 1)} / {pad(total)}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cocoa/20 text-cocoa transition-colors hover:border-cocoa hover:bg-cocoa hover:text-milk"
                aria-label="Предыдущий отзыв"
              >
                <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => go(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cocoa/20 text-cocoa transition-colors hover:border-cocoa hover:bg-cocoa hover:text-milk"
                aria-label="Следующий отзыв"
              >
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
