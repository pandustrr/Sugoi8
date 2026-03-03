import { Head, usePage, router } from '@inertiajs/react';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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
    TagIcon,
    ClipboardDocumentIcon,
    CalendarDaysIcon,
    BuildingOfficeIcon,
    XMarkIcon,
    EyeIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function Index({ bookings }) {
    const { flash } = usePage().props;
    const [filter, setFilter] = useState('all');
    const [divisionFilter, setDivisionFilter] = useState('all');
    const [eventFilter, setEventFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const divisions = [...new Set(bookings.map(b => b.division).filter(Boolean))];
    const events = [...new Map(bookings.map(b => [b.ticket.event.id, b.ticket.event])).values()];

    const updateStatus = (id, status) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status pemesanan ini ke ${status}?`)) {
            router.patch(route('admin.bookings.updateStatus', id), { status }, {
                onSuccess: () => {
                    if (selectedBooking && selectedBooking.id === id) {
                        setSelectedBooking(prev => ({ ...prev, status }));
                    }
                }
            });
        }
    };

    const deleteBooking = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data pemesanan ini? Tindakan ini tidak dapat dibatalkan.')) {
            router.delete(route('admin.bookings.destroy', id), {
                onSuccess: () => {
                    if (selectedBooking && selectedBooking.id === id) {
                        setSelectedBooking(null);
                    }
                }
            });
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
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">Terverifikasi</span>
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-rose-700">Dibatalkan</span>
                    </div>
                );
            default:
                return (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-amber-700">Pending</span>
                    </div>
                );
        }
    };

    const filteredBookings = bookings.filter(b => {
        const matchStatus = filter === 'all' || b.status === filter;
        const matchDivision = divisionFilter === 'all' || b.division === divisionFilter;
        const matchEvent = eventFilter === 'all' || b.ticket.event.id === parseInt(eventFilter);
        return matchStatus && matchDivision && matchEvent;
    });

    return (
        <div className="min-h-screen bg-light flex">
            <Head title="Daftar Pemesanan | Sugoi 8 Admin" />
            <SidebarAdmin activePage="bookings" />

            <main className="grow overflow-y-auto max-h-screen">
                <header className="bg-white/80 backdrop-blur-md px-8 py-6 border-b border-dark/5 flex flex-col lg:flex-row items-start lg:items-center justify-between sticky top-0 z-30 gap-4">
                    <div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Data Pemesanan</h1>
                        <p className="text-[10px] text-dark/30 font-bold uppercase tracking-widest mt-0.5">Manajemen Pesanan Tiket & Konfirmasi</p>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-wrap items-center justify-end gap-3 mt-4 lg:mt-0">
                        {events.length > 0 && (
                            <div className="flex items-center bg-light rounded-2xl border border-dark/5 shadow-inner hover:shadow-md transition-shadow pr-2 overflow-hidden">
                                <div className="pl-4 pr-3 py-3 border-r border-dark/5 bg-white/50 text-dark/40">
                                    <CalendarDaysIcon className="w-4 h-4" />
                                </div>
                                <select
                                    value={eventFilter}
                                    onChange={(e) => setEventFilter(e.target.value)}
                                    className="flex-1 lg:w-auto py-3 pl-3 pr-10 bg-transparent text-[10px] font-black uppercase tracking-widest text-dark border-none outline-none focus:ring-0 cursor-pointer hover:bg-white/50 transition-all truncate max-w-[200px]"
                                >
                                    <option value="all">Semua Event</option>
                                    {events.map((ev) => (
                                        <option key={ev.id} value={ev.id}>{ev.title}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex items-center bg-light rounded-2xl border border-dark/5 shadow-inner hover:shadow-md transition-shadow pr-2 overflow-hidden">
                            <div className="pl-4 pr-3 py-3 border-r border-dark/5 bg-white/50 text-dark/40">
                                <FunnelIcon className="w-4 h-4" />
                            </div>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="flex-1 lg:w-auto py-3 pl-3 pr-10 bg-transparent text-[10px] font-black uppercase tracking-widest text-dark border-none outline-none focus:ring-0 cursor-pointer hover:bg-white/50 transition-all truncate"
                            >
                                <option value="all">Semua Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Konfirmasi</option>
                                <option value="cancelled">Dibatalkan</option>
                            </select>
                        </div>

                        {divisions.length > 0 && (
                            <div className="flex items-center bg-light rounded-2xl border border-dark/5 shadow-inner hover:shadow-md transition-shadow pr-2 overflow-hidden">
                                <div className="pl-4 pr-3 py-3 border-r border-dark/5 bg-white/50 text-dark/40">
                                    <TagIcon className="w-4 h-4" />
                                </div>
                                <select
                                    value={divisionFilter}
                                    onChange={(e) => setDivisionFilter(e.target.value)}
                                    className="flex-1 lg:w-auto py-3 pl-3 pr-10 bg-transparent text-[10px] font-black uppercase tracking-widest text-dark border-none outline-none focus:ring-0 cursor-pointer hover:bg-white/50 transition-all truncate max-w-[150px]"
                                >
                                    <option value="all">Semua Divisi</option>
                                    {divisions.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                        )}
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

                    <div className="bg-white rounded-[32px] border border-dark/5 shadow-sm overflow-hidden">
                        {filteredBookings.length === 0 ? (
                            <div className="p-20 text-center">
                                <div className="w-20 h-20 bg-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <ShoppingBagIcon className="w-8 h-8 text-dark/10" />
                                </div>
                                <h3 className="text-xl font-black text-dark uppercase tracking-tight mb-2 text-secondary">Belum Ada Pesanan</h3>
                                <p className="text-dark/30 font-bold uppercase text-[10px] tracking-widest">Antrean pemesanan tiket Anda masih kosong saat ini.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-light border-b border-dark/5">
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">ID</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Pemesan</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Event & Tiket</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Total Tagihan</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Status</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-dark/5">
                                        {filteredBookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-light/50 transition-colors group">
                                                <td className="px-6 py-5 align-middle">
                                                    <span className="text-[10px] font-black uppercase text-dark/70 tracking-widest border border-dark/5 bg-light px-2 py-1 rounded-md">#{booking.booking_code || booking.id.toString().padStart(5, '0')}</span>
                                                </td>
                                                <td className="px-6 py-5 align-middle">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                            <UserIcon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-dark whitespace-nowrap">{booking.customer_name}</p>
                                                            <p className="text-[10px] font-bold text-dark/40">{booking.customer_phone}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 align-middle">
                                                    <p className="text-xs font-black text-dark truncate max-w-[200px]">{booking.ticket.title}</p>
                                                    <p className="text-[10px] font-bold text-dark/40 mt-1 uppercase truncate max-w-[200px]">{booking.ticket.event.title}</p>
                                                </td>
                                                <td className="px-6 py-5 align-middle">
                                                    <p className="text-sm font-black text-secondary italic">Rp {new Intl.NumberFormat('id-ID').format(booking.total_price)}</p>
                                                    <p className="text-[9px] font-bold text-dark/40 uppercase tracking-widest mt-1">{booking.quantity} Tiket</p>
                                                </td>
                                                <td className="px-6 py-5 align-middle">
                                                    {statusBadge(booking.status)}
                                                </td>
                                                <td className="px-6 py-5 align-middle text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setSelectedBooking(booking)}
                                                            className="w-8 h-8 rounded-lg bg-light text-dark/40 hover:text-dark hover:bg-dark/5 flex items-center justify-center transition-all"
                                                            title="Lihat Detail"
                                                        >
                                                            <EyeIcon className="w-4 h-4" />
                                                        </button>

                                                        {booking.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => updateStatus(booking.id, 'confirmed')}
                                                                    className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 hover:text-white hover:bg-emerald-500 flex items-center justify-center transition-all"
                                                                    title="Verifikasi"
                                                                >
                                                                    <CheckCircleIcon className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => updateStatus(booking.id, 'cancelled')}
                                                                    className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:text-white hover:bg-rose-500 flex items-center justify-center transition-all"
                                                                    title="Tolak"
                                                                >
                                                                    <XMarkIcon className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                        {(booking.status === 'confirmed' || booking.status === 'cancelled') && (
                                                            <button
                                                                onClick={() => deleteBooking(booking.id)}
                                                                className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:text-white hover:bg-rose-500 flex items-center justify-center transition-all"
                                                                title="Hapus"
                                                            >
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal Detail */}
            <Transition appear show={!!selectedBooking} as={Fragment}>
                <Dialog as="div" className="relative z-100" onClose={() => setSelectedBooking(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95 translate-y-4"
                                enterTo="opacity-100 scale-100 translate-y-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100 translate-y-0"
                                leaveTo="opacity-0 scale-95 translate-y-4"
                            >
                                <Dialog.Panel className="w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden relative border border-dark/5 p-8 max-h-[90vh] overflow-y-auto w-full">
                                    <button
                                        onClick={() => setSelectedBooking(null)}
                                        className="absolute top-6 right-6 w-10 h-10 bg-light rounded-full flex items-center justify-center text-dark/30 hover:text-dark hover:bg-dark/5 transition-all z-20 outline-none"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>

                                    {selectedBooking && (
                                        <>
                                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-dark/5 pr-12">
                                                <div>
                                                    <h3 className="text-2xl font-black text-dark tracking-tight uppercase">Detail Pemesanan</h3>
                                                    <p className="text-[10px] font-bold text-dark/40 tracking-widest uppercase">ID: #{selectedBooking.booking_code || selectedBooking.id.toString().padStart(5, '0')} • Dibuat pada: {new Date(selectedBooking.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                                <div className="hidden sm:block">
                                                    {statusBadge(selectedBooking.status)}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Left: Customer Info */}
                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Profil Pemesan</p>
                                                        <div className="bg-light p-4 rounded-3xl space-y-4 border border-dark/5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0">
                                                                    <UserIcon className="w-5 h-5 text-dark/40" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black uppercase text-dark/30">Nama Lengkap</p>
                                                                    <p className="text-sm font-black text-dark mt-0.5">{selectedBooking.customer_name}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0">
                                                                    <PhoneIcon className="w-5 h-5 text-dark/40" />
                                                                </div>
                                                                <div className="grow">
                                                                    <p className="text-[9px] font-black uppercase text-dark/30">WhatsApp</p>
                                                                    <p className="text-sm font-black text-dark mt-0.5 flex items-center justify-between">
                                                                        {selectedBooking.customer_phone}
                                                                        <button onClick={() => copyToClipboard(selectedBooking.customer_phone, 'WhatsApp')} className="text-primary hover:text-dark transition-colors mr-2">
                                                                            <ClipboardDocumentIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0">
                                                                    <EnvelopeIcon className="w-5 h-5 text-dark/40" />
                                                                </div>
                                                                <div className="grow overflow-hidden">
                                                                    <p className="text-[9px] font-black uppercase text-dark/30">Email</p>
                                                                    <p className="text-sm font-black text-dark mt-0.5 flex items-center justify-between">
                                                                        <span className="truncate">{selectedBooking.customer_email}</span>
                                                                        <button onClick={() => copyToClipboard(selectedBooking.customer_email, 'Email')} className="text-primary hover:text-dark transition-colors shrink-0 ml-2">
                                                                            <ClipboardDocumentIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {selectedBooking.school_name && (
                                                                <div className="flex items-center gap-3 border-t border-dark/5 pt-4">
                                                                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                                                                        <BuildingOfficeIcon className="w-5 h-5 text-secondary" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[9px] font-black uppercase text-secondary/60">Instansi / Sekolah</p>
                                                                        <p className="text-sm font-black text-secondary mt-0.5">{selectedBooking.school_name}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {selectedBooking.division && (
                                                                <div className="flex items-center gap-3 border-t border-dark/5 pt-4">
                                                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                                                                        <TagIcon className="w-5 h-5 text-emerald-600" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[9px] font-black uppercase text-emerald-600/60">Divisi</p>
                                                                        <p className="text-sm font-black text-emerald-600 mt-0.5">{selectedBooking.division}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Ticket Info & Transfer Info */}
                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Detail Tiket</p>
                                                        <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">{selectedBooking.ticket.event.title}</p>
                                                            <h4 className="text-base font-black text-dark italic">{selectedBooking.ticket.title}</h4>
                                                            <div className="flex items-center justify-between border-t border-primary/10 pt-4 mt-4">
                                                                <p className="text-xs font-bold text-dark/60">{selectedBooking.quantity} Tiket</p>
                                                                <p className="text-xl font-black text-dark italic">Rp {new Intl.NumberFormat('id-ID').format(selectedBooking.total_price)}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Bukti Transfer</p>
                                                        {selectedBooking.payment_proof ? (
                                                            <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-dark/5 group cursor-zoom-in" onClick={() => window.open(selectedBooking.payment_proof, '_blank')}>
                                                                <img src={selectedBooking.payment_proof} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Bukti Transfer" />
                                                                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <div className="bg-white text-dark text-[10px] font-black px-4 py-2 flex items-center gap-2 rounded-full uppercase tracking-widest shadow-xl">
                                                                        <PhotoIcon className="w-4 h-4" /> Perbesar
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="aspect-video bg-light rounded-3xl border border-dark/5 flex flex-col items-center justify-center text-dark/30">
                                                                <PhotoIcon className="w-8 h-8 opacity-50 mb-2" />
                                                                <p className="text-[10px] uppercase font-bold tracking-widest">Belum ada bukti</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Process Buttons inside Modal */}
                                            {selectedBooking.status === 'pending' && (
                                                <div className="mt-8 pt-6 border-t border-dark/5 flex justify-end gap-3">
                                                    <button
                                                        onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                                                        className="px-6 py-3 rounded-2xl bg-light text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                                                    >
                                                        <XMarkIcon className="w-4 h-4" /> Tolak
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                                                        className="px-6 py-3 rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                                                    >
                                                        <CheckCircleIcon className="w-4 h-4" /> Verifikasi Pembayaran
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
