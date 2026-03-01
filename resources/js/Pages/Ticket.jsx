import { useState, Fragment, useEffect, useCallback } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import SuccessModal from '../Components/SuccessModal';
import {
    TicketIcon,
    MapPinIcon,
    CalendarIcon,
    MagnifyingGlassPlusIcon,
    CalendarDaysIcon,
    XMarkIcon,
    ArrowRightIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

import BookingModal from './Tickets/BookingModal';

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmtPrice = (n) => new Intl.NumberFormat('id-ID').format(n);

const imgSrc = (url) =>
    url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

// helpers are also in BookingModal.jsx, keeping shared ones here if needed by EventCard

// ─── Event Card ─────────────────────────────────────────────────────────────

function EventCard({ event, onOpen, onPreview }) {
    const minPrice = event.tickets.length
        ? Math.min(...event.tickets.map((t) => t.price))
        : 0;
    const src = imgSrc(event.image_url);

    return (
        <div className="group relative bg-white border border-dark/5 rounded-[32px] md:rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
            {/* Poster */}
            <div className="aspect-4/5 overflow-hidden relative">
                {src ? (
                    <img
                        src={src}
                        alt={event.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-light flex items-center justify-center text-dark/10 font-black uppercase text-sm tracking-widest">
                        No Image
                    </div>
                )}

                {/* Overlays / Badges */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-linear-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none md:pointer-events-auto flex items-end justify-between">
                    {src && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onPreview(src); }}
                            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all pointer-events-auto"
                            aria-label="Zoom poster"
                        >
                            <MagnifyingGlassPlusIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl text-dark text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Mulai Rp {fmtPrice(minPrice)}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col grow">
                <div className="flex items-center gap-2 text-dark/30 text-[9px] font-black uppercase tracking-[0.2em] mb-3 font-mono">
                    <CalendarDaysIcon className="w-3.5 h-3.5 shrink-0" />
                    {event.date}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-dark uppercase tracking-tighter leading-tight mb-6 group-hover:text-primary transition-colors italic line-clamp-2">
                    {event.title}
                </h3>
                <button
                    onClick={() => onOpen(event)}
                    className="mt-auto w-full bg-dark text-white py-3.5 md:py-4 rounded-xl md:rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary active:scale-[0.98] transition-all"
                >
                    Lihat Detail
                </button>
            </div>
        </div>
    );
}

// ─── Image Preview Modal ─────────────────────────────────────────────────────

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
                                aria-label="Tutup preview"
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

// ─── Post-Purchase Success Modal ─────────────────────────────────────────────
// (Imported from ../Components/SuccessModal)

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Ticket({ events, auth }) {
    const { props } = usePage();
    const flashBooking = props.flash?.successBooking || null;

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [successBooking, setSuccessBooking] = useState(null);

    // Watch external flashed booking
    useEffect(() => {
        if (flashBooking) {
            setSuccessBooking(flashBooking);
            setIsModalOpen(false); // Make sure purchase modal is closed
        }
    }, [flashBooking]);

    const openModal = useCallback((event) => {
        setSelectedEvent(event);
        setSelectedTicket(event.tickets[0] || null);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => setIsModalOpen(false), []);

    // Auto-open from ?event= slug param
    useEffect(() => {
        const slug = new URLSearchParams(window.location.search).get('event');
        if (!slug) return;
        const found = events.find((e) => e.slug === slug || e.title === slug);
        if (found) openModal(found);
    }, [events, openModal]);

    return (
        <MainLayout>
            <Head>
                <title>Pendaftaran Lomba & Tiket Event | Sugoi 8 Management</title>
                <meta name="description" content="Daftarkan diri dalam berbagai lomba karya tari dan event seru dari Sugoi 8 Management." />
            </Head>

            {/* Hero */}
            <section className="relative min-h-[500px] md:min-h-[600px] pt-32 pb-20 md:pt-40 md:pb-24 bg-primary overflow-hidden">
                {/* BG photo */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-60 grayscale-0 scale-105"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/80 via-primary/40 to-transparent" />
                </div>

                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/10 to-transparent pointer-events-none" />

                <Container>
                    <div className="relative z-10 max-w-4xl px-4 md:px-0">
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 block">
                            Official Registration
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 italic">
                            TEMUKAN <br />
                            <span className="text-secondary block mt-2 drop-shadow-2xl">EVENT KAMI</span>
                        </h1>
                        <p className="text-white/50 text-base md:text-xl font-medium leading-relaxed max-w-2xl mt-8 italic border-l-4 border-secondary pl-6">
                            Pilih event favoritmu, daftarkan diri, dan jadilah bagian dari kreativitas bersama Sugoi 8 Management.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Event Grid */}
            <section className="py-20 md:py-32 bg-white relative">
                <div className="absolute top-0 inset-x-0 h-40 bg-linear-to-b from-light to-transparent pointer-events-none" />

                <Container>
                    {events.length === 0 ? (
                        <div className="bg-light rounded-[40px] border border-dark/5 p-16 md:p-32 text-center shadow-inner">
                            <TicketIcon className="w-20 h-20 text-dark/5 mx-auto mb-8 animate-bounce" />
                            <h3 className="text-2xl font-black text-dark uppercase tracking-tight">Belum Ada Event Aktif</h3>
                            <p className="text-dark/30 font-bold mt-2">Nantikan berbagai kejutan event seru dari kami segera!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
                            {events.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onOpen={openModal}
                                    onPreview={setPreviewSrc}
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </section>

            {/* Modals */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={selectedEvent}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
                auth={auth}
                onPreview={setPreviewSrc}
            />

            <ImagePreview src={previewSrc} onClose={() => setPreviewSrc(null)} />

            <SuccessModal
                booking={successBooking}
                onClose={() => {
                    setSuccessBooking(null);
                    // Clear the query string/state or reload if needed to purge flash
                    router.get(route('tickets.index'), {}, { preserveScroll: true, replace: true });
                }}
            />
        </MainLayout>
    );
}
