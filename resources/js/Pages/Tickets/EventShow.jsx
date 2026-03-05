import { useState, Fragment, useEffect, useCallback } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import MainLayout from '../../Layouts/MainLayout';
import Container from '../../Components/UI/Container';
import SuccessModal from '../../Components/SuccessModal';
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

import BookingModal from './BookingModal';

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

export default function EventShow({ event, settings, auth }) {
    const { props } = usePage();
    const flashBooking = props.flash?.successBooking || null;

    const [selectedTicket, setSelectedTicket] = useState(event.tickets[0] || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [successBooking, setSuccessBooking] = useState(null);

    const minPrice = event.tickets.length
        ? Math.min(...event.tickets.map((t) => t.price))
        : 0;

    const poster = imgSrc(event.image_url);

    useEffect(() => {
        if (flashBooking) {
            setSuccessBooking(flashBooking);
            setIsModalOpen(false);
        }
    }, [flashBooking]);

    return (
        <MainLayout>
            <Head>
                <title>{`Event Program: ${event.title} | Sugoi 8 Management`}</title>
                <meta name="description" content={event.description || `Ikuti program event ${event.title} yang diselenggarakan oleh Sugoi 8 Management. Kualitas produksi dan manajemen show terbaik di Jember.`} />
                <meta name="keywords" content={`program event ${event.title}, pendaftaran ${event.title}, event jember, sugoi 8, lomba tari jember`} />

                {/* OG Tags */}
                <meta property="og:title" content={`Event Program: ${event.title} | Sugoi 8 Management`} />
                <meta property="og:description" content={event.description?.substring(0, 160)} />
                <meta property="og:image" content={poster || "https://sugoi8management.com/8-sugoi-trans.png"} />
                <meta property="og:url" content={`${window.location.origin}/eventprogram/${event.slug}`} />
            </Head>

            <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={poster || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"}
                        className="w-full h-full object-cover opacity-60 grayscale blur-sm scale-110"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary" />
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        {/* Poster Column */}
                        <div className="lg:col-span-5 relative group">
                            <div className="aspect-4/5 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl relative border border-white/10">
                                <img
                                    src={poster || "/8-sugoi-trans.png"}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    alt={event.title}
                                />
                                <button
                                    onClick={() => setPreviewSrc(poster)}
                                    className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-secondary hover:text-dark transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <MagnifyingGlassPlusIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-secondary/10 rounded-full blur-[80px]" />
                        </div>

                        {/* Content Column */}
                        <div className="lg:col-span-7 pt-2">
                            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">Detail Pendaftaran Event</span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-8 italic">
                                {event.title}
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-white/40">
                                        <CalendarIcon className="w-5 h-5 text-secondary" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.1em]">Pelaksanaan</p>
                                    </div>
                                    <p className="text-lg md:text-xl font-black uppercase tracking-tight italic">
                                        {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        {event.end_date && ` - ${new Date(event.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-white/40">
                                        <MapPinIcon className="w-5 h-5 text-secondary" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.1em]">Lokasi / Venue</p>
                                    </div>
                                    <p className="text-lg md:text-xl font-black uppercase tracking-tight italic">{event.location}</p>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-[32px] mb-10 backdrop-blur-sm">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-3 flex items-center gap-2">
                                    <InformationCircleIcon className="w-4 h-4" />
                                    Informasi Event
                                </p>
                                <p className="text-white/60 text-base font-medium leading-relaxed italic border-l-2 border-secondary/30 pl-5 whitespace-pre-wrap">
                                    {event.description || "Segera hadir detail informasi untuk pendaftaran ini. Sugoi 8 Management memberikan pengalaman SHOW MANAGEMENT terbaik untuk Anda."}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsModalOpen(true)}
                                    className="h-16 px-10 text-[10px] md:text-xs font-black tracking-[0.2em] shadow-xl shadow-secondary/10 active:scale-95 transition-all"
                                >
                                    DAFTAR SEKARANG — Rp {fmtPrice(minPrice)}+
                                </Button>
                                <Button
                                    variant="outline-white"
                                    href={route('eventprogram.index')}
                                    className="h-16 px-8 text-[9px] md:text-xs font-black tracking-widest opacity-60 hover:opacity-100"
                                >
                                    LIHAT EVENT LAINNYA
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <TextRun />

            {/* Steps Section */}
            {event.steps?.length > 0 && (
                <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                    <Container>
                        <div className="mb-10 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-dark uppercase mb-3">Timeline Event</h2>
                            <p className="text-dark/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">Jadwal & Tahapan Pelaksanaan</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {event.steps.map((step, i) => (
                                <div key={i} className="p-6 md:p-8 bg-light rounded-[24px] md:rounded-[32px] border border-dark/5 hover:border-primary/20 transition-all group">
                                    <span className="block text-primary font-black text-2xl md:text-3xl mb-6 md:mb-10 group-hover:scale-125 origin-left transition-transform">0{i + 1}</span>
                                    <h3 className="text-lg md:text-xl font-black text-dark uppercase tracking-tight mb-2 italic">{step.title}</h3>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/30">{step.date}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={event}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
                auth={auth}
                onPreview={setPreviewSrc}
                settings={settings}
            />

            <ImagePreview src={previewSrc} onClose={() => setPreviewSrc(null)} />

            <SuccessModal
                booking={successBooking}
                onClose={() => {
                    setSuccessBooking(null);
                    router.visit(route('eventprogram.show', event.slug), { preserveScroll: true, replace: true });
                }}
            />
        </MainLayout>
    );
}
