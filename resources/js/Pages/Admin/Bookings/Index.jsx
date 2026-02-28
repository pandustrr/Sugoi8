import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    ShoppingBagIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    BanknotesIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';

export default function Index({ bookings }) {
    const { flash } = usePage().props;
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'confirmed', 'cancelled'

    const updateStatus = (id, status) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status pemesanan ini ke ${status}?`)) {
            router.patch(route('admin.bookings.updateStatus', id), { status });
        }
    };

    const statusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">Dikonfirmasi</span>;
            case 'cancelled':
                return <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full">Ditolak / Batal</span>;
            default:
                return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase tracking-widest rounded-full">Pending</span>;
        }
    };

    const filteredBookings = bookings.filter(b => {
        if (filter === 'all') return true;
        return b.status === filter;
    });

    return (
        <div className="min-h-screen bg-light flex">
            <Head title="Daftar Pemesanan | Sugoi 8 Admin" />
            <SidebarAdmin activePage="bookings" />

            <main className="grow overflow-y-auto max-h-screen">
                <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center justify-between sticky top-0 z-20">
                    <h1 className="text-xl font-black text-dark uppercase tracking-tight">Daftar Pemesanan Tiket</h1>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2 bg-light p-1.5 rounded-2xl border border-dark/5">
                        <FunnelIcon className="w-5 h-5 text-dark/30 ml-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-dark/30 mr-2">Filter:</span>
                        {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f
                                        ? 'bg-white shadow-sm text-primary'
                                        : 'text-dark/40 hover:text-dark hover:bg-dark/5'
                                    }`}
                            >
                                {f === 'all' ? 'Semua' :
                                    f === 'pending' ? 'Pending' :
                                        f === 'confirmed' ? 'Konfirmasi' : 'Tolak'}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="p-8">
                    {flash?.success && (
                        <div className="mb-6 animate-pulse p-4 bg-green-100 border border-green-200 text-green-700 rounded-2xl font-bold text-sm">
                            {flash.success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6">
                        {filteredBookings.length === 0 ? (
                            <div className="bg-white rounded-[40px] border border-dark/5 p-20 text-center shadow-sm">
                                <ShoppingBagIcon className="w-16 h-16 text-dark/5 mx-auto mb-6" />
                                <h3 className="text-xl font-black text-dark uppercase tracking-tight mb-2">Belum Ada Pemesanan</h3>
                                <p className="text-dark/40 font-medium text-sm">Coba ubah filter atau tunggu pesanan masuk dari pelanggan.</p>
                            </div>
                        ) : (
                            filteredBookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-[32px] border border-dark/5 p-8 shadow-sm hover:shadow-xl transition-all">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        {/* Customer Info */}
                                        <div className="w-full lg:w-1/3 border-r border-dark/5 pr-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30">Customer</h4>
                                                {statusBadge(booking.status)}
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-light flex items-center justify-center">
                                                        <UserIcon className="w-4 h-4 text-dark/40" />
                                                    </div>
                                                    <p className="font-bold text-dark">{booking.customer_name}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-light flex items-center justify-center">
                                                        <EnvelopeIcon className="w-4 h-4 text-dark/40" />
                                                    </div>
                                                    <p className="font-bold text-dark/60 text-sm">{booking.customer_email}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-light flex items-center justify-center">
                                                        <PhoneIcon className="w-4 h-4 text-dark/40" />
                                                    </div>
                                                    <p className="font-bold text-dark/60 text-sm">{booking.customer_phone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ticket Info */}
                                        <div className="grow">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4">Tiket & Pembayaran</h4>
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                                    <ShoppingBagIcon className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-dark uppercase text-lg leading-tight">{booking.ticket.title}</p>
                                                    <p className="text-dark/40 font-bold text-xs uppercase tracking-widest mt-1">
                                                        {booking.quantity} Tiket • Rp {new Intl.NumberFormat('id-ID').format(booking.total_price)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-dark/20">
                                                ID Pemesanan: #{booking.id.toString().padStart(5, '0')} • Dibuat: {new Date(booking.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="w-full lg:w-auto flex lg:flex-col gap-3 justify-center">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                                        className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-lg hover:shadow-green-500/20 transition-all flex-1"
                                                    >
                                                        <CheckCircleIcon className="w-4 h-4" />
                                                        Konfirmasi
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                                        className="flex items-center justify-center gap-2 bg-light text-red-500 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all w-full lg:w-auto mt-2 lg:mt-0"
                                                    >
                                                        <XCircleIcon className="w-4 h-4" />
                                                        Tolak / Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
