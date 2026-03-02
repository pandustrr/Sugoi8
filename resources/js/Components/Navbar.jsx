import { useState, useEffect, useRef, Fragment } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    TicketIcon,
    PresentationChartBarIcon,
    WrenchScrewdriverIcon,
    SunIcon,
    MoonIcon
} from '@heroicons/react/24/outline';
import Container from './UI/Container';
import Button from './UI/Button';

export default function Navbar({ lang = 'en', onLangChange, darkMode, onDarkModeToggle }) {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleServicesEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsServicesOpen(true);
    };

    const handleServicesLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsServicesOpen(false);
        }, 300);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen((prev) => !prev);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const t = {
        en: {
            home: 'Home',
            about: 'About',
            tickets: 'Tickets',
            services: 'Services',
            portfolio: 'Portfolio',
            partners: 'Partners',
            contact: 'CONTACT',
            eo: 'Event Organizer',
            eoDesc: 'Planning, Creators, & Production.',
            show: 'Show Management',
            showDesc: 'Talent & Stage control.',
            mice: 'Service MICE',
            miceDesc: 'Corporate & Gatherings.',
            prod: 'Production & Equipment',
            prodDesc: 'Sound, Lighting, & Support.',
            viewAll: 'View All Solutions',
            searchPlace: 'Search for services, portfolio, or news...',
            searchTitle: 'Quick Search'
        },
        id: {
            home: 'Beranda',
            about: 'Tentang',
            tickets: 'Tiket',
            services: 'Layanan',
            portfolio: 'Portofolio',
            partners: 'Mitra',
            contact: 'KONTAK',
            eo: 'Penyelenggara Acara',
            eoDesc: 'Perencanaan, Kreator, & Produksi.',
            show: 'Manajemen Pertunjukan',
            showDesc: 'Talent & Kontrol Panggung.',
            mice: 'Layanan MICE',
            miceDesc: 'Korporat & Gathering.',
            prod: 'Produksi & Peralatan',
            prodDesc: 'Sound, Lighting, & Support.',
            viewAll: 'Lihat Semua Solusi',
            searchPlace: 'Cari layanan, portofolio, atau berita...',
            searchTitle: 'Pencarian Cepat'
        },
        jp: {
            home: 'ホーム',
            about: '会社概要',
            tickets: 'チケット',
            services: 'サービス',
            portfolio: '実績',
            partners: 'パートナー',
            contact: 'お問い合わせ',
            eo: 'イベント企画',
            eoDesc: '企画・制作・プロデュース。',
            show: 'ショーマネジメント',
            showDesc: 'タレント & ステージ管理。',
            mice: 'MICEサービス',
            miceDesc: '法人向け & ギャザリング。',
            prod: '制作 & 機材',
            prodDesc: '音響、照明、サポート。',
            viewAll: 'すべてのサービスを見る',
            searchPlace: 'サービス、実績、ニュースを検索...',
            searchTitle: 'クイック検索'
        }
    };

    const cur = t[lang] || t['en'];

    const eoServices = [
        { name: 'Event Planner', href: '/services' },
        { name: 'Kreator', href: '/services' },
        { name: 'Team Show', href: '/services' },
        { name: 'Koreografer', href: '/services' },
        { name: 'Event Branding', href: '/services' },
        { name: 'Team Production', href: '/services' },
        { name: 'Marketing Agency', href: '/services' },
    ];

    const mainServices = [
        { name: cur.show, description: cur.showDesc, href: '/services', icon: TicketIcon },
        { name: cur.mice, description: cur.miceDesc, href: '/services', icon: PresentationChartBarIcon },
        { name: cur.prod, description: cur.prodDesc, href: '/services', icon: WrenchScrewdriverIcon },
    ];

    const navLinks = [
        { name: cur.home, href: '/' },
        { name: cur.about, href: '/about' },
        { name: cur.services, href: '/services' },
        { name: cur.portfolio, href: '/portfolio' },
        { name: cur.partners, href: '/partners' },
        { name: cur.tickets, href: '/tickets' },
    ];

    const isActive = (path) => {
        if (path === '/' && url === '/') return true;
        if (path !== '/' && url.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out px-4 flex justify-center py-4"
            >
                <div className={`w-full w-[95%] lg:max-w-[98%] xl:max-w-[1280px] transition-all duration-700 glass-navbar shadow-2xl ${isScrolled
                    ? 'rounded-[24px] px-6 lg:px-8 py-2.5 scale-[0.98]'
                    : 'rounded-[32px] px-8 lg:px-10 py-4 scale-100'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex lg:flex-1">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img
                                    src="/logo-putih.png"
                                    alt="Sugoi Management 8"
                                    className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                        </div>

                        <nav className="hidden lg:flex items-center lg:gap-x-2 xl:gap-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-3 py-1.5 text-[13px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive(link.href) ? 'text-secondary' : 'text-white/70 hover:text-secondary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="lg:ml-2 xl:ml-4 border-l border-white/20 lg:pl-2 xl:pl-4 flex items-center gap-1">
                                {[
                                    { code: 'id', label: 'ID' },
                                    { code: 'en', label: 'EN' },
                                    { code: 'jp', label: 'JP' },
                                ].map(({ code, label }) => (
                                    <button
                                        key={code}
                                        onClick={() => onLangChange(code)}
                                        className={`text-[11px] font-black px-2 py-1 rounded-md transition-all duration-300 ${lang === code ? 'bg-secondary/20 text-secondary text-glow-secondary shadow-[0_0_20px_rgba(249,215,131,0.2)] border border-secondary/30' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>



                            {/* <button
                            onClick={() => onDarkModeToggle(!darkMode)}
                            className="ml-4 text-white/50 hover:text-white p-2 transition-all duration-300"
                        >
                            {darkMode ? <SunIcon className="w-4 h-4 animate-spin-slow" /> : <MoonIcon className="w-4 h-4" />}
                        </button> */}
                        </nav>

                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Button
                                variant="secondary"
                                href="/about#contact"
                                className="px-6 py-2.5 text-[13px] font-black tracking-[0.15em] shadow-lg shadow-secondary/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group relative overflow-hidden rounded-full py-3"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {cur.contact} <span className="text-sm leading-none transition-transform group-hover:translate-x-1">→</span>
                                </span>
                            </Button>
                        </div>

                        <div className="flex lg:hidden gap-4 items-center">
                            <button
                                onClick={() => onLangChange(lang === 'en' ? 'id' : 'en')}
                                className="text-[11px] font-black text-white/70 border border-white/20 px-2 py-1 rounded-full uppercase"
                            >
                                {lang}
                            </button>
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <Transition show={mobileMenuOpen} as={Fragment}>
                    <Disclosure as="div" className="lg:hidden">
                        <div className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-out duration-500 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in duration-400 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto glass-navbar border-l border-white/10 px-6 py-8 sm:max-w-sm">
                                <div className="flex items-center justify-between mb-12">
                                    <Link href="/" className="flex items-center gap-3">
                                        <img
                                            src="/logo-putih.png"
                                            alt="Sugoi Management 8"
                                            className="h-10 w-auto object-contain"
                                        />
                                    </Link>
                                    <button
                                        type="button"
                                        className="rounded-full p-2 text-white/50 bg-white/5 hover:text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <nav className="space-y-1">
                                    {navLinks.map(l => (
                                        <Link
                                            key={l.name}
                                            href={l.href}
                                            className={`block rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-widest transition-all ${isActive(l.href) ? 'text-secondary bg-white/5' : 'text-white hover:text-secondary hover:bg-white/5'
                                                }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {l.name}
                                        </Link>
                                    ))}

                                    <div className="pt-8 pb-4">
                                        <p className="px-4 text-[12px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">{cur.services}</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="px-4 mb-4">
                                                <p className="text-[12px] font-black uppercase text-secondary mb-2">{cur.eo}</p>
                                                <div className="grid grid-cols-1 gap-1 pl-2">
                                                    {eoServices.map(s => (
                                                        <Link key={s.name} href={s.href} className="text-xs font-bold text-white/60 hover:text-secondary py-1" onClick={() => setMobileMenuOpen(false)}>{s.name}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                            {mainServices.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-bold text-white hover:bg-white/5 transition-all"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                                        <item.icon className="w-4 h-4 text-primary" />
                                                    </div>
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </nav>

                                <div className="mt-12 pt-12 border-t border-white/5">
                                    <Button variant="secondary" href="/contact" className="w-full h-16 text-xs font-black tracking-[0.2em]">
                                        {cur.contact}
                                    </Button>
                                </div>
                            </div>
                        </Transition.Child>
                    </Disclosure>
                </Transition>
            </header >

        </>
    );
}
