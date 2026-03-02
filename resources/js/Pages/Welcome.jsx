import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
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
    { id: 'eo', icon: UserGroupIcon, color: 'text-primary', bg: 'bg-primary/5', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
    { id: 'show', icon: TicketIcon, color: 'text-secondary', bg: 'bg-secondary/5', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800' },
    { id: 'mice', icon: PresentationChartBarIcon, color: 'text-accent-deep', bg: 'bg-accent-deep/5', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800' },
    { id: 'production', icon: WrenchScrewdriverIcon, color: 'text-accent-fresh', bg: 'bg-accent-fresh/5', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800' },
    { id: 'web', icon: SparklesIcon, color: 'text-primary', bg: 'bg-primary/5', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' }
];

const portfolioItems = [
    { titleEn: 'Global Tech Summit', titleId: 'Pertemuan Teknologi Global', titleJp: 'グローバルテックサミット', category: 'MICE • 2024', image: 'https://images.unsplash.com/photo-1540575861501-7c037137b204?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Neon Lights Festival', titleId: 'Festival Lampu Neon', titleJp: 'ネオンライトフェスティバル', category: 'Show Management • 2023', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Luxury Brand Launch', titleId: 'Peluncuran Brand Mewah', titleJp: 'ラグジュアリーブランドローンチ', category: 'Event Branding • 2024', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Corporate Gala Dinner', titleId: 'Makan Malam Gala Korporat', titleJp: 'コーポレートガラディナー', category: 'EO • 2023', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Digital Innovation Expo', titleId: 'Pameran Inovasi Digital', titleJp: 'デジタルイノベーション展', category: 'Production • 2024', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Influencer Gathering', titleId: 'Pertemuan Influencer', titleJp: 'インフルエンサーギャザリング', category: 'Talent Handling • 2024', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800' },
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
        heroDesc: "Kreativitas yang inovatif, layanan terintegritas dan profesional, dengan plaman dan portofolio yang kuat, efisien dalam eksekusi, kolaborasi yang berberpusat pada klien.",
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

export default function Welcome({ settings }) {
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);
    const [visible, setVisible] = useState({});
    const sectionRefs = useRef({});
    const t = translations[lang] || translations['en'];

    const heroImage = settings?.home_hero_bg || settings?.hero_background_image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000";

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) setVisible(prev => ({ ...prev, [e.target.id]: true }));
            }),
            { threshold: 0.15 }
        );
        Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
        return () => {
            window.removeEventListener('scroll', handleScroll);
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
        else { title = t.serviceWeb; desc = t.serviceWebDesc; }
        return { ...s, title, description: desc };
    });

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head title={t.metaTitle} />

            {/* 1. Hero Section */}
            <section className="relative min-h-[75vh] flex items-center pt-20 overflow-hidden bg-primary">

                {/* Background Image with Parallax */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        className="w-full h-full object-cover opacity-90 grayscale-0"
                        alt="Hero"
                    />
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
                <div className="absolute top-16 right-12 w-80 h-80 bg-secondary/15 rounded-full blur-[110px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-24 left-8 w-96 h-96 bg-secondary/10 rounded-full blur-[130px] animate-pulse pointer-events-none" style={{ animationDelay: '1.2s' }} />
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/5 rounded-full blur-[70px] animate-pulse pointer-events-none" style={{ animationDelay: '2.4s' }} />

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

                <Container className="relative z-10 py-20">
                    <div className="max-w-5xl">
                        <div className="mb-12 max-w-3xl group">
                            <img
                                src="/logo-hitam.png"
                                alt="Sugoi Management 8"
                                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            />
                            {/* Tagline below image */}
                            <div className="mt-4 md:mt-6 flex flex-col items-start translate-x-1 w-fit">
                                <p className="text-lg md:text-2xl lg:text-3xl font-black italic text-white tracking-tight leading-none mb-3 whitespace-nowrap">
                                    Designing Dreams, Crafting Experiences
                                </p>
                                <div className="w-full flex items-center">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shrink-0" />
                                    <div className="h-px md:h-[2px] bg-white grow" />
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shrink-0" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 md:gap-12 mt-12 md:mt-16 transition-all">
                            <div className="grow max-w-xl">
                                <p className="text-sm md:text-base text-white font-medium leading-relaxed drop-shadow-md">
                                    {t.heroDesc}
                                </p>
                            </div>

                            {/* Button + floating stats above it */}
                            <div className="relative shrink-0 w-full sm:w-auto pt-10">
                                {/* Stats badge — floats above button */}
                                <div className="absolute -top-1 left-0 flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2 shadow-lg">
                                    <div className="text-center">
                                        <p className="text-sm font-black text-secondary leading-none">500+</p>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mt-0.5">Events</p>
                                    </div>
                                    <div className="w-px h-6 bg-white/20" />
                                    <div className="text-center">
                                        <p className="text-sm font-black text-white leading-none">10+</p>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mt-0.5">Years</p>
                                    </div>
                                    <div className="w-px h-6 bg-white/20" />
                                    <div className="text-center">
                                        <p className="text-sm font-black text-secondary leading-none">120+</p>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mt-0.5">Partners</p>
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
            <div className="bg-secondary py-4 overflow-hidden relative">
                <div className="flex items-center gap-0 animate-marquee whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
                    {Array(4).fill(null).map((_, i) => (
                        <span key={i} className="flex items-center gap-20 px-20">
                            <span className="text-dark font-black uppercase tracking-widest text-xs">Event Organizer</span>
                            <span className="text-dark/40 text-xl">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-xs">Show Management</span>
                            <span className="text-dark/40 text-xl">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-xs">Service MICE</span>
                            <span className="text-dark/40 text-xl">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-xs">Production</span>
                            <span className="text-dark/40 text-xl">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-xs">Sugoi 8 Management</span>
                            <span className="text-dark/40 text-xl">✦</span>
                        </span>
                    ))}
                </div>
            </div>
            {/* 2. About Section */}
            <section id="about" className="py-16 md:py-24 overflow-hidden bg-white" ref={el => sectionRefs.current['about'] = el}>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Left: Image + Tagline */}
                        <div className={`relative ${fadeIn('about')}`}>
                            <div className="relative z-10 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl group">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" alt="About" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                {/* Overlay gradient on image */}
                                <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                                        ? 'Kreativitas yang inovatif, layanan terintegritas dan profesional, dengan plaman dan portofolio yang kuat, efisien dalam eksekusi, kolaborasi yang berberpusat pada klien.'
                                        : 'Innovative creativity, integrated and professional services, with strong planning and portfolio, efficient in execution, client-centered collaboration.'}
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-[80px] -z-10" />
                        </div>

                        {/* Right: About Content with bullets */}
                        <div className={fadeIn('about', 'delay-200')}>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{t.aboutTag}</span>
                            <h2 className="font-black tracking-tighter leading-none mb-10 uppercase">
                                <span className="block text-3xl md:text-5xl text-secondary">{t.aboutTitle1}</span>
                                <span className="block text-2xl md:text-4xl text-primary">{t.aboutTitle2}</span>
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
                                    { num: '10+', label: t.aboutExp, color: 'text-primary' },
                                    { num: '500+', label: t.aboutEvents, color: 'text-secondary' },
                                    { num: '120+', label: t.aboutPartners, color: 'text-primary' },
                                    { num: '50+', label: t.aboutMinds, color: 'text-secondary' },
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
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">{t.servicesTag}</span>
                            <h2 className="text-4xl md:text-5xl lg:text-[5rem] font-black tracking-tighter mb-8 leading-none uppercase text-dark">
                                {t.servicesTitle}
                            </h2>
                            <p className="text-lg md:text-xl max-w-lg leading-relaxed text-dark/40">
                                {t.servicesDesc}
                            </p>
                        </div>
                        <Button variant="outline" href="/services" className="w-full sm:w-auto text-[10px] tracking-widest py-4 px-10">{t.servicesExplore}</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-20">
                        {services.map((service, idx) => (
                            <div key={service.id} className={`group cursor-pointer ${fadeIn('services', `delay-${(idx % 3) * 100}`)}`}>
                                <div className="aspect-video mb-6 lg:mb-8 overflow-hidden rounded-[30px] md:rounded-[40px] shadow-2xl relative bg-dark">
                                    <img src={service.image} className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" alt={service.title} />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Spotlight hover effect */}
                                    <div className="absolute inset-0 bg-radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,215,131,0.15) 0%, transparent 80%) opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="absolute top-6 left-6 md:top-8 md:left-8">
                                        <div className={`w-12 h-12 md:w-14 md:h-14 ${service.bg} rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                            <service.icon className={`w-6 h-6 md:w-7 md:h-7 ${service.color}`} />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="glass-pill rounded-xl p-3 md:p-4 flex items-center justify-between">
                                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">View Details</span>
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center text-dark">
                                                <span className="text-lg md:text-xl leading-none">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-6 top-0 text-5xl md:text-6xl font-black text-dark/5 leading-none select-none">0{idx + 1}</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-dark mb-4 md:mb-6 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-base md:text-lg leading-relaxed text-dark/50 font-medium italic border-l-2 border-secondary/30 pl-4 md:pl-6">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 4. Portfolio Section */}
            <section id="portfolio" className="py-24 md:py-40 bg-white" ref={el => sectionRefs.current['portfolio'] = el}>
                <Container>
                    <div className={`text-center max-w-3xl mx-auto mb-20 md:mb-32 ${fadeIn('portfolio')}`}>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">{t.portfolioTag}</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter underline decoration-secondary decoration-4 sm:decoration-8 underline-offset-8 text-dark">
                            {t.portfolioTitle1} <span className="italic text-primary">{t.portfolioTitle2}</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 pb-20">
                        {portfolioItems.slice(0, 6).map((item, i) => (
                            <div
                                key={i}
                                className="group cursor-pointer relative"
                            >
                                {/* Image card */}
                                <div className="relative overflow-hidden rounded-[40px] md:rounded-[48px] shadow-2xl group-hover:shadow-secondary/20 transition-all duration-700 bg-dark h-[400px] md:h-[450px] lg:h-[550px]">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 group-hover:rotate-1"
                                        alt={item.category}
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                                    {/* Floating Badges */}
                                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                                        <div className="glass-navbar border-white/20 px-4 py-2 rounded-2xl transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                            <span className="text-secondary text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                                        </div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 bg-linear-to-t from-dark/90 via-dark/20 to-transparent">
                                        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3 opacity-60 group-hover:opacity-100">{item.client} · {item.location}</p>
                                            <h3 className="text-white font-black text-2xl md:text-3xl tracking-tighter leading-none mb-6 group-hover:text-glow-secondary transition-all">
                                                {lang === 'jp' ? item.titleJp : lang === 'id' ? item.titleId : item.titleEn}
                                            </h3>

                                            <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">
                                                <span>View Project</span>
                                                <div className="w-8 h-px bg-white/20 transition-all group-hover:w-16 group-hover:bg-secondary" />
                                                <ArrowUpRightIcon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Featured Glow */}
                                    {item.featured && (
                                        <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-secondary shadow-[0_0_20px_rgba(249,215,131,1)] animate-pulse" />
                                    )}
                                </div>

                                {/* Year Floating */}
                                <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[10rem] font-black text-dark/4 select-none pointer-events-none group-hover:text-secondary/8 transition-all duration-1000 z-10">
                                    {item.year}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>



            {/* 6. Contact Section */}
            <section id="contact" className="py-16 md:py-20 bg-dark">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                                    <div><p className="text-white font-bold text-base md:text-lg mb-1">{t.contactInq}</p><p className="text-slate-400 text-sm">contact@sugoi8.id<br />+62 812 XXXX XXXX</p></div>
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
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .delay-100 { transition-delay: 100ms; }
                .delay-200 { transition-delay: 200ms; }
                .delay-300 { transition-delay: 300ms; }
            `}</style>

        </MainLayout>
    );
}
