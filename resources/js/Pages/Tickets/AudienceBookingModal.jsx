import React, { Fragment, useState, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import {
    MagnifyingGlassPlusIcon,
    XMarkIcon,
    ArrowRightIcon,
    BanknotesIcon,
    PhotoIcon,
    UserIcon,
    IdentificationIcon,
    EnvelopeIcon,
    PhoneIcon,
    TicketIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const fmtPrice = (n) => new Intl.NumberFormat('id-ID').format(n);
const imgSrc = (url) => url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

export default function AudienceBookingModal({ isOpen, onClose, category, auth, onPreview, settings, t }) {
    const tickets = (category?.audience_tickets || []).filter(tk => tk.is_active);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        customer_name: auth?.user?.name || '',
        customer_nik: '',
        customer_email: auth?.user?.email || '',
        customer_phone: '',
        quantity: 1,
        payment_proof: null,
    });

    const handleClose = useCallback(() => {
        onClose();
        reset();
        setSelectedTicket(null);
    }, [onClose, reset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedTicket) return;
        post(route('eventprogram.audience-purchase', { audienceTicket: selectedTicket.id }), {
            onSuccess: handleClose,
        });
    };

    if (!category || !t) return null;

    const catSrc = imgSrc(category.image_url);
    const tktSrc = selectedTicket ? imgSrc(selectedTicket.image_url) : null;
    const posterSrc = tktSrc || catSrc;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-200" onClose={handleClose}>
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
                        <Dialog.Panel className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row text-left max-h-[90vh]">

                            {/* ── Left: Poster / Info ── */}
                            <div
                                className="md:w-[38%] shrink-0 relative bg-dark overflow-hidden group/img cursor-zoom-in"
                                onClick={() => posterSrc && onPreview(posterSrc)}
                            >
                                {posterSrc ? (
                                    <img src={posterSrc} className="w-full h-full object-cover opacity-80 transition-all duration-700" alt={category.title} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10 font-black italic uppercase text-2xl">Sugoi Ticket</div>
                                )}

                                <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/20 to-transparent" />

                                <div className="absolute bottom-0 inset-x-0 p-8 space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1 italic">{t.modalChoice}</p>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-tight text-white">
                                            {selectedTicket ? selectedTicket.title : category.title}
                                        </h3>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3 leading-none">{t.modalSummary}</p>
                                        {selectedTicket ? (
                                            <div className="flex justify-between items-end">
                                                <span className="text-white/40 font-bold uppercase tracking-wider text-xs">1 {t.modalTicket}</span>
                                                <span className="text-2xl font-black text-secondary italic">Rp {fmtPrice(selectedTicket.price)}</span>
                                            </div>
                                        ) : (
                                            <p className="text-xs font-bold text-white/30 italic">Pilih kategori tiket di sebelah kanan →</p>
                                        )}
                                    </div>

                                    <p className="text-[9px] font-bold text-white/20 leading-relaxed uppercase tracking-widest italic">{t.modalNote}</p>
                                </div>

                                {posterSrc && (
                                    <div className="absolute inset-x-0 top-0 h-1/2 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white">
                                            <MagnifyingGlassPlusIcon className="w-6 h-6" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Right: Ticket Selection + Form ── */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-black uppercase tracking-tighter italic text-dark leading-none mb-1">{category.title}</h2>
                                        <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest">{t.modalFillData}</p>
                                    </div>
                                    <button onClick={handleClose} className="w-10 h-10 bg-light rounded-2xl flex items-center justify-center text-dark/20 hover:text-dark hover:bg-dark/5 transition-all">
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">

                                    {/* ── Ticket Category Selection ── */}
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-3 px-1">{t.modalSelectTkt}</p>
                                        <div className="space-y-2">
                                            {tickets.length === 0 ? (
                                                <div className="py-10 text-center opacity-30">
                                                    <TicketIcon className="w-10 h-10 mx-auto mb-2" />
                                                    <p className="text-xs font-black uppercase tracking-widest">Tiket belum tersedia</p>
                                                </div>
                                            ) : tickets.map(ticket => {
                                                const isSelected = selectedTicket?.id === ticket.id;
                                                const sold = ticket.stock <= 0;
                                                return (
                                                    <button
                                                        key={ticket.id}
                                                        type="button"
                                                        disabled={sold}
                                                        onClick={() => setSelectedTicket(ticket)}
                                                        className={`w-full relative flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all group/tk overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed ${isSelected
                                                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                                                            : 'border-dark/5 bg-light hover:border-primary/20 hover:bg-white'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            {/* Radio */}
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-primary' : 'border-dark/20'}`}>
                                                                {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                                            </div>
                                                            <div>
                                                                <p className={`text-sm font-black uppercase tracking-tight italic leading-none mb-1 ${isSelected ? 'text-primary' : 'text-dark'}`}>
                                                                    {ticket.title}
                                                                </p>
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-[8px] font-black uppercase tracking-widest ${ticket.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                                        {ticket.stock > 0 ? `${ticket.stock} ${t.modalSeatsLeft}` : t.modalSoldOut}
                                                                    </span>
                                                                    <span className="text-dark/20 text-[8px]">|</span>
                                                                    <span className="text-[8px] font-bold text-dark/30 uppercase tracking-widest">Tiket</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className={`text-lg font-black italic tracking-tighter shrink-0 ${isSelected ? 'text-dark' : 'text-dark/40'}`}>
                                                            Rp {fmtPrice(ticket.price)}
                                                        </p>

                                                        {/* Selection indicator bar */}
                                                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full transition-all ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* ── Policy Notice ── */}
                                    <div className="bg-primary/5 rounded-3xl p-5 flex items-center gap-4 border border-primary/10">
                                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                                            <IdentificationIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-primary leading-none mb-1">Kebijakan Pembelian</p>
                                            <p className="text-[11px] font-black text-dark uppercase italic">1 NIK Hanya Berlaku untuk 1 Tiket</p>
                                        </div>
                                    </div>

                                    {/* ── Personal Info ── */}
                                    <div className="space-y-4">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 px-1">{t.modalPersonalInfo}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative group">
                                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/20 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder={t.modalPlaceholderName}
                                                    value={data.customer_name}
                                                    onChange={e => setData('customer_name', e.target.value)}
                                                    className={`w-full bg-light border-2 rounded-2xl pl-11 pr-4 py-4 text-sm font-bold outline-none transition-all ${errors.customer_name ? 'border-red-500 bg-red-50/10' : 'border-dark/5 focus:border-primary focus:bg-white'}`}
                                                    required
                                                />
                                                {errors.customer_name && <p className="mt-2 ml-1 text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">{errors.customer_name}</p>}
                                            </div>
                                            <div className="relative group">
                                                <IdentificationIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/20 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder={t.modalNIK}
                                                    value={data.customer_nik}
                                                    maxLength={16}
                                                    onChange={e => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        if (val.length <= 16) setData('customer_nik', val);
                                                    }}
                                                    className={`w-full bg-light border-2 rounded-2xl pl-11 pr-4 py-4 text-sm font-bold outline-none transition-all ${errors.customer_nik ? 'border-red-500 bg-red-50/10' : 'border-dark/5 focus:border-primary focus:bg-white'}`}
                                                    required
                                                />
                                                <div className="flex justify-between items-center mt-2 px-1">
                                                    {errors.customer_nik ? (
                                                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">{errors.customer_nik}</p>
                                                    ) : (
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/20 italic leading-none">Wajib 16 Digit Angka</p>
                                                    )}
                                                    <span className={`text-[9px] font-black tracking-widest ${data.customer_nik?.length === 16 ? 'text-primary' : data.customer_nik?.length > 0 ? 'text-dark/40' : 'text-dark/10'}`}>
                                                        {data.customer_nik?.length || 0}/16
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative group">
                                                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/20 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    placeholder={t.modalPlaceholderEmail}
                                                    value={data.customer_email}
                                                    onChange={e => setData('customer_email', e.target.value)}
                                                    className={`w-full bg-light border-2 rounded-2xl pl-11 pr-4 py-4 text-sm font-bold outline-none transition-all ${errors.customer_email ? 'border-red-500 bg-red-50/10' : 'border-dark/5 focus:border-primary focus:bg-white'}`}
                                                    required
                                                />
                                                {errors.customer_email && <p className="mt-2 ml-1 text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">{errors.customer_email}</p>}
                                            </div>
                                            <div className="relative group">
                                                <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/20 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder={t.modalPlaceholderWA}
                                                    value={data.customer_phone}
                                                    onChange={e => setData('customer_phone', e.target.value)}
                                                    className={`w-full bg-light border-2 rounded-2xl pl-11 pr-4 py-4 text-sm font-bold outline-none transition-all ${errors.customer_phone ? 'border-red-500 bg-red-50/10' : 'border-dark/5 focus:border-primary focus:bg-white'}`}
                                                    required
                                                />
                                                {errors.customer_phone && <p className="mt-2 ml-1 text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">{errors.customer_phone}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Payment Section ── */}
                                    <div className="space-y-5">
                                        <div className="p-6 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                                                    <BanknotesIcon className="w-5 h-5 text-white" />
                                                </div>
                                                <p className="text-sm font-black uppercase text-emerald-900 italic tracking-tight">{t.modalPaymentInst}</p>
                                            </div>

                                            {settings?.payment_methods && (
                                                <div className="bg-white/80 p-4 rounded-2xl border border-emerald-100 italic text-[13px] font-bold text-dark/70 leading-relaxed shadow-sm">
                                                    {settings.payment_methods}
                                                </div>
                                            )}

                                            <div className="flex flex-col md:flex-row gap-6">
                                                {settings?.payment_qris_image && (
                                                    <div className="flex flex-col items-center gap-3 shrink-0">
                                                        <div
                                                            onClick={() => onPreview(settings.payment_qris_image)}
                                                            className="bg-white p-3 rounded-2xl shadow-xl shadow-emerald-200/50 border border-emerald-100 w-32 h-32 cursor-zoom-in"
                                                        >
                                                            <img src={settings.payment_qris_image} className="w-full h-full object-contain" alt="QRIS" />
                                                        </div>
                                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-900/40">{t.modalScanQRIS}</p>
                                                    </div>
                                                )}

                                                <div className="flex-1 space-y-3">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-emerald-900/40 ml-1">{t.modalUploadProof}</label>
                                                    <input
                                                        type="file"
                                                        id="audience_payment"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={e => setData('payment_proof', e.target.files[0])}
                                                        required={!!selectedTicket}
                                                    />
                                                    <label
                                                        htmlFor="audience_payment"
                                                        className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed h-32 transition-all cursor-pointer ${data.payment_proof ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-emerald-200 text-emerald-600 hover:border-emerald-400'}`}
                                                    >
                                                        {data.payment_proof ? (
                                                            <>
                                                                <PhotoIcon className="w-6 h-6" />
                                                                <p className="text-[10px] font-black uppercase tracking-widest truncate max-w-xs">{data.payment_proof.name}</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <PhotoIcon className="w-6 h-6 opacity-40" />
                                                                <p className="text-[10px] font-black uppercase tracking-widest">{t.modalChooseFile}</p>
                                                            </>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Disclaimer Pembayaran */}
                                        {(!data.payment_proof && !processing) && (
                                            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-3 animate-pulse">
                                                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 shrink-0" />
                                                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-relaxed">
                                                    Wajib unggah bukti pembayaran.
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={processing || !data.payment_proof || !selectedTicket}
                                            className="w-full bg-dark text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-primary active:scale-[0.98] transition-all disabled:opacity-40 flex items-center justify-center gap-4 group"
                                        >
                                            {processing ? (
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    {t.modalPayNow}{selectedTicket ? ` — Rp ${fmtPrice(selectedTicket.price)}` : ''}
                                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
