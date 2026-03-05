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

const indexes = ['01', '02', '03'];

export function Benefits() {
  if (!benefitsConfig.heading && benefitsConfig.items.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef, visibleItems } = useStaggerAnimation(benefitsConfig.items.length, 150);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-28 bg-psych-cream overflow-hidden">
      <div className="container-large px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-20">
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

        {/* Items — full-width rows */}
        <div ref={containerRef} className="space-y-0">
          {benefitsConfig.items.map((item, index) => {
            const Icon = getIcon(item.iconName);
            const animClass = iconAnimationMap[item.iconName] ?? '';
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={cn(
                  'group border-t border-exvia-border last:border-b py-8 sm:py-10 lg:py-12',
                  'flex items-center gap-6 sm:gap-10 lg:gap-16',
                  'transition-all duration-700 ease-out-quart',
                  visibleItems[index] ? 'opacity-100 translate-x-0' : isEven ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Index number */}
                <span className="hidden sm:block text-[4rem] lg:text-[5.5rem] font-raleway font-bold leading-none text-psych-green/10 group-hover:text-psych-green/20 transition-colors duration-500 select-none flex-shrink-0 w-24 lg:w-32 text-right">
                  {indexes[index]}
                </span>

                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-white border border-exvia-border group-hover:border-psych-green/40 group-hover:bg-psych-green/5 transition-all duration-400 shadow-xs">
                  <Icon
                    className={cn('w-6 h-6 sm:w-7 sm:h-7 text-psych-green', visibleItems[index] && animClass)}
                    style={visibleItems[index] ? { animationDelay: `${index * 150 + 200}ms` } : undefined}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-raleway text-xl sm:text-2xl lg:text-3xl font-bold text-exvia-black mb-1 sm:mb-2 group-hover:text-psych-green transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg font-raleway text-exvia-black/60 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>

                {/* Right accent line — desktop */}
                <div className="hidden lg:block w-16 h-px bg-psych-green/20 group-hover:bg-psych-green/60 group-hover:w-24 transition-all duration-500 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
