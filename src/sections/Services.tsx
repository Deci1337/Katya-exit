import { type ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { servicesConfig, navigationConfig } from '@/config';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Search, Layers, UserPlus, Circle, type LucideProps } from 'lucide-react';

const iconMap: Record<string, ComponentType<LucideProps>> = { Search, Layers, UserPlus };
function getIcon(name: string): ComponentType<LucideProps> { return iconMap[name] || Circle; }

const serviceAnchorMap: Record<string, string> = {
  "Консультация-знакомство": "service-intro",
  "Диагностическая сессия (60−75 минут)": "service-diagnostic",
  "Наставничество (3 месяца)": "service-mentoring",
};

export function Services() {
  if (!servicesConfig.heading && servicesConfig.services.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="w-full py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container-large px-5 sm:px-6 lg:px-12">
        <div ref={headerRef} className="mb-10 sm:mb-16">
          {servicesConfig.heading && (
            <h2 className={cn('font-raleway text-3xl sm:text-4xl lg:text-5xl font-bold text-psych-green transition-all duration-800 ease-out-quart', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
              {servicesConfig.heading}
            </h2>
          )}
        </div>

        {servicesConfig.services.length > 0 && (
          <div ref={servicesRef} className={cn('space-y-10 sm:space-y-16 lg:space-y-20 transition-all duration-800 ease-out-quart', servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            {servicesConfig.services.map((service) => {
              const Icon = getIcon(service.iconName);
              const anchorId = serviceAnchorMap[service.title];
              return (
                <div key={service.title} id={anchorId} className="border-b border-exvia-border pb-10 sm:pb-14 lg:pb-16 last:border-0 last:pb-0 scroll-mt-20">
                  <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:gap-12">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-psych-green/10 border border-psych-green/20">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-psych-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-raleway text-xl sm:text-2xl font-bold text-exvia-black mb-4 sm:mb-6">{service.title}</h3>

                      {service.bullets && (
                        <ul className="space-y-2 mb-5 sm:mb-6">
                          {service.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-base sm:text-lg font-raleway text-exvia-black/80">
                              <span className="text-psych-green mt-0.5 flex-shrink-0">—</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {service.steps && (
                        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
                          {service.steps.map((s, i) => (
                            <div key={i}>
                              <h4 className="font-raleway text-lg sm:text-xl font-bold text-exvia-black mb-2">{s.title}</h4>
                              <p className="text-base sm:text-lg font-raleway text-exvia-black/80 leading-relaxed">{s.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-base sm:text-lg font-raleway text-exvia-black/60 mb-2">
                        Длительность {service.duration}
                      </p>
                      {service.price && (
                        <p className="text-lg sm:text-xl font-bold font-raleway text-psych-green mb-6">Стоимость {service.price}</p>
                      )}
                      {service.stepPrice && (
                        <p className="text-lg sm:text-xl font-bold font-raleway text-psych-green mt-2 mb-6">{service.stepPrice}</p>
                      )}
                      {service.stepsNote && (
                        <p className="mt-5 sm:mt-6 mb-6 text-base sm:text-lg font-raleway text-exvia-black/70 italic border-l-2 border-psych-green/50 pl-4">
                          {service.stepsNote}
                        </p>
                      )}

                      <AnimatedButton
                        href={navigationConfig.contactHref}
                        variant="primary"
                        size="lg"
                        showIcon
                      >
                        Записаться сейчас
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
