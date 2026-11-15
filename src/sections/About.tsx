import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { aboutConfig } from '@/config';

export function About() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [intro, ...rest] = aboutConfig.description.split('\n\n');
  const photo = aboutConfig.images[0];

  return (
    <section id="about" className="w-full scroll-mt-16 bg-milk-50 py-24 lg:py-32">
      <div ref={ref} className="container-large grid items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        {photo && (
          <div className={cn('reveal lg:col-span-5', isVisible && 'is-in')}>
            <div className="mx-auto aspect-[2/3] max-w-[360px] overflow-hidden rounded-[20px] bg-milk-200 lg:mx-0 lg:max-w-[440px]">
              <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        )}

        <div className={cn('reveal lg:col-span-6 lg:col-start-7', isVisible && 'is-in')} style={{ transitionDelay: '100ms' }}>
          <p className="eyebrow">{aboutConfig.label}</p>
          <p className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] text-cocoa">
            {intro}
          </p>
          <div className="mt-8 space-y-5 border-l border-wine/40 pl-6">
            {rest.map((para, i) => (
              <p key={i} className="text-xl leading-snug text-cocoa/80 lg:text-2xl">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
