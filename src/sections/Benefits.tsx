import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useContent } from '@/content/ContentContext';
import { EditableText } from '@/content/EditableText';

export function Benefits() {
  const { content } = useContent();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="w-full bg-milk py-24 lg:py-32">
      <div ref={ref} className="container-large px-5 sm:px-8 lg:px-12">
        <div className={cn('reveal max-w-2xl', isVisible && 'is-in')}>
          <EditableText path="benefits.label" as="p" className="eyebrow" />
          <EditableText path="benefits.heading" as="h2" className="mt-6 block text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] text-cocoa" />
        </div>

        <ol className="mt-14 grid border-t border-cocoa/15 md:grid-cols-3 lg:mt-20">
          {content.benefits.items.map((_, index) => (
            <li
              key={index}
              className={cn(
                'reveal border-b border-cocoa/15 py-8 md:border-b-0 md:py-10 md:pr-10',
                index > 0 && 'md:border-l md:pl-10',
                isVisible && 'is-in'
              )}
              style={{ transitionDelay: `${150 + index * 80}ms` }}
            >
              <span className="font-display text-2xl text-wine tabular-nums lining-nums">{String(index + 1).padStart(2, '0')}</span>
              <EditableText path={`benefits.items.${index}.title`} as="h3" className="mt-6 block font-sans text-xl font-medium text-cocoa" />
              <EditableText path={`benefits.items.${index}.description`} multiline as="p" className="mt-3 block text-base leading-relaxed text-cocoa/70" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
