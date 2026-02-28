import { router } from '@inertiajs/react';
import {
    Squares2X2Icon,
    PhotoIcon,
    CalendarIcon,
    TicketIcon,
    ShoppingBagIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const SidebarLink = ({ href, icon: Icon, label, active = false }) => (
    <button
        onClick={() => router.get(href)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full text-left ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
    >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </button>
);

export default function SidebarAdmin({ activePage }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('admin.logout'));
    };

    return (
        <aside className="w-64 bg-dark text-white hidden lg:flex flex-col">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-white">S8</div>
                    <span className="font-black tracking-tighter uppercase">Sugoi 8</span>
                </div>

                <nav className="space-y-2">
                    <SidebarLink
                        href="/admin/dashboard"
                        icon={Squares2X2Icon}
                        label="Dashboard"
                        active={activePage === 'dashboard'}
                    />
                    <SidebarLink
                        href="/admin/tickets"
                        icon={TicketIcon}
                        label="Tiket"
                        active={activePage === 'tickets'}
                    />
                    <SidebarLink
                        href="/admin/bookings"
                        icon={ShoppingBagIcon}
                        label="Pemesanan"
                        active={activePage === 'bookings'}
                    />
                    <SidebarLink
                        href="#"
                        icon={PhotoIcon}
                        label="Portofolio"
                        active={activePage === 'portfolio'}
                    />
                    <SidebarLink
                        href="/admin/settings"
                        icon={Cog6ToothIcon}
                        label="Settings"
                        active={activePage === 'settings'}
                    />
                </nav>
            </div>

            <div className="mt-auto p-8">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-400/10 rounded-xl font-bold transition-all"
                >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                    <span>Keluar</span>
                </button>
            </div>
        </aside>
    );
}
