// Site configuration — Екатерина Советкина, психолог

export interface SiteConfig { language: string; title: string; description: string; }
export const siteConfig: SiteConfig = {
  language: "ru",
  title: "Екатерина Советкина | Психолог",
  description: "Практикующий психолог. Помогаю найти выход в кризисной ситуации — без давления и спешки. Онлайн-консультации.",
};

export interface NavLink { label: string; href: string; }
export interface NavigationConfig { logo: string; links: NavLink[]; contactLabel: string; contactHref: string; }
export const navigationConfig: NavigationConfig = {
  logo: "Екатерина",
  links: [
    { label: "Обо мне", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Отзывы", href: "#testimonials" },
    { label: "Контакт", href: "#contact" },
  ],
  contactLabel: "Записаться",
  contactHref: "https://t.me/katya_exit",
};

export interface HeroConfig { name: string; tagline: string; description: string; ctaText: string; ctaHref: string; roles: string[]; backgroundImage: string; }
export const heroConfig: HeroConfig = {
  name: "Екатерина Советкина",
  tagline: "Я поддерживаю в кризисах, помогая найти ясность и направление без давления и спешки.",
  description: "Помогаю найти выход в кризисной ситуации.\n\nЯ знаю, как это: когда страшно сделать шаг, когда мысли по кругу, когда хочется спрятаться или, наоборот, всё резко разрушить, когда старые способы больше не работают.\n\nВ такие моменты не нужна мотивация. Не нужны советы. И не нужна спешка. Нужна ясность. И направление.",
  ctaText: "Записаться на консультацию сейчас",
  ctaHref: "https://t.me/katya_exit",
  roles: ["Психолог", "Наставник"],
  backgroundImage: "/images/hero-bg.jpg",
};

export interface AboutStat { value: string; label: string; }
export interface AboutImage { src: string; alt: string; }
export interface AboutConfig { label: string; description: string; experienceValue: string; experienceLabel: string; stats: AboutStat[]; images: AboutImage[]; }
export const aboutConfig: AboutConfig = {
  label: "Обо мне",
  description: "Меня зовут Екатерина Советкина.\n\nЯ поддерживаю в кризисах, помогая найти ясность и направление без давления и спешки.\n\nПомогаю найти выход в кризисной ситуации.",
  experienceValue: "",
  experienceLabel: "",
  stats: [],
  images: [
    { src: "/images/about-1.jpg", alt: "Екатерина Советкина" },
  ],
};

export interface BenefitItem { iconName: string; title: string; description: string; }
export interface BenefitsConfig { label: string; heading: string; items: BenefitItem[]; }
export const benefitsConfig: BenefitsConfig = {
  label: "Преимущества",
  heading: "Преимущества работы со мной",
  items: [
    { iconName: "Heart", title: "Эмпатия и забота", description: "Я слушаю внимательно и поддерживаю без осуждения." },
    { iconName: "Compass", title: "Поиск путей", description: "Помогаю найти новые опоры и направления в жизни." },
    { iconName: "Shield", title: "Без давления", description: "Работаем в вашем темпе, не тороплю и не давлю." },
  ],
};

export interface ServiceStep { title: string; text: string; }
export interface ServiceItem {
  iconName: string;
  title: string;
  bullets?: string[];
  duration: string;
  price: string;
  steps?: ServiceStep[];
  stepsNote?: string;
  stepPrice?: string;
}
export interface ServicesConfig { label: string; heading: string; services: ServiceItem[]; }
export const servicesConfig: ServicesConfig = {
  label: "",
  heading: "Услуги и тарифы",
  services: [
    {
      iconName: "Search",
      title: "Диагностическая сессия (60−75 минут)",
      bullets: [
        "найдешь ответ на вопрос «что со мной происходит?»",
        "почувствуешь контакт с телом",
        "увидишь куда идти и что делать",
      ],
      duration: "60−75 минут",
      price: "10.000₽",
    },
    {
      iconName: "Layers",
      title: "Наставничество (3 месяца)",
      duration: "3 месяца",
      price: "",
      steps: [
        {
          title: "1 ступень: Работа с психикой",
          text: "Разбираем старые стратегии, привычные реакции. Разрушаем то, что не работает и мешает и строим новые, которые будут железобетонным фундаментом.",
        },
        {
          title: "2 ступень: Работа с телом",
          text: "Возврат в тело, налаживание контакта с телом, выявление «болячек», которые взялись непонятно откуда. Научишься дружить с телом.",
        },
        {
          title: "3 ступень: Работа с личностью",
          text: "Развитие духовности, понимание «а чем я хочу заниматься», поддержка в твоих начинаниях. Идти в страхи буду вместе с тобой.",
        },
      ],
      stepPrice: "Цена каждой ступени: 22.000 ₽",
      stepsNote: "Внимание: каждая последующая ступень не может быть пройдена без предыдущей.",
    },
  ],
};

export interface ProjectItem { title: string; category: string; year: string; image: string; featured?: boolean; }
export interface PortfolioCTA { label: string; heading: string; linkText: string; linkHref: string; }
export interface PortfolioConfig { label: string; heading: string; description: string; projects: ProjectItem[]; cta: PortfolioCTA; viewAllLabel: string; }
export const portfolioConfig: PortfolioConfig = {
  label: "", heading: "", description: "", projects: [],
  cta: { label: "", heading: "", linkText: "", linkHref: "" },
  viewAllLabel: "",
};

export interface TestimonialItem { quote: string; author: string; role: string; company: string; image: string; rating: number; }
export interface TestimonialsConfig { label: string; heading: string; testimonials: TestimonialItem[]; }
export const testimonialsConfig: TestimonialsConfig = {
  label: "Отзывы",
  heading: "Что говорят клиенты",
  testimonials: [
    {
      quote: "Екатерина, огромное спасибо за проделанную работу! За тонкое чувствование и профессионализм! Вы поменяли моё восприятие отношений и партнёра. Теперь мне не хочется искать родителя, а хочется равноценного партнёра, духовной близости и самореализации.",
      author: "Анна М.",
      role: "Клиент",
      company: "",
      image: "",
      rating: 5,
    },
    {
      quote: "Был приятно удивлён: мне специалист просто и доступно объяснил, что надо делать и как, а главное, не общими фразами, а прям план. Короче, я в восторге — вот!",
      author: "Михаил К.",
      role: "Клиент",
      company: "",
      image: "",
      rating: 5,
    },
    {
      quote: "Катя, вам огромное спасибо за понимание, мягкость в отношении к нам! Тема, которую обсуждали, была для меня очень болезненной, но после разговора я смогла по-новому посмотреть на проблему и изменить своё к ней отношение.",
      author: "Елена В.",
      role: "Клиент",
      company: "",
      image: "",
      rating: 5,
    },
  ],
};

export interface CTAConfig { tags: string[]; heading: string; description: string; buttonText: string; buttonHref: string; email: string; backgroundImage: string; }
export const ctaConfig: CTAConfig = {
  tags: ["Кризисная поддержка", "Наставничество"],
  heading: "Готовы сделать первый шаг?",
  description: "Запишитесь на консультацию прямо сейчас. Первый шаг — это уже изменение. Я буду рада сопровождать вас на пути к ясности.",
  buttonText: "Записаться на консультацию сейчас",
  buttonHref: "https://t.me/katya_exit",
  email: "",
  backgroundImage: "/images/cta-bg.jpg",
};

export interface FooterLinkColumn { title: string; links: { label: string; href: string }[]; }
export interface SocialLink { iconName: string; href: string; label: string; }
export interface FooterConfig { logo: string; description: string; columns: FooterLinkColumn[]; socialLinks: SocialLink[]; newsletterHeading: string; newsletterDescription: string; newsletterButtonText: string; newsletterPlaceholder: string; copyright: string; credit: string; }
export const footerConfig: FooterConfig = {
  logo: "Екатерина",
  description: "Практикующий психолог. Помогаю найти выход в кризисной ситуации без давления и спешки.",
  columns: [
    {
      title: "Услуги",
      links: [
        { label: "Диагностическая сессия", href: "#services" },
        { label: "Наставничество", href: "#service-mentoring" },
      ],
    },
    {
      title: "Связаться",
      links: [
        { label: "Telegram", href: "https://t.me/katya_exit" },
      ],
    },
  ],
  socialLinks: [
    { iconName: "Send", href: "https://t.me/katya_exit", label: "Telegram" },
  ],
  newsletterHeading: "",
  newsletterDescription: "",
  newsletterButtonText: "",
  newsletterPlaceholder: "",
  copyright: "© 2026 Екатерина Советкина. Все права защищены.",
  credit: "",
};
