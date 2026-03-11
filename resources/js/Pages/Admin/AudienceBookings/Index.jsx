import { Head, usePage, router } from '@inertiajs/react';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    TicketIcon,
    CheckCircleIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    BanknotesIcon,
    FunnelIcon,
    TrashIcon,
    PhotoIcon,
    XMarkIcon,
    EyeIcon,
    ClipboardDocumentIcon,
    IdentificationIcon,
} from '@heroicons/react/24/outline';

const fmtPrice = (n) => new Intl.NumberFormat('id-ID').format(n);

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

export default function AudienceBookingsIndex({ bookings }) {
    const { flash } = usePage().props;
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const categories = [...new Set(
        bookings
            .filter(b => b.audience_ticket?.main_category?.title)
            .map(b => b.audience_ticket.main_category.title)
    )];

    const filteredBookings = bookings.filter(b => {
        const matchStatus = filter === 'all' || b.status === filter;
        const matchCat = categoryFilter === 'all' || b.audience_ticket?.main_category?.title === categoryFilter;
        return matchStatus && matchCat;
    });

    const updateStatus = (id, status) => {
        if (confirm(`Ubah status ke "${status}"?`)) {
            router.patch(route('admin.audience-bookings.updateStatus', id), { status }, {
                onSuccess: () => {
                    if (selectedBooking?.id === id) {
                        setSelectedBooking(prev => ({ ...prev, status }));
                    }
                }
            });
        }
    };

    const deleteBooking = (id) => {
        if (confirm('Hapus data tiket penonton ini? Tindakan tidak dapat dibatalkan.')) {
            router.delete(route('admin.audience-bookings.destroy', id), {
                onSuccess: () => {
                    if (selectedBooking?.id === id) setSelectedBooking(null);
                }
            });
        }
    };

    const copy = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} berhasil disalin!`);
    };

    return (
        <div className="min-h-screen bg-light flex">
            <Head title="Data Tiket Penonton | Sugoi 8 Admin" />
            <SidebarAdmin activePage="audience-bookings" />

            <main className="grow overflow-y-auto max-h-screen">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md px-8 py-6 border-b border-dark/5 flex flex-col lg:flex-row items-start lg:items-center justify-between sticky top-0 z-30 gap-4">
                    <div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Data Tiket Penonton</h1>
                        <p className="text-[10px] text-dark/30 font-bold uppercase tracking-widest mt-0.5">Manajemen Pembelian Tiket & Konfirmasi</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-nowrap items-center justify-end gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                        {categories.length > 0 && (
                            <div className="flex shrink-0 items-center bg-light rounded-2xl border border-dark/5 shadow-inner hover:shadow-md transition-shadow pr-2 overflow-hidden">
                                <div className="pl-4 pr-3 py-2.5 border-r border-dark/5 bg-white/50 text-dark/40">
                                    <TicketIcon className="w-4 h-4" />
                                </div>
                                <select
                                    value={categoryFilter}
                                    onChange={e => setCategoryFilter(e.target.value)}
                                    className="w-auto py-2.5 pl-3 pr-10 bg-transparent text-[10px] font-black uppercase tracking-widest text-dark border-none outline-none focus:ring-0 cursor-pointer truncate max-w-[160px]"
                                >
                                    <option value="all">Kategori</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        )}

                        <div className="flex shrink-0 items-center bg-light rounded-2xl border border-dark/5 shadow-inner hover:shadow-md transition-shadow pr-2 overflow-hidden">
                            <div className="pl-4 pr-3 py-2.5 border-r border-dark/5 bg-white/50 text-dark/40">
                                <FunnelIcon className="w-4 h-4" />
                            </div>
                            <select
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                                className="w-auto py-2.5 pl-3 pr-10 bg-transparent text-[10px] font-black uppercase tracking-widest text-dark border-none outline-none focus:ring-0 cursor-pointer"
                            >
                                <option value="all">Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Terverifikasi</option>
                                <option value="cancelled">Dibatalkan</option>
                            </select>
                        </div>
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
                                    <TicketIcon className="w-8 h-8 text-dark/10" />
                                </div>
                                <h3 className="text-xl font-black text-secondary uppercase tracking-tight mb-2">Belum Ada Data</h3>
                                <p className="text-dark/30 font-bold uppercase text-[10px] tracking-widest">Belum ada pembelian tiket penonton.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-light border-b border-dark/5">
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Kode</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Pembeli</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Tiket</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Total</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40">Status</th>
                                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/40 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-dark/5">
                                        {filteredBookings.map(b => (
                                            <tr key={b.id} className="hover:bg-light/50 transition-colors group">
                                                <td className="px-6 py-5 align-middle">
                                                    <span className="text-[10px] font-black uppercase text-dark/70 tracking-widest border border-dark/5 bg-light px-2 py-1 rounded-md">
                                                        {b.booking_code || `S8-AUD-${String(b.id).padStart(5, '0')}`}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 align-middle">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                            <UserIcon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-dark whitespace-nowrap">{b.customer_name}</p>
                                                            <p className="text-[10px] font-bold text-dark/40">{b.customer_phone}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 align-middle">
                                                    <p className="text-xs font-black text-dark truncate max-w-[180px]">{b.audience_ticket?.title || '—'}</p>
                                                    <p className="text-[10px] font-bold text-dark/40 mt-1 uppercase truncate max-w-[180px]">{b.audience_ticket?.main_category?.title || '—'}</p>
                                                </td>
                                                <td className="px-6 py-5 align-middle">
                                                    <p className="text-sm font-black text-secondary italic">Rp {fmtPrice(b.total_price)}</p>
                                                    <p className="text-[9px] font-bold text-dark/40 uppercase tracking-widest mt-1">{b.quantity} Tiket</p>
                                                </td>
                                                <td className="px-6 py-5 align-middle">{statusBadge(b.status)}</td>
                                                <td className="px-6 py-5 align-middle text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setSelectedBooking(b)}
                                                            className="w-8 h-8 rounded-lg bg-light text-dark/40 hover:text-dark hover:bg-dark/5 flex items-center justify-center transition-all"
                                                            title="Lihat Detail"
                                                        >
                                                            <EyeIcon className="w-4 h-4" />
                                                        </button>
                                                        {b.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => updateStatus(b.id, 'confirmed')}
                                                                    className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 hover:text-white hover:bg-emerald-500 flex items-center justify-center transition-all"
                                                                    title="Verifikasi"
                                                                >
                                                                    <CheckCircleIcon className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => updateStatus(b.id, 'cancelled')}
                                                                    className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:text-white hover:bg-rose-500 flex items-center justify-center transition-all"
                                                                    title="Tolak"
                                                                >
                                                                    <XMarkIcon className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                        {(b.status === 'confirmed' || b.status === 'cancelled') && (
                                                            <button
                                                                onClick={() => deleteBooking(b.id)}
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

            {/* Detail Modal */}
            <Transition appear show={!!selectedBooking} as={Fragment}>
                <Dialog as="div" className="relative z-100" onClose={() => setSelectedBooking(null)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4">
                                <Dialog.Panel className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-dark/5 p-8 max-h-[90vh] overflow-y-auto relative">
                                    <button
                                        onClick={() => setSelectedBooking(null)}
                                        className="absolute top-6 right-6 w-10 h-10 bg-light rounded-full flex items-center justify-center text-dark/30 hover:text-dark hover:bg-dark/5 transition-all z-20"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>

                                    {selectedBooking && (
                                        <>
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-dark/5 pr-12">
                                                <div>
                                                    <h3 className="text-2xl font-black text-dark tracking-tight uppercase">Detail Tiket</h3>
                                                    <p className="text-[10px] font-bold text-dark/40 tracking-widest uppercase mt-1">
                                                        {selectedBooking.booking_code || `S8-AUD-${String(selectedBooking.id).padStart(5, '0')}`} • {new Date(selectedBooking.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </p>
                                                </div>
                                                <div className="hidden sm:block">{statusBadge(selectedBooking.status)}</div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Pembeli */}
                                                <div className="space-y-4">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-dark/40 px-1">Profil Pembeli</p>
                                                    <div className="bg-light p-4 rounded-3xl space-y-4 border border-dark/5">
                                                        {[
                                                            { icon: UserIcon, label: 'Nama Lengkap', val: selectedBooking.customer_name },
                                                            { icon: PhoneIcon, label: 'WhatsApp', val: selectedBooking.customer_phone, copy: true },
                                                            { icon: EnvelopeIcon, label: 'Email', val: selectedBooking.customer_email, copy: true },
                                                        ].map(({ icon: Icon, label, val, copy: canCopy }) => (
                                                            <div key={label} className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0">
                                                                    <Icon className="w-5 h-5 text-dark/40" />
                                                                </div>
                                                                <div className="grow overflow-hidden">
                                                                    <p className="text-[9px] font-black uppercase text-dark/30">{label}</p>
                                                                    <p className="text-sm font-black text-dark mt-0.5 flex items-center justify-between gap-2">
                                                                        <span className="truncate">{val}</span>
                                                                        {canCopy && (
                                                                            <button onClick={() => copy(val, label)} className="text-primary hover:text-dark transition-colors shrink-0">
                                                                                <ClipboardDocumentIcon className="w-4 h-4" />
                                                                            </button>
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {selectedBooking.customer_nik && (
                                                            <div className="flex items-center gap-3 border-t border-dark/5 pt-4">
                                                                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0">
                                                                    <IdentificationIcon className="w-5 h-5 text-dark/40" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black uppercase text-dark/30">NIK</p>
                                                                    <p className="text-sm font-black text-dark mt-0.5">{selectedBooking.customer_nik}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Tiket & Bukti */}
                                                <div className="space-y-4">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-dark/40 px-1">Detail Tiket</p>
                                                    <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">
                                                            {selectedBooking.audience_ticket?.main_category?.title || '—'}
                                                        </p>
                                                        <h4 className="text-base font-black text-dark italic">
                                                            {selectedBooking.audience_ticket?.title || '—'}
                                                        </h4>
                                                        {selectedBooking.audience_ticket?.description && (
                                                            <p className="text-[11px] text-dark/50 mt-2 leading-relaxed">
                                                                {selectedBooking.audience_ticket.description}
                                                            </p>
                                                        )}
                                                        <div className="flex items-center justify-between border-t border-primary/10 pt-4 mt-4">
                                                            <p className="text-xs font-bold text-dark/60">{selectedBooking.quantity} Tiket</p>
                                                            <p className="text-xl font-black text-dark italic">Rp {fmtPrice(selectedBooking.total_price)}</p>
                                                        </div>
                                                    </div>

                                                    <p className="text-[9px] font-black uppercase tracking-widest text-dark/40 px-1 pt-2">Bukti Transfer</p>
                                                    {selectedBooking.payment_proof ? (
                                                        <div
                                                            className="relative aspect-video rounded-3xl overflow-hidden border-2 border-dark/5 group cursor-zoom-in"
                                                            onClick={() => window.open(selectedBooking.payment_proof, '_blank')}
                                                        >
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

                                            {/* Action buttons */}
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
