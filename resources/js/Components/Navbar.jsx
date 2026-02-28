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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                    ? 'glass-primary shadow-lg py-3'
                    : 'bg-primary/80 backdrop-blur-md py-5'
                    }`}
            >
                <Container className="flex items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex flex-col leading-none">
                                <span className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">SUGOI</span>
                                <span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase">Management</span>
                            </div>
                            <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-gradient-logo rounded-lg shadow-lg">
                                <span className="text-white font-black text-xl md:text-2xl leading-none">8</span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive(link.href) ? 'text-secondary' : 'text-white/70 hover:text-secondary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div
                            className="relative"
                            onMouseEnter={handleServicesEnter}
                            onMouseLeave={handleServicesLeave}
                        >
                            <Link
                                href="/services"
                                className={`group flex items-center px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 outline-none ${isActive('/services') ? 'text-secondary' : 'text-white/70 hover:text-secondary'}`}
                            >
                                {cur.services}
                                <ChevronDownIcon className={`ml-1 w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                            </Link>

                            <Transition
                                show={isServicesOpen}
                                as={Fragment}
                                enter="transition ease-out duration-300"
                                enterFrom="opacity-0 translate-y-2 scale-95"
                                enterTo="opacity-100 translate-y-0 scale-100"
                                leave="transition ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 translate-y-2 scale-95"
                            >
                                <div className="absolute left-0 mt-0 pt-4 w-[640px] max-w-xl z-50">
                                    <div className="rounded-[32px] bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                                        <div className="p-8 grid grid-cols-2 gap-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dark/5">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                                                        <CalendarIcon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <p className="font-black text-xs uppercase tracking-widest text-dark">{cur.eo}</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {eoServices.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="px-3 py-2 text-sm font-bold text-dark/60 hover:text-primary hover:translate-x-1 transition-all flex items-center gap-2"
                                                            onClick={() => setIsServicesOpen(false)}
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                {mainServices.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="group flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-primary/5"
                                                        onClick={() => setIsServicesOpen(false)}
                                                    >
                                                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                                            <item.icon className="h-5 w-5" aria-hidden="true" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black uppercase tracking-widest text-dark mb-1">{item.name}</p>
                                                            <p className="text-[10px] text-dark/50 leading-tight font-medium">{item.description}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-light/50 p-6 text-center border-t border-dark/5">
                                            <Link
                                                href="/services"
                                                className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:tracking-[0.4em] transition-all"
                                                onClick={() => setIsServicesOpen(false)}
                                            >
                                                {cur.viewAll}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <div className="ml-4 border-l border-white/20 pl-4 flex items-center gap-1">
                            {[
                                { code: 'id', label: 'ID' },
                                { code: 'en', label: 'EN' },
                                { code: 'jp', label: 'JP' },
                            ].map(({ code, label }) => (
                                <button
                                    key={code}
                                    onClick={() => onLangChange(code)}
                                    className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${lang === code ? 'bg-secondary text-dark shadow-lg' : 'text-white/40 hover:text-white'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className={`flex items-center transition-all duration-500 overflow-hidden ${searchOpen ? 'max-w-[300px] ml-4' : 'max-w-0 ml-0'}`}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={cur.searchPlace}
                                    className={`bg-white border border-white/20 rounded-xl px-4 py-2 text-[10px] font-bold text-primary placeholder:text-primary/30 outline-none focus:ring-2 focus:ring-secondary/50 w-64 transition-all ${searchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                />
                                {searchQuery.length >= 1 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-dark/5 p-4 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-3 px-2">Results for "{searchQuery}"</p>
                                        <div className="space-y-1">
                                            {[cur.eo, cur.show, cur.mice].map((item, i) => (
                                                <Link key={i} href="/services" className="block px-3 py-2 rounded-xl hover:bg-primary/5 text-[11px] font-bold text-dark transition-colors">
                                                    {item}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className={`ml-2 p-2 transition-all duration-300 ${searchOpen ? 'text-secondary' : 'text-white/50 hover:text-white'}`}
                        >
                            <MagnifyingGlassIcon className="w-4 h-4" />
                        </button>

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
                            className="px-8 py-3 text-[10px] font-black tracking-[0.2em] shadow-xl shadow-secondary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            {cur.contact} <span className="text-base leading-none">→</span>
                        </Button>
                    </div>

                    <div className="flex lg:hidden gap-4 items-center">
                        <button
                            onClick={() => onLangChange(lang === 'en' ? 'id' : 'en')}
                            className="text-[10px] font-black text-white/70 border border-white/20 px-3 py-1.5 rounded-full uppercase"
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
                </Container>

                <Transition show={mobileMenuOpen} as={Fragment}>
                    <Disclosure as="div" className="lg:hidden">
                        <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-out duration-400 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-dark px-6 py-8 sm:max-w-sm">
                                <div className="flex items-center justify-between mb-12">
                                    <Link href="/" className="flex items-center gap-2">
                                        <div className="flex flex-col leading-none">
                                            <span className="text-2xl font-black text-white tracking-tight uppercase">SUGOI</span>
                                            <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Management</span>
                                        </div>
                                        <div className="w-9 h-9 flex items-center justify-center bg-gradient-logo rounded-lg">
                                            <span className="text-white font-black text-2xl">8</span>
                                        </div>
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
                                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">{cur.services}</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="px-4 mb-4">
                                                <p className="text-[10px] font-black uppercase text-secondary mb-2">{cur.eo}</p>
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
