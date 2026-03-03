import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import {
    TicketIcon,
    MapPinIcon,
    ArrowRightIcon,
    XMarkIcon,
    CalendarDaysIcon,
    CheckBadgeIcon,
    UserCircleIcon,
    PhoneIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { FingerPrintIcon } from '@heroicons/react/24/solid';

export default function SuccessModal({ booking, onClose }) {
    const { settings } = usePage().props;
    const waNumber = (settings?.contact_wa || '6285954464539').replace(/[^0-9]/g, '').replace(/^0/, '62');

    if (!booking) return null;

    return (
        <Transition appear show={!!booking} as={Fragment}>
            <Dialog as="div" className="relative z-300" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <Dialog.Panel className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden relative border border-dark/5 my-8">

                                {/* Background Decor */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

                                <div className="relative z-10 p-8 md:p-12 max-h-[90vh] overflow-y-auto w-full">
                                    {/* Close Button */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-8 right-8 w-10 h-10 bg-light rounded-full flex items-center justify-center text-dark/30 hover:text-dark hover:bg-dark/5 transition-all z-20"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>

                                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                                        {/* Success Icon */}
                                        <div className="mb-10 relative mt-4">
                                            <div className="w-24 h-24 bg-green-500 rounded-[32px] flex items-center justify-center shadow-xl shadow-green-500/20 animate-bounce">
                                                <CheckBadgeIcon className="w-12 h-12 text-white" />
                                            </div>
                                            <div className="absolute inset-0 bg-green-500 rounded-[32px] animate-ping opacity-20" />
                                        </div>

                                        <div className="text-center mb-12">
                                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-dark leading-none italic">
                                                Pemesanan <span className="text-primary italic">Berhasil!</span>
                                            </h1>
                                            <p className="text-base md:text-lg text-dark/40 font-medium leading-relaxed max-w-xl mx-auto">
                                                Terima kasih {booking.customer_name}, pesanan tiket Anda sedang diproses. Silakan hubungi admin untuk konfirmasi pembayaran.
                                            </p>
                                        </div>

                                        {/* SCREENSHOT WARNING & LOGIN INFO */}
                                        <div className="w-full mb-10 space-y-4">
                                            <div className="bg-red-50 border-2 border-dashed border-red-200 rounded-[32px] p-6 text-center animate-pulse">
                                                <p className="text-red-600 font-black uppercase tracking-[0.2em] text-sm mb-2">📸 HARAP SCREENSHOT HALAMAN INI!</p>
                                                <p className="text-red-500/80 font-bold text-[11px] leading-relaxed uppercase tracking-widest">
                                                    Gunakan informasi akun di bawah ini untuk memantau status & detail tiket Anda.
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-primary/5 rounded-[24px] border border-primary/10 p-5 flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                                                        <UserCircleIcon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-primary/40 leading-none mb-1">Username Login</p>
                                                        <p className="text-xs font-black text-dark truncate max-w-[150px] md:max-w-none">{booking.customer_email}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-secondary/10 rounded-[24px] border border-secondary/20 p-5 flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-secondary/30 rounded-xl flex items-center justify-center">
                                                        <InformationCircleIcon className="w-5 h-5 text-dark" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 leading-none mb-1">Password (ID Pesan)</p>
                                                        <p className="text-[13px] font-black text-dark uppercase">{booking.booking_code || booking.id.toString().padStart(5, '0')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Detail Card */}
                                        <div className="w-full bg-dark rounded-[40px] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                                            {/* Card Decor */}
                                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                                <TicketIcon className="w-32 h-32 text-white transition-transform group-hover:rotate-12 duration-700" />
                                            </div>

                                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-8">
                                                        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_rgba(249,215,131,0.5)]" />
                                                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Status Pendaftaran: {booking.status.toUpperCase()}</h2>
                                                    </div>

                                                    <div className="mb-8">
                                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">{booking.ticket.title}</h3>
                                                        <div className="flex flex-col gap-2 opacity-50 font-bold text-xs uppercase tracking-widest">
                                                            <div className="flex items-center gap-2">
                                                                <CalendarDaysIcon className="w-4 h-4" />
                                                                {new Date(booking.ticket.event ? booking.ticket.event.date : booking.ticket.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPinIcon className="w-4 h-4" />
                                                                {booking.ticket.event ? booking.ticket.event.location : booking.ticket.location}
                                                            </div>
                                                            {booking.division && (
                                                                <div className="flex items-center gap-2 text-secondary font-black">
                                                                    <span className="w-4 h-4 flex items-center justify-center">🏆</span>
                                                                    Divisi: {booking.division}
                                                                </div>
                                                            )}
                                                            {booking.school_name && (
                                                                <div className="flex items-center gap-2 text-white/70">
                                                                    <span className="w-4 h-4 flex items-center justify-center">🏫</span>
                                                                    Instansi: {booking.school_name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 pt-8 border-t border-white/5 bg-white/5 rounded-3xl p-5 mt-4">
                                                        <p className="text-[10px] font-black uppercase text-secondary/50 tracking-[0.2em] mb-4">Verifikasi Data Pendaftar</p>
                                                        <div className="flex items-center gap-4">
                                                            <UserCircleIcon className="w-4 h-4 text-white/20" />
                                                            <div>
                                                                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Nama Lengkap</p>
                                                                <p className="font-bold text-xs">{booking.customer_name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <PhoneIcon className="w-4 h-4 text-white/20" />
                                                            <div>
                                                                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">No. WhatsApp</p>
                                                                <p className="font-bold text-xs">{booking.customer_phone}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <InformationCircleIcon className="w-4 h-4 text-white/20" />
                                                            <div>
                                                                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Email</p>
                                                                <p className="font-bold text-xs truncate max-w-[200px]">{booking.customer_email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between pt-4 lg:pt-0">
                                                    <div className="bg-white/5 rounded-[32px] p-6 backdrop-blur-sm border border-white/10">
                                                        <div className="flex justify-between items-center mb-5">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">ID Pemesanan</p>
                                                            <p className="font-black text-secondary">#{booking.booking_code || booking.id.toString().padStart(5, '0')}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center mb-5">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Jumlah</p>
                                                            <p className="font-black">{booking.quantity} Tiket</p>
                                                        </div>
                                                        <div className="flex justify-between items-center pt-5 border-t border-white/10">
                                                            <p className="text-xs font-black uppercase tracking-widest text-white/40 italic">Total Bayar</p>
                                                            <p className="text-2xl font-black text-white italic">Rp {new Intl.NumberFormat('id-ID').format(booking.total_price)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-8 lg:mt-0 flex flex-col gap-3">
                                                        <a
                                                            href={`https://wa.me/${waNumber}?text=Halo Sugoi 8 Management, saya ingin konfirmasi pembayaran tiket untuk pesanan %23${booking.booking_code || booking.id.toString().padStart(5, '0')} atas nama ${booking.customer_name}.%0A%0A*Detail Pesanan:*%0AKategori: ${encodeURIComponent(booking.ticket.title)}${booking.division ? '%0ADivisi: ' + encodeURIComponent(booking.division) : ''}${booking.school_name ? '%0AInstansi: ' + encodeURIComponent(booking.school_name) : ''}%0A%0ABerikut saya lampirkan bukti pembayarannya.`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full bg-secondary text-dark py-4 rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <PhoneIcon className="w-4 h-4" />
                                                            Konfirmasi WhatsApp
                                                        </a>
                                                        <Link
                                                            href={route('tickets.checkStatus')}
                                                            className="w-full bg-primary text-white py-4 rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <FingerPrintIcon className="w-4 h-4" />
                                                            Cek Status Pendaftaran
                                                        </Link>
                                                        <button
                                                            onClick={onClose}
                                                            className="w-full bg-white/5 text-white/40 hover:text-white py-4 rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                                        >
                                                            Selesai
                                                            <ArrowRightIcon className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reminder */}
                                        <div className="mt-10 bg-light p-6 rounded-[32px] border border-dark/5 flex flex-col md:flex-row items-center gap-6 max-w-2xl text-center md:text-left w-full">
                                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                                <InformationCircleIcon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-dark uppercase tracking-tight mb-2">Instruksi Penting!</h4>
                                                <p className="text-dark/40 font-medium text-[11px] leading-relaxed italic">Simpan ID Pemesanan Anda atau lakukan konfirmasi via WhatsApp segera. Anda dapat menggunakan tombol <b>"Cek Status Pendaftaran"</b> di atas untuk login dan memantau status karya. Akun monitoring pendaftaran Anda akan aktif setelah konfirmasi oleh Admin. Pastikan data pendaftar yang tertera di atas sudah benar.</p>
                                            </div>
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
