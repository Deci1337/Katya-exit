import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { servicesConfig, navigationConfig } from '@/config';
import { AnimatedButton } from '@/components/AnimatedButton';

const anchors = ['service-intro', 'service-diagnostic', 'service-mentoring'];
// Staircase: each next step stands higher than the previous one (desktop)
const stepLift = ['md:mt-24', 'md:mt-12', 'md:mt-0'];

export function Services() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const services = servicesConfig.services.map((s, i) => ({ ...s, anchor: anchors[i] }));
  const single = services.filter((s) => !s.steps);
  const program = services.find((s) => s.steps);

  return (
    <section id="services" className="w-full scroll-mt-16 bg-milk-50 py-24 lg:py-32">
      <div ref={ref} className="container-large px-5 sm:px-8 lg:px-12">
        <div className={cn('reveal max-w-2xl', isVisible && 'is-in')}>
          <p className="eyebrow">Форматы работы</p>
          <h2 className="mt-6 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-cocoa">{servicesConfig.heading}</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          {single.map((service, i) => (
            <article
              key={service.title}
              id={service.anchor}
              className={cn('reveal flex scroll-mt-24 flex-col rounded-[20px] border border-cocoa/10 bg-milk p-6 sm:p-8 lg:p-10', isVisible && 'is-in')}
              style={{ transitionDelay: `${100 + i * 80}ms` }}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-[32px] leading-tight text-cocoa lg:text-4xl">{service.title}</h3>
                <span className="shrink-0 text-sm text-cocoa/60">{service.duration}</span>
              </div>

              {service.bullets && (
                <ul className="mb-8 mt-6 space-y-3">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-base leading-relaxed text-cocoa/80">
                      <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-wine" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-end justify-between gap-6 border-t border-cocoa/10 pt-6">
                <div>
                  <p className="text-sm text-cocoa/60">Стоимость</p>
                  <p className={cn('mt-1 font-display text-4xl font-semibold tabular-nums lining-nums', service.price === 'Бесплатно' ? 'text-wine' : 'text-cocoa')}>
                    {service.price}
                  </p>
                </div>
                <AnimatedButton href={navigationConfig.contactHref} variant="secondary" showIcon>
                  Записаться
                </AnimatedButton>
              </div>
            </article>
          ))}
        </div>

        {program && (
          <article
            id={program.anchor}
            className={cn('reveal mt-5 scroll-mt-24 rounded-[24px] bg-cocoa p-6 text-milk sm:p-8 lg:mt-6 lg:p-12', isVisible && 'is-in')}
            style={{ transitionDelay: '260ms' }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="text-[40px] leading-tight lg:text-5xl">{program.title}</h3>
              <span className="text-sm text-milk/60">{program.duration} · три ступени</span>
            </div>

            <ol className="mt-10 grid gap-4 md:grid-cols-3 md:items-start lg:mt-12 lg:gap-6">
              {program.steps!.map((step, i) => {
                const [num, title] = step.title.split(': ');
                return (
                  <li key={step.title} className={cn('rounded-2xl border border-milk/10 bg-milk/[0.04] p-6 lg:p-8', stepLift[i])}>
                    <span className="text-sm text-nude">{num}</span>
                    <h4 className="mt-3 font-display text-[28px] font-medium leading-tight">{title ?? step.title}</h4>
                    <p className="mt-4 text-[15px] leading-relaxed text-milk/70">{step.text}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 flex flex-col gap-8 border-t border-milk/10 pt-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm text-milk/60">Стоимость одной ступени</p>
                <p className="mt-1 font-display text-5xl font-semibold tabular-nums lining-nums">{program.stepPrice}</p>
                {program.stepsNote && <p className="mt-4 max-w-md text-[15px] text-nude">{program.stepsNote}</p>}
              </div>
              <AnimatedButton href={navigationConfig.contactHref} variant="light" size="lg" showIcon className="w-full sm:w-auto sm:self-start lg:self-auto">
                Записаться на наставничество
              </AnimatedButton>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
