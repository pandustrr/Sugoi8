import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePage, router } from '@inertiajs/react';
import {
    TicketIcon,
    XMarkIcon,
    CheckBadgeIcon,
    UserCircleIcon,
    PhoneIcon,
    InformationCircleIcon,
    IdentificationIcon,
    EnvelopeIcon,
    BanknotesIcon,
} from '@heroicons/react/24/outline';

const fmtPrice = (n) => new Intl.NumberFormat('id-ID').format(n);

export default function AudienceSuccessModal({ booking, onClose }) {
    const { settings } = usePage().props;
    const waNumber = (settings?.contact_wa || '6285954464539').replace(/[^0-9]/g, '').replace(/^0/, '62');

    if (!booking) return null;

    const ticketTitle = booking.audience_ticket?.title || 'Tiket Penonton';
    const categoryTitle = booking.audience_ticket?.main_category?.title || '';
    const bookingCode = booking.booking_code || `S8-AUD-${String(booking.id).padStart(5, '0')}`;

    const waMsg = encodeURIComponent(
        `Halo Sugoi 8 Management, saya ingin konfirmasi pembayaran tiket penonton.\n\n` +
        `*Detail Pembelian:*\n` +
        `Nama: ${booking.customer_name}\n` +
        `NIK: ${booking.customer_nik || '-'}\n` +
        `Tiket: ${ticketTitle}${categoryTitle ? ` (${categoryTitle})` : ''}\n` +
        `Kode: #${bookingCode}\n` +
        `Total: Rp ${fmtPrice(booking.total_price)}\n\n` +
        `Berikut saya lampirkan bukti pembayarannya.`
    );

    return (
        <Transition appear show={!!booking} as={Fragment}>
            <Dialog as="div" className="relative z-300" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-dark/70 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <Transition.Child as={Fragment}
                            enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <Dialog.Panel className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden relative border border-dark/5 my-8">
                                {/* Decor blobs */}
                                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

                                <div className="relative z-10 p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                                    {/* Close */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-8 right-8 w-10 h-10 bg-light rounded-full flex items-center justify-center text-dark/30 hover:text-dark hover:bg-dark/5 transition-all z-20"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>

                                    {/* Success Icon */}
                                    <div className="flex flex-col items-center mb-8 mt-2">
                                        <div className="mb-6 relative">
                                            <div className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center shadow-xl shadow-primary/20 animate-bounce">
                                                <CheckBadgeIcon className="w-12 h-12 text-white" />
                                            </div>
                                            <div className="absolute inset-0 bg-primary rounded-[32px] animate-ping opacity-10" />
                                        </div>
                                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-3 text-dark leading-none italic text-center">
                                            Pembelian <span className="text-primary">Berhasil!</span>
                                        </h1>
                                        <p className="text-sm text-dark/40 font-medium leading-relaxed max-w-md mx-auto text-center">
                                            Terima kasih <strong className="text-dark">{booking.customer_name}</strong>, pembelian tiket Anda sedang menunggu verifikasi oleh admin.
                                        </p>
                                    </div>

                                    {/* Screenshot warning */}
                                    <div className="mb-6 bg-red-50 border-2 border-dashed border-red-200 rounded-[24px] p-5 text-center animate-pulse">
                                        <p className="text-red-600 font-black uppercase tracking-[0.2em] text-[11px] mb-1">📸 HARAP SCREENSHOT HALAMAN INI!</p>
                                        <p className="text-red-500/70 font-bold text-[10px] leading-relaxed uppercase tracking-widest">
                                            Simpan kode tiket Anda. E-Ticket akan dikirim setelah konfirmasi admin.
                                        </p>
                                    </div>

                                    {/* Dark card */}
                                    <div className="bg-dark rounded-[32px] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group mb-6">
                                        <div className="absolute top-0 right-0 p-8 opacity-5">
                                            <TicketIcon className="w-28 h-28 text-white transition-transform group-hover:rotate-12 duration-700" />
                                        </div>

                                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left: Personal Info */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-6">
                                                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Tiket Penonton — Pending Verifikasi</p>
                                                </div>

                                                <h3 className="text-xl font-black uppercase tracking-tighter mb-1 italic">{ticketTitle}</h3>
                                                {categoryTitle && (
                                                    <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-5">{categoryTitle}</p>
                                                )}

                                                <div className="bg-white/5 rounded-2xl p-4 space-y-3 mt-4">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-secondary/50 mb-3">Data Pembeli</p>
                                                    {[
                                                        { Icon: UserCircleIcon, label: 'Nama', val: booking.customer_name },
                                                        { Icon: IdentificationIcon, label: 'NIK', val: booking.customer_nik },
                                                        { Icon: EnvelopeIcon, label: 'Email', val: booking.customer_email },
                                                        { Icon: PhoneIcon, label: 'WhatsApp', val: booking.customer_phone },
                                                    ].filter(r => r.val).map(({ Icon, label, val }) => (
                                                        <div key={label} className="flex items-center gap-3">
                                                            <Icon className="w-4 h-4 text-white/20 shrink-0" />
                                                            <div>
                                                                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">{label}</p>
                                                                <p className="text-xs font-bold truncate max-w-[180px]">{val}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right: Order summary + CTA */}
                                            <div className="flex flex-col justify-between gap-6">
                                                <div className="bg-white/5 rounded-[24px] p-5 border border-white/10">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Kode Tiket</p>
                                                        <p className="font-black text-secondary text-sm">#{bookingCode}</p>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-4">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Jumlah</p>
                                                        <p className="font-black">1 Tiket</p>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/40 italic">Total Bayar</p>
                                                        <p className="text-2xl font-black text-white italic">Rp {fmtPrice(booking.total_price)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        onClick={() => router.get(route('eventprogram.checkStatus'))}
                                                        className="w-full bg-white text-dark border-2 border-dark/5 py-4 rounded-[18px] font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:bg-light transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <TicketIcon className="w-4 h-4" />
                                                        Lihat Tiket Saya
                                                    </button>
                                                    <a
                                                        href={`https://wa.me/${waNumber}?text=${waMsg}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full bg-secondary text-dark py-4 rounded-[18px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <PhoneIcon className="w-4 h-4" />
                                                        Konfirmasi via WhatsApp
                                                    </a>
                                                    <button
                                                        onClick={onClose}
                                                        className="w-full bg-white/5 text-white/40 hover:text-white py-4 rounded-[18px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                                                    >
                                                        Selesai
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info box */}
                                    <div className="bg-light p-5 rounded-[24px] border border-dark/5 flex items-start gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                                            <InformationCircleIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-dark uppercase tracking-tight text-sm mb-1">Langkah Selanjutnya</h4>
                                            <p className="text-dark/40 font-medium text-[11px] leading-relaxed italic">
                                                Hubungi admin via WhatsApp di atas untuk konfirmasi pembayaran. Setelah dikonfirmasi, admin akan memverifikasi tiket Anda dan <strong>E-Ticket</strong> akan dikirim ke email <strong>{booking.customer_email}</strong>. Simpan kode tiket <strong>#{bookingCode}</strong> sebagai referensi.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
