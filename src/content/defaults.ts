import {
  navigationConfig,
  heroConfig,
  aboutConfig,
  benefitsConfig,
  servicesConfig,
  testimonialsConfig,
  ctaConfig,
  footerConfig,
} from '@/config';

export interface ImageSettings {
  src: string;
  /** object-position in % */
  x: number;
  y: number;
  scale: number;
}

export type ImageId = 'hero' | 'about' | 'cta';

export const defaultContent = {
  navigation: navigationConfig,
  hero: heroConfig,
  about: aboutConfig,
  benefits: benefitsConfig,
  services: servicesConfig,
  testimonials: testimonialsConfig,
  cta: ctaConfig,
  footer: footerConfig,
  ui: {
    heroEyebrow: 'Наставник · онлайн-консультации',
    heroSecondaryCta: 'Услуги и стоимость',
    servicesEyebrow: 'Форматы работы',
    priceLabel: 'Стоимость',
    bookLabel: 'Записаться',
    programMeta: 'три ступени',
    stepPriceLabel: 'Стоимость одной ступени',
    programCta: 'Записаться на наставничество',
    testimonialCaption: 'Отзыв клиента',
  },
  images: {
    hero: { src: heroConfig.backgroundImage, x: 50, y: 30, scale: 1 },
    about: { src: aboutConfig.images[0]?.src ?? '', x: 50, y: 50, scale: 1 },
    cta: { src: ctaConfig.backgroundImage, x: 50, y: 40, scale: 1 },
  } as Record<ImageId, ImageSettings>,
};

export type Content = typeof defaultContent;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** Saved values override defaults key by key; arrays are taken whole; wrong types are ignored. */
function merge(base: unknown, saved: unknown): unknown {
  if (isPlainObject(base)) {
    if (!isPlainObject(saved)) return base;
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(base)) if (key in saved) out[key] = merge(base[key], saved[key]);
    return out;
  }
  if (Array.isArray(base)) return Array.isArray(saved) ? saved : base;
  return typeof saved === typeof base ? saved : base;
}

export function mergeContent(saved: unknown): Content {
  return merge(defaultContent, saved) as Content;
}

export function getAt(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => (acc as Record<string, unknown> | undefined)?.[key], obj);
}

export function setAt<T>(obj: T, path: string, value: unknown): T {
  const [key, ...rest] = path.split('.');
  const source = obj as unknown as Record<string, unknown> | unknown[];
  const next = rest.length ? setAt(Array.isArray(source) ? source[Number(key)] : source[key], rest.join('.'), value) : value;
  if (Array.isArray(source)) {
    const copy = [...source];
    copy[Number(key)] = next;
    return copy as unknown as T;
  }
  return { ...source, [key]: next } as T;
}
