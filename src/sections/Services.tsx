import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useContent } from '@/content/ContentContext';
import { EditableText } from '@/content/EditableText';

const anchors = ['service-intro', 'service-diagnostic', 'service-mentoring'];
// Staircase: each next step stands higher than the previous one (desktop)
const stepLift = ['md:mt-24', 'md:mt-12', 'md:mt-0'];

export function Services() {
  const { content, editing, set } = useContent();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const bookHref = content.navigation.contactHref;
  const services = content.services.services.map((s, index) => ({ ...s, index, anchor: anchors[index] }));
  const single = services.filter((s) => !s.steps);
  const program = services.find((s) => s.steps);
  const base = (i: number) => `services.services.${i}`;

  return (
    <section id="services" className="w-full scroll-mt-16 bg-milk-50 py-24 lg:py-32">
      <div ref={ref} className="container-large px-5 sm:px-8 lg:px-12">
        <div className={cn('reveal max-w-2xl', isVisible && 'is-in')}>
          <EditableText path="ui.servicesEyebrow" as="p" className="eyebrow" />
          <EditableText path="services.heading" as="h2" className="mt-6 block text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-cocoa" />
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          {single.map((service, i) => (
            <article
              key={service.index}
              id={service.anchor}
              className={cn('reveal flex scroll-mt-24 flex-col rounded-[20px] border border-cocoa/10 bg-milk p-6 sm:p-8 lg:p-10', isVisible && 'is-in')}
              style={{ transitionDelay: `${100 + i * 80}ms` }}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <EditableText path={`${base(service.index)}.title`} as="h3" className="block text-[32px] leading-tight text-cocoa lg:text-4xl" />
                <EditableText path={`${base(service.index)}.duration`} className="shrink-0 text-sm text-cocoa/60" />
              </div>

              {service.bullets && (
                <ul className="mb-8 mt-6 space-y-3">
                  {service.bullets.map((b, bi) =>
                    !editing && !b ? null : (
                      <li key={bi} className="flex gap-3 text-base leading-relaxed text-cocoa/80">
                        <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-wine" />
                        <EditableText path={`${base(service.index)}.bullets.${bi}`} className="min-w-0 flex-1" />
                      </li>
                    )
                  )}
                  {editing && (
                    <li>
                      <button
                        type="button"
                        onClick={() => set(`${base(service.index)}.bullets`, [...service.bullets!, 'Новый пункт'])}
                        className="inline-flex items-center gap-1 text-sm text-wine hover:underline"
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} /> Добавить пункт
                      </button>
                      <span className="ml-2 text-xs text-cocoa/50">чтобы удалить пункт, сотрите его текст</span>
                    </li>
                  )}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-end justify-between gap-6 border-t border-cocoa/10 pt-6">
                <div>
                  <EditableText path="ui.priceLabel" as="p" className="block text-sm text-cocoa/60" />
                  <EditableText
                    path={`${base(service.index)}.price`}
                    as="p"
                    className={cn('mt-1 block font-display text-4xl font-semibold tabular-nums lining-nums', /^\D+$/.test(service.price) ? 'text-wine' : 'text-cocoa')}
                  />
                </div>
                <AnimatedButton href={bookHref} variant="secondary" showIcon>
                  <EditableText path="ui.bookLabel" />
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
              <EditableText path={`${base(program.index)}.title`} as="h3" className="block text-[40px] leading-tight lg:text-5xl" />
              <span className="text-sm text-milk/60">
                <EditableText path={`${base(program.index)}.duration`} /> · <EditableText path="ui.programMeta" />
              </span>
            </div>

            <ol className="mt-10 grid gap-4 md:grid-cols-3 md:items-start lg:mt-12 lg:gap-6">
              {program.steps!.map((step, i) => {
                const [num, title] = step.title.split(': ');
                const stepPath = `${base(program.index)}.steps.${i}`;
                return (
                  <li key={i} className={cn('rounded-2xl border border-milk/10 bg-milk/[0.04] p-6 lg:p-8', stepLift[i])}>
                    {editing ? (
                      <EditableText path={`${stepPath}.title`} as="h4" className="block font-display text-[28px] font-medium leading-tight" />
                    ) : (
                      <>
                        {title && <span className="text-sm text-nude">{num}</span>}
                        <h4 className={cn('font-display text-[28px] font-medium leading-tight', title && 'mt-3')}>{title ?? num}</h4>
                      </>
                    )}
                    <EditableText path={`${stepPath}.text`} multiline as="p" className="mt-4 block text-[15px] leading-relaxed text-milk/70" />
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 flex flex-col gap-8 border-t border-milk/10 pt-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <EditableText path="ui.stepPriceLabel" as="p" className="block text-sm text-milk/60" />
                <EditableText path={`${base(program.index)}.stepPrice`} as="p" className="mt-1 block font-display text-5xl font-semibold tabular-nums lining-nums" />
                {(program.stepsNote || editing) && (
                  <EditableText path={`${base(program.index)}.stepsNote`} multiline as="p" className="mt-4 block max-w-md text-[15px] text-nude" />
                )}
              </div>
              <AnimatedButton href={bookHref} variant="light" size="lg" showIcon className="w-full sm:w-auto sm:self-start lg:self-auto">
                <EditableText path="ui.programCta" />
              </AnimatedButton>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
