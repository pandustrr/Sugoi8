import React, { Fragment, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import {
    MagnifyingGlassPlusIcon,
    CalendarIcon,
    MapPinIcon,
    XMarkIcon,
    CalendarDaysIcon,
    ArrowRightIcon,
    UserCircleIcon,
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

// Reusable info chip
function InfoChip({ label, value, className = '' }) {
    return (
        <div className={`bg-light rounded-2xl p-4 border border-dark/5 ${className}`}>
            <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-1 leading-none">{label}</p>
            <p className="text-sm font-bold text-dark">{value}</p>
        </div>
    );
}

export default function BookingModal({ isOpen, onClose, event, selectedTicket, setSelectedTicket, auth, onPreview }) {
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
            <Dialog as="div" className="relative z-200" onClose={handleClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4"
                    >
                        <Dialog.Panel
                            className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row text-left max-h-[90vh] overscroll-contain transform-gpu will-change-transform"
                        >

                            {/* ── LEFT: Poster ── */}
                            <div className="md:w-[40%] shrink-0 relative hidden md:block">
                                <div
                                    className="h-full overflow-hidden relative group/img cursor-zoom-in"
                                    onClick={() => src && onPreview(src)}
                                >
                                    {src ? (
                                        <img
                                            src={src}
                                            className="w-full h-full object-cover"
                                            alt={event.title}
                                            loading="eager"
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
                                    <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-dark/90 to-transparent p-7">
                                        <p className="flex items-center gap-1.5 text-white/50 text-[9px] font-black uppercase tracking-[0.2em] font-mono mb-2">
                                            <CalendarIcon className="w-3 h-3 shrink-0" />
                                            {event.date}
                                        </p>
                                        <Dialog.Title className="text-2xl font-black text-white uppercase tracking-tighter leading-tight italic">
                                            {event.title}
                                        </Dialog.Title>
                                        <p className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold mt-2">
                                            <MapPinIcon className="w-3 h-3 text-primary shrink-0" />
                                            {event.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ── Mobile Header Poster ── */}
                            <div className="md:hidden relative h-48 grow-0 shrink-0 overflow-hidden">
                                {src && (
                                    <div
                                        onClick={() => onPreview(src)}
                                        className="w-full h-full cursor-pointer relative group"
                                    >
                                        <img src={src} className="w-full h-full object-cover" alt={event.title} />
                                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-linear-to-t from-white via-white/40 to-transparent" />
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 flex gap-2">
                                    {src && (
                                        <button
                                            onClick={() => onPreview(src)}
                                            className="w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-dark outline-none active:scale-95 transition-all"
                                        >
                                            <MagnifyingGlassPlusIcon className="w-5 h-5 text-primary" />
                                        </button>
                                    )}
                                    <button
                                        onClick={handleClose}
                                        className="w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-dark outline-none active:scale-95 transition-all"
                                    >
                                        <XMarkIcon className="w-5 h-5 opacity-40" />
                                    </button>
                                </div>
                            </div>

                            {/* ── RIGHT: Info + Form ── */}
                            <div
                                className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 overscroll-contain"
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >

                                {/* Header Desktop Only */}
                                <div className="hidden md:flex justify-between items-start">
                                    <div>
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Detail Pendaftaran</h2>
                                        <p className="text-dark/40 text-[11px] font-bold uppercase tracking-widest">{event.location}</p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="w-10 h-10 bg-light rounded-2xl flex items-center justify-center text-dark/30 hover:text-dark hover:bg-dark/5 transition-all outline-none"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Description segments */}
                                    <div className="space-y-4">
                                        <h2 className="md:hidden text-2xl font-black text-dark uppercase tracking-tighter italic leading-tight">{event.title}</h2>

                                        {desc.general && (
                                            <p className="text-dark/60 text-sm font-bold leading-relaxed border-l-3 border-primary pl-4 py-1">
                                                {desc.general}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {desc.kategori && (
                                                <InfoChip label="Kategori" value={desc.kategori} className="md:col-span-2" />
                                            )}
                                            {desc.benefit && (
                                                <InfoChip label="Benefit" value={desc.benefit} className="md:col-span-2" />
                                            )}

                                            {(desc.pendaftaran || desc.grandFinal) && (
                                                <div className="md:col-span-2 bg-primary/5 border border-primary/10 rounded-2xl p-4 space-y-2">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <CalendarDaysIcon className="w-4 h-4 text-primary" />
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-primary/60">Jadwal Penting</p>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {desc.pendaftaran && (
                                                            <div className="bg-white/50 p-3 rounded-xl border border-primary/5">
                                                                <p className="text-[10px] font-black uppercase text-primary/40 leading-none mb-1">Pendaftaran</p>
                                                                <p className="text-[11px] font-black text-dark">{desc.pendaftaran}</p>
                                                            </div>
                                                        )}
                                                        {desc.grandFinal && (
                                                            <div className="bg-white/50 p-3 rounded-xl border border-primary/5">
                                                                <p className="text-[10px] font-black uppercase text-primary/40 leading-none mb-1">Grand Final</p>
                                                                <p className="text-[11px] font-black text-dark">{desc.grandFinal}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {steps.length > 0 && (
                                                <div className="md:col-span-2 bg-dark/5 rounded-[24px] p-4">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-3">Alur Kompetisi</p>
                                                    <div className="flex flex-wrap gap-2.5">
                                                        {steps.map((step, i) => (
                                                            <div key={i} className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-dark/5 shadow-sm">
                                                                <span className="w-5 h-5 bg-primary rounded-lg flex items-center justify-center text-white text-[10px] font-black shrink-0">
                                                                    {i + 1}
                                                                </span>
                                                                <div>
                                                                    <p className="text-[10px] font-black text-dark uppercase tracking-tight leading-none">{step.title}</p>
                                                                    {step.date && <p className="text-[9px] font-bold text-primary mt-0.5">{step.date}</p>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {desc.cp && (
                                                <div className="md:col-span-2 rounded-[24px] p-4 flex items-center gap-4 border-2 border-dashed border-secondary/30 bg-secondary/5">
                                                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                                                        <UserCircleIcon className="w-6 h-6 text-dark" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/50 leading-none mb-1">Contact Person</p>
                                                        <p className="text-sm font-black text-dark">{desc.cp}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-t border-dark/5" />

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {/* Divisi */}
                                        {Array.isArray(event.divisions) && event.divisions.length > 0 && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4 px-1">Pilih Divisi</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {event.divisions.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={() => setData('division', opt)}
                                                            className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${data.division === opt
                                                                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                                                                : 'border-dark/5 bg-light hover:border-primary/20'
                                                                }`}
                                                        >
                                                            <div className={`w-5 h-5 rounded-full shrink-0 border-2 flex items-center justify-center ${data.division === opt ? 'border-primary' : 'border-dark/20'}`}>
                                                                {data.division === opt && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                                            </div>
                                                            <p className={`text-xs font-black uppercase tracking-tight ${data.division === opt ? 'text-dark' : 'text-dark/40'
                                                                }`}>{opt}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Kategori Tiket */}
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4 px-1">Pilih Paket</p>
                                            <div className="space-y-3">
                                                {event.tickets.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        type="button"
                                                        onClick={() => setSelectedTicket(cat)}
                                                        className={`w-full p-5 rounded-[24px] border-2 transition-all flex items-center justify-between text-left ${selectedTicket?.id === cat.id
                                                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5'
                                                            : 'border-dark/5 bg-light hover:border-primary/20'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedTicket?.id === cat.id ? 'border-primary' : 'border-dark/10'}`}>
                                                                {selectedTicket?.id === cat.id && <div className="w-3 h-3 bg-primary rounded-full transition-all scale-110" />}
                                                            </div>
                                                            <div>
                                                                <p className={`text-base font-black uppercase tracking-tight italic leading-none ${selectedTicket?.id === cat.id ? 'text-primary' : 'text-dark'}`}>
                                                                    {cat.title}
                                                                </p>
                                                                <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                                                    <span className={cat.stock > 0 ? 'text-green-500/60' : 'text-red-500/60'}>
                                                                        {cat.stock > 0 ? `${cat.stock} Sisa` : 'Habis'}
                                                                    </span>
                                                                    <span className="opacity-20">|</span>
                                                                    Tiket
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`text-lg font-black italic tracking-tighter ${selectedTicket?.id === cat.id ? 'text-dark' : 'text-dark/40'}`}>
                                                                Rp {fmtPrice(cat.price)}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Fields */}
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4 px-1">Informasi Personal</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Nama Lengkap"
                                                    value={data.customer_name}
                                                    onChange={(e) => setData('customer_name', e.target.value)}
                                                    className="bg-light border-2 border-dark/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary focus:bg-white transition-all w-full"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="No. WhatsApp (Aktif)"
                                                    value={data.customer_phone}
                                                    onChange={(e) => setData('customer_phone', e.target.value)}
                                                    className="bg-light border-2 border-dark/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary focus:bg-white transition-all w-full"
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Alamat Email"
                                                value={data.customer_email}
                                                onChange={(e) => setData('customer_email', e.target.value)}
                                                className="w-full bg-light border-2 border-dark/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary focus:bg-white transition-all"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Nama Sekolah / Divisi"
                                                value={data.school_name}
                                                onChange={(e) => setData('school_name', e.target.value)}
                                                className="w-full bg-light border-2 border-dark/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-primary focus:bg-white transition-all"
                                            />
                                        </div>

                                        <div className="pt-8">
                                            <button
                                                type="submit"
                                                disabled={processing || !selectedTicket}
                                                className="w-full bg-dark text-white py-5 rounded-[24px] font-black text-xs md:text-sm uppercase tracking-[0.3em] hover:bg-primary active:scale-[0.98] transition-all disabled:opacity-40 shadow-2xl shadow-dark/10 flex items-center justify-center gap-4 group"
                                            >
                                                {processing ? (
                                                    <span className="flex items-center gap-3">
                                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                        Memproses...
                                                    </span>
                                                ) : (
                                                    <>
                                                        Daftar Sekarang
                                                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
