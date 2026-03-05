import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Send } from 'lucide-react';
import { ctaConfig } from '@/config';

export function CTA() {
  if (!ctaConfig.heading && !ctaConfig.description) return null;

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 lg:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={ctaConfig.backgroundImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F1F1A]/75" />
        {/* Subtle green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-psych-green/10 to-transparent" />
      </div>

      <div ref={sectionRef} className="relative z-10 container-large px-5 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {ctaConfig.tags.length > 0 && (
            <div className={cn('flex flex-wrap justify-center gap-3 mb-8 transition-all duration-800 ease-out-quart', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              {ctaConfig.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 text-xs font-geist-mono text-psych-sage/90 border border-psych-sage/30 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          {ctaConfig.heading && (
            <h2 className={cn('font-raleway text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight transition-all duration-800 ease-out-quart', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '100ms' }}>
              {ctaConfig.heading}
            </h2>
          )}

          {ctaConfig.description && (
            <p className={cn('mt-6 text-lg font-raleway text-white/70 max-w-xl mx-auto leading-relaxed transition-all duration-800 ease-out-quart', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '200ms' }}>
              {ctaConfig.description}
            </p>
          )}

          <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-800 ease-out-quart', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '300ms' }}>
            {ctaConfig.buttonText && (
              <AnimatedButton href={ctaConfig.buttonHref} variant="primary" size="lg" showIcon className="bg-psych-green text-white hover:bg-psych-green-dark border-0">
                {ctaConfig.buttonText}
              </AnimatedButton>
            )}

            <a href="https://t.me/katya_exit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-raleway text-white/70 hover:text-white transition-colors group cursor-pointer">
              <Send className="w-4 h-4 text-psych-sage" />
              <span>@katya.exit</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
