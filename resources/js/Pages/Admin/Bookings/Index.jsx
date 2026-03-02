import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    ShoppingBagIcon,
    CheckCircleIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    BanknotesIcon,
    FunnelIcon,
    TrashIcon,
    PhotoIcon,
    AcademicCapIcon,
    TagIcon,
    ClipboardDocumentIcon,
    CalendarDaysIcon,
    BuildingOfficeIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

export default function Index({ bookings }) {
    const { flash } = usePage().props;
    const [filter, setFilter] = useState('all');

    const updateStatus = (id, status) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status pemesanan ini ke ${status}?`)) {
            router.patch(route('admin.bookings.updateStatus', id), { status });
        }
    };

    const deleteBooking = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pemesanan ini? Tindakan ini tidak dapat dibatalkan.')) {
            router.delete(route('admin.bookings.destroy', id));
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} berhasil disalin!`);
    };

    const statusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Terverifikasi</span>
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-700">Dibatalkan</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Menunggu</span>
                    </div>
                );
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
                <header className="bg-white/80 backdrop-blur-md px-8 py-6 border-b border-dark/5 flex items-center justify-between sticky top-0 z-30">
                    <div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Data Pemesanan</h1>
                        <p className="text-[10px] text-dark/30 font-bold uppercase tracking-widest mt-0.5">Manajemen Pesanan Tiket & Konfirmasi</p>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2 bg-light p-1.5 rounded-2xl border border-dark/5 shadow-inner">
                        <div className="flex items-center gap-2 px-3 border-r border-dark/10 mr-1">
                            <FunnelIcon className="w-4 h-4 text-dark/30" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-dark/40">Filter:</span>
                        </div>
                        {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${filter === f
                                    ? 'bg-white shadow-sm text-primary scale-105'
                                    : 'text-dark/30 hover:text-dark hover:bg-dark/5'
                                    }`}
                            >
                                {f === 'all' ? 'Semua' :
                                    f === 'pending' ? 'Pending' :
                                        f === 'confirmed' ? 'Konfirmasi' : 'Tolak'}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {flash?.success && (
                        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100/50 rounded-2xl flex items-center gap-4 text-emerald-800 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                <CheckCircleIcon className="w-5 h-5" />
                            </div>
                            <p className="font-bold uppercase text-[10px] tracking-widest">{flash.success}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6">
                        {filteredBookings.length === 0 ? (
                            <div className="bg-white rounded-[32px] border border-dark/5 p-20 text-center shadow-sm">
                                <div className="w-20 h-20 bg-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <ShoppingBagIcon className="w-8 h-8 text-dark/10" />
                                </div>
                                <h3 className="text-xl font-black text-dark uppercase tracking-tight mb-2 text-secondary">Belum Ada Pesanan</h3>
                                <p className="text-dark/30 font-bold uppercase text-[10px] tracking-widest">Antrean pemesanan tiket Anda masih kosong saat ini.</p>
                            </div>
                        ) : (
                            filteredBookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-[32px] border border-dark/5 p-8 shadow-sm hover:shadow-xl hover:shadow-dark/5 transition-all duration-500 group">
                                    <div className="flex flex-col xl:flex-row gap-8">
                                        {/* Customer Info Section */}
                                        <div className="w-full xl:w-72 shrink-0 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-5 bg-secondary rounded-full" />
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/50">Profil Pemesan</h4>
                                                </div>
                                                {statusBadge(booking.status)}
                                            </div>

                                            <div className="space-y-4">
                                                <div className="group/item">
                                                    <div className="flex items-center gap-3 p-3.5 bg-light rounded-2xl border border-transparent group-hover/item:border-dark/5 transition-all">
                                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                            <UserIcon className="w-4 h-4 text-dark/40" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-dark/20 mb-0.5">Nama</p>
                                                            <p className="font-black text-dark text-xs">{booking.customer_name}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3">
                                                    <div className="group/item relative">
                                                        <div className="flex items-center gap-3 p-3.5 bg-light rounded-2xl border border-transparent group-hover/item:border-dark/5 transition-all">
                                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                                <PhoneIcon className="w-4 h-4 text-dark/40" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] font-black uppercase tracking-widest text-dark/20 mb-0.5">HP</p>
                                                                <p className="font-bold text-dark/70 text-[12px]">{booking.customer_phone}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => copyToClipboard(booking.customer_phone, 'Nomor HP')}
                                                                className="absolute right-3 p-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity bg-white border border-dark/5 rounded-lg hover:text-primary"
                                                            >
                                                                <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="group/item relative">
                                                        <div className="flex items-center gap-3 p-3.5 bg-light rounded-2xl border border-transparent group-hover/item:border-dark/5 transition-all">
                                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                                <EnvelopeIcon className="w-4 h-4 text-dark/40" />
                                                            </div>
                                                            <div className="overflow-hidden">
                                                                <p className="text-[9px] font-black uppercase tracking-widest text-dark/20 mb-0.5">Email</p>
                                                                <p className="font-bold text-dark/70 text-[12px] truncate">{booking.customer_email}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => copyToClipboard(booking.customer_email, 'Email')}
                                                                className="absolute right-3 p-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity bg-white border border-dark/10 rounded-lg hover:text-primary"
                                                            >
                                                                <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {(booking.school_name || booking.division) && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3 pt-1">
                                                        {booking.school_name && (
                                                            <div className="flex items-center gap-3 p-3.5 bg-secondary/5 rounded-2xl border border-secondary/10">
                                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                                    <BuildingOfficeIcon className="w-4 h-4 text-secondary" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-secondary/40 mb-0.5">Instansi</p>
                                                                    <p className="font-black text-secondary text-[11px] uppercase truncate max-w-[150px]">{booking.school_name}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {booking.division && (
                                                            <div className="flex items-center gap-3 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                                    <TagIcon className="w-4 h-4 text-emerald-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500/40 mb-0.5">Divisi</p>
                                                                    <p className="font-black text-emerald-700 text-[11px] uppercase tracking-tight">{booking.division}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Ticket Details Section */}
                                        <div className="grow space-y-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-5 bg-primary rounded-full" />
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/50">Detail Tiket</h4>
                                            </div>

                                            <div className="bg-light p-6 rounded-[24px] border border-dark/5 border-dashed relative overflow-hidden group/ticket">
                                                <div className="absolute right-[-15px] top-[-15px] w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover/ticket:bg-primary/10 transition-colors" />

                                                <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                                                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                                                        <ShoppingBagIcon className="w-7 h-7" />
                                                    </div>
                                                    <div className="grow">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <CalendarDaysIcon className="w-3 h-3 text-primary" />
                                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{booking.ticket.event.title}</p>
                                                        </div>
                                                        <h3 className="text-lg font-black text-dark uppercase tracking-tight leading-tight mb-2 group-hover/ticket:text-primary transition-colors">
                                                            {booking.ticket.title}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-4 mt-3">
                                                            <div className="flex items-center gap-1.5">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-dark/20" />
                                                                <p className="text-[10px] font-black text-dark/40 uppercase tracking-widest">{booking.quantity} Tiket</p>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                                                <p className="text-base font-black text-dark">Rp {new Intl.NumberFormat('id-ID').format(booking.total_price)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {booking.payment_proof && (
                                                    <div className="mt-6 pt-6 border-t border-dark/10 border-dotted flex flex-col sm:flex-row items-center gap-5">
                                                        <div className="relative w-24 aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-lg group/img cursor-zoom-in group-hover/ticket:scale-105 transition-transform" onClick={() => window.open(booking.payment_proof, '_blank')}>
                                                            <img src={booking.payment_proof} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" alt="Payment Proof" />
                                                            <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                                <PhotoIcon className="w-5 h-5 text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="text-center sm:text-left">
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-0.5">Bukti Bayar</p>
                                                            <p className="text-[11px] font-bold text-dark/50 leading-relaxed">Terunggah. Klik untuk perbesar.</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 text-[9px] font-black uppercase tracking-widest text-dark/20">
                                                <span className="bg-light px-3 py-1.5 rounded-full border border-dark/5">
                                                    ID: #{booking.id.toString().padStart(6, '0')}
                                                </span>
                                                <span className="bg-light px-3 py-1.5 rounded-full border border-dark/5">
                                                    TGL: {new Date(booking.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions Section */}
                                        <div className="w-full xl:w-auto flex flex-row xl:flex-col gap-3 justify-center shrink-0 border-t xl:border-t-0 xl:border-l border-dark/5 pt-6 xl:pt-0 xl:pl-8">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                                        className="flex-1 xl:w-40 flex items-center justify-center gap-2.5 bg-emerald-500 text-white py-3.5 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all group/btn"
                                                    >
                                                        <CheckCircleIcon className="w-4 h-4" />
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                                        className="flex-1 xl:w-40 flex items-center justify-center gap-2.5 bg-light text-rose-500 py-3.5 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all w-full"
                                                    >
                                                        <XMarkIcon className="w-4 h-4" />
                                                        Tolak
                                                    </button>
                                                </>
                                            )}
                                            {(booking.status === 'confirmed' || booking.status === 'cancelled') && (
                                                <button
                                                    onClick={() => deleteBooking(booking.id)}
                                                    className="flex-1 xl:w-40 flex items-center justify-center gap-2.5 bg-rose-50 text-rose-600 border border-rose-100 py-3.5 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                    Hapus
                                                </button>
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
