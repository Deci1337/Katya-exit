import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { aboutConfig } from '@/config';

export function About() {
  if (!aboutConfig.description && aboutConfig.stats.length === 0) return null;

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: imagesRef, visibleItems } = useStaggerAnimation(1, 150);

  const hasSinglePhoto = aboutConfig.images.length === 1;
  const hasMultiplePhotos = aboutConfig.images.length > 1;

  return (
    <section id="about" className="w-full py-16 sm:py-24 lg:py-32 bg-psych-cream">
      <div className="container-large px-5 sm:px-6 lg:px-12">
        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Left — Text */}
          <div className="space-y-6 sm:space-y-8">
            {aboutConfig.label && (
              <div className={cn('transition-all duration-800 ease-out-quart', sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                <span className="text-xs font-geist-mono uppercase tracking-widest text-psych-green">{aboutConfig.label}</span>
              </div>
            )}

            {aboutConfig.description && (
              <div className={cn('transition-all duration-800 ease-out-quart', sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '100ms' }}>
                {aboutConfig.description.split('\n\n').map((para, i) => (
                  <p key={i} className={cn('text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-raleway font-semibold text-exvia-black leading-tight', i > 0 && 'mt-5')}>
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Right — Photo */}
          {hasSinglePhoto && (
            <div ref={imagesRef} className="flex justify-center lg:justify-end">
              <div className={cn('relative transition-all duration-700 ease-out-quart max-w-[260px] sm:max-w-xs w-full', visibleItems[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-psych-green/10 border border-psych-green/20" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
                  <img src={aboutConfig.images[0].src} alt={aboutConfig.images[0].alt} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )}

          {hasMultiplePhotos && (
            <div ref={imagesRef} className="grid grid-cols-2 gap-4">
              {aboutConfig.images.map((image, index) => (
                <div key={index} className={cn('relative overflow-hidden rounded-xl transition-all duration-700 ease-out-quart', index % 2 === 1 ? 'mt-8' : '', visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
                  <div className="aspect-[4/5] relative group">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
