import { useState, useEffect, useRef } from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import TextRun from '../Components/UI/TextRun';
import { ArrowUpRightIcon, ChatBubbleLeftEllipsisIcon, EnvelopeIcon, MapPinIcon, XMarkIcon, MapPinIcon as LocationIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

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
        noProject: "No projects in this category yet",
        client: "Client",
        location: "Location",
        year: "Year",
        category: "Category",
        description: "About This Project",
        closeModal: "Close",
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
        noProject: "Belum ada proyek di kategori ini",
        client: "Klien",
        location: "Lokasi",
        year: "Tahun",
        category: "Kategori",
        description: "Tentang Proyek Ini",
        closeModal: "Tutup",
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
        noProject: "このカテゴリにはまだプロジェクトがありません",
        client: "クライアント",
        location: "場所",
        year: "年",
        category: "カテゴリ",
        description: "プロジェクトについて",
        closeModal: "閉じる",
    }
};

// Modal detail portofolio
function PortfolioDetailModal({ item, onClose, t }) {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark/70 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            {/* Modal Content */}
            <div className="relative bg-white w-full sm:max-w-xl sm:rounded-[32px] rounded-t-[32px] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 max-h-[85vh] overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                {/* Hero Image */}
                <div className="relative aspect-video">
                    <img
                        src={item.image}
                        className="w-full h-full object-cover"
                        alt={item.title}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="fixed sm:absolute top-4 right-4 z-20 w-8 h-8 md:w-9 md:h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/40 transition-all border border-white/20"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>

                    {/* Featured badge */}
                    {item.featured && (
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-amber-400 text-dark text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full">
                            <StarSolid className="w-2.5 h-2.5" /> Featured
                        </div>
                    )}

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <span className="text-secondary text-[8px] font-black uppercase tracking-[0.4em] block mb-1.5">{item.category}</span>
                        <h2 className="text-white font-black text-xl md:text-2xl tracking-tighter leading-tight italic">{item.title}</h2>
                    </div>
                </div>

                {/* Details */}
                <div className="p-5 md:p-6 space-y-5">
                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2">
                        {item.client && (
                            <div className="flex items-center gap-2 bg-light rounded-xl px-3 py-1.5">
                                <span className="text-[7px] font-black text-dark/30 uppercase tracking-widest leading-none">{t.client}</span>
                                <span className="text-[9px] font-black text-dark leading-none">{item.client}</span>
                            </div>
                        )}
                        {item.location && (
                            <div className="flex items-center gap-2 bg-light rounded-xl px-3 py-1.5">
                                <LocationIcon className="w-3 h-3 text-dark/30" />
                                <span className="text-[9px] font-black text-dark leading-none">{item.location}</span>
                            </div>
                        )}
                        {item.year && (
                            <div className="flex items-center gap-2 bg-light rounded-xl px-3 py-1.5">
                                <span className="text-[7px] font-black text-dark/30 uppercase tracking-widest leading-none">{t.year}</span>
                                <span className="text-[9px] font-black text-dark leading-none">{item.year}</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {item.description && (
                        <div className="space-y-3">
                            <h3 className="text-[8px] font-black text-dark/30 uppercase tracking-widest">{t.description}</h3>
                            <div className="bg-light/50 border border-dark/5 rounded-[20px] p-4 md:p-5">
                                <p className="text-dark/70 font-medium leading-relaxed text-[11px] md:text-sm whitespace-pre-line">{item.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Close Trigger Button (Optional redundant but good UI) */}
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 bg-dark text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-dark/10"
                    >
                        {t.closeModal}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Portfolio({ portfolioItems: dbItems }) {
    const { settings } = usePage().props;
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [visible, setVisible] = useState({});
    const sectionRefs = useRef({});

    const heroImage = settings?.portfolio_hero_bg || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2000";
    const contactWaDisplay = settings?.contact_wa || '0859-5446-4539';
    const contactWa = contactWaDisplay.replace(/[^0-9]/g, '').replace(/^0/, '62');
    const contactEmail = settings?.contact_email || 'hello@sugoi8.id';
    const t = translations[lang] || translations['en'];

    // Gunakan data dari database jika ada, fallback ke data statis
    const portfolioData = (dbItems && dbItems.length > 0) ? dbItems : [];

    // Kumpulkan semua kategori unik dari data
    const allCategories = ['All', ...new Set(portfolioData.map(i => i.category).filter(Boolean))];
    const allLabel = lang === 'id' ? 'Semua' : lang === 'jp' ? 'すべて' : 'All';

    const filteredItems = activeFilter === 'All' || activeFilter === allLabel
        ? portfolioData
        : portfolioData.filter(item => item.category === activeFilter);

    const getCount = (cat) => {
        if (cat === 'All' || cat === allLabel) return portfolioData.length;
        return portfolioData.filter(i => i.category === cat).length;
    };

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
            <section className="relative min-h-[600px] pt-52 pb-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        className="w-full h-full object-cover opacity-70 grayscale-0 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/25 to-transparent" />
                </div>
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }} />
                    <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] animate-pulse pointer-events-none transform-gpu" />
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-20 pointer-events-none">
                        <div className="w-px h-32 bg-linear-to-b from-transparent via-white to-transparent" />
                        <span className="text-[12px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">CREATIVE EXCELLENCE</span>
                        <div className="w-px h-32 bg-linear-to-b from-transparent via-white to-transparent" />
                    </div>
                </div>
                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.heroTag}</span>
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-10 leading-[0.9] text-white">
                            {t.heroTitle.split('').map((char, i) => (
                                <span key={i} className="inline-block animate-in slide-in-from-bottom-full duration-1000" style={{ transitionDelay: `${i * 30}ms` }}>{char}</span>
                            ))}
                        </h1>
                        <p className="text-sm md:text-xl text-white/50 font-medium leading-relaxed max-w-2xl mt-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 italic border-l-4 border-secondary pl-6">
                            {t.heroDesc}
                        </p>
                    </div>
                </Container>
            </section>

            {/* ── 2. MARQUEE ── */}
            <TextRun />

            {/* ── 3. FILTER + GRID ── */}
            <section
                id="portfolio-grid"
                className="py-20 md:py-32 bg-white min-h-screen"
                ref={el => sectionRefs.current['portfolio-grid'] = el}
            >
                <Container>
                    {/* Filter tabs */}
                    <div className={`flex flex-wrap gap-2 md:gap-3 mb-16 md:mb-24 ${fadeIn('portfolio-grid')}`}>
                        {allCategories.map((cat, idx) => {
                            const isActive = cat === activeFilter || (cat === 'All' && activeFilter === 'All');
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
                                    <span className={`text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black transition-all ${isActive ? 'bg-white/20 text-white' : 'bg-dark/10 text-dark/40'}`}>
                                        {getCount(cat)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Grid */}
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-48">
                            {filteredItems.map((item, i) => (
                                <div
                                    key={item.id || i}
                                    className="group cursor-pointer relative"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {/* Image card */}
                                    <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl group-hover:shadow-secondary/20 transition-all duration-700 bg-dark h-[350px] md:h-[380px] lg:h-[420px]">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 group-hover:rotate-1"
                                                alt={item.title}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                                        {/* Badges */}
                                        <div className="absolute top-6 left-6 flex flex-col gap-3">
                                            <div className="glass-navbar border-white/20 px-4 py-2 rounded-2xl transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                                <span className="text-secondary text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                                            </div>
                                        </div>

                                        {/* Content overlay */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 bg-linear-to-t from-dark/90 via-dark/20 to-transparent">
                                            <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3 opacity-60 group-hover:opacity-100">
                                                    {[item.client, item.location].filter(Boolean).join(' · ')}
                                                </p>
                                                <h3 className="text-white font-black text-xl md:text-2xl tracking-tighter leading-none mb-4 group-hover:text-glow-secondary transition-all">
                                                    {item.title}
                                                </h3>
                                                {item.description && (
                                                    <p className="text-white/50 text-xs font-medium leading-relaxed mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                        {item.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">
                                                    <span>{t.viewProject}</span>
                                                    <div className="w-8 h-px bg-white/20 transition-all group-hover:w-16 group-hover:bg-secondary" />
                                                    <ArrowUpRightIcon className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Featured glow */}
                                        {item.featured && (
                                            <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-secondary shadow-[0_0_20px_rgba(249,215,131,1)] animate-pulse" />
                                        )}
                                    </div>

                                    {/* Year floating */}
                                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[10rem] font-black text-dark/4 select-none pointer-events-none group-hover:text-secondary/8 transition-all duration-1000 z-10">
                                        {item.year}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <p className="text-4xl mb-4">🎭</p>
                            <p className="text-dark/30 font-black uppercase tracking-widest text-sm">
                                {portfolioData.length === 0
                                    ? 'Belum ada portofolio. Tambahkan melalui panel admin.'
                                    : t.noProject}
                            </p>
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
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-deep/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }} />
                <Container className="relative z-10">
                    <div className={`max-w-3xl mx-auto text-center ${fadeIn('portfolio-cta')}`}>
                        <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block mb-6">Sugoi 8 Management</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-8">{t.ctaTitle}</h2>
                        <p className="text-white/40 font-medium text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">{t.ctaDesc}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href={`https://wa.me/${contactWa}`} target="_blank" rel="noopener noreferrer"
                                className="group flex items-center gap-3 bg-white/10 hover:bg-secondary hover:text-dark border border-white/20 hover:border-secondary text-white rounded-2xl px-6 py-4 transition-all duration-300">
                                <ChatBubbleLeftEllipsisIcon className="w-5 h-5 shrink-0" />
                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-80">WhatsApp</p>
                                    <p className="text-sm font-black">{contactWaDisplay}</p>
                                </div>
                                <ArrowUpRightIcon className="w-4 h-4 ml-2 opacity-40 group-hover:opacity-100 transition-transform" />
                            </a>
                            <a href={`mailto:${contactEmail}`}
                                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl px-6 py-4 transition-all duration-300">
                                <EnvelopeIcon className="w-5 h-5 shrink-0" />
                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Email</p>
                                    <p className="text-sm font-black">{contactEmail}</p>
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


            {/* Detail Modal */}
            {selectedItem && (
                <PortfolioDetailModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    t={t}
                />
            )}
        </MainLayout>
    );
}
