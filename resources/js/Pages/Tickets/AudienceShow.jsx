import { useState, Fragment, useEffect, useCallback } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import MainLayout from '../../Layouts/MainLayout';
import Container from '../../Components/UI/Container';
import AudienceSuccessModal from '../../Components/AudienceSuccessModal';
import TextRun from '../../Components/UI/TextRun';
import Button from '../../Components/UI/Button';
import {
    TicketIcon,
    MapPinIcon,
    CalendarIcon,
    MagnifyingGlassPlusIcon,
    CalendarDaysIcon,
    XMarkIcon,
    ArrowRightIcon,
    UserCircleIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

import AudienceBookingModal from './AudienceBookingModal';

const fmtPrice = (n) => new Intl.NumberFormat('id-ID').format(n);

const imgSrc = (url) =>
    url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

function ImagePreview({ src, onClose }) {
    return (
        <Transition show={!!src} as={Fragment}>
            <Dialog as="div" className="relative z-300" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-dark/95 backdrop-blur-2xl" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="relative max-w-4xl w-full">
                            <button
                                onClick={onClose}
                                className="absolute -top-12 md:-top-14 right-0 text-white hover:text-primary transition-colors flex items-center gap-2 group"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Tutup</span>
                                <XMarkIcon className="w-6 h-6 md:w-7 md:h-7" />
                            </button>
                            <img
                                src={src}
                                className="max-h-[80vh] md:max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                                alt="Preview Poster"
                            />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default function AudienceShow({ category, settings, auth }) {
    const { props } = usePage();
    const flashBooking = props.flash?.successBooking || null;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [successBooking, setSuccessBooking] = useState(null);

    const allTickets = category?.audience_tickets || [];
    const activeTickets = allTickets.filter(t => t.is_active);
    const minPrice = allTickets.length
        ? Math.min(...allTickets.map((t) => t.price))
        : 0;

    const poster = imgSrc(category.image_url);

    useEffect(() => {
        if (flashBooking) {
            setSuccessBooking(flashBooking);
            setIsModalOpen(false);
        }
    }, [flashBooking]);

    return (
        <MainLayout>
            <Head>
                <title>{`Tiket Penonton: ${category.title} | Sugoi 8 Management`}</title>
                <meta name="description" content={category.description || `Beli tiket penonton ${category.title} yang diselenggarakan oleh Sugoi 8 Management. Kualitas produksi dan SHOW MANAGEMENT terbaik.`} />
                <meta name="keywords" content={`tiket ${category.title}, tiket penonton jember, sugoi 8, show management`} />

                {/* OG Tags */}
                <meta property="og:title" content={`Tiket Penonton: ${category.title} | Sugoi 8 Management`} />
                <meta property="og:description" content={category.description?.substring(0, 160)} />
                <meta property="og:image" content={poster || "https://sugoi8management.com/8-sugoi-trans.png"} />
                <meta property="og:url" content={`${window.location.origin}/eventprogram/ticket/${category.slug}`} />
            </Head>

            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={poster || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"}
                        className="w-full h-full object-cover opacity-60 grayscale blur-sm scale-110"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary" />
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Poster Column — diperkecil */}
                        <div className="lg:col-span-4 relative">
                            <div
                                onClick={() => poster && setPreviewSrc(poster)}
                                className="aspect-square rounded-[28px] md:rounded-[40px] overflow-hidden shadow-2xl relative border border-white/10 group cursor-zoom-in"
                            >
                                <img
                                    src={poster || "/8-sugoi-trans.png"}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    alt={category.title}
                                />
                                {poster && (
                                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-secondary hover:text-dark transition-all opacity-0 group-hover:opacity-100">
                                        <MagnifyingGlassPlusIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -z-10 top-1/2 -left-8 w-48 h-48 bg-secondary/10 rounded-full blur-[80px]" />
                        </div>

                        {/* Content Column */}
                        <div className="lg:col-span-8 pt-2">
                            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-3 block">Tiket Penonton</span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-6 italic">
                                {category.title}
                            </h1>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-2 text-white/50">
                                    <TicketIcon className="w-4 h-4 text-secondary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">{allTickets.length} Pilihan Tiket Tersedia</span>
                                </div>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50">Mulai dari Rp {fmtPrice(minPrice)}</span>
                            </div>

                            <div className="bg-white/5 border border-white/5 p-5 md:p-6 rounded-[24px] mb-8 backdrop-blur-sm">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 flex items-center gap-2">
                                    <InformationCircleIcon className="w-4 h-4" />
                                    Informasi
                                </p>
                                <p className="text-white/60 text-sm font-medium leading-relaxed italic border-l-2 border-secondary/30 pl-4 whitespace-pre-wrap">
                                    {category.description || "Segera hadir detail informasi untuk pendaftaran ini. Sugoi 8 Management memberikan pengalaman SHOW MANAGEMENT terbaik untuk Anda."}
                                </p>
                            </div>

                            {/* ── Ticket Preview Inline ── */}
                            {allTickets.length > 0 && (
                                <div className="mb-7 space-y-2">
                                    {allTickets.map((ticket) => {
                                        const sold = ticket.stock !== null && ticket.stock <= 0;
                                        const inactive = !ticket.is_active;
                                        const disabled = sold || inactive;
                                        return (
                                            <button
                                                key={ticket.id}
                                                type="button"
                                                disabled={disabled}
                                                onClick={() => !disabled && setIsModalOpen(true)}
                                                className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-[18px] border text-left transition-all group ${disabled
                                                    ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                                                    : 'bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 active:scale-[0.99]'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3 min-w-0">
                                                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${disabled ? 'bg-white/20' : 'bg-secondary animate-pulse'}`} />
                                                    <div className="min-w-0">
                                                        <p className="text-white font-black text-xs md:text-sm uppercase tracking-tight leading-none truncate">{ticket.title}</p>
                                                        <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${sold ? 'text-red-400' : inactive ? 'text-white/30' : 'text-white/40'}`}>
                                                            {inactive ? 'Non-Aktif' : sold ? 'Habis Terjual' : ticket.stock !== null ? `Sisa ${ticket.stock} kursi` : 'Tersedia'}
                                                        </p>
                                                        {ticket.description && (
                                                            <p className="text-white/40 text-[10px] font-medium leading-relaxed mt-1.5 line-clamp-2">{ticket.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`shrink-0 font-black text-sm md:text-base italic ${disabled ? 'text-white/30' : 'text-secondary'}`}>
                                                    Rp {fmtPrice(ticket.price)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsModalOpen(true)}
                                    className="h-14 px-8 text-[10px] md:text-xs font-black tracking-[0.2em] shadow-xl shadow-secondary/10 active:scale-95 transition-all"
                                >
                                    BELI TIKET SEKARANG — Rp {fmtPrice(minPrice)}
                                </Button>
                                <Button
                                    variant="outline-white"
                                    href={route('eventprogram.index')}
                                    className="h-14 px-7 text-[9px] md:text-xs font-black tracking-widest opacity-60 hover:opacity-100"
                                >
                                    LIHAT EVENT LAINNYA
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <TextRun />

            {/* Sub-kategori Tiket */}
            {allTickets.length > 0 && (
                <section className="py-16 md:py-24 bg-light">
                    <Container>
                        <div className="mb-10">
                            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-2 block">Pilih Tiket</span>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic leading-tight">
                                Kategori <span className="text-primary">Tiket</span>
                            </h2>
                            <p className="text-dark/40 text-xs font-bold uppercase tracking-widest mt-2 border-l-4 border-primary pl-4">
                                Pilih kategori sesuai preferensimu dan dapatkan pengalaman terbaik.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allTickets.map((ticket) => {
                                const tktSrc = imgSrc(ticket.image_url);
                                const isSoldOut = ticket.stock !== null && ticket.stock <= 0;
                                const isInactive = !ticket.is_active;
                                const isDisabled = isSoldOut || isInactive;
                                return (
                                    <div
                                        key={ticket.id}
                                        className="group bg-white rounded-[32px] border border-dark/5 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 flex flex-col"
                                    >
                                        {/* Thumbnail */}
                                        {tktSrc && (
                                            <div className="aspect-4/3 overflow-hidden relative">
                                                <img
                                                    src={tktSrc}
                                                    alt={ticket.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-dark/60 to-transparent" />
                                                <div className="absolute bottom-2.5 left-3">
                                                    <span className="px-2 py-0.5 bg-white/95 backdrop-blur-sm rounded-lg text-dark text-[9px] font-black uppercase tracking-widest shadow-md">
                                                        Rp {fmtPrice(ticket.price)}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Info */}
                                        <div className="p-4 flex flex-col grow">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="text-xs font-black text-dark uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors italic">
                                                    {ticket.title}
                                                </h3>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    {isInactive && (
                                                        <span className="px-2 py-0.5 bg-dark/10 text-dark/40 rounded-lg text-[8px] font-black uppercase tracking-widest">Non-Aktif</span>
                                                    )}
                                                    {!tktSrc && (
                                                        <span className="text-sm font-black text-primary">
                                                            Rp {fmtPrice(ticket.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {ticket.description && (
                                                <p className="text-dark/50 text-[11px] font-medium leading-relaxed mb-3 line-clamp-2">
                                                    {ticket.description}
                                                </p>
                                            )}

                                            {/* Benefits */}
                                            {ticket.benefits && (
                                                <div className="mb-4 space-y-1.5">
                                                    {ticket.benefits.split('\n').filter(b => b.trim()).slice(0, 4).map((b, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-dark/60 text-[11px] font-bold">
                                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" />
                                                            {b.trim()}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Stock badge */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isDisabled ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${isDisabled ? 'text-red-400' : 'text-green-600'}`}>
                                                    {isInactive ? 'Non-Aktif' : isSoldOut ? 'Habis Terjual' : ticket.stock !== null ? `Sisa ${ticket.stock} kursi` : 'Tersedia'}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                disabled={isDisabled}
                                                className="mt-auto w-full bg-dark text-white py-3 rounded-[14px] font-black text-[9px] uppercase tracking-[0.2em] hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                            >
                                                {isInactive ? 'Non-Aktif' : isSoldOut ? 'Habis' : 'Pilih Tiket Ini'}
                                                {!isDisabled && <ArrowRightIcon className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Container>
                </section>
            )}


            <AudienceBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={category}
                auth={auth}
                onPreview={setPreviewSrc}
                t={{
                    modalChoice: 'Pilihan Tiket',
                    modalSummary: 'Ringkasan Biaya',
                    modalNote: '* Pastikan data diri benar. E-Ticket akan dikirim setelah verifikasi pembayaran.',
                    modalTicket: 'Tiket',
                    modalFillData: 'Lengkapi Data Diri',
                    modalSelectTkt: 'Pilih Kategori Tiket',
                    modalPersonalInfo: 'Informasi Personal',
                    modalPlaceholderName: 'Nama Lengkap',
                    modalNIK: 'NIK (Nomor Induk Kependudukan)',
                    modalPlaceholderEmail: 'Alamat Email',
                    modalPlaceholderWA: 'No. WhatsApp (Aktif)',
                    modalPaymentInst: 'Instruksi Transfer',
                    modalScanQRIS: 'Atau Scan QRIS',
                    modalUploadProof: 'Unggah Bukti Pembayaran',
                    modalChooseFile: 'Pilih Gambar Bukti Transfer',
                    modalPayNow: 'Bayar & Pesan Sekarang',
                    modalSeatsLeft: 'Kursi Tersisa',
                    modalSoldOut: 'Habis',
                }}
            />

            <ImagePreview src={previewSrc} onClose={() => setPreviewSrc(null)} />
            <AudienceSuccessModal
                booking={successBooking}
                onClose={() => {
                    setSuccessBooking(null);
                    router.visit(route('eventprogram.audience-show', { mainCategory: category.slug || category.id || 'slug' }), { preserveScroll: true, replace: true });
                }}
            />
        </MainLayout>
    );
}
