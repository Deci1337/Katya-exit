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
      quote: "Наблюдение дня. Ходила сейчас пешком по магазинам. Оставила машину, погода замечательная, солнце светит тепло. Прям весна, а не осень. Так вот, иду, в ушах музыка, иду улыбаюсь и понимаю, что в сердце то любовь. Улыбаюсь, пою, на светофоре пританцовываю — и прям ощущение, что я счастливый человек. Я и раньше так считала, а сегодня прям кожей почувствовала. Это все ты, дорогая! Привела меня к этому, к любви к себе, любви к окружающему миру.",
      author: "Клиент",
      role: "",
      company: "",
      image: "",
      rating: 5,
    },
    {
      quote: "Ты знаешь — хорошо и немного в шоке. В воскресенье прошлое вечером поговорила с детьми как с взрослыми и они с понедельника сами все делают, и что интересно — без истерик. А что, так можно было? Теперь я утром и вечером не собака с языком на плече, а мать.",
      author: "Клиент",
      role: "",
      company: "",
      image: "",
      rating: 5,
    },
    {
      quote: "Я хочу тебя поблагодарить — то что есть у меня изменения после нашей встречи. Я стала меньше обижаться, стала говорить так, чтоб никого не обидеть. А мужчине своему я после этого всеее выдала, что давно хотела сказать ему, но боялась. Он был в шоке, что 1,5 недели не общались. Вроде как нормально, но я услышала наконец то, от него что хотела услышать. Поэтому я подумаю ещё попасть к тебе.",
      author: "Клиент",
      role: "",
      company: "",
      image: "",
      rating: 5,
    },
    {
      quote: "Я благодарю тебя ещё раз за игру! Мне очень понравилась атмосфера — тепло, уютно, комфортно, будто много лет все знакомы. У тебя очень лёгкая подача даже глубоких тем — за это тебе отдельное спасибо! Ты безумно лучезарная и это тоже добавляет легкости! И сам процесс очень глубокий — хоть и тема игры сексуальность, а столько всего мне раскрыла (и проявленность, и деньги, и свою миссию). Вообщем ещё раз благодарю и уверена — ещё встретимся!",
      author: "Клиент",
      role: "",
      company: "",
      image: "",
      rating: 5,
    },
    {
      quote: "Катя, привет, я к тебе с новостями) Вчера, как мы и договорились, позволила себе просто наблюдать без анализа, доверилась происходящему. В итоге у меня появилось бешеное желание выражать эмоции — как злиться, так и смеяться. В итоге я была лучшим динозавром в семье вчера, сын в восторге, с утра просит показать как динозавр рычит — потом просто ржали с ним сидели. Сжимала полотенце в зубах, такой кайф после. В общем, все это помогло снизить накопившееся напряжение, и я вчера почувствовала, как стала более энергичной. Катюш, ещё раз благодарю тебя.",
      author: "Клиент",
      role: "",
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
