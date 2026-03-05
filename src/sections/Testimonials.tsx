import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsConfig } from '@/config';

export function Testimonials() {
  if (!testimonialsConfig.heading && testimonialsConfig.testimonials.length === 0) return null;

  const testimonials = testimonialsConfig.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goToSlide, testimonials.length]);

  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  }, [activeIndex, goToSlide, testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide, testimonials.length]);

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="w-full py-16 sm:py-24 lg:py-32 bg-psych-green-light/30">
      <div ref={sectionRef} className="container-large px-5 sm:px-6 lg:px-12">
        <div className="mb-10 sm:mb-16">
          {testimonialsConfig.label && (
            <div className={cn('transition-all duration-800 ease-out-quart', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <span className="text-xs font-geist-mono uppercase tracking-widest text-psych-green">{testimonialsConfig.label}</span>
            </div>
          )}
          {testimonialsConfig.heading && (
            <h2 className={cn('font-raleway text-3xl sm:text-4xl lg:text-5xl font-bold text-exvia-black mt-3 sm:mt-4 transition-all duration-800 ease-out-quart', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '100ms' }}>
              {testimonialsConfig.heading}
            </h2>
          )}
        </div>

        <div className={cn('max-w-3xl mx-auto transition-all duration-800 ease-out-quart', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: '200ms' }}>
          <div className="bg-white rounded-2xl p-6 sm:p-10 lg:p-14 shadow-sm border border-exvia-border">

            {/* Stars */}
            <div className="flex gap-1 mb-6 sm:mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('w-4 h-4 sm:w-5 sm:h-5', i < active.rating ? 'fill-psych-green text-psych-green' : 'text-exvia-border')} />
              ))}
            </div>

            {/* Quote — в потоке, без absolute, fade при смене */}
            <blockquote
              key={activeIndex}
              className="font-raleway text-base sm:text-lg lg:text-xl text-exvia-black leading-relaxed italic animate-fade-in"
            >
              "{active.quote}"
            </blockquote>

            {/* Author — всегда под цитатой, никогда не перекрывает */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-exvia-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-psych-green/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold font-raleway text-psych-green-dark">
                  {active.author.split(' ')[0][0]}{active.author.split(' ')[1]?.[0] ?? ''}
                </span>
              </div>
              <div>
                <p className="font-semibold font-raleway text-exvia-black">{active.author}</p>
                {active.role && <p className="text-xs font-raleway text-exvia-black/50">{active.role}</p>}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 sm:mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn('h-2 rounded-full transition-all duration-300 cursor-pointer', index === activeIndex ? 'bg-psych-green w-6' : 'bg-exvia-border hover:bg-psych-green/40 w-2')}
                    aria-label={`Отзыв ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prevSlide} className="w-10 h-10 border border-exvia-border rounded-full flex items-center justify-center hover:border-psych-green hover:bg-psych-green hover:text-white transition-all duration-300 cursor-pointer" aria-label="Предыдущий">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextSlide} className="w-10 h-10 border border-exvia-border rounded-full flex items-center justify-center hover:border-psych-green hover:bg-psych-green hover:text-white transition-all duration-300 cursor-pointer" aria-label="Следующий">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
