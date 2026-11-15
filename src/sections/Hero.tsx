import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { heroConfig } from '@/config';
import { AnimatedButton } from '@/components/AnimatedButton';

export function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const [firstName, ...restName] = heroConfig.name.split(' ');
  const [lead, ...paragraphs] = heroConfig.description.split('\n\n');

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-milk pb-20 pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-32">
      <div className="container-large grid items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className={cn('reveal lg:col-span-7', ready && 'is-in')}>
          <p className="eyebrow">{heroConfig.roles[0]} · онлайн-консультации</p>

          <h1 className="mt-6 text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.01em] text-cocoa">
            {firstName}
            <br />
            {restName.join(' ')}
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-snug text-cocoa lg:text-2xl">
            {heroConfig.tagline}
          </p>

          <div className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-cocoa/70">
            <p className="font-medium text-cocoa">{lead}</p>
            {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <AnimatedButton href={heroConfig.ctaHref} size="lg" showIcon>
              {heroConfig.ctaText}
            </AnimatedButton>
            <AnimatedButton href="#services" variant="secondary" size="lg">
              Услуги и стоимость
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
            <img
              src={heroConfig.backgroundImage}
              alt={heroConfig.name}
              className="h-full w-full object-cover object-[center_30%]"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
