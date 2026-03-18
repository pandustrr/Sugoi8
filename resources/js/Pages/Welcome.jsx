import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { useLang } from '../hooks/useLang';
import Container from '../Components/UI/Container';
import TextRun from '../Components/UI/TextRun';
import Button from '../Components/UI/Button';
import {
    SparklesIcon,
    RocketLaunchIcon,
    UserGroupIcon,
    PresentationChartBarIcon,
    TicketIcon,
    WrenchScrewdriverIcon,
    PhotoIcon,
    HandRaisedIcon,
    InformationCircleIcon,
    PlayCircleIcon,
    MoonIcon,
    SunIcon,
    ArrowUpRightIcon
} from '@heroicons/react/24/outline';

const servicesList = [
    { id: 'eo', icon: UserGroupIcon, color: 'text-primary', bg: 'bg-primary/5', settingKey: 'service_img_event_organizer', defaultImg: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" },
    { id: 'show', icon: TicketIcon, color: 'text-secondary', bg: 'bg-secondary/5', settingKey: 'service_img_show_management', defaultImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800" },
    { id: 'mice', icon: PresentationChartBarIcon, color: 'text-accent-deep', bg: 'bg-accent-deep/5', settingKey: 'service_img_mice', defaultImg: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" },
    { id: 'production', icon: WrenchScrewdriverIcon, color: 'text-accent-fresh', bg: 'bg-accent-fresh/5', settingKey: 'service_img_production', defaultImg: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800" },
    { id: 'digital', icon: SparklesIcon, color: 'text-primary', bg: 'bg-primary/5', settingKey: 'service_img_digital', defaultImg: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" }
];

const translations = {
    en: {
        metaTitle: "Sugoi 8 Management - Designing Dreams & Crafting Experiences",
        heroTag: "Designing Dreams & Crafting Experiences",
        heroTitle1: "SUGOI 8",
        heroTitle2: "MANAGEMENT",
        heroDesc: "Innovative creativity, integrated and professional services, with strong planning and portfolio, efficient in execution, client-centered collaboration.",
        heroBtn: "GET STARTED",
        heroShowreel: "Watch Showreel",
        aboutTag: "What is",
        aboutTitle1: "SUGOI 8",
        aboutTitle2: "MANAGEMENT",
        aboutBullets: [
            'We are here to make your dreams a reality in an extraordinary event.',
            'Total solution for your dream event, from concept to execution — and everyone says "Sugoi"',
            'Creating event branding that is memorable and inspiring.',
            'MICE solutions with a touch of innovation, creativity, and professionalism.',
            'Building shows and celebrations into spectacular experiences.',
        ],
        aboutTagline: "CREATIVITY & HARD WORK",
        aboutExp: "Years of Experience",
        aboutEvents: "Successful Events",
        aboutPartners: "Global Partners",
        aboutMinds: "Creative Minds",
        servicesTag: "WHAT WE DO",
        servicesTitle: "INTEGRATED SERVICE",
        servicesDesc: "We bridge creativity and technology to deliver unforgettable moments.",
        servicesExplore: "EXPLORE ALL",
        serviceEo: "Event Organizer",
        serviceEoDesc: "Professional planning and exhibition for corporate and brand activation.",
        serviceShow: "Show Management",
        serviceShowDesc: "Elite managing of performances, talent handling, and stage management.",
        serviceMice: "Service MICE",
        serviceMiceDesc: "Expert meetings, incentives, conventions, and exhibitions for global brands.",
        serviceProd: "Production",
        serviceProdDesc: "Technical support including sound, lighting, LED, and stage construction.",
        serviceWeb: "Digital Solutions",
        serviceWebDesc: "Professional web development, landing pages, and digital systems tailored for your brand.",
        portfolioTag: "PORTFOLIO",
        portfolioTitle1: "LATEST",
        portfolioTitle2: "PROJECTS",
        ctaTitle: "READY TO CREATE THE UNFORGETTABLE?",
        ctaDesc: "Let's discuss how we can bring your next vision to life with professional management.",
        ctaBtn: "START CONVERSATION",
        contactTag: "CONTACT US",
        contactTitle: "Let's Build Something Great.",
        contactOffice: "Visit Our Office",
        contactOfficeDesc: "Jl. Piere Tendean, Sumber Beringin, Karangrejo, Kec. Sumbersari, Kab. Jember, Jawa Timur 68124.",
        contactInq: "General Inquiries",
        contactFormTitle: "Send us a message",
        formName: "Your Name",
        formEmail: "Your Email",
        formService: "Select Service",
        formMessage: "How can we help?",
        formBtn: "Send Message",
    },
    id: {
        metaTitle: "Sugoi 8 Management - Mewujudkan Mimpi & Merancang Pengalaman",
        heroTag: "Mewujudkan Mimpi & Merancang Pengalaman",
        heroTitle1: "SUGOI 8",
        heroTitle2: "MANAGEMENT",
        heroDesc: "Kreativitas inovatif, layanan profesional terintegrasi dengan portofolio kuat. Efisien dalam eksekusi dan kolaborasi yang berpusat pada kepuasan klien.",
        heroBtn: "MULAI SEKARANG",
        // heroShowreel: "Lihat Showreel",
        aboutTag: "Apa itu",
        aboutTitle1: "SUGOI 8",
        aboutTitle2: "MANAGEMENT",
        aboutBullets: [
            'Kami hadir untuk mewujudkan mimpi anda menjadi event yang luar biasa.',
            'Solusi total untuk event impian anda, dari konsep hingga eksekusi dan semua berkata "Sugoi"',
            'Mewujudkan branding event yang berkesan dan menginspirasi.',
            'MICE solutions dengan sentuhan inovasi, kreativitas, dan profesionalisme.',
            'Membangun pertunjukan dan perayaan menjadi spektakuler.',
        ],
        aboutTagline: "KREATIVITAS & KERJA KERAS",
        aboutExp: "Tahun Pengalaman",
        aboutEvents: "Acara Berhasil",
        aboutPartners: "Mitra Global",
        aboutMinds: "Pikiran Kreatif",
        servicesTag: "APA YANG KAMI LAKUKAN",
        servicesTitle: "LAYANAN TERPADU",
        servicesDesc: "Kami menjembatani kreativitas dan teknologi untuk memberikan momen yang tak terlupakan.",
        servicesExplore: "LIHAT SEMUA",
        serviceEo: "Penyelenggara Acara",
        serviceEoDesc: "Perencanaan profesional dan pameran untuk korporat dan aktivasi brand.",
        serviceShow: "Manajemen Pertunjukan",
        serviceShowDesc: "Manajemen pertunjukan elit, penanganan talenta, dan manajemen panggung.",
        serviceMice: "Layanan MICE",
        serviceMiceDesc: "Pertemuan ahli, insentif, konvensi, dan pameran untuk brand global.",
        serviceProd: "Produksi",
        serviceProdDesc: "Dukungan teknis termasuk suara, tata cahaya, LED, dan panggung.",
        serviceWeb: "Solusi Digital",
        serviceWebDesc: "Pembuatan website profesional, landing page, dan sistem digital khusus untuk brand Anda.",
        portfolioTag: "PORTOFOLIO",
        portfolioTitle1: "PROYEK",
        portfolioTitle2: "TERBARU",
        ctaTitle: "SIAP MEWUJUDKAN HAL YANG LUAR BIASA?",
        ctaDesc: "Mari diskusikan bagaimana kami bisa menghidupkan visi Anda berikutnya dengan manajemen profesional.",
        ctaBtn: "MULAI KONSULTASI",
        contactTag: "HUBUNGI KAMI",
        contactTitle: "Mari Bangun Sesuatu yang Hebat.",
        contactOffice: "Kunjungi Kantor Kami",
        contactOfficeDesc: "Jl. Piere Tendean, Sumber Beringin, Karangrejo, Kec. Sumbersari, Kab. Jember, Jawa Timur 68124.",
        contactInq: "Pertanyaan Umum",
        contactFormTitle: "Kirim pesan kepada kami",
        formName: "Nama Anda",
        formEmail: "Email Anda",
        formService: "Pilih Layanan",
        formMessage: "Bagaimana kami bisa membantu?",
        formBtn: "Kirim Pesan",
    },
    jp: {
        metaTitle: "Sugoi 8 Management - 夢を形に、体験を創る",
        heroTag: "夢を形に、体験を創る",
        heroTitle1: "SUGOI 8",
        heroTitle2: "MANAGEMENT",
        heroDesc: "革新的なクリエイティビティ、一体化されたプロフェッショナルなサービス、強固な計画と実績、効率的な実行、クライアント中心のコラボレーション。",
        heroBtn: "お問い合わせ",
        heroShowreel: "ショーリールを見る",
        aboutTag: "について",
        aboutTitle1: "SUGOI 8",
        aboutTitle2: "MANAGEMENT",
        aboutBullets: [
            'お客様の夢を素晴らしいイベントとして実現するためにここにいます。',
            '概念から実行まで、全てが「Sugoi！」と言えるイベントのトータルソリューション。',
            '記憶に残り、インスピレーションを与えるイベントブランディングを実現。',
            'イノベーション、クリエイティビティ、プロのタッチを加えたMICEソリューション。',
            'ショーやセレモニーを壮大なスペクタクルに変えるプロを目指す。',
        ],
        aboutTagline: "クリエイティビティ & ハードワーク",
        aboutExp: "年の実績",
        aboutEvents: "成功イベント",
        aboutPartners: "グローバルパートナー",
        aboutMinds: "クリエイター",
        servicesTag: "サービス内容",
        servicesTitle: "総合サービス",
        servicesDesc: "クリエイティビティと技術を結び、忘れられない体験を届けます。",
        servicesExplore: "すべて見る",
        serviceEo: "イベントオーガナイザー",
        serviceEoDesc: "企業・ブランド活性化のプロの企画・展示。",
        serviceShow: "ショーマネジメント",
        serviceShowDesc: "タレント管理、ステージマネジメント。",
        serviceMice: "MICEサービス",
        serviceMiceDesc: "会議、インセンティブ、展示会の専門サポート。",
        serviceProd: "制作・機材",
        serviceProdDesc: "音響、照明、LED、ステージ設置が伴う技術サポート。",
        serviceWeb: "デジタルソリューション",
        serviceWebDesc: "ブランドに合わせたプロのウェブ開発、ランディングページ、デジタルシステムの構築。",
        portfolioTag: "実績",
        portfolioTitle1: "最新",
        portfolioTitle2: "プロジェクト",
        ctaTitle: "最高の体験を実現する準備はできていますか？",
        ctaDesc: "次のビジョンをプロのマネジメントで実現するため、一緒にご相談しましょう。",
        ctaBtn: "お問い合わせはこちら",
        contactTag: "お問い合わせ",
        contactTitle: "一緒に素晴らしいものを作りましょう。",
        contactOffice: "オフィスへのアクセス",
        contactOfficeDesc: "ジャカルタ、インドネシア - クリエイターの集う動的なハブ。",
        contactInq: "一般お問い合わせ",
        contactFormTitle: "メッセージを送る",
        formName: "お名前",
        formEmail: "メールアドレス",
        formService: "サービスを選ぶ",
        formMessage: "どのようなお手伝いができますか？",
        formBtn: "送信する",
    }
};

export default function Welcome({ portfolioItems: dbPortfolio = [], partners = [] }) {
    const { settings } = usePage().props;
    const [lang, setLang] = useLang('en');
    const [darkMode, setDarkMode] = useState(false);
    const [visible, setVisible] = useState({});
    const sectionRefs = useRef({});
    const t = translations[lang] || translations['en'];

    const heroImage = settings?.home_hero_bg || settings?.hero_background_image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000";

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) setVisible(prev => ({ ...prev, [e.target.id]: true }));
            }),
            { threshold: 0.15 }
        );
        Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
        return () => {
            observer.disconnect();
        };
    }, []);

    const fadeIn = (id, delay = '') => `transition-all duration-700 ${delay} ${visible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`;

    const services = servicesList.map(s => {
        let title, desc;
        if (s.id === 'eo') { title = t.serviceEo; desc = t.serviceEoDesc; }
        else if (s.id === 'show') { title = t.serviceShow; desc = t.serviceShowDesc; }
        else if (s.id === 'mice') { title = t.serviceMice; desc = t.serviceMiceDesc; }
        else if (s.id === 'production') { title = t.serviceProd; desc = t.serviceProdDesc; }
        else if (s.id === 'digital') { title = t.serviceWeb; desc = t.serviceWebDesc; }

        // Dynamic content from settings
        const settingTitleKey = `service_title_${s.id}_${lang}`;
        const settingDescKey = `service_desc_${s.id}_${lang}`;
        const image = settings?.[s.settingKey] || s.defaultImg;

        return {
            ...s,
            title: settings?.[settingTitleKey] || title,
            description: settings?.[settingDescKey] || desc,
            image
        };
    });

    // Portfolio: pakai data DB jika ada, fallback ke data statis
    const displayPortfolio = dbPortfolio.length > 0 ? dbPortfolio : [];

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head>
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.heroDesc} />
                <meta name="keywords" content="sugoi 8 management, event organizer jember, show management indonesia, mice services, production stage" />

                {/* Social Media Meta Tags */}
                <meta property="og:title" content={t.metaTitle} />
                <meta property="og:description" content={t.heroDesc} />
                <meta property="og:image" content="https://sugoi8management.com/8-sugoi-trans.png" />
                <meta property="og:url" content="https://sugoi8management.com" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* 1. Hero Section */}
            <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center pt-16 md:pt-20 overflow-hidden bg-primary">

                {/* Background Media with Parallax */}
                <div className="absolute inset-0 z-0">
                    {heroImage?.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                        <video
                            src={heroImage}
                            className="w-full h-full object-cover opacity-90"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={heroImage}
                            className="w-full h-full object-cover opacity-90 grayscale-0"
                            alt="Hero"
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
                </div>

                {/* ── Dot grid ── */}
                <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }} />

                {/* ── Diagonal lines band (top-right) ── */}
                <div className="absolute top-0 right-0 w-[55%] h-full opacity-[0.035] pointer-events-none overflow-hidden">
                    {Array(24).fill(null).map((_, i) => (
                        <div key={i} className="absolute bg-white" style={{
                            width: '1px', height: '160%',
                            left: `${i * 4.5}%`, top: '-30%',
                            transform: 'rotate(18deg)',
                            transformOrigin: 'top left'
                        }} />
                    ))}
                </div>

                {/* ── Orbs ── */}
                <div className="absolute top-16 right-12 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-pulse pointer-events-none transform-gpu" />
                <div className="absolute bottom-24 left-8 w-96 h-96 bg-secondary/10 rounded-full blur-[110px] animate-pulse pointer-events-none transform-gpu" style={{ animationDelay: '1.2s' }} />
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/5 rounded-full blur-[60px] animate-pulse pointer-events-none transform-gpu" style={{ animationDelay: '2.4s' }} />

                {/* ── Animated concentric rings (bottom-right corner) ── */}
                <div className="absolute bottom-0 right-[-40px] pointer-events-none hidden lg:block">
                    <div className="relative w-80 h-80 opacity-[0.08]">
                        <div className="absolute inset-0 rounded-full border-2 border-secondary animate-ping" style={{ animationDuration: '4s' }} />
                        <div className="absolute inset-8 rounded-full border border-white animate-ping" style={{ animationDuration: '4s', animationDelay: '0.8s' }} />
                        <div className="absolute inset-16 rounded-full border border-secondary animate-ping" style={{ animationDuration: '4s', animationDelay: '1.6s' }} />
                        <div className="absolute inset-24 rounded-full border border-white/50" />
                    </div>
                </div>

                {/* Floating Ticket Badge (large ghost) */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-[20rem] font-black text-white/2.5 uppercase leading-none select-none tracking-tighter">
                    TIC
                </div>

                {/* ── Giant ghost word (right side) with animation ── */}
                <div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 font-black text-[12rem] md:text-[18rem] lg:text-[24rem] leading-none text-white/5 select-none pointer-events-none tracking-tighter uppercase hidden md:block"
                    style={{ transform: `translateY(${-50 + scrollY * 0.05}%) translateX(${scrollY * 0.02}px)` }}
                >
                    SUGOI
                </div>

                {/* ── Vertical label (far left) ── */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 pointer-events-none">
                    <div className="w-px h-16 bg-white/15" />
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/15 rotate-90 whitespace-nowrap origin-center">
                        Est. 2014 · Jember
                    </p>
                    <div className="w-px h-16 bg-white/15" />
                </div>

                {/* ── Floating service chips (right side, mid) ── */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 pointer-events-none">
                    {['Event Organizer', 'Show Management', 'MICE Services', 'Production'].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2" style={{ opacity: 1 - i * 0.15 }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/35">{s}</span>
                        </div>
                    ))}
                </div>

                {/* ── Corner bracket decoration (top-right) ── */}
                <div className="absolute top-24 right-8 hidden lg:block pointer-events-none opacity-10">
                    <div className="w-10 h-10 border-t-2 border-r-2 border-secondary rounded-tr-lg" />
                </div>
                <div className="absolute bottom-8 left-8 hidden lg:block pointer-events-none opacity-10">
                    <div className="w-10 h-10 border-b-2 border-l-2 border-white rounded-bl-lg" />
                </div>

                {/* ── Horizontal scroll cue (bottom center) ── */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none opacity-30">
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white">Scroll</p>
                    <div className="w-px h-8 bg-white/40 animate-bounce" />
                </div>

                <Container className="relative z-10 py-12 md:py-20">
                    <div className="max-w-5xl">
                        <div className="mb-8 md:mb-12 max-w-3xl group">
                            <img
                                src="/logo-hitam.png"
                                alt="Sugoi Management 8"
                                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            />
                            {/* Tagline below image */}
                            <div className="mt-3 md:mt-6 flex flex-col items-start translate-x-1 w-fit">
                                <h1 className="text-sm md:text-2xl lg:text-3xl font-black italic text-white tracking-tight leading-none mb-2 md:mb-3 whitespace-nowrap">
                                    Sugoi 8 Management — Designing Dreams, Crafting Experiences
                                </h1>
                                <div className="w-full flex items-center">
                                    <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white shrink-0" />
                                    <div className="h-px md:h-[2px] bg-white grow" />
                                    <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white shrink-0" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10 md:gap-14 lg:gap-12 mt-12 md:mt-20 lg:mt-16 transition-all">
                            <div className="grow max-w-2xl">
                                <p className="text-sm md:text-lg lg:text-base text-white font-medium leading-relaxed drop-shadow-md">
                                    {t.heroDesc}
                                </p>
                            </div>

                            {/* Button + floating stats above it */}
                            <div className="relative shrink-0 w-full sm:w-auto pt-10">
                                {/* Stats badge — floats above button */}
                                <div className="absolute -top-4 left-0 right-0 sm:right-auto flex items-center justify-between sm:justify-start gap-3 md:gap-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 shadow-lg scale-90 sm:scale-100 origin-left">
                                    <div className="text-center px-1">
                                        <p className="text-xs md:text-sm font-black text-secondary leading-none">{settings?.stat_events || "500+"}</p>
                                        <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-white/50 mt-0.5">Events</p>
                                    </div>
                                    <div className="w-px h-5 md:h-6 bg-white/20" />
                                    <div className="text-center px-1">
                                        <p className="text-xs md:text-sm font-black text-white leading-none">{settings?.stat_years || "10+"}</p>
                                        <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-white/50 mt-0.5">Years</p>
                                    </div>
                                    <div className="w-px h-5 md:h-6 bg-white/20" />
                                    <div className="text-center px-1">
                                        <p className="text-xs md:text-sm font-black text-secondary leading-none">{settings?.stat_partners || "120+"}</p>
                                        <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-white/50 mt-0.5">Partners</p>
                                    </div>
                                </div>

                                <Button variant="secondary" href="/about" className="w-full sm:w-auto px-12 py-5 h-16 flex items-center justify-center gap-3 text-xs tracking-widest">
                                    <RocketLaunchIcon className="w-5 h-5" />
                                    {t.heroBtn}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Marquee Strip */}
            <TextRun className="bg-secondary py-4" />
            {/* 2. About Section */}
            <section id="about" className="py-20 md:py-32 overflow-hidden bg-white" ref={el => sectionRefs.current['about'] = el}>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-24 items-center">
                        {/* Left: Image + Tagline */}
                        <div className={`relative max-w-lg mx-auto lg:mx-0 ${fadeIn('about')}`}>
                            <div className="space-y-4 md:space-y-5 relative z-10">
                                {/* Main Image */}
                                <div className="rounded-[28px] md:rounded-[40px] overflow-hidden shadow-2xl aspect-video group">
                                    <img
                                        src={settings?.home_about_main || settings?.home_about_img || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"}
                                        alt="Main Gallery"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Secondary Images Row */}
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl aspect-square group">
                                        <img
                                            src={settings?.home_about_sub_1 || "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"}
                                            alt="Sub Gallery 1"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl aspect-square group">
                                        <img
                                            src={settings?.home_about_sub_2 || "https://images.unsplash.com/photo-1522071823991-b9671f903f7f?auto=format&fit=crop&q=80&w=800"}
                                            alt="Sub Gallery 2"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Decorative dot accent */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-4 border-secondary/20 pointer-events-none" />
                            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-secondary/30 blur-md pointer-events-none" />
                            {/* CREATIVITY & HARD WORK tagline */}
                            <div className="mt-8">
                                <p className="font-black text-xl md:text-2xl uppercase text-gradient-logo tracking-tight">
                                    {t.aboutTagline}
                                </p>
                                <p className="text-dark/50 text-sm md:text-base font-medium mt-3 leading-relaxed">
                                    {lang === 'id'
                                        ? 'Kreativitas yang inovatif, layanan terintegrasi dan profesional, dengan pengalaman dan portofolio yang kuat, efisien dalam eksekusi, kolaborasi yang berpusat pada klien.'
                                        : 'Innovative creativity, integrated and professional services, with strong planning and portfolio, efficient in execution, client-centered collaboration.'}
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-[80px] -z-10" />
                        </div>

                        {/* Right: About Content with bullets */}
                        <div className={fadeIn('about', 'delay-200')}>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{t.aboutTag}</span>
                            <h2 className="font-black tracking-tighter leading-none mb-6 md:mb-8 lg:mb-10 uppercase">
                                <span className="block text-2xl md:text-3xl lg:text-5xl text-secondary">{t.aboutTitle1}</span>
                                <span className="block text-xl md:text-2xl lg:text-4xl text-primary">{t.aboutTitle2}</span>
                            </h2>
                            <ul className="space-y-4 mb-12">
                                {t.aboutBullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3 group">
                                        <span className="text-secondary text-lg shrink-0 mt-0.5 group-hover:scale-125 transition-transform">✦</span>
                                        <p className="text-dark/70 font-medium text-sm md:text-base leading-relaxed group-hover:text-dark transition-colors">{bullet}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-dark/5">
                                {[
                                    { num: settings?.stat_years || '10+', label: t.aboutExp, color: 'text-primary' },
                                    { num: settings?.stat_events || '500+', label: t.aboutEvents, color: 'text-secondary' },
                                    { num: settings?.stat_partners || '120+', label: t.aboutPartners, color: 'text-primary' },
                                    { num: settings?.stat_minds || '50+', label: t.aboutMinds, color: 'text-secondary' },
                                ].map((stat, i) => (
                                    <div key={i} className="group cursor-default">
                                        <p className={`text-3xl md:text-4xl font-black ${stat.color} mb-1 group-hover:scale-110 transition-transform inline-block`}>{stat.num}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-dark/40">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 3. Services Section */}
            <section id="services" className="py-24 md:py-40 bg-light/50" ref={el => sectionRefs.current['services'] = el}>
                <Container>
                    <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 md:mb-32 ${fadeIn('services')}`}>
                        <div className="max-w-2xl">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] block mb-4 md:mb-6">{t.servicesTag}</span>
                            <h2 className="text-3xl md:text-5xl lg:text-[5rem] font-black tracking-tighter mb-6 md:mb-8 leading-none uppercase text-dark">
                                {settings?.[`services_title_${lang}`] || t.servicesTitle}
                            </h2>
                            <p className="text-sm md:text-xl max-w-lg leading-relaxed text-dark/40">
                                {settings?.[`services_desc_${lang}`] || t.servicesDesc}
                            </p>
                        </div>
                        <Button variant="outline" href="/services" className="w-full sm:w-auto text-[10px] tracking-widest py-4 px-10">{t.servicesExplore}</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-20">
                        {services.map((service, idx) => (
                            <Link
                                href="/services"
                                key={service.id}
                                className={`group cursor-pointer block ${fadeIn('services', `delay-${(idx % 3) * 100}`)}`}
                            >
                                <div className="aspect-video mb-5 lg:mb-8 overflow-hidden rounded-[24px] md:rounded-[40px] shadow-2xl relative bg-dark">
                                    <img src={service.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={service.title} />

                                    {/* Spotlight hover effect */}
                                    <div className="absolute inset-0 bg-radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,215,131,0.15) 0%, transparent 80%) opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="absolute top-4 left-4 md:top-8 md:left-8">
                                        <div className={`w-10 h-10 md:w-14 md:h-14 ${service.bg} rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                            <service.icon className={`w-5 h-5 md:w-7 md:h-7 ${service.color}`} />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="glass-pill rounded-lg md:rounded-xl p-2 md:p-4 flex items-center justify-between">
                                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">View Details</span>
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center text-dark">
                                                <span className="text-base md:text-xl leading-none">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-4 md:-left-6 top-0 text-4xl md:text-6xl font-black text-dark/5 leading-none select-none">0{idx + 1}</span>
                                    <h3 className="text-xl md:text-3xl font-black text-dark mb-3 md:mb-6 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm md:text-lg leading-relaxed text-dark/50 font-medium italic border-l-2 border-secondary/30 pl-4 md:pl-6">
                                        {service.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 4. Portfolio Section */}
            <section id="portfolio" className="py-24 md:py-40 bg-white" ref={el => sectionRefs.current['portfolio'] = el}>
                <Container>
                    <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-32 ${fadeIn('portfolio')}`}>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] block mb-4 md:mb-6">{t.portfolioTag}</span>
                        <h2 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter underline decoration-secondary decoration-4 sm:decoration-8 underline-offset-8 text-dark px-4">
                            {t.portfolioTitle1} <span className="italic text-primary">{t.portfolioTitle2}</span>
                        </h2>
                    </div>
                    {displayPortfolio.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pb-20">
                            {displayPortfolio.slice(0, 6).map((item, i) => (
                                <div key={item.id || i} className="group cursor-pointer relative">
                                    <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl group-hover:shadow-secondary/20 transition-all duration-700 bg-dark aspect-video">
                                        {item.image && <img src={item.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-[1.03]" alt={item.title} />}

                                        <div className="absolute top-6 left-6 flex flex-col gap-3">
                                            <div className="glass-navbar border-white/20 px-4 py-2 rounded-2xl transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                                <span className="text-secondary text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 bg-linear-to-t from-dark/90 via-dark/20 to-transparent">
                                            <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3 opacity-60 group-hover:opacity-100">
                                                    {[item.client, item.location].filter(Boolean).join(' · ')}
                                                </p>
                                                <h3 className="text-white font-black text-lg md:text-2xl tracking-tighter leading-none mb-3 md:mb-4 group-hover:text-glow-secondary transition-all">
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">
                                                    <span>View Project</span>
                                                    <div className="w-8 h-px bg-white/20 transition-all group-hover:w-16 group-hover:bg-secondary" />
                                                    <ArrowUpRightIcon className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <p className="text-5xl mb-4">🎭</p>
                            <p className="text-dark/20 font-black uppercase tracking-widest text-sm">Portofolio segera hadir</p>
                        </div>
                    )}
                    {displayPortfolio.length > 0 && (
                        <div className="text-center mt-12">
                            <Button variant="outline" href="/portfolio" className="px-12 py-4 text-[10px] tracking-widest">Lihat Semua →</Button>
                        </div>
                    )}

                </Container>
            </section>



            {/* 5. Partners Section */}
            {partners.length > 0 && (
                <section id="partners" className="py-20 md:py-32 bg-light/40 overflow-hidden" ref={el => sectionRefs.current['partners'] = el}>
                    <Container>
                        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 ${fadeIn('partners')}`}>
                            <div>
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">
                                    {lang === 'id' ? 'MITRA KAMI' : lang === 'jp' ? 'パートナー' : 'OUR PARTNERS'}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-dark leading-none">
                                    {lang === 'id' ? 'Dipercaya Oleh' : lang === 'jp' ? '信頼のパートナー' : 'TRUSTED BY'}
                                    <span className="text-secondary"> {partners.length}+</span>
                                </h2>
                            </div>
                            <Button variant="outline" href="/partners" className="shrink-0 text-[10px] tracking-widest px-8 py-3">
                                {lang === 'id' ? 'Lihat Semua Mitra' : lang === 'jp' ? 'すべて見る' : 'View All Partners'} →
                            </Button>
                        </div>

                        {/* Logo scroll strip */}
                        <div className="relative overflow-hidden">
                            {/* Fade edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-light/40 to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-light/40 to-transparent z-10 pointer-events-none" />

                            <div className="flex gap-6 items-center" style={{ animation: partners.length > 4 ? 'marquee 30s linear infinite' : 'none' }}>
                                {(partners.length > 4 ? [...partners, ...partners] : partners).map((partner, i) => (
                                    <div
                                        key={i}
                                        className="shrink-0 bg-white rounded-[24px] border border-dark/5 hover:border-secondary/30 hover:shadow-lg p-5 flex flex-col items-center justify-center gap-3 group transition-all duration-500 hover:scale-105 cursor-default"
                                        style={{ width: '140px', minHeight: '120px' }}
                                    >
                                        {partner.logo ? (
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="max-h-12 max-w-[100px] object-contain group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="text-[9px] font-black uppercase tracking-widest text-dark/20 text-center leading-relaxed">{partner.name}</div>
                                        )}
                                        <p className="text-[8px] font-black uppercase tracking-widest text-dark/30 text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            {partner.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* 6. Contact Section */}
            <section id="contact" className="py-20 md:py-32 bg-dark">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <span className="text-secondary font-black uppercase tracking-widest text-[10px] md:text-xs block mb-4">{t.contactTag}</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-none">
                                {t.contactTitle}
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                <div className="flex gap-4 md:gap-5 items-start">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0"><HandRaisedIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" /></div>
                                    <div><p className="text-white font-bold text-base md:text-lg mb-1">{t.contactOffice}</p><p className="text-slate-400 text-sm">{t.contactOfficeDesc}</p></div>
                                </div>
                                <div className="flex gap-4 md:gap-5 items-start">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0"><InformationCircleIcon className="w-5 h-5 md:w-6 md:h-6 text-secondary" /></div>
                                    <div><p className="text-white font-bold text-base md:text-lg mb-1">{t.contactInq}</p><p className="text-slate-400 text-sm">{settings?.contact_email || 'hello@sugoi8.id'}<br />+{settings?.contact_wa || '0859-5446-4539'}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-6 md:p-10 rounded-[28px] md:rounded-[32px] border border-white/10">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-6">{t.contactFormTitle}</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" placeholder={t.formName} className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white focus:border-primary outline-none transition-colors text-sm" />
                                    <input type="email" placeholder={t.formEmail} className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white focus:border-primary outline-none transition-colors text-sm" />
                                </div>
                                <textarea rows="3" placeholder={t.formMessage} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white focus:border-primary outline-none transition-colors resize-none text-sm"></textarea>
                                <Button variant="primary" className="w-full h-12 md:h-14 text-xs font-black tracking-widest rounded-xl">{t.formBtn}</Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CSS for marquee animation */}
            <style>{`
                .delay-100 { transition-delay: 100ms; }
                .delay-200 { transition-delay: 200ms; }
                .delay-300 { transition-delay: 300ms; }
            `}</style>

        </MainLayout>
    );
}
