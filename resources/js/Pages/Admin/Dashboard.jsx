import { Head, usePage, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Squares2X2Icon,
    UserIcon,
    PhotoIcon,
    CalendarIcon,
    TicketIcon,
    ShoppingBagIcon,
    ArrowLeftOnRectangleIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    BanknotesIcon,
    ArrowUpIcon,
    ArrowTrendingUpIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserGroupIcon,
    BriefcaseIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import SidebarAdmin from '../../Components/SidebarAdmin';

export default function Dashboard({ stats, recentBookings, upcomingEvents, topTickets }) {
    const { auth } = usePage().props;
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const mainStats = [
        {
            label: 'Total Omzet',
            value: formatCurrency(stats.total_revenue),
            sub: `Hari ini: ${formatCurrency(stats.revenue_today)}`,
            icon: BanknotesIcon,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
        },
        {
            label: 'Total Pesanan',
            value: stats.total_bookings,
            sub: `${stats.confirmed_bookings} Berhasil, ${stats.pending_bookings} Pending`,
            icon: ShoppingBagIcon,
            color: 'text-primary',
            bg: 'bg-primary/5'
        },
        {
            label: 'Proyek Portfolio',
            value: stats.total_portfolio,
            sub: 'Tampil di Website',
            icon: BriefcaseIcon,
            color: 'text-secondary',
            bg: 'bg-secondary/5'
        },
        {
            label: 'Event Aktif',
            value: stats.total_events,
            sub: 'Dikelola di Ticket System',
            icon: CalendarIcon,
            color: 'text-amber-500',
            bg: 'bg-amber-50'
        },
    ];

    return (
        <div className="min-h-screen bg-light selection:bg-primary/30 flex">
            <Head title="Admin Dashboard | Sugoi 8" />

            <SidebarAdmin activePage="dashboard" />

            {/* Main Content */}
            <main className="grow max-h-screen overflow-y-auto">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md px-8 py-6 border-b border-dark/5 flex items-center justify-between sticky top-0 z-30">
                    <div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">System Control</h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <ClockIcon className="w-3 h-3 text-dark/30" />
                            <p className="text-[10px] text-dark/30 font-bold uppercase tracking-widest leading-none">
                                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} • {currentTime.toLocaleTimeString('id-ID')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-dark leading-none">{auth.user.name}</p>
                            <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mt-1">Administrator Access</p>
                        </div>
                        <div className="w-10 h-10 bg-light rounded-xl flex items-center justify-center border border-dark/5">
                            <UserIcon className="w-5 h-5 text-dark/40" />
                        </div>
                    </div>
                </header>

                <div className="p-6 space-y-6">
                    {/* Welcome Banner */}
                    <div className="relative overflow-hidden bg-dark rounded-[32px] p-8 text-white shadow-xl">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">
                                Selamat Datang Kembali, <span className="text-secondary">{auth.user.name}!</span>
                            </h2>
                            <p className="text-white/40 text-sm font-medium max-w-lg mb-6 leading-relaxed">
                                Pantau perkembangan Sugoi 8 Management secara langsung. Semua data di bawah ini diperbarui secara berkala.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href={route('admin.bookings.index')} className="px-5 py-2.5 bg-white text-dark rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-secondary hover:text-dark transition-all">
                                    Cek Pesanan Baru
                                </Link>
                                <Link href={route('admin.tickets.create')} className="px-5 py-2.5 bg-white/10 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md">
                                    Buat Event Baru
                                </Link>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                            <Squares2X2Icon className="w-64 h-64 text-white rotate-12" />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {mainStats.map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-[24px] border border-dark/5 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-0.5">{stat.label}</p>
                                <p className="text-xl font-black text-dark truncate">{stat.value}</p>
                                <p className="text-[9px] font-bold text-dark/30 mt-1.5 flex items-center gap-1">
                                    <ArrowTrendingUpIcon className="w-2.5 h-2.5 text-emerald-500" />
                                    {stat.sub}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Bookings Table */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-[11px] font-black text-dark uppercase tracking-widest flex items-center gap-2">
                                    <ClockIcon className="w-3.5 h-3.5 text-primary" />
                                    Pesanan Terbaru
                                </h3>
                                <Link href={route('admin.bookings.index')} className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">
                                    Lihat Semua
                                </Link>
                            </div>

                            <div className="bg-white rounded-[24px] border border-dark/5 shadow-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-light border-b border-dark/5">
                                            <th className="px-5 py-3 text-[8.5px] font-black uppercase tracking-widest text-dark/40 italic">ID</th>
                                            <th className="px-5 py-3 text-[8.5px] font-black uppercase tracking-widest text-dark/40">Customer</th>
                                            <th className="px-5 py-3 text-[8.5px] font-black uppercase tracking-widest text-dark/40">Item</th>
                                            <th className="px-5 py-3 text-[8.5px] font-black uppercase tracking-widest text-dark/40">Total</th>
                                            <th className="px-5 py-3 text-[8.5px] font-black uppercase tracking-widest text-dark/40">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-dark/5">
                                        {recentBookings.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-dark/30 italic text-[10px]">Belum ada pesanan masuk.</td>
                                            </tr>
                                        ) : (
                                            recentBookings.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-light/50 transition-colors group">
                                                    <td className="px-5 py-3 align-middle">
                                                        <span className="text-[9px] font-black text-dark/20 italic">#{booking.id}</span>
                                                    </td>
                                                    <td className="px-5 py-3 align-middle">
                                                        <p className="text-[11px] font-black text-dark">{booking.customer_name}</p>
                                                        <p className="text-[9px] font-bold text-dark/30">{booking.customer_phone}</p>
                                                    </td>
                                                    <td className="px-5 py-3 align-middle">
                                                        <p className="text-[9px] font-black text-primary uppercase tracking-tight truncate max-w-[100px]">
                                                            {booking.ticket.title}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-3 align-middle font-black text-[11px] text-secondary">
                                                        {formatCurrency(booking.total_price)}
                                                    </td>
                                                    <td className="px-5 py-3 align-middle">
                                                        {booking.status === 'confirmed' ? (
                                                            <div className="flex items-center gap-1 text-[8.5px] font-black text-emerald-500 uppercase tracking-widest">
                                                                <CheckCircleIcon className="w-2.5 h-2.5" /> OK
                                                            </div>
                                                        ) : booking.status === 'cancelled' ? (
                                                            <div className="flex items-center gap-1 text-[8.5px] font-black text-rose-500 uppercase tracking-widest">
                                                                <XCircleIcon className="w-2.5 h-2.5" /> NO
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1 text-[8.5px] font-black text-amber-500 uppercase tracking-widest">
                                                                <ClockIcon className="w-2.5 h-2.5" /> PENDING
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Top Performing Tickets */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-dark uppercase tracking-widest flex items-center gap-2 px-2">
                                <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-emerald-500" />
                                Tiket Terlaris
                            </h3>

                            <div className="bg-white rounded-[24px] border border-dark/5 shadow-sm p-5 space-y-3">
                                {topTickets.length === 0 ? (
                                    <div className="text-center py-6 text-dark/30 italic text-[10px]">Data penjualan belum tersedia.</div>
                                ) : (
                                    topTickets.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 group">
                                            <div className="w-8 h-8 rounded-lg bg-light flex items-center justify-center font-black text-dark/20 text-[10px] shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                0{i + 1}
                                            </div>
                                            <div className="grow min-w-0">
                                                <p className="text-[10px] font-black text-dark truncate uppercase tracking-tight">{item.ticket.title}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <div className="grow bg-light h-1 rounded-full overflow-hidden">
                                                        <div
                                                            className="bg-primary h-full rounded-full transition-all duration-1000"
                                                            style={{ width: `${(item.total / topTickets[0].total) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[9px] font-black text-dark/40 shrink-0">{item.total}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Upcoming Events Box */}
                            <div className="bg-secondary p-6 rounded-[24px] shadow-lg shadow-secondary/10 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="w-8 h-8 bg-dark rounded-lg flex items-center justify-center mb-4">
                                        <CalendarIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <h4 className="text-[9px] font-black text-dark/40 uppercase tracking-[0.2em] mb-1">Event Mendatang</h4>
                                    {upcomingEvents.length > 0 ? (
                                        <div>
                                            <p className="text-lg font-black text-dark leading-tight mb-3 italic truncate">
                                                {upcomingEvents[0].title}
                                            </p>
                                            <Link href={route('admin.tickets.index')} className="text-[9px] font-black text-dark border-b-2 border-dark/10 hover:border-dark transition-all pb-0.5 uppercase tracking-widest">
                                                Detail Event
                                            </Link>
                                        </div>
                                    ) : (
                                        <p className="text-xs font-bold text-dark/40">Tidak ada event dalam waktu dekat.</p>
                                    )}
                                </div>

                                <TicketIcon className="absolute bottom-[-15px] right-[-15px] w-24 h-24 text-dark/5 -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>

                    {/* Additional Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-[24px] border border-dark/5 shadow-sm flex items-center gap-5 group">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                                <StarIcon className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-0.5">Partners</p>
                                <p className="text-xl font-black text-dark">{stats.total_partners}</p>
                                <p className="text-[8px] font-bold text-dark/30 uppercase tracking-widest mt-0.5">Sinergi Kerjasama</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-emerald-500 p-6 rounded-[32px] shadow-lg shadow-emerald-500/10 text-white flex items-center justify-between group overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80">E-Ticketing System</h4>
                                <p className="text-2xl lg:text-3xl font-black italic tracking-tighter leading-none mb-1.5">
                                    {stats.confirmed_bookings} Tiket Terverifikasi
                                </p>
                                <p className="text-[10px] font-bold opacity-60">
                                    System running smoothly. All services operational.
                                </p>
                            </div>
                            <div className="relative z-10 hidden sm:block">
                                <Link href={route('admin.bookings.index')} className="p-3 bg-white text-emerald-500 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all block">
                                    <ShoppingBagIcon className="w-6 h-6" />
                                </Link>
                            </div>

                            <CheckCircleIcon className="absolute right-[-15px] top-[-15px] w-40 h-40 opacity-10 -rotate-12 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
