import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Squares2X2Icon,
    TicketIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    WrenchScrewdriverIcon,
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';

// ── Sub-components ────────────────────────────────────────────────────────────

const SidebarLink = ({ href, label, active = false, isSubItem = false }) => (
    <button
        onClick={() => router.get(href)}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-bold text-[13px] transition-all w-full text-left group
            ${active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}
            ${isSubItem ? 'pl-9 py-1.5 text-xs' : ''}
        `}
    >
        {label}
    </button>
);

const SidebarLinkIcon = ({ href, icon: Icon, label, active = false }) => (
    <button
        onClick={() => router.get(href)}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-bold text-[13px] transition-all w-full text-left group
            ${active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}
        `}
    >
        <Icon className={`w-3.5 h-3.5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
        <span>{label}</span>
    </button>
);

// Dropdown that stays open if any child is active — only toggle on header click
const SidebarDropdown = ({ icon: Icon, label, active, children }) => {
    // If active (child page is current), start open and stay open
    const [isOpen, setIsOpen] = useState(active);

    useEffect(() => {
        setIsOpen(active);
    }, [active]);

    return (
        <div className="space-y-0.5">
            <button
                onClick={() => setIsOpen((v) => !v)}
                className={`flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg font-bold text-[13px] transition-all w-full text-left group
                    ${active ? 'text-white bg-white/5' : 'text-white/40 hover:text-white hover:bg-white/5'}
                `}
            >
                <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{label}</span>
                </div>
                <ChevronDownIcon className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-white/20'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-0.5 pt-0.5">
                    {children}
                </div>
            </div>
        </div>
    );
};

// ── Sidebar inner content (shared for desktop & mobile drawer) ─────────────────
function SidebarContent({ activePage, onLogout }) {
    const isTicketSectionActive = ['tickets', 'bookings', 'programs', 'program-clicks'].includes(activePage);

    return (
        <div className="p-6 flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white text-xs shrink-0">S8</div>
                <span className="font-black text-sm tracking-tight uppercase opacity-90">Sugoi 8</span>
            </div>

            {/* Nav */}
            <nav className="space-y-1 grow overflow-y-auto">
                <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-3">Main Menu</p>

                <SidebarLinkIcon
                    href={route('admin.dashboard')}
                    icon={Squares2X2Icon}
                    label="Dashboard"
                    active={activePage === 'dashboard'}
                />

                {/* Event Program Dropdown */}
                <SidebarDropdown icon={TicketIcon} label="Event Program" active={isTicketSectionActive}>
                    <SidebarLink href={route('admin.tickets.index')} label="Kelola Lomba" active={activePage === 'tickets'} isSubItem />
                    <SidebarLink href={route('admin.programs.index')} label="Add Content" active={activePage === 'programs'} isSubItem />
                    <SidebarLink href={route('admin.programs.allClicks')} label="Track Program" active={activePage === 'program-clicks'} isSubItem />
                    <SidebarLink href={route('admin.bookings.index')} label="Data Pemesanan" active={activePage === 'bookings'} isSubItem />
                </SidebarDropdown>

                <SidebarLinkIcon
                    href={route('admin.siteSettings')}
                    icon={WrenchScrewdriverIcon}
                    label="Page Setting"
                    active={activePage === 'site-settings'}
                />

                <div className="pt-5 mt-5 border-t border-white/5">
                    <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-3">Account</p>
                    <SidebarLinkIcon
                        href={route('admin.settings')}
                        icon={Cog6ToothIcon}
                        label="Settings"
                        active={activePage === 'settings'}
                    />
                </div>
            </nav>

            {/* Logout */}
            <div className="pt-4 border-t border-white/5 mt-3">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2.5 px-3 py-2 w-full text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-lg font-bold text-[13px] transition-all group"
                >
                    <ArrowLeftOnRectangleIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Keluar</span>
                </button>
            </div>
        </div>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SidebarAdmin({ activePage }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
        router.post(route('admin.logout'));
    };

    return (
        <>
            {/* ── Desktop sidebar (lg+) ── */}
            <aside className="w-64 bg-dark text-white hidden lg:flex flex-col border-r border-white/5 shrink-0">
                <SidebarContent activePage={activePage} onLogout={handleLogout} />
            </aside>

            {/* ── Mobile top bar (< lg) ── */}
            <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-dark border-b border-white/5 flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center font-black text-white text-[10px]">S8</div>
                    <span className="font-black text-xs tracking-tight uppercase text-white/90">Sugoi 8</span>
                </div>
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                    <Bars3Icon className="w-5 h-5" />
                </button>
            </div>

            {/* Spacer so page content is not hidden behind top bar on mobile */}
            <div className="lg:hidden h-[52px] shrink-0 w-0" />

            {/* ── Mobile Drawer ── */}
            {drawerOpen && (
                <div className="lg:hidden fixed inset-0 z-200 flex">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
                        onClick={() => setDrawerOpen(false)}
                    />
                    {/* Drawer panel */}
                    <aside className="relative w-72 max-w-[85vw] bg-dark text-white h-full flex flex-col border-r border-white/5 shadow-2xl animate-in slide-in-from-left duration-300">
                        {/* Close button */}
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        <SidebarContent activePage={activePage} onLogout={handleLogout} />
                    </aside>
                </div>
            )}
        </>
    );
}
