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
            tickets: 'Event Program',
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
            searchTitle: 'Quick Search',
            login: 'LOGIN'
        },
        id: {
            home: 'Beranda',
            about: 'Tentang',
            tickets: 'Event Program',
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
            searchTitle: 'Pencarian Cepat',
            login: 'LOGIN'
        },
        jp: {
            home: 'ホーム',
            about: '会社概要',
            tickets: 'イベントプログラム',
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
            searchTitle: 'クイック検索',
            login: 'ログイン'
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
        { name: cur.tickets, href: '/eventprogram' },
    ];

    const isActive = (path) => {
        if (path === '/' && url === '/') return true;
        if (path !== '/' && url.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out glass-navbar shadow-lg border-b border-white/5 py-1 md:py-2"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                    <div className="flex shrink-0 lg:mr-12">
                        <Link href="/" className="flex items-center group">
                            <img
                                src="/logo-putih.png"
                                alt="Sugoi Management 8"
                                className="transition-all duration-300 object-contain group-hover:scale-105 h-9 md:h-14 lg:h-12"
                            />
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center justify-between flex-1">
                        <div className="flex items-center gap-x-1 xl:gap-x-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-2 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group ${isActive(link.href) ? 'text-secondary' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-secondary transition-transform duration-300 origin-left ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}></span>
                                </Link>
                            ))}

                            <div className="ml-4 h-4 w-px bg-white/20"></div>

                            <div className="ml-4 flex items-center gap-1">
                                {[
                                    { code: 'id', label: 'ID' },
                                    { code: 'en', label: 'EN' },
                                    { code: 'jp', label: 'JP' },
                                ].map(({ code, label }) => (
                                    <button
                                        key={code}
                                        onClick={() => onLangChange(code)}
                                        className={`text-[10px] font-black px-2 py-1 rounded transition-all duration-300 ${lang === code
                                            ? 'text-secondary border border-secondary/30 bg-secondary/10'
                                            : 'text-white/40 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/tickets/check-status"
                                className="px-6 py-2.5 text-[11px] font-black tracking-[0.2em] transition-all hover:text-secondary text-white flex items-center gap-2"
                            >
                                {cur.login}
                            </Link>
                            <Button
                                variant="secondary"
                                href="/about#contact"
                                className="px-6 py-2.5 text-[11px] font-black tracking-[0.2em] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group relative overflow-hidden rounded-md"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {cur.contact} <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                                </span>
                            </Button>
                        </div>
                    </nav>

                    <div className="flex lg:hidden gap-1 items-center bg-white/5 p-1 rounded-xl border border-white/5">
                        {[
                            { code: 'id', label: 'ID' },
                            { code: 'en', label: 'EN' },
                            { code: 'jp', label: 'JP' },
                        ].map(({ code, label }) => (
                            <button
                                key={code}
                                onClick={() => onLangChange(code)}
                                className={`text-[9px] font-black px-2 py-1.5 rounded-lg transition-all duration-300 ${lang === code
                                    ? 'text-secondary bg-secondary/10'
                                    : 'text-white/40'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="-m-2.5 inline-flex lg:hidden items-center justify-center rounded-md p-2.5 text-white active:scale-90 transition-transform"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </header>

            <Transition show={mobileMenuOpen} as={Fragment}>
                <Disclosure as="div" className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in duration-200 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className="fixed inset-y-0 right-0 z-50 w-[80%] overflow-y-auto glass-navbar border-l border-white/10 px-6 py-8 sm:max-w-sm">
                            <div className="flex items-center justify-between mb-12">
                                <Link href="/" className="flex items-center gap-3">
                                    <img
                                        src="/logo-putih.png"
                                        alt="Sugoi Management 8"
                                        className="h-9 w-auto object-contain"
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

                            <nav className="space-y-2">
                                {navLinks.map(l => (
                                    <Link
                                        key={l.name}
                                        href={l.href}
                                        className={`block rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all ${isActive(l.href) ? 'text-secondary bg-white/5 border border-white/5' : 'text-white/80 hover:text-white hover:bg-white/5'
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {l.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-12 pt-12 border-t border-white/5 space-y-4">
                                <Link
                                    href="/eventprogram/check-status"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full h-16 flex items-center justify-center text-xs font-black tracking-[0.2em] text-white border border-white/10 rounded-xl"
                                >
                                    {cur.login}
                                </Link>
                                <Button variant="secondary" href="/about#contact" className="w-full h-16 text-xs font-black tracking-[0.2em]" onClick={() => setMobileMenuOpen(false)}>
                                    {cur.contact}
                                </Button>
                            </div>
                        </div>
                    </Transition.Child>
                </Disclosure>
            </Transition>
        </>
    );
}
