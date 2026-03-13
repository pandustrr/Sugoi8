import { useState, Fragment, useEffect, useCallback } from 'react';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import MainLayout from '../Layouts/MainLayout';
import { useLang } from '../hooks/useLang';
import Container from '../Components/UI/Container';
import SuccessModal from '../Components/SuccessModal';
import TextRun from '../Components/UI/TextRun';
import {
    TicketIcon,
    MagnifyingGlassPlusIcon,
    CalendarDaysIcon,
    XMarkIcon,
    ArrowRightIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

import BookingModal from './Tickets/BookingModal';
import AudienceBookingModal from './Tickets/AudienceBookingModal';

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmtPrice = (n) => new Intl.NumberFormat('id-ID').format(n);

const translations = {
    en: {
        metaTitle: "Event Program & Registration | Sugoi 8 Management",
        metaDesc: "Join various exciting event programs and dance competition registrations from Sugoi 8 Management.",
        heroSub: "Official Registration",
        heroTitle1: "DISCOVER",
        heroTitle2: "EVENT PROGRAM",
        heroDesc: "Pick your favorite event, register yourself, and be part of the creativity with Sugoi 8 Management.",
        secEventTitle1: "EVENT",
        secEventTitle2: "PROGRAM",
        secEventDesc: "Register yourself or your team in various competition categories and exciting activities.",
        secTicketTitle1: "TICKET",
        secTicketTitle2: "PURCHASE",
        secTicketDesc: "Choose your favorite seat category and witness the excitement live.",
        emptyTitle: "No Active Events Yet",
        emptyDesc: "Stay tuned for various exciting event surprises from us soon!",
        cardStart: "Starting from",
        cardJoin: "Join",
        cardPrice: "Price",
        cardAvailable: "Available",
        cardSoldOut: "Sold Out",
        cardSeatsLeft: "Seats Left",
        cardBuy: "Buy Ticket",
        available: "Available",
        // Modal & Form translations
        modalDetail: "Registration Detail",
        modalLocation: "Location",
        modalImportant: "Important Schedule",
        modalAlur: "Competition Workflow",
        modalPlaceholderName: "Full Name",
        modalPlaceholderWA: "Active WhatsApp No.",
        modalPlaceholderEmail: "Email Address",
        modalPlaceholderSchool: "School / Team Name",
        modalPaymentMethod: "Payment Method",
        modalPaymentInst: "Transfer Instruction",
        modalUploadProof: "Upload Payment Proof",
        modalChooseFile: "Choose Transfer Proof Image",
        modalSubmit: "Register Now",
        modalProcessing: "Processing...",
        modalWarningProof: "Payment proof is required.",
        modalSeatsLeft: "Seats Left",
        modalSoldOut: "Sold Out",
        modalTicket: "Ticket",
        modalBuyTicket: "Buy Ticket",
        modalSummary: "Fee Summary",
        modalTotal: "Total Payment",
        modalNote: "* Ensure data is correct. E-Ticket will be sent after verification.",
        modalFillData: "Complete Personal Data",
        modalNIK: "NIK (National Identity Number)",
        modalQty: "Ticket Quantity",
        modalMax: "Maximum",
        modalScanQRIS: "Or Scan QRIS",
        modalPayNow: "Pay & Book Now",
        modalSelectDiv: "Select Division",
        modalSelectTkt: "Select Ticket Category",
        modalPersonalInfo: "Personal Information",
        modalCat: "Category",
        modalBenefit: "Benefit",
        modalChoice: "Your Choice",
    },
    id: {
        metaTitle: "Event Program & Pendaftaran | Sugoi 8 Management",
        metaDesc: "Ikuti berbagai program event dan pendaftaran lomba karya tari seru dari Sugoi 8 Management.",
        heroSub: "Pendaftaran Resmi",
        heroTitle1: "TEMUKAN",
        heroTitle2: "EVENT PROGRAM",
        heroDesc: "Pilih event favoritmu, daftarkan diri, dan jadilah bagian dari kreativitas bersama Sugoi 8 Management.",
        secEventTitle1: "EVENT",
        secEventTitle2: "PROGRAM",
        secEventDesc: "Daftarkan diri atau tim Anda dalam berbagai kategori lomba dan kegiatan seru.",
        secTicketTitle1: "PEMBELIAN",
        secTicketTitle2: "TIKET",
        secTicketDesc: "Pilih kategori kursi favoritmu dan saksikan keseruannya secara langsung.",
        emptyTitle: "Belum Ada Event Aktif",
        emptyDesc: "Nantikan berbagai kejutan event seru dari kami segera!",
        cardStart: "Mulai",
        cardJoin: "Daftar",
        cardPrice: "Harga",
        cardAvailable: "Tersedia",
        cardSoldOut: "Habis",
        cardSeatsLeft: "Kursi Tersisa",
        cardBuy: "Beli Tiket",
        available: "Tersedia",
        // Modal & Form translations
        modalDetail: "Detail Pendaftaran",
        modalLocation: "Lokasi",
        modalImportant: "Jadwal Penting",
        modalAlur: "Alur Kompetisi",
        modalPlaceholderName: "Nama Lengkap",
        modalPlaceholderWA: "No. WhatsApp (Aktif)",
        modalPlaceholderEmail: "Alamat Email",
        modalPlaceholderSchool: "Nama Sekolah / Nama Tim",
        modalPaymentMethod: "Metode Pembayaran",
        modalPaymentInst: "Instruksi Transfer",
        modalUploadProof: "Unggah Bukti Pembayaran",
        modalChooseFile: "Pilih Gambar Bukti Transfer",
        modalSubmit: "Daftar Sekarang",
        modalProcessing: "Memproses...",
        modalWarningProof: "Wajib unggah bukti pembayaran.",
        modalSeatsLeft: "Sisa",
        modalSoldOut: "Habis",
        modalTicket: "Tiket",
        modalBuyTicket: "Beli Tiket",
        modalSummary: "Ringkasan Biaya",
        modalTotal: "Total Bayar",
        modalNote: "* Pastikan data diri benar. E-Ticket akan dikirim setelah verifikasi pembayaran.",
        modalFillData: "Lengkapi Data Diri",
        modalNIK: "NIK (Nomor Induk Kependudukan)",
        modalQty: "Jumlah Tiket",
        modalMax: "Maksimal",
        modalScanQRIS: "Atau Scan QRIS",
        modalPayNow: "Bayar & Pesan Sekarang",
        modalSelectDiv: "Pilih Divisi",
        modalSelectTkt: "Pilih Kategori Tiket",
        modalPersonalInfo: "Informasi Personal",
        modalCat: "Kategori",
        modalBenefit: "Benefit",
        modalChoice: "Pilihan Anda",
    },
    jp: {
        metaTitle: "イベントプログラムと登録 | Sugoi 8 Management",
        metaDesc: "Sugoi 8 Managementの様々なエキサイティングなイベントプログラムやダンスコンテストの登録に参加しよう。",
        heroSub: "公式登録",
        heroTitle1: "発見する",
        heroTitle2: "イベントプログラム",
        heroDesc: "お気に入りのイベントを選んで登録し、Sugoi 8 Managementと一緒にクリエイティビティの一部になりましょう。",
        secEventTitle1: "イベント",
        secEventTitle2: "プログラム",
        secEventDesc: "様々なコンペティションカテゴリーやエキサイティングなアクティビティに、個人またはチームで登録してください。",
        secTicketTitle1: "チケット",
        secTicketTitle2: "購入",
        secTicketDesc: "お気に入りの座席カテゴリーを選んで、興奮をライブで目撃してください。",
        emptyTitle: "現在アクティブなイベントはありません",
        emptyDesc: "近日中に公開される様々なエキサイティングなイベントサプライズをお楽しみに！",
        cardStart: "から",
        cardJoin: "参加する",
        cardPrice: "価格",
        cardAvailable: "利用可能",
        cardSoldOut: "売り切れ",
        cardSeatsLeft: "残り座席数",
        cardBuy: "チケットを購入",
        available: "利用可能",
        // Modal & Form translations
        modalDetail: "登録の詳細",
        modalLocation: "場所",
        modalImportant: "重要なスケジュール",
        modalAlur: "大会のワークフロー",
        modalPlaceholderName: "氏名",
        modalPlaceholderWA: "アクティブなWhatsApp番号",
        modalPlaceholderEmail: "メールアドレス",
        modalPlaceholderSchool: "学校名 / チーム名",
        modalPaymentMethod: "お支払い方法",
        modalPaymentInst: "振込方法",
        modalUploadProof: "支払証明書をアップロード",
        modalChooseFile: "振込証明書の画像を選択",
        modalSubmit: "今すぐ登録",
        modalProcessing: "処理中...",
        modalWarningProof: "支払証明書が必要です。",
        modalSeatsLeft: "残席",
        modalSoldOut: "売り切れ",
        modalTicket: "チケット",
        modalBuyTicket: "チケットを購入",
        modalSummary: "料金概要",
        modalTotal: "合計支払額",
        modalNote: "* データが正しいことを確認してください。確認後にEチケットが送信されます。",
        modalFillData: "個人情報の入力",
        modalNIK: "NIK (国民識別番号)",
        modalQty: "チケット枚数",
        modalMax: "最大",
        modalScanQRIS: "またはQRISをスキャン",
        modalPayNow: "今すぐ支払って予約する",
        modalSelectDiv: "部門を選択",
        modalSelectTkt: "チケットカテゴリーを選択",
        modalPersonalInfo: "個人情報",
        modalCat: "カテゴリー",
        modalBenefit: "特典",
        modalChoice: "あなたの選択",
    }
};

const imgSrc = (url) =>
    url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

// helpers are also in BookingModal.jsx, keeping shared ones here if needed by EventCard

// ─── Event Card ─────────────────────────────────────────────────────────────

function EventCard({ event, onOpen, onPreview, t }) {
    const tickets = event.tickets || [];
    const minPrice = tickets.length
        ? Math.min(...tickets.map((t) => t.price))
        : 0;
    const src = imgSrc(event.image_url);

    return (
        <div className="group relative bg-white border border-dark/5 rounded-[32px] md:rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
            {/* Poster */}
            <div
                onClick={() => src && onPreview(src)}
                className="aspect-4/5 overflow-hidden relative group cursor-zoom-in"
            >
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
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-linear-to-t from-dark/80 via-dark/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none md:pointer-events-auto flex items-end justify-between">
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

                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl text-dark text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {t.cardStart} Rp {fmtPrice(minPrice)}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 md:p-5 flex flex-col grow">
                <div className="flex items-center gap-1.5 text-dark/30 text-[8px] font-black uppercase tracking-[0.2em] mb-1.5 font-mono">
                    <CalendarDaysIcon className="w-2.5 h-2.5 shrink-0" />
                    {event.date} {event.end_date ? `- ${event.end_date}` : ''}
                </div>
                <h3 className="text-sm md:text-base font-black text-dark uppercase tracking-tighter leading-tight mb-3 group-hover:text-primary transition-colors italic line-clamp-2">
                    {event.title}
                </h3>
                <Link
                    href={route('eventprogram.show', event.slug)}
                    className="mt-auto w-full bg-dark text-white py-2.5 rounded-lg md:rounded-[14px] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] hover:bg-primary active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2"
                >
                    {t.cardJoin}
                </Link>
            </div>
        </div>
    );
}

function ProgramCard({ program, onPreview, t }) {
    const src = imgSrc(program.image_url);

    return (
        <div className="group relative bg-white border border-dark/5 rounded-[32px] md:rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
            {/* Poster */}
            <div
                onClick={() => src && onPreview(src)}
                className="aspect-4/5 overflow-hidden relative group cursor-zoom-in"
            >
                {src ? (
                    <img
                        src={src}
                        alt={program.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-light flex items-center justify-center text-dark/10 font-black uppercase text-sm tracking-widest">
                        No Image
                    </div>
                )}

                {/* Preview overlay — sama persis dengan EventCard */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-linear-to-t from-dark/80 via-dark/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none md:pointer-events-auto flex items-end justify-between">
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
            </div>

            {/* Info — sama dengan EventCard */}
            <div className="p-4 md:p-5 flex flex-col grow">
                <h3 className="text-sm md:text-base font-black text-dark uppercase tracking-tighter leading-tight mb-3 group-hover:text-primary transition-colors italic line-clamp-2">
                    {program.title}
                </h3>
                <a
                    href={route('programs.join', program.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full bg-dark text-white py-2.5 rounded-lg md:rounded-[14px] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] hover:bg-primary active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2"
                >
                    {t.cardJoin}
                </a>
            </div>
        </div>
    );
}

function AudienceCategoryCard({ cat, onClick, t }) {
    const src = imgSrc(cat.image_url);
    const tickets = cat.audience_tickets || [];
    const minPrice = tickets.length ? Math.min(...tickets.map(tk => tk.price)) : 0;

    return (
        <div
            className="group relative bg-white border border-dark/5 rounded-[32px] md:rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
        >
            {/* Thumbnail */}
            <Link href={route('eventprogram.audience-show', { mainCategory: cat.slug || cat.id || 'slug' })} className="aspect-4/5 overflow-hidden relative group cursor-pointer block">
                {src ? (
                    <img
                        src={src}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt={cat.title}
                    />
                ) : (
                    <div className="w-full h-full bg-light flex items-center justify-center text-dark/10 font-black italic uppercase">Sugoi Venue</div>
                )}

                {/* Overlays / Badges */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-linear-to-t from-dark/80 via-dark/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between">
                    <button
                        className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-secondary hover:text-dark hover:border-secondary transition-all"
                        aria-label="View options"
                    >
                        <MagnifyingGlassPlusIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl text-dark text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {t.cardStart} Rp {fmtPrice(minPrice)}
                    </span>
                </div>
            </Link>

            {/* Info */}
            <div className="p-4 md:p-5 flex flex-col grow">
                <div className="flex items-center gap-1.5 text-secondary text-[8px] font-black uppercase tracking-[0.2em] mb-1.5 font-mono">
                    <Squares2X2Icon className="w-2.5 h-2.5 shrink-0" />
                    {tickets.length} Pilihan Tiket
                </div>
                <h3 className="text-sm md:text-base font-black text-dark uppercase tracking-tighter leading-tight mb-3 group-hover:text-secondary transition-colors italic line-clamp-2">
                    {cat.title}
                </h3>

                <Link
                    href={route('eventprogram.audience-show', { mainCategory: cat.slug || cat.id || 'slug' })}
                    className="mt-auto w-full bg-dark text-white py-2.5 rounded-lg md:rounded-[14px] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-dark active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2"
                >
                    Lihat Pilihan
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
            </div>
        </div >
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

export default function Ticket({ auth, events = [], programs = [], audienceCategories = [], settings = {} }) {
    const [lang, setLang] = useLang('en');
    const t = translations[lang] || translations['en'];

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [successBooking, setSuccessBooking] = useState(null);
    const { flash } = usePage().props;
    const flashBooking = flash?.successBooking || null;

    // Filter categories that have at least one active audience ticket
    const activeCategories = (audienceCategories || []).filter(cat =>
        cat.is_active && (cat.audience_tickets || []).some(t => t.is_active)
    );

    // Watch external flashed booking
    useEffect(() => {
        if (flashBooking) {
            setSuccessBooking(flashBooking);
            setIsModalOpen(false);
        }
    }, [flashBooking]);

    const openModal = useCallback((event) => {
        setSelectedEvent(event);
        setSelectedTicket(event?.tickets?.[0] || null);
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
        <MainLayout lang={lang} onLangChange={setLang}>
            <Head>
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
            </Head>

            {/* Hero */}
            <section className="relative min-h-[600px] pt-52 pb-24 bg-primary overflow-hidden">
                {/* BG photo */}
                <div className="absolute inset-0 z-0">
                    {(() => {
                        const heroImage = settings?.ticket_hero_bg || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000";
                        if (heroImage?.match(/\.(mp4|webm|ogg|mov)$/i)) {
                            return (
                                <video
                                    src={heroImage}
                                    className="w-full h-full object-cover opacity-70"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            );
                        }
                        return (
                            <img
                                src={heroImage}
                                className="w-full h-full object-cover opacity-70 grayscale-0 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                                alt="Hero Background"
                            />
                        );
                    })()}
                    <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/25 to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }} />

                    <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[160px] animate-pulse" />
                    <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />

                    {/* Vertical Text Branding */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-20">
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">CREATIVE EXCELLENCE</span>
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                    </div>

                    {/* Giant Ghost "8" */}
                    <div className="absolute -right-20 bottom-0 text-[30rem] font-black text-white/2 leading-none select-none">
                        8
                    </div>
                </div>

                <Container>
                    <div className="relative z-10 max-w-4xl px-4 md:px-0">
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {t.heroSub}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 italic">
                            {t.heroTitle1} <br />
                            <span className="text-secondary block mt-2 drop-shadow-2xl">{t.heroTitle2}</span>
                        </h1>
                        <p className="text-white/50 text-base md:text-xl font-medium leading-relaxed max-w-2xl mt-8 italic border-l-4 border-secondary pl-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                            {t.heroDesc}
                        </p>
                    </div>
                </Container>
            </section>

            {/* ── MARQUEE STRIP ── */}
            <TextRun />

            {/* Event Grid */}
            <section className="py-12 md:py-20 bg-white relative">
                <div className="absolute top-0 inset-x-0 h-24 bg-linear-to-b from-light to-transparent pointer-events-none" />

                <Container>
                    {/* Section Label: Event Program */}
                    <div className="mb-10 px-4 md:px-0">
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="text-xl md:text-2xl font-black text-dark uppercase tracking-tighter italic">
                                {t.secEventTitle1} <span className="text-primary">{t.secEventTitle2}</span>
                            </h2>
                            <div className="h-px grow bg-dark/5" />
                        </div>
                        <p className="text-[10px] md:text-xs font-bold text-dark/30 uppercase tracking-[0.3em] italic">{t.secEventDesc}</p>
                    </div>

                    {events.length === 0 && programs.length === 0 ? (
                        <div className="bg-light rounded-[40px] border border-dark/5 p-16 md:p-32 text-center shadow-inner">
                            <TicketIcon className="w-20 h-20 text-dark/5 mx-auto mb-8 animate-bounce" />
                            <h3 className="text-2xl font-black text-dark uppercase tracking-tight">{t.emptyTitle}</h3>
                            <p className="text-dark/30 font-bold mt-2">{t.emptyDesc}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 px-4 md:px-0">
                            {/* Render Events (Tickets) */}
                            {events.map((event) => (
                                <EventCard
                                    key={`event-${event.id}`}
                                    event={event}
                                    onOpen={openModal}
                                    onPreview={setPreviewSrc}
                                    t={t}
                                />
                            ))}

                            {/* Render Standalone Programs */}
                            {programs.map((program) => (
                                <ProgramCard
                                    key={`program-${program.id}`}
                                    program={program}
                                    onPreview={setPreviewSrc}
                                    t={t}
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </section>

            {/* Audience Ticket Section */}
            {activeCategories.length > 0 && (
                <section className="py-20 bg-light/50 relative overflow-hidden border-t border-dark/5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                    <Container>
                        <div className="max-w-2xl mb-16 px-4 md:px-0 relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <h2 className="text-2xl md:text-3xl font-black text-dark uppercase tracking-tighter leading-none italic">
                                    {t.secTicketTitle1} <span className="text-secondary">{t.secTicketTitle2}</span>
                                </h2>
                                <div className="h-px grow bg-dark/5" />
                            </div>
                            <p className="text-dark/40 text-[10px] md:text-xs font-bold leading-relaxed uppercase tracking-widest italic border-l-4 border-secondary pl-6">{t.secTicketDesc}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 px-4 md:px-0 relative z-10">
                            {activeCategories.map((cat) => (
                                <AudienceCategoryCard
                                    key={`cat-${cat.id}`}
                                    cat={cat}
                                    t={t}
                                />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Modals */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={selectedEvent}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
                auth={auth}
                onPreview={setPreviewSrc}
                settings={settings}
                t={t}
            />

            <ImagePreview src={previewSrc} onClose={() => setPreviewSrc(null)} />

            <SuccessModal
                booking={successBooking}
                onClose={() => {
                    setSuccessBooking(null);
                    // Clear the query string/state or reload if needed to purge flash
                    router.get(route('eventprogram.index'), {}, { preserveScroll: true, replace: true });
                }}
            />
        </MainLayout>
    );
}
