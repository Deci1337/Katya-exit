import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useContent } from '@/content/ContentContext';
import { EditableText } from '@/content/EditableText';
import { EditableImage } from '@/content/EditableImage';

export function About() {
  const { content } = useContent();
  const about = content.about;
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const paragraphs = about.description.split('\n\n');

  return (
    <section id="about" className="w-full scroll-mt-16 bg-milk-50 py-24 lg:py-32">
      <div ref={ref} className="container-large grid items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className={cn('reveal lg:col-span-5', isVisible && 'is-in')}>
          <div className="relative mx-auto aspect-[2/3] max-w-[360px] overflow-hidden rounded-[20px] bg-milk-200 lg:mx-0 lg:max-w-[440px]">
            <EditableImage id="about" alt={about.images[0]?.alt ?? ''} loading="lazy" />
          </div>
        </div>

        <div className={cn('reveal lg:col-span-6 lg:col-start-7', isVisible && 'is-in')} style={{ transitionDelay: '100ms' }}>
          <EditableText path="about.label" as="p" className="eyebrow" />
          <EditableText
            path="about.description"
            part={0}
            multiline
            as="p"
            className="mt-6 block font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] text-cocoa"
          />
          <div className="mt-8 space-y-5 border-l border-wine/40 pl-6">
            {paragraphs.slice(1).map((_, i) => (
              <EditableText key={i} path="about.description" part={i + 1} multiline as="p" className="block text-xl leading-snug text-cocoa/80 lg:text-2xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
