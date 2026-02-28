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
} from '@heroicons/react/24/outline';

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmtPrice = (n) => new Intl.NumberFormat('id-ID').format(n);

const imgSrc = (url) =>
    url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

/** Parse description into keyed segments based on label prefixes. */
function parseDescription(desc) {
    if (!desc) return {};
    const segments = {};
    const lines = desc.split(/[\r\n]+/);
    lines.forEach((raw) => {
        const line = raw.trim();
        if (!line) return;
        const lower = line.toLowerCase();
        if (lower.startsWith('kategori:')) segments.kategori = line.slice(9).trim();
        else if (lower.startsWith('benefit:')) segments.benefit = line.slice(8).trim();
        else if (lower.startsWith('pendaftaran:')) segments.pendaftaran = line.slice(12).trim();
        else if (lower.startsWith('grand final:')) segments.grandFinal = line.slice(12).trim();
        else if (lower.startsWith('cp:') || lower.startsWith('kontak:'))
            segments.cp = line.split(':').slice(1).join(':').trim();
        else
            segments.general = (segments.general ? segments.general + ' ' : '') + line;
    });
    return segments;
}

// ─── Event Card ─────────────────────────────────────────────────────────────

function EventCard({ event, onOpen, onPreview }) {
    const minPrice = event.tickets.length
        ? Math.min(...event.tickets.map((t) => t.price))
        : 0;
    const src = imgSrc(event.image_url);

    return (
        <div className="group relative bg-white border border-dark/5 rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
            {/* Poster */}
            <div className="aspect-4/5 overflow-hidden relative">
                {src ? (
                    <img
                        src={src}
                        alt={event.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-light flex items-center justify-center text-dark/10 font-black uppercase text-sm tracking-widest">
                        No Image
                    </div>
                )}

                {/* Zoom button */}
                {src && (
                    <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                            onClick={(e) => { e.stopPropagation(); onPreview(src); }}
                            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all"
                            aria-label="Zoom poster"
                        >
                            <MagnifyingGlassPlusIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Price badge */}
                <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl text-dark text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Start Rp {fmtPrice(minPrice)}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-2 text-dark/30 text-[9px] font-black uppercase tracking-[0.2em] mb-3 font-mono">
                    <CalendarDaysIcon className="w-3.5 h-3.5 shrink-0" />
                    {event.date}
                </div>
                <h3 className="text-2xl font-black text-dark uppercase tracking-tighter leading-tight mb-6 group-hover:text-primary transition-colors italic">
                    {event.title}
                </h3>
                <button
                    onClick={() => onOpen(event)}
                    className="mt-auto w-full bg-dark text-white py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all"
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
            <Dialog as="div" className="relative z-200" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-dark/95 backdrop-blur-xl" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="relative max-w-4xl w-full">
                            <button
                                onClick={onClose}
                                className="absolute -top-14 right-0 text-white hover:text-primary transition-colors flex items-center gap-2"
                                aria-label="Tutup preview"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Tutup</span>
                                <XMarkIcon className="w-7 h-7" />
                            </button>
                            <img
                                src={src}
                                className="max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                                alt="Preview Poster"
                            />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

// ─── Purchase Modal ──────────────────────────────────────────────────────────

function PurchaseModal({ isOpen, onClose, event, selectedTicket, setSelectedTicket, auth, onPreview }) {
    const { data, setData, post, processing, reset } = useForm({
        customer_name: auth?.user?.name || '',
        customer_email: auth?.user?.email || '',
        customer_phone: '',
        school_name: '',
        division: '',
        quantity: 1,
    });

    const handleClose = useCallback(() => {
        onClose();
        reset();
    }, [onClose, reset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedTicket) return;
        post(route('tickets.purchase', selectedTicket.id), {
            onSuccess: handleClose,
        });
    };

    if (!event) return null;

    const desc = parseDescription(event.description);
    const src = imgSrc(event.image_url);
    const steps = Array.isArray(event.steps) ? event.steps : [];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-100" onClose={handleClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-dark/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-2 md:p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row text-left">

                            {/* ── LEFT: Poster ── */}
                            <div className="md:w-[40%] shrink-0 relative">
                                <div
                                    className="h-52 md:h-full overflow-hidden relative group/img cursor-zoom-in"
                                    onClick={() => src && onPreview(src)}
                                >
                                    {src ? (
                                        <img
                                            src={src}
                                            className="w-full h-full object-cover"
                                            alt={event.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-light flex items-center justify-center text-dark/10 font-black italic">
                                            Sugoi Event
                                        </div>
                                    )}

                                    {/* Zoom hint */}
                                    {src && (
                                        <div className="absolute inset-0 bg-dark/0 group-hover/img:bg-dark/25 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white">
                                                <MagnifyingGlassPlusIcon className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Title overlay */}
                                    <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-dark/80 to-transparent p-5 md:p-7">
                                        <p className="flex items-center gap-1.5 text-white/50 text-[9px] font-black uppercase tracking-[0.2em] font-mono mb-1.5">
                                            <CalendarIcon className="w-3 h-3 shrink-0" />
                                            {event.date}
                                        </p>
                                        <Dialog.Title className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter leading-tight italic">
                                            {event.title}
                                        </Dialog.Title>
                                        <p className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold mt-1">
                                            <MapPinIcon className="w-3 h-3 text-primary shrink-0" />
                                            {event.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ── RIGHT: Info + Form ── */}
                            <div className="flex-1 overflow-y-auto max-h-[90vh] p-6 md:p-8 space-y-5">

                                {/* Close */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleClose}
                                        className="w-8 h-8 bg-light rounded-xl flex items-center justify-center text-dark/30 hover:text-dark transition-colors outline-none"
                                        aria-label="Tutup modal"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Description segments */}
                                {(desc.general || desc.kategori || desc.benefit || desc.cp || steps.length > 0) && (
                                    <div className="space-y-2">
                                        {desc.general && (
                                            <p className="text-dark text-sm font-bold leading-relaxed border-l-2 border-primary pl-3">
                                                {desc.general}
                                            </p>
                                        )}
                                        <div className="grid grid-cols-2 gap-2">
                                            {desc.kategori && (
                                                <InfoChip label="Kategori" value={desc.kategori} className="col-span-2" />
                                            )}
                                            {desc.benefit && (
                                                <InfoChip label="Benefit" value={desc.benefit} className="col-span-2" />
                                            )}
                                            {(desc.pendaftaran || desc.grandFinal) && (
                                                <div className="col-span-2 bg-primary/5 border border-primary/10 rounded-2xl p-3 space-y-1">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary/40">Jadwal</p>
                                                    {desc.pendaftaran && (
                                                        <p className="text-[11px] font-bold text-dark">
                                                            <span className="text-primary/60">Pendaftaran: </span>{desc.pendaftaran}
                                                        </p>
                                                    )}
                                                    {desc.grandFinal && (
                                                        <p className="text-[11px] font-bold text-dark">
                                                            <span className="text-primary/60">Grand Final: </span>{desc.grandFinal}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            {steps.length > 0 && (
                                                <div className="col-span-2 bg-dark/5 rounded-2xl p-3">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-2">Alur Kompetisi</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {steps.map((step, i) => (
                                                            <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-dark/5">
                                                                <span className="w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-[8px] font-black shrink-0">
                                                                    {i + 1}
                                                                </span>
                                                                <div>
                                                                    <p className="text-[10px] font-black text-dark uppercase tracking-tight leading-none">{step.title}</p>
                                                                    {step.date && <p className="text-[9px] font-bold text-primary">{step.date}</p>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {desc.cp && (
                                                <div className="col-span-2 rounded-2xl p-3" style={{ backgroundColor: '#f9d783' }}>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-dark/50 mb-0.5">Contact Person</p>
                                                    <p className="text-xs font-black text-dark">{desc.cp}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-dark/5" />

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {/* Divisi */}
                                    {Array.isArray(event.divisions) && event.divisions.length > 0 && (
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-3">Divisi</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {event.divisions.map((opt) => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => setData('division', opt)}
                                                        className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2 ${data.division === opt
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-dark/5 bg-light hover:border-primary/20'
                                                            }`}
                                                    >
                                                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 border border-current ${data.division === opt ? 'bg-primary border-primary' : 'border-dark/20'}`}></div>
                                                        <p className={`text-[11px] font-black uppercase tracking-tight ${data.division === opt ? 'text-primary' : 'text-dark'
                                                            }`}>{opt}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Kategori Tiket (Tunggal / Duet / Grup) */}
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-3">Pilih Kategori</p>
                                        <div className="space-y-2">
                                            {event.tickets.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setSelectedTicket(cat)}
                                                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${selectedTicket?.id === cat.id
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-dark/5 bg-light hover:border-primary/20'
                                                        }`}
                                                >
                                                    <div>
                                                        <p className={`text-sm font-black uppercase tracking-tight italic ${selectedTicket?.id === cat.id ? 'text-primary' : 'text-dark'}`}>
                                                            {cat.title}
                                                        </p>
                                                        <p className="text-[9px] font-bold text-dark/30 uppercase tracking-widest mt-0.5">
                                                            {cat.stock > 0 ? `${cat.stock} Sisa` : 'Habis'} · Rp {fmtPrice(cat.price)}
                                                        </p>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedTicket?.id === cat.id ? 'border-primary bg-primary' : 'border-dark/10'}`}>
                                                        {selectedTicket?.id === cat.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Fields */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Nama Lengkap"
                                            value={data.customer_name}
                                            onChange={(e) => setData('customer_name', e.target.value)}
                                            className="bg-light border border-dark/5 rounded-2xl p-3.5 text-xs font-bold outline-none focus:border-primary transition-colors"
                                        />
                                        <input
                                            type="text"
                                            placeholder="No. WhatsApp"
                                            value={data.customer_phone}
                                            onChange={(e) => setData('customer_phone', e.target.value)}
                                            className="bg-light border border-dark/5 rounded-2xl p-3.5 text-xs font-bold outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Alamat Email"
                                        value={data.customer_email}
                                        onChange={(e) => setData('customer_email', e.target.value)}
                                        className="w-full bg-light border border-dark/5 rounded-2xl p-3.5 text-xs font-bold outline-none focus:border-primary transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nama Sekolah / Instansi"
                                        value={data.school_name}
                                        onChange={(e) => setData('school_name', e.target.value)}
                                        className="w-full bg-light border border-dark/5 rounded-2xl p-3.5 text-xs font-bold outline-none focus:border-primary transition-colors"
                                    />

                                    <button
                                        type="submit"
                                        disabled={processing || !selectedTicket}
                                        className="w-full bg-dark text-white py-4 rounded-[18px] font-black text-xs uppercase tracking-[0.3em] hover:bg-primary transition-all disabled:opacity-40 flex items-center justify-center gap-3"
                                    >
                                        {processing ? 'Memproses...' : 'Daftar Sekarang'}
                                        {!processing && <ArrowRightIcon className="w-4 h-4" />}
                                    </button>
                                </form>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

// Reusable info chip
function InfoChip({ label, value, className = '' }) {
    return (
        <div className={`bg-light rounded-2xl p-3 ${className}`}>
            <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-0.5">{label}</p>
            <p className="text-xs font-bold text-dark">{value}</p>
        </div>
    );
}

// ─── Post-Purchase Success Modal moved to Components/SuccessModal.jsx ────

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
            <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-dark">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/10 to-transparent pointer-events-none" />
                <Container>
                    <div className="relative z-10 max-w-4xl px-4 md:px-0">
                        <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 animate-pulse">
                            Official Registration
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 italic">
                            TEMUKAN <br />
                            <span className="text-primary text-5xl md:text-7xl lg:text-9xl block mt-2">EVENT KAMI</span>
                        </h1>
                        <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed max-w-xl italic">
                            Pilih event favoritmu, daftarkan diri, dan jadilah bagian dari kreativitas bersama Sugoi 8 Management.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Event Grid */}
            <section className="py-16 md:py-24 bg-white">
                <Container>
                    {events.length === 0 ? (
                        <div className="bg-light rounded-[40px] border border-dark/5 p-16 text-center">
                            <TicketIcon className="w-16 h-16 text-dark/5 mx-auto mb-6" />
                            <h3 className="text-xl font-black text-dark uppercase tracking-tight">Belum Ada Event Aktif</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
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
            <PurchaseModal
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
