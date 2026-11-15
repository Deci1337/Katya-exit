import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useContent } from '@/content/ContentContext';
import { EditableText } from '@/content/EditableText';
import { EditableImage } from '@/content/EditableImage';

export function Hero() {
  const { content } = useContent();
  const hero = content.hero;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const paragraphs = hero.description.split('\n\n');

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-milk pb-20 pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-32">
      <div className="container-large grid items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className={cn('reveal lg:col-span-7', ready && 'is-in')}>
          <EditableText path="ui.heroEyebrow" as="p" className="eyebrow" />

          <EditableText
            path="hero.name"
            as="h1"
            className="mt-6 block text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.01em] text-cocoa"
            render={(name) => {
              const [first, ...rest] = name.split(' ');
              return <>{first}<br />{rest.join(' ')}</>;
            }}
          />

          <EditableText path="hero.tagline" as="p" multiline className="mt-8 block max-w-xl text-xl leading-snug text-cocoa lg:text-2xl" />

          <div className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-cocoa/70">
            {paragraphs.map((_, i) => (
              <EditableText key={i} path="hero.description" part={i} multiline as="p" className={cn('block', i === 0 && 'font-medium text-cocoa')} />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <AnimatedButton href={hero.ctaHref} size="lg" showIcon>
              <EditableText path="hero.ctaText" />
            </AnimatedButton>
            <AnimatedButton href="#services" variant="secondary" size="lg">
              <EditableText path="ui.heroSecondaryCta" />
            </AnimatedButton>
          </div>
        </div>

        <div
          className={cn('reveal relative order-first mx-auto w-full max-w-[240px] sm:max-w-[360px] lg:order-none lg:col-span-5 lg:max-w-none', ready && 'is-in')}
          style={{ transitionDelay: '120ms' }}
        >
          {/* Arch window — offset hairline behind the portrait */}
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-b-[20px] rounded-t-full border border-wine/40" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[20px] rounded-t-full bg-milk-200">
            <EditableImage id="hero" alt={hero.name} fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}
