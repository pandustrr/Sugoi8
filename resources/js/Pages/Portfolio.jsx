import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import { ArrowUpRightIcon, ChatBubbleLeftEllipsisIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const translations = {
    en: {
        metaTitle: "Portfolio — Sugoi 8 Management",
        heroTag: "Our Creative Journey",
        heroTitle: "PORTFOLIO",
        heroDesc: "A showcase of extraordinary experiences we've crafted for world-class brands and visionary clients.",
        filterAll: "All",
        statsEvents: "Events Delivered",
        statsYears: "Years of Excellence",
        statsClients: "Happy Clients",
        statsCountries: "Countries Reached",
        ctaTitle: "Ready to create your next extraordinary event?",
        ctaDesc: "Let's bring your vision to life with our professional management and creative expertise.",
        ctaBtn: "GET STARTED",
        viewProject: "View Project",
    },
    id: {
        metaTitle: "Portofolio — Sugoi 8 Management",
        heroTag: "Perjalanan Kreatif Kami",
        heroTitle: "PORTOFOLIO",
        heroDesc: "Kumpulan pengalaman luar biasa yang telah kami rancang untuk brand kelas dunia dan klien visioner.",
        filterAll: "Semua",
        statsEvents: "Event Terlaksana",
        statsYears: "Tahun Pengalaman",
        statsClients: "Klien Puas",
        statsCountries: "Negara Terjangkau",
        ctaTitle: "Siap menciptakan event luar biasa berikutnya?",
        ctaDesc: "Wujudkan visi Anda bersama manajemen profesional dan keahlian kreatif kami.",
        ctaBtn: "MULAI SEKARANG",
        viewProject: "Lihat Proyek",
    },
    jp: {
        metaTitle: "実績 — Sugoi 8 Management",
        heroTag: "クリエイティブな歩み",
        heroTitle: "実績",
        heroDesc: "世界クラスのブランドとビジョナリーなクライアントのために創り上げた、卓越した体験の数々。",
        filterAll: "すべて",
        statsEvents: "イベント実績",
        statsYears: "年の経験",
        statsClients: "満足したクライアント",
        statsCountries: "展開国数",
        ctaTitle: "次の特別なイベントを一緒に創りませんか？",
        ctaDesc: "プロのマネジメントとクリエイティブな専門知識で、あなたのビジョンを実現します。",
        ctaBtn: "お問い合わせ",
        viewProject: "プロジェクトを見る",
    }
};

const portfolioItems = [
    {
        titleEn: 'Global Tech Summit',
        titleId: 'Pertemuan Teknologi Global',
        titleJp: 'グローバルテックサミット',
        category: 'MICE',
        year: '2024',
        client: 'TechCorp Asia',
        location: 'Jakarta',
        image: 'https://images.unsplash.com/photo-1540575861501-7c037137b204?auto=format&fit=crop&q=80&w=800',
        featured: true,
    },
    {
        titleEn: 'Neon Lights Festival',
        titleId: 'Festival Lampu Neon',
        titleJp: 'ネオンライトフェスティバル',
        category: 'Show Management',
        year: '2023',
        client: 'NightVibe Productions',
        location: 'Bali',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
        featured: true,
    },
    {
        titleEn: 'Luxury Brand Launch',
        titleId: 'Peluncuran Brand Mewah',
        titleJp: 'ラグジュアリーブランドローンチ',
        category: 'EO',
        year: '2024',
        client: 'Maison Élégance',
        location: 'Jakarta',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
        featured: false,
    },
    {
        titleEn: 'Corporate Gala Dinner',
        titleId: 'Makan Malam Gala Korporat',
        titleJp: 'コーポレートガラディナー',
        category: 'EO',
        year: '2023',
        client: 'Fortune 500 Co.',
        location: 'Surabaya',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
        featured: false,
    },
    {
        titleEn: 'Digital Innovation Expo',
        titleId: 'Pameran Inovasi Digital',
        titleJp: 'デジタルイノベーション展',
        category: 'Production',
        year: '2024',
        client: 'InnovatX',
        location: 'Bandung',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800',
        featured: false,
    },
    {
        titleEn: 'Influencer Gathering',
        titleId: 'Pertemuan Influencer',
        titleJp: 'インフルエンサーギャザリング',
        category: 'Show Management',
        year: '2024',
        client: 'CreatorHub',
        location: 'Jakarta',
        image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800',
        featured: false,
    },
    {
        titleEn: 'Annual Awards Night',
        titleId: 'Malam Penghargaan Tahunan',
        titleJp: 'アニュアルアワードナイト',
        category: 'EO',
        year: '2023',
        client: 'Industry Leaders Assoc.',
        location: 'Jakarta',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
        featured: false,
    },
    {
        titleEn: 'Music Concert Series',
        titleId: 'Seri Konser Musik',
        titleJp: 'ミュージックコンサートシリーズ',
        category: 'Show Management',
        year: '2024',
        client: 'SoundWave Entertainment',
        location: 'Bali',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
        featured: false,
    },
    {
        titleEn: 'International MICE Congress',
        titleId: 'Kongres MICE Internasional',
        titleJp: '国際MICEカンファレンス',
        category: 'MICE',
        year: '2023',
        client: 'Global Business Forum',
        location: 'Jakarta',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
        featured: false,
    },
];

export default function Portfolio() {
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [visible, setVisible] = useState({});
    const sectionRefs = useRef({});

    const t = translations[lang] || translations['en'];

    const categoriesEn = ['All', 'MICE', 'Show Management', 'EO', 'Production'];
    const categoriesId = ['Semua', 'MICE', 'Manajemen Show', 'EO', 'Produksi'];
    const categoriesJp = ['すべて', 'MICE', 'ショーマネジメント', 'EO', '制作'];

    const categories = lang === 'id' ? categoriesId : lang === 'jp' ? categoriesJp : categoriesEn;
    const allLabel = lang === 'id' ? 'Semua' : lang === 'jp' ? 'すべて' : 'All';

    const catMap = {
        'Semua': 'All', 'すべて': 'All',
        'Manajemen Show': 'Show Management', 'ショーマネジメント': 'Show Management',
        'Produksi': 'Production', '制作': 'Production',
    };
    const normalizedFilter = catMap[activeFilter] || activeFilter;

    const filteredItems = normalizedFilter === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === normalizedFilter);

    const getCount = (cat) => {
        const norm = catMap[cat] || cat;
        if (norm === 'All') return portfolioItems.length;
        return portfolioItems.filter(i => i.category === norm).length;
    };

    const getTitle = (item) =>
        lang === 'jp' ? item.titleJp : lang === 'id' ? item.titleId : item.titleEn;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) setVisible(prev => ({ ...prev, [e.target.id]: true }));
            }),
            { threshold: 0.1 }
        );
        Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const fadeIn = (id, delay = '') =>
        `transition-all duration-700 ${delay} ${visible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;



    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head title={t.metaTitle} />

            {/* ── 1. HERO ── */}
            <section className="relative min-h-[480px] pt-32 pb-16 bg-primary overflow-hidden">

                {/* BG photo */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-50 grayscale"
                        alt="Portfolio Hero"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/40 via-primary/10 to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Dot grid */}
                    <div className="absolute inset-0 opacity-[0.08]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Animated Glow Orbs */}
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-accent-fresh/10 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />

                    {/* Vertical Text Branding */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-20">
                        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">Est. 2014</span>
                        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent" />
                    </div>

                    {/* Technical Stripe */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] -skew-x-[20deg] translate-x-1/2" />
                </div>

                {/* ── Main content ── */}
                <Container className="relative z-10">
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 block">
                        {t.heroTag}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 md:mb-10 leading-none text-white">
                        {t.heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed max-w-2xl">
                        {t.heroDesc}
                    </p>
                </Container>
            </section>

            {/* ── 2. MARQUEE STRIP ── */}
            <div className="bg-secondary py-3 overflow-hidden">
                {/* Items duplicated twice so the loop is seamless (translateX -50%) */}
                <div className="flex items-center whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
                    {Array(2).fill(null).map((_, gi) => (
                        <span key={gi} className="flex items-center gap-8 px-8 shrink-0">
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Event Organizer</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Show Management</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">MICE Services</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Production</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Event Branding</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Talent Handling</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Sugoi 8 Management</span>
                            <span className="text-dark/40 text-lg">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── 3. FILTER + GRID ── */}
            <section
                id="portfolio-grid"
                className="py-20 md:py-32 bg-white min-h-screen"
                ref={el => sectionRefs.current['portfolio-grid'] = el}
            >
                <Container>
                    {/* Filter tabs */}
                    <div className={`flex flex-wrap gap-2 md:gap-3 mb-16 md:mb-24 ${fadeIn('portfolio-grid')}`}>
                        {categories.map((cat, idx) => {
                            const isActive = cat === activeFilter;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`group flex items-center gap-2 px-5 md:px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                        : 'bg-light text-dark/40 hover:bg-dark/5 hover:text-dark'
                                        }`}
                                >
                                    {cat}
                                    <span className={`text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black transition-all ${isActive ? 'bg-white/20 text-white' : 'bg-dark/10 text-dark/40'
                                        }`}>
                                        {getCount(cat)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredItems.map((item, i) => (
                            <div
                                key={i}
                                className={`group cursor-pointer ${fadeIn('portfolio-grid', i < 3 ? 'delay-100' : i < 6 ? 'delay-200' : 'delay-300')}`}
                            >
                                {/* Image card */}
                                <div className={`relative overflow-hidden rounded-[28px] md:rounded-[36px] shadow-lg group-hover:shadow-2xl transition-all duration-500 mb-5 ${item.featured ? 'aspect-3/4' : 'aspect-4/5'}`}>
                                    <img
                                        src={item.image}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={getTitle(item)}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Category chip */}
                                    <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="text-dark text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                                    </div>

                                    {/* Year badge */}
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                                        <span className="text-white text-[9px] font-black tracking-widest">{item.year}</span>
                                    </div>

                                    {/* Hover reveal: title + arrow */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                                        <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary mb-1">{item.client} · {item.location}</p>
                                            <h3 className="text-white font-black text-xl md:text-2xl leading-tight mb-3">{getTitle(item)}</h3>
                                            <div className="flex items-center gap-2 text-white/70 text-[10px] font-black uppercase tracking-widest">
                                                <span>{t.viewProject}</span>
                                                <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Featured indicator */}
                                    {item.featured && (
                                        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-secondary animate-ping" />
                                    )}
                                </div>

                                {/* Meta below card */}
                                <div className="px-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-secondary mb-1">{item.category} · {item.year}</p>
                                    <h3 className="text-lg md:text-xl font-black text-dark group-hover:text-primary transition-colors leading-tight">{getTitle(item)}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-32">
                            <p className="text-4xl mb-4">🎭</p>
                            <p className="text-dark/30 font-black uppercase tracking-widest text-sm">No projects in this category yet</p>
                        </div>
                    )}
                </Container>
            </section>

            {/* ── 4. CTA ── */}
            <section
                id="portfolio-cta"
                className="py-24 md:py-32 bg-primary relative overflow-hidden"
                ref={el => sectionRefs.current['portfolio-cta'] = el}
            >
                {/* Decorative orbs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-deep/10 rounded-full blur-[100px] pointer-events-none" />
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }} />

                <Container className="relative z-10">
                    <div className={`max-w-3xl mx-auto text-center ${fadeIn('portfolio-cta')}`}>
                        <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block mb-6">Sugoi 8 Management</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-8">
                            {t.ctaTitle}
                        </h2>
                        <p className="text-white/40 font-medium text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
                            {t.ctaDesc}
                        </p>

                        {/* Contact chips */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://wa.me/6285954464539"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 bg-white/10 hover:bg-secondary hover:text-dark border border-white/20 hover:border-secondary text-white rounded-2xl px-6 py-4 transition-all duration-300"
                            >
                                <ChatBubbleLeftEllipsisIcon className="w-5 h-5 shrink-0" />
                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-80">WhatsApp</p>
                                    <p className="text-sm font-black">0859-5446-4539</p>
                                </div>
                                <ArrowUpRightIcon className="w-4 h-4 ml-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            <a
                                href="mailto:hello@sugoi8.com"
                                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl px-6 py-4 transition-all duration-300"
                            >
                                <EnvelopeIcon className="w-5 h-5 shrink-0" />
                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Email</p>
                                    <p className="text-sm font-black">hello@sugoi8.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 text-white/50 rounded-2xl px-6 py-4">
                                <MapPinIcon className="w-5 h-5 shrink-0" />
                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Office</p>
                                    <p className="text-sm font-black">Kab. Jember, Jawa Timur</p>
                                </div>
                            </div>
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
