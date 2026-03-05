import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { heroConfig } from '@/config';
import { AnimatedButton } from '@/components/AnimatedButton';

const boxSize = 450;
const halfBox = boxSize / 2;

export function Hero() {
  if (!heroConfig.name && heroConfig.roles.length === 0) return null;

  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    section.style.setProperty('--mouse-x', `${e.clientX - rect.left - halfBox}px`);
    section.style.setProperty('--mouse-y', `${e.clientY - rect.top - halfBox}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-[#1C2B2B] md:cursor-none"
      onMouseMove={handleMouseMove}
      style={{ '--mouse-x': 'calc(42vw - 200px)', '--mouse-y': 'calc(28vh - 200px)' } as React.CSSProperties}
    >
      {/* Blurred full-screen background */}
      <div className={cn('absolute inset-0 transition-opacity duration-[1800ms]', isLoaded && imageLoaded ? 'opacity-100' : 'opacity-0')}>
        <img
          src={heroConfig.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(14px) brightness(0.45)', objectPosition: 'center 38%' }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-[#0A1A1A]/35" />
      </div>

      {/* Sharp image window — follows cursor (hidden on touch devices) */}
      <div
        className={cn('hidden md:block absolute top-0 left-0 overflow-hidden pointer-events-none z-20 transition-opacity duration-500', isLoaded && imageLoaded ? 'opacity-100' : 'opacity-0')}
        style={{ width: boxSize, height: boxSize, transform: 'translate3d(var(--mouse-x), var(--mouse-y), 0)', willChange: 'transform' }}
      >
        <div
          className="absolute inset-0"
          style={{ transform: 'translate3d(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1), 0)', width: '100vw', height: '100vh', willChange: 'transform' }}
        >
          <img
            src={heroConfig.backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 38%' }}
          />
        </div>
      </div>

      {/* Border frame + crosshair (hidden on touch devices) */}
      <div
        className={cn('hidden md:block absolute top-0 left-0 pointer-events-none z-20 transition-opacity duration-500', isLoaded && imageLoaded ? 'opacity-100' : 'opacity-0')}
        style={{ width: boxSize, height: boxSize, border: '1px solid rgba(144,200,168,0.5)', transform: 'translate3d(var(--mouse-x), var(--mouse-y), 0)', willChange: 'transform' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-px bg-psych-sage/60" />
          <div className="absolute w-px h-4 bg-psych-sage/60" />
        </div>
      </div>

      {/* Right role label */}
      {heroConfig.roles[1] && (
        <div className={cn('hidden sm:block absolute right-6 lg:right-16 top-1/3 z-30 transition-all duration-[1200ms] ease-out-quart', isLoaded ? 'opacity-100' : 'opacity-0')} style={{ transitionDelay: '900ms' }}>
          <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-psych-sage/80">{heroConfig.roles[1]}</span>
        </div>
      )}

      {/* Content — bottom aligned */}
      <div className="relative z-30 flex flex-col items-start justify-end min-h-screen px-5 sm:px-8 lg:px-16 pb-10 sm:pb-12 lg:pb-16 pointer-events-none">
        {heroConfig.roles[0] && (
          <div className={cn('mb-2 sm:mb-3 transition-all duration-[1200ms] ease-out-quart', isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: '300ms' }}>
            <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-psych-sage/80">{heroConfig.roles[0]}</span>
          </div>
        )}
        <div className={cn('transition-all duration-[1200ms] ease-out-quart', isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: '400ms' }}>
          <h1 className="font-raleway text-[clamp(2.4rem,9vw,8rem)] font-bold text-white leading-[0.95] tracking-[-0.02em]">
            {heroConfig.name}
          </h1>
        </div>

        {heroConfig.tagline && (
          <div className={cn('mt-3 sm:mt-4 max-w-xl transition-all duration-[1200ms] ease-out-quart', isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: '600ms' }}>
            <p className="text-base sm:text-xl text-white/85 font-raleway leading-snug italic">
              {heroConfig.tagline}
            </p>
          </div>
        )}

        {heroConfig.description && (
          <div className={cn('mt-2 sm:mt-3 max-w-lg transition-all duration-[1200ms] ease-out-quart', isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: '750ms' }}>
            {heroConfig.description.split('\n\n').map((para, i) => (
              <p key={i} className={cn('text-sm sm:text-base lg:text-lg text-white/55 font-raleway leading-relaxed', i > 0 && 'mt-3')}>
                {para}
              </p>
            ))}
          </div>
        )}

        {heroConfig.ctaText && (
          <div className={cn('mt-6 sm:mt-8 pointer-events-auto transition-all duration-[1200ms] ease-out-quart', isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: '900ms' }}>
            <AnimatedButton href={heroConfig.ctaHref} variant="primary" size="lg" showIcon className="bg-psych-green text-white hover:bg-psych-green-dark border-0 text-sm sm:text-base">
              {heroConfig.ctaText}
            </AnimatedButton>
          </div>
        )}
      </div>
    </section>
  );
}
