import { type ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { benefitsConfig } from '@/config';
import { Heart, Compass, Shield, Circle, type LucideProps } from 'lucide-react';

const iconMap: Record<string, ComponentType<LucideProps>> = { Heart, Compass, Shield };
function getIcon(name: string): ComponentType<LucideProps> { return iconMap[name] || Circle; }

const iconAnimationMap: Record<string, string> = {
  Heart: 'animate-heartbeat',
  Compass: 'animate-compass-spin',
  Shield: 'animate-shield-sway',
};

export function Benefits() {
  if (!benefitsConfig.heading && benefitsConfig.items.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef, visibleItems } = useStaggerAnimation(benefitsConfig.items.length, 120);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-28 bg-white">
      <div className="container-large px-5 sm:px-6 lg:px-12">
        <div ref={headerRef} className="max-w-3xl mb-10 sm:mb-16">
          {benefitsConfig.label && (
            <div className={cn('transition-all duration-800 ease-out-quart', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <span className="text-xs font-geist-mono uppercase tracking-widest text-psych-green">{benefitsConfig.label}</span>
            </div>
          )}
          {benefitsConfig.heading && (
            <h2 className={cn('font-raleway text-3xl sm:text-4xl lg:text-5xl font-bold text-exvia-black mt-3 sm:mt-4 transition-all duration-800 ease-out-quart', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '100ms' }}>
              {benefitsConfig.heading}
            </h2>
          )}
        </div>

        <div ref={containerRef} className="relative grid sm:grid-cols-3 gap-4 sm:gap-8">
          {/* Connecting line (desktop only) */}
          <div className="hidden sm:block absolute top-1/2 h-px bg-gradient-to-r from-transparent via-psych-green/30 to-transparent -translate-y-1/2" style={{ left: '16.666%', right: '16.666%' }} />
          {benefitsConfig.items.map((item, index) => {
            const Icon = getIcon(item.iconName);
            const animClass = iconAnimationMap[item.iconName] ?? '';
            return (
              <div
                key={index}
                className={cn(
                  'group relative p-6 sm:p-8 lg:p-10 rounded-2xl border border-exvia-border bg-psych-cream hover:border-psych-green/40 hover:shadow-lg transition-all duration-500 ease-out-quart',
                  visibleItems[index] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                )}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-psych-green/10 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    className={cn('w-6 h-6 sm:w-7 sm:h-7 text-psych-green', visibleItems[index] && animClass)}
                    style={visibleItems[index] ? { animationDelay: `${index * 150}ms` } : undefined}
                  />
                </div>
                <h3 className="font-raleway text-lg sm:text-xl font-bold text-exvia-black mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-base sm:text-lg font-raleway text-exvia-black/70 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
