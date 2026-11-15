import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useContent } from '@/content/ContentContext';
import { EditableText } from '@/content/EditableText';
import { testimonialsConfig } from '@/config';

export function Testimonials() {
  const { content, editing, set } = useContent();
  const testimonials = content.testimonials.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const total = testimonials.length;
  if (total === 0 && !editing) return null;

  const index = Math.min(activeIndex, Math.max(total - 1, 0));
  const go = (delta: number) => setActiveIndex((index + delta + total) % total);
  const pad = (n: number) => String(n).padStart(2, '0');

  const add = () => {
    const template = testimonialsConfig.testimonials[0];
    set('testimonials.testimonials', [...testimonials, { ...template, quote: 'Текст нового отзыва' }]);
    setActiveIndex(total);
  };
  const remove = () => {
    if (!window.confirm('Удалить этот отзыв?')) return;
    set('testimonials.testimonials', testimonials.filter((_, i) => i !== index));
    setActiveIndex(Math.max(0, index - 1));
  };

  const arrow = 'flex h-12 w-12 items-center justify-center rounded-full border border-cocoa/20 text-cocoa transition-colors hover:border-cocoa hover:bg-cocoa hover:text-milk';

  return (
    <section id="testimonials" className="w-full scroll-mt-16 bg-milk py-24 lg:py-32">
      <div ref={ref} className="container-large grid gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className={cn('reveal lg:col-span-4', isVisible && 'is-in')}>
          <EditableText path="testimonials.label" as="p" className="eyebrow" />
          <EditableText path="testimonials.heading" as="h2" className="mt-6 block text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-cocoa" />
        </div>

        <figure className={cn('reveal lg:col-span-8', isVisible && 'is-in')} style={{ transitionDelay: '100ms' }}>
          <span aria-hidden className="block font-display text-[96px] leading-[0.6] text-wine">“</span>
          {total > 0 && (
            <blockquote key={index} className="mt-4 animate-in fade-in duration-500 lg:min-h-[280px]">
              <EditableText
                path={`testimonials.testimonials.${index}.quote`}
                multiline
                as="p"
                className="block font-display text-[22px] font-medium leading-[1.4] text-cocoa sm:text-[26px]"
              />
            </blockquote>
          )}

          <figcaption className="mt-10 flex items-center justify-between gap-6 border-t border-cocoa/15 pt-6">
            <span className="text-sm text-cocoa/60">
              <EditableText path="ui.testimonialCaption" /> · <span className="tabular-nums">{pad(index + 1)} / {pad(total)}</span>
            </span>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} className={arrow} aria-label="Предыдущий отзыв" disabled={total < 2}>
                <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <button onClick={() => go(1)} className={arrow} aria-label="Следующий отзыв" disabled={total < 2}>
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
          </figcaption>

          {editing && (
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <button type="button" onClick={add} className="inline-flex items-center gap-1 rounded-full border border-wine/40 px-4 py-2 text-wine hover:bg-wine/5">
                <Plus className="h-4 w-4" strokeWidth={1.5} /> Добавить отзыв
              </button>
              {total > 0 && (
                <button type="button" onClick={remove} className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-cocoa/60 hover:text-wine">
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} /> Удалить этот отзыв
                </button>
              )}
            </div>
          )}
        </figure>
      </div>
    </section>
  );
}
