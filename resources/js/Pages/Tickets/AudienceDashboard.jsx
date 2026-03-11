import { Head, usePage, router, Link } from '@inertiajs/react';
import {
    TicketIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    ArrowLeftOnRectangleIcon,
    PhoneIcon,
    IdentificationIcon,
    UserIcon,
    QrCodeIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function AudienceDashboard({ booking }) {
    const { settings } = usePage().props;
    const waNumber = (settings?.contact_wa || '6285954464539').replace(/[^0-9]/g, '').replace(/^0/, '62');

    const handleDownloadBarcode = async (barcode, name) => {
        try {
            const url = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${barcode}&scale=4&rotate=N&includetext=true`;
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Tiket_Sugoi8_${name}_${barcode}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Download failed:", err);
            window.open(`https://bwipjs-api.metafloor.com/?bcid=code128&text=${barcode}&scale=4&rotate=N&includetext=true`, '_blank');
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'confirmed':
                return {
                    label: 'Terverifikasi',
                    color: 'text-emerald-500',
                    bg: 'bg-emerald-500/10',
                    icon: <CheckCircleIcon className="w-5 h-5" />,
                    desc: 'Pembayaran Anda telah diterima. Tunjukkan barcode di bawah kepada panitia.'
                };
            case 'cancelled':
                return {
                    label: 'Ditolak',
                    color: 'text-rose-500',
                    bg: 'bg-rose-500/10',
                    icon: <XCircleIcon className="w-5 h-5" />,
                    desc: 'Mohon maaf, pendaftaran Anda ditolak. Silakan hubungi admin untuk informasi lebih lanjut.'
                };
            default:
                return {
                    label: 'Menunggu Verifikasi',
                    color: 'text-amber-500',
                    bg: 'bg-amber-500/10',
                    icon: <ClockIcon className="w-5 h-5 animate-pulse" />,
                    desc: 'Admin sedang meninjau bukti pembayaran Anda. Mohon tunggu dalam 1x24 jam.'
                };
        }
    };

    const statusInfo = getStatusInfo(booking.status);

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Head title={`E-Ticket - ${booking.customer_name}`} />
            <Navbar />

            <main className="pt-28 md:pt-36 pb-20 px-4">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="bg-dark text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg">Portal Penonton</span>
                                <span className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border ${statusInfo.bg.replace('/10', '/5')} ${statusInfo.color} border-current/10`}>
                                    {statusInfo.icon}
                                    {statusInfo.label}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-dark uppercase tracking-tighter italic">
                                HALO, <span className="text-primary">{booking.customer_name.split(' ')[0]}!</span>
                            </h1>
                            <p className="text-[10px] md:text-xs font-bold text-dark/30 uppercase tracking-[0.3em]">
                                ID PESANAN: <span className="text-dark">{booking.booking_code}</span>
                            </p>
                        </div>

                        <Link
                            href={route('eventprogram.logout')}
                            method="post"
                            as="button"
                            className="bg-white border border-dark/10 text-rose-500 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:border-rose-100 transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                            Keluar Portal
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* SIDEBAR: Status & Static Info (4 columns) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Status Card */}
                            <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                <div className="relative z-10 flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-6 bg-secondary rounded-full" />
                                    <h3 className="text-xs font-black text-dark uppercase tracking-widest">Status Pembayaran</h3>
                                </div>

                                <div className={`relative z-10 p-6 ${statusInfo.bg.replace('/10', '/5')} rounded-[32px] border ${statusInfo.color.replace('text-', 'border-')}/10 flex flex-col items-center text-center gap-4`}>
                                    <div className={`w-20 h-20 ${statusInfo.color.replace('text-', 'bg-')} rounded-[28px] shadow-xl flex items-center justify-center text-white`}>
                                        {statusInfo.icon}
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-black ${statusInfo.color} uppercase italic mb-1`}>{statusInfo.label.toUpperCase()}</h4>
                                        <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest">{statusInfo.desc}</p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4 px-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-dark/30">
                                        <span>Total Pembayaran</span>
                                        <span className="text-dark">Rp {new Intl.NumberFormat('id-ID').format(booking.total_price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-dark/30">
                                        <span>Jumlah Tiket</span>
                                        <span className="text-dark">{booking.quantity} Tiket</span>
                                    </div>
                                </div>
                            </div>

                            {/* Help Box */}
                            <div className="bg-dark rounded-[40px] p-8 text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-xs font-black uppercase tracking-widest mb-3">Butuh Bantuan?</h3>
                                    <p className="text-[10px] text-white/40 font-medium leading-relaxed mb-6">Jika mengalami kendala terkait tiket, silakan hubungi Customer Service kami.</p>
                                    <a href={`https://wa.me/${waNumber}`} target="_blank" className="w-full bg-emerald-500 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10">
                                        <PhoneIcon className="w-4 h-4" /> Hubungi WA Admin
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* MAIN CONTENT: Barcodes & Registration Details (8 columns) */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Registration Info Card */}
                            <div className="bg-white rounded-[40px] border border-dark/5 p-8 md:p-10 shadow-sm space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                                    <h3 className="text-xs font-black text-dark uppercase tracking-widest italic">Detail Tiket</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pl-2">
                                    <div className="space-y-4">
                                        <h4 className="text-[9px] font-black text-dark/20 uppercase tracking-[0.2em]">Kategori Tiket</h4>
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 bg-light rounded-2xl border border-dark/5 p-1 shrink-0 overflow-hidden">
                                                {booking.audience_ticket?.image_url ? (
                                                    <img src={`/storage/${booking.audience_ticket.image_url}`} className="w-full h-full object-cover rounded-xl" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-dark text-white font-black italic text-[8px]">LOGOS</div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-dark uppercase italic leading-tight">{booking.audience_ticket?.title || 'Konser Event'}</p>
                                                <p className="text-[9px] font-bold text-primary uppercase italic mt-1">Sugoi 8.0 Official Ticket</p>
                                                <div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-dark/40 uppercase">
                                                    <CalendarIcon className="w-3.5 h-3.5" /> 6 Maret 2026
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[9px] font-black text-dark/20 uppercase tracking-[0.2em]">Data Pemilik</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-light flex items-center justify-center text-dark/20"><UserIcon className="w-4 h-4" /></div>
                                                <div>
                                                    <p className="text-[8px] font-black uppercase text-dark/30">Nama Lengkap</p>
                                                    <p className="text-[11px] font-black text-dark uppercase">{booking.customer_name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-light flex items-center justify-center text-dark/20"><IdentificationIcon className="w-4 h-4" /></div>
                                                <div>
                                                    <p className="text-[8px] font-black uppercase text-dark/30">NIK</p>
                                                    <p className="text-[11px] font-black text-dark uppercase">{booking.customer_nik || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Barcode Grid Section */}
                            {booking.status === 'confirmed' ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                                            <h3 className="text-xs font-black text-dark uppercase tracking-widest italic">Tunjukkan Barcode Masuk</h3>
                                        </div>
                                        <p className="text-[9px] font-bold text-dark/40 italic uppercase">Satu Scan per Barcode</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {booking.attendee_tickets?.map((t, idx) => (
                                            <div key={idx} className="group bg-white border border-dark/10 rounded-[48px] p-6 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all flex flex-col gap-6 relative overflow-hidden ring-1 ring-dark/5">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-dark text-white rounded-[18px] flex items-center justify-center text-[10px] font-black shadow-lg">#{idx + 1}</div>
                                                        <p className="text-[11px] font-black text-dark uppercase tracking-tight italic">E-Ticket</p>
                                                    </div>
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${t.is_attended ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                                        {t.is_attended ? 'Terpakai' : 'Aktif'}
                                                    </span>
                                                </div>

                                                <div className="bg-light/50 p-8 rounded-[40px] border-2 border-dashed border-dark/10 flex flex-col items-center gap-4 group-hover:bg-primary/5 transition-all relative">
                                                    <div className="bg-white px-6 py-5 rounded-[24px] shadow-xl group-hover:scale-105 transition-transform duration-500 border border-dark/5">
                                                        <img
                                                            src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${t.barcode}&scale=5&rotate=N&includetext=false`}
                                                            alt={`Barcode ${t.barcode}`}
                                                            className="h-14 w-auto max-w-full object-contain"
                                                        />
                                                    </div>
                                                    <p className="text-[15px] font-black text-dark tracking-[0.4em] font-mono mt-2 opacity-50">{t.barcode}</p>

                                                    <div className="absolute top-1/2 -left-3.5 w-7 h-7 bg-[#FDFDFD] rounded-full border border-dark/5" />
                                                    <div className="absolute top-1/2 -right-3.5 w-7 h-7 bg-[#FDFDFD] rounded-full border border-dark/5" />
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => handleDownloadBarcode(t.barcode, booking.customer_name)}
                                                        className="py-4 bg-light text-dark rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-dark hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                                    >
                                                        <ArrowDownTrayIcon className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" /> Simpan
                                                    </button>
                                                    <button
                                                        onClick={() => window.print()}
                                                        className="py-4 bg-dark text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20"
                                                    >
                                                        <QrCodeIcon className="w-4 h-4" /> Cetak
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] font-bold text-dark/30 text-center uppercase tracking-[0.25em] px-4 pt-4 border-t border-dark/5 italic leading-relaxed">
                                        * Harap tunjukkan barcode di atas kepada panitia Sugoi 8 <br className="hidden md:block" />di pintu masuk lokasi acara.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-white rounded-[40px] border border-dark/5 p-12 text-center space-y-6">
                                    <div className="w-20 h-20 bg-light rounded-full border border-dark/5 flex items-center justify-center mx-auto text-dark/10">
                                        <ClockIcon className="w-10 h-10 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-dark uppercase italic">Barcode Belum Tersedia</h3>
                                        <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest max-w-xs mx-auto mt-2 leading-relaxed">
                                            Barcode tiket akan muncul otomatis setelah pembayaran Anda divalidasi oleh admin.
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
