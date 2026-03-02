import { router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Squares2X2Icon,
    PhotoIcon,
    CalendarIcon,
    TicketIcon,
    ShoppingBagIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    WrenchScrewdriverIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

const SidebarLink = ({ href, icon: Icon, label, active = false, isSubItem = false }) => (
    <button
        onClick={() => router.get(href)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all w-full text-left group ${active
            ? 'bg-primary text-white shadow-lg shadow-primary/20'
            : 'text-white/40 hover:text-white hover:bg-white/5'
            } ${isSubItem ? 'pl-11 py-2.5' : ''}`}
    >
        {Icon && <Icon className={`w-4 h-4 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />}
        <span className={isSubItem ? 'text-[13px]' : ''}>{label}</span>
    </button>
);

const SidebarDropdown = ({ icon: Icon, label, active, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen || active);

    return (
        <div className="space-y-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all w-full text-left group ${active
                    ? 'text-white bg-white/5'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{label}</span>
                </div>
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-white/20'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );
};

export default function SidebarAdmin({ activePage }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('admin.logout'));
    };

    const isTicketSectionActive = activePage === 'tickets' || activePage === 'bookings';

    return (
        <aside className="w-64 bg-dark text-white hidden lg:flex flex-col border-r border-white/5">
            <div className="p-6 flex flex-col h-full">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white text-xs">S8</div>
                    <span className="font-black text-sm tracking-tight uppercase opacity-90">Sugoi 8</span>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 grow">
                    <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Main Menu</p>

                    <SidebarLink
                        href={route('admin.dashboard')}
                        icon={Squares2X2Icon}
                        label="Dashboard"
                        active={activePage === 'dashboard'}
                    />

                    {/* Tiket Dropdown */}
                    <SidebarDropdown
                        icon={TicketIcon}
                        label="Tiket"
                        active={isTicketSectionActive}
                    >
                        <SidebarLink
                            href={route('admin.tickets.index')}
                            label="Kelola Tiket"
                            active={activePage === 'tickets'}
                            isSubItem={true}
                        />
                        <SidebarLink
                            href={route('admin.bookings.index')}
                            label="Data Pemesanan"
                            active={activePage === 'bookings'}
                            isSubItem={true}
                        />
                    </SidebarDropdown>

                    <SidebarLink
                        href={route('admin.siteSettings')}
                        icon={WrenchScrewdriverIcon}
                        label="Home Setting"
                        active={activePage === 'site-settings'}
                    />
                    <SidebarLink
                        href="#"
                        icon={PhotoIcon}
                        label="Portofolio"
                        active={activePage === 'portfolio'}
                    />

                    <div className="pt-6 mt-6 border-t border-white/5">
                        <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Account</p>
                        <SidebarLink
                            href={route('admin.settings')}
                            icon={Cog6ToothIcon}
                            label="Settings"
                            active={activePage === 'settings'}
                        />
                    </div>
                </nav>

                {/* Footer / Logout */}
                <div className="pt-6 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-xl font-bold text-sm transition-all group"
                    >
                        <ArrowLeftOnRectangleIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Keluar</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
