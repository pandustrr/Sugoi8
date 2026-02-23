import { useState, useEffect, Fragment } from 'react';
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
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import Container from './UI/Container';
import Button from './UI/Button';

export default function Navbar({ lang = 'en', onLangChange }) {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        }
    };

    const cur = t[lang];

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
    ];

    const isActive = (path) => {
        if (path === '/' && url === '/') return true;
        if (path !== '/' && url.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'glass-primary shadow-lg py-3' : 'bg-primary py-5'
                    }`}
            >
                <Container className="flex items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">SUGOI</span>
                            <div className="relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gradient-logo rounded-lg shadow-lg group-hover:rotate-360 transition-all duration-700">
                                <span className="text-white font-black text-lg leading-none">8</span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-x-1">
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

                        <div className="relative group/services flex items-center">
                            <Link
                                href="/services"
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive('/services') ? 'text-secondary' : 'text-white/70 hover:text-secondary'
                                    }`}
                            >
                                {cur.services}
                            </Link>

                            <Menu as="div" className="relative -ml-2">
                                <Menu.Button className={`flex items-center p-2 outline-none group ${isActive('/services') ? 'text-secondary' : 'text-white/50 hover:text-secondary'}`}>
                                    <ChevronDownIcon className="w-3 h-3 transition-transform group-hover:rotate-180" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-2 scale-95"
                                    enterTo="opacity-100 translate-y-0 scale-100"
                                    leave="transition ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 scale-100"
                                    leaveTo="opacity-0 translate-y-2 scale-95"
                                >
                                    <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-4 w-screen max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50">
                                        <div className="p-8 grid grid-cols-2 gap-10">
                                            <div>
                                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dark/5">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                                                        <CalendarIcon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <p className="font-black text-xs uppercase tracking-widest text-dark">{cur.eo}</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {eoServices.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <Link
                                                                    href={item.href}
                                                                    className={`px-3 py-2 text-sm font-bold text-dark/60 hover:text-primary hover:translate-x-1 transition-all flex items-center gap-2 ${active ? 'text-primary' : ''}`}
                                                                >
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                                                                    {item.name}
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                {mainServices.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                href={item.href}
                                                                className={`group flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 ${active ? 'bg-primary/5' : ''}`}
                                                            >
                                                                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl transition-all duration-300 ${active ? 'bg-primary text-white scale-110' : 'bg-primary/5 text-primary'}`}>
                                                                    <item.icon className="h-5 w-5" aria-hidden="true" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-black uppercase tracking-widest text-dark mb-1">{item.name}</p>
                                                                    <p className="text-[10px] text-dark/50 leading-tight font-medium">{item.description}</p>
                                                                </div>
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-light/50 p-6 text-center border-t border-dark/5">
                                            <Link href="/services" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:tracking-[0.4em] transition-all">
                                                {cur.viewAll}
                                            </Link>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>

                        <div className="ml-4 border-l border-white/20 pl-4 flex items-center gap-2">
                            <button
                                onClick={() => onLangChange('id')}
                                className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${lang === 'id' ? 'bg-secondary text-dark shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                ID
                            </button>
                            <button
                                onClick={() => onLangChange('en')}
                                className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${lang === 'en' ? 'bg-secondary text-dark shadow-lg' : 'text-white/40 hover:text-white'}`}
                            >
                                EN
                            </button>
                        </div>

                        <button
                            onClick={() => setSearchOpen(true)}
                            className="ml-4 text-white/50 hover:text-white p-2 transition-colors"
                        >
                            <MagnifyingGlassIcon className="w-4 h-4" />
                        </button>
                    </nav>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Button
                            variant="secondary"
                            href="/contact"
                            className="px-8 py-3 text-[10px] font-black tracking-[0.2em] shadow-xl shadow-secondary/20 transition-all hover:scale-105 active:scale-95"
                        >
                            {cur.contact}
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
                                        <span className="text-2xl font-black text-white tracking-tighter uppercase italic">SUGOI</span>
                                        <div className="w-8 h-8 flex items-center justify-center bg-gradient-logo rounded-lg">
                                            <span className="text-white font-black text-xl">8</span>
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
            </header>

            {/* Simple Search Modal */}
            <Transition show={searchOpen} as={Fragment}>
                <div className="relative z-100">
                    <Transition.Child
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-dark/40 backdrop-blur-md transition-opacity" onClick={() => setSearchOpen(false)} />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="duration-200 ease-in"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="relative transform overflow-hidden rounded-[40px] bg-white p-8 md:p-10 text-left shadow-2xl transition-all w-full max-w-xl mx-4">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                                                <MagnifyingGlassIcon className="w-5 h-5 text-primary" />
                                            </div>
                                            <p className="font-black text-[10px] uppercase tracking-[0.2em] text-dark">{cur.searchTitle}</p>
                                        </div>
                                        <button
                                            onClick={() => setSearchOpen(false)}
                                            className="p-2 text-dark/10 hover:text-dark transition-colors"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={cur.searchPlace}
                                            className="w-full bg-light border-2 border-transparent focus:border-primary/20 rounded-2xl py-5 px-8 font-bold text-dark placeholder:text-dark/20 outline-none transition-all text-lg"
                                        />
                                    </div>
                                    <div className="mt-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/20 mb-6 flex items-center gap-4">
                                            Quick Access
                                            <span className="h-px bg-dark/5 flex-1" />
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { label: 'Events', link: '/services' },
                                                { label: 'Portfolios', link: '/portfolio' },
                                                { label: 'Expertise', link: '/services' },
                                                { label: 'Connect', link: '/contact' }
                                            ].map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.link}
                                                    onClick={() => setSearchOpen(false)}
                                                    className="p-4 bg-light hover:bg-white hover:shadow-lg border border-transparent hover:border-primary/10 rounded-2xl text-left transition-all group"
                                                >
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-dark/40 group-hover:text-primary transition-colors">{item.label}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
}
