import { Head, usePage, router, Link, useForm } from '@inertiajs/react';
import {
    TicketIcon,
    CalendarIcon,
    MapPinIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    CloudArrowUpIcon,
    ArrowLeftOnRectangleIcon,
    InformationCircleIcon,
    PhoneIcon,
    EnvelopeIcon,
    AcademicCapIcon,
    UserIcon,
    DocumentArrowUpIcon,
    PhotoIcon,
    VideoCameraIcon,
    LockClosedIcon,
    IdentificationIcon
} from '@heroicons/react/24/outline';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function Dashboard({ booking }) {
    const { flash, settings } = usePage().props;
    const waNumber = (settings?.contact_wa || '6285954464539').replace(/[^0-9]/g, '').replace(/^0/, '62');

    const { data, setData, post, processing, errors, progress } = useForm({
        submission_file: null,
    });

    const handleUpload = (e) => {
        e.preventDefault();
        post(route('eventprogram.submitWork', booking.id), {
            forceFormData: true,
        });
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'confirmed':
                return {
                    label: 'Terverifikasi',
                    color: 'text-emerald-500',
                    bg: 'bg-emerald-500/10',
                    icon: <CheckCircleIcon className="w-5 h-5" />,
                    desc: 'Pembayaran Anda telah diterima. Silakan akses folder pengumpulan karya di bawah ini.'
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
        <div className="min-h-screen bg-light">
            <Head title={`Dashboard Pendaftar | ${booking.customer_name}`} />
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Top Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-3 py-1 rounded-full bg-dark text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-dark/10">
                                    Portal Pendaftar
                                </div>
                                <div className={`px-4 py-1.5 rounded-full ${statusInfo.bg} ${statusInfo.color} text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-current/10`}>
                                    {statusInfo.icon}
                                    {statusInfo.label}
                                </div>
                                {booking.booking_type === 'audience' && (
                                    <div className="px-4 py-1.5 rounded-full bg-secondary text-dark text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-dark/10">
                                        <TicketIcon className="w-4 h-4" />
                                        Tiket Penonton
                                    </div>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-dark uppercase tracking-tighter italic leading-none">
                                Halo, <span className="text-primary">{booking.customer_name.split(' ')[0]}!</span>
                            </h1>
                            <p className="mt-4 text-dark/40 font-bold text-xs md:text-sm uppercase tracking-widest opacity-60">
                                ID {booking.booking_type === 'audience' ? 'TIKET' : 'LOMBA'}: <span className="text-dark">{booking.booking_code}</span>
                            </p>
                        </div>
                        <Link
                            href={route('eventprogram.logout')}
                            method="post"
                            as="button"
                            className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-[10px] font-black uppercase tracking-widest group"
                        >
                            <ArrowLeftOnRectangleIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Keluar Portal
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT Column: Status & Action */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Upload Section */}
                            <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1.5 h-6 bg-secondary rounded-full" />
                                    <h3 className="text-[12px] font-black text-dark uppercase tracking-widest">Pengumpulan Karya</h3>
                                </div>

                                {booking.booking_type === 'audience' ? (
                                    booking.status === 'confirmed' ? (
                                        <div className="space-y-6">
                                            <div className="p-6 bg-emerald-50 rounded-[32px] border-2 border-emerald-100 flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
                                                    <CheckCircleIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest leading-none mb-1">Status Tiket</p>
                                                    <p className="text-sm font-black text-emerald-900 uppercase italic">Pembayaran Berhasil</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.2em] px-2 italic">Daftar Barcode Masuk</p>
                                                <div className="space-y-3">
                                                    {booking.attendee_tickets?.map((t, idx) => (
                                                        <div key={t.id} className="bg-white border border-dark/5 rounded-3xl p-5 group hover:shadow-xl hover:shadow-dark/5 transition-all">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="w-8 h-8 bg-dark text-white rounded-xl flex items-center justify-center text-[10px] font-black italic">{idx + 1}</span>
                                                                    <p className="text-[11px] font-black text-dark uppercase tracking-tight italic">E-Ticket #{idx + 1}</p>
                                                                </div>
                                                                <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${t.is_attended ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                                                    {t.is_attended ? 'Sudah Digunakan' : 'Siap Pakai'}
                                                                </span>
                                                            </div>
                                                            <div className="bg-light p-4 rounded-2xl border-2 border-dashed border-dark/5 flex flex-col items-center gap-3 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                                                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                                                                    {/* Simple barcode viz */}
                                                                    <div className="flex gap-1 h-8 opacity-40">
                                                                        {[...Array(20)].map((_, i) => <div key={i} className={`h-full bg-dark w-${i % 3 === 0 ? '1' : '0.5'}`} />)}
                                                                    </div>
                                                                </div>
                                                                <p className="text-[13px] font-black text-dark tracking-[0.3em] font-mono group-hover:text-primary transition-colors">{t.barcode}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-[9px] font-bold text-dark/30 text-center uppercase tracking-widest leading-relaxed px-4">
                                                * Silakan tunjukkan barcode di atas kepada petugas di lokasi event untuk verifikasi masuk.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-8 bg-light rounded-[40px] border border-dark/5 text-center flex flex-col items-center">
                                            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-dark/5 flex items-center justify-center text-dark/10 mb-6">
                                                <ClockIcon className="w-10 h-10 animate-pulse" />
                                            </div>
                                            <h4 className="text-xs font-black text-dark uppercase tracking-widest mb-3 italic">Menunggu Konfirmasi</h4>
                                            <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest leading-relaxed max-w-[240px]">
                                                Barcode tiket akan muncul di sini setelah pembayaran Anda dikonfirmasi oleh admin.
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    booking.status === 'confirmed' ? (
                                        (booking.gdrive_link || booking.ticket.gdrive_link) ? (
                                            booking.submission_file ? (
                                                <div className="p-6 bg-emerald-500/5 rounded-[32px] border border-emerald-500/20 text-center">
                                                    <div className="w-16 h-16 bg-emerald-500 rounded-3xl shadow-lg shadow-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-white">
                                                        <CheckCircleIcon className="w-10 h-10" />
                                                    </div>
                                                    <h4 className="text-[11px] font-black text-dark uppercase tracking-widest mb-1 italic">Karya Terkumpul!</h4>
                                                    <p className="text-[9px] font-bold text-dark/30 uppercase tracking-widest leading-relaxed">
                                                        ID: {booking.booking_code} <br />
                                                        Terkumpul: {new Date(booking.submission_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} • {new Date(booking.submission_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':')}
                                                    </p>
                                                    <div className="mt-6 pt-6 border-t border-dark/5">
                                                        <p className="text-[9px] font-bold text-amber-600 uppercase italic">
                                                            * Pengumpulan karya hanya bisa dilakukan satu kali. Silakan hubungi admin jika ada kesalahan file.
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleUpload} className="space-y-6">
                                                    <div className="space-y-4">
                                                        <label className="block">
                                                            <span className="sr-only">Pilih file karya</span>
                                                            <div className={`relative group/upload cursor-pointer ${data.submission_file ? 'border-primary' : 'border-dark/10'}`}>
                                                                <input
                                                                    type="file"
                                                                    onChange={e => setData('submission_file', e.target.files[0])}
                                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                                                />
                                                                <div className={`bg-light border-2 border-dashed rounded-[32px] p-8 text-center transition-all group-hover/upload:border-primary group-hover/upload:bg-primary/5 ${data.submission_file ? 'border-primary bg-primary/5' : 'border-dark/10'}`}>
                                                                    {data.submission_file ? (
                                                                        <div className="flex flex-col items-center">
                                                                            <DocumentArrowUpIcon className="w-10 h-10 text-primary mb-3" />
                                                                            <p className="text-[10px] font-black text-dark uppercase tracking-widest line-clamp-1">
                                                                                {data.submission_file.name}
                                                                            </p>
                                                                            <p className="text-[9px] font-bold text-dark/30 mt-1 uppercase italic">
                                                                                Ukuran: {(data.submission_file.size / (1024 * 1024)).toFixed(2)} MB
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex flex-col items-center">
                                                                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 text-dark/20 group-hover/upload:text-primary transition-colors">
                                                                                <PhotoIcon className="w-6 h-6" />
                                                                            </div>
                                                                            <p className="text-[10px] font-black text-dark uppercase tracking-[0.2em]">Pilih File Karya / Video</p>
                                                                            <p className="text-[9px] font-bold text-dark/30 mt-2 uppercase">PDF, ZIP, Video, Gambar (Max 1GB)</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </label>
                                                        {errors.submission_file && <p className="text-[10px] text-red-500 font-bold px-4">{errors.submission_file}</p>}
                                                        {progress && (
                                                            <div className="px-1 space-y-2">
                                                                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-primary italic">
                                                                    <span>
                                                                        {progress.percentage >= 100 && processing
                                                                            ? 'Memproses di server...'
                                                                            : 'Mengunggah...'}
                                                                    </span>
                                                                    <span>{progress.percentage}%</span>
                                                                </div>
                                                                <div className="w-full bg-light h-2 rounded-full overflow-hidden shadow-inner">
                                                                    <div
                                                                        className={`h-full transition-all duration-300 shadow-lg ${progress.percentage >= 100 && processing ? 'bg-amber-500 shadow-amber-500/20 animate-pulse' : 'bg-primary shadow-primary/20'}`}
                                                                        style={{ width: `${progress.percentage}%` }}
                                                                    />
                                                                </div>
                                                                {progress.percentage >= 100 && processing && (
                                                                    <p className="text-[8px] font-bold text-amber-500 italic text-center uppercase tracking-widest">
                                                                        File sedang dikirim ke GDrive, mohon tunggu...
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        disabled={processing || !data.submission_file}
                                                        className="w-full bg-dark text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary active:scale-95 transition-all disabled:opacity-40 shadow-xl shadow-dark/10 flex items-center justify-center gap-3 group"
                                                    >
                                                        {processing
                                                            ? (progress?.percentage >= 100 ? 'Memproses...' : 'Mengunggah...')
                                                            : 'Kirim Karya Sekarang'}
                                                        <DocumentArrowUpIcon className="w-4 h-4 group-hover:translate-y--1 transition-transform" />
                                                    </button>

                                                    <p className="text-[9px] font-bold text-amber-500 text-center italic uppercase leading-relaxed px-4">
                                                        * Pastikan file sudah benar. Pendaftar hanya memiliki 1x kesempatan kirim.
                                                    </p>
                                                </form>
                                            )
                                        ) : (
                                            <div className="p-6 bg-amber-500/5 rounded-[32px] border border-amber-500/20 text-center">
                                                <div className="w-16 h-16 bg-amber-500 rounded-3xl shadow-lg shadow-amber-500/20 flex items-center justify-center mx-auto mb-4 text-white">
                                                    <InformationCircleIcon className="w-10 h-10" />
                                                </div>
                                                <h4 className="text-[11px] font-black text-dark uppercase tracking-widest mb-2 italic">Menunggu Link Drive</h4>
                                                <p className="text-[9px] font-bold text-dark/30 uppercase tracking-wider leading-relaxed">
                                                    Admin belum mencantumkan link Google Drive untuk kategori ini. Mohon tunggu atau hubungi admin.
                                                </p>
                                            </div>
                                        )
                                    ) : (
                                        <div className="p-6 bg-light rounded-[32px] border border-dark/5 text-center grayscale opacity-50">
                                            <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-dark/5 flex items-center justify-center mx-auto mb-4 text-dark/20">
                                                <LockClosedIcon className="w-10 h-10" />
                                            </div>
                                            <h4 className="text-[11px] font-black text-dark uppercase tracking-widest mb-2 italic">Akses Terkunci</h4>
                                            <p className="text-[9px] font-bold text-dark/30 uppercase tracking-wider leading-relaxed">
                                                Form pengumpulan karya akan terbuka otomatis setelah pembayaran Anda divalidasi oleh admin.
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Help Section */}
                            <div className="bg-dark rounded-[40px] p-8 shadow-xl text-white group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
                                <div className="relative z-10">
                                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] mb-4">Butuh Bantuan?</h3>
                                    <p className="text-xs text-white/40 font-medium mb-6 leading-relaxed">
                                        Jika mengalami kendala teknis saat mengunggah karya, silakan hubungi Customer Service kami.
                                    </p>
                                    <a
                                        href={`https://wa.me/${waNumber}`}
                                        target="_blank"
                                        className="w-full bg-emerald-500 py-3.5 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                                    >
                                        <PhoneIcon className="w-4 h-4" />
                                        Hubungi WA Admin
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT Column: Info Detail */}
                        <div className="lg:col-span-8 space-y-8">
                            {flash?.success && (
                                <div className="p-6 bg-emerald-500 text-white rounded-[32px] font-black text-xs uppercase tracking-widest flex items-center gap-4 shadow-xl shadow-emerald-500/20">
                                    <CheckCircleIcon className="w-6 h-6 shrink-0" />
                                    <span>{flash.success}</span>
                                </div>
                            )}

                            {flash?.error && (
                                <div className="p-6 bg-rose-500 text-white rounded-[32px] font-black text-xs uppercase tracking-widest flex items-center gap-4 shadow-xl shadow-rose-500/20">
                                    <InformationCircleIcon className="w-6 h-6 shrink-0" />
                                    <span>{flash.error}</span>
                                </div>
                            )}

                            <div className="bg-white rounded-[40px] border border-dark/5 shadow-sm overflow-hidden p-8 md:p-10 space-y-10">
                                {/* Detail Event */}
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-6 bg-primary rounded-full" />
                                        <h3 className="text-[12px] font-black text-dark uppercase tracking-widest leading-none italic">Informasi Pendaftaran</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {/* Event / Ticket Data */}
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-dark/30 uppercase tracking-[0.2em]">{booking.booking_type === 'audience' ? 'Data Tiket' : 'Data Kompetisi'}</h4>
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-light border border-dark/5 p-1 overflow-hidden shrink-0">
                                                    {booking.booking_type === 'audience' ? (
                                                        booking.audience_ticket?.image_url ? (
                                                            <img src={`/storage/${booking.audience_ticket.image_url}`} className="w-full h-full object-cover rounded-xl" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-dark text-white font-black italic text-[8px]">AUD</div>
                                                        )
                                                    ) : (
                                                        <img
                                                            src={booking.ticket?.event?.image_url ? (booking.ticket.event.image_url.startsWith('http') ? booking.ticket.event.image_url : `/storage/${booking.ticket.event.image_url}`) : '/images/placeholder.jpg'}
                                                            className="w-full h-full object-cover rounded-xl"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-dark uppercase italic leading-tight">
                                                        {booking.booking_type === 'audience' ? booking.audience_ticket?.title : booking.ticket?.event?.title}
                                                    </p>
                                                    <p className="text-[11px] font-bold text-primary mt-1 uppercase italic">
                                                        {booking.booking_type === 'audience' ? 'Tiket Penonton' : `Paket: ${booking.ticket?.title}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-dark/40 font-bold text-xs uppercase italic">
                                                    <CalendarIcon className="w-4 h-4 text-primary" />
                                                    {booking.booking_type === 'audience'
                                                        ? new Date(booking.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                                                        : new Date(booking.ticket?.event?.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                                                    }
                                                </div>
                                                {booking.booking_type !== 'audience' && (
                                                    <div className="flex items-center gap-3 text-dark/40 font-bold text-xs uppercase italic">
                                                        <MapPinIcon className="w-4 h-4 text-primary" />
                                                        {booking.ticket?.event?.location}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Participant / Ticket Holder Data */}
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-dark/30 uppercase tracking-[0.2em]">{booking.booking_type === 'audience' ? 'Pemegang Tiket' : 'Data Peserta'}</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-8 h-8 rounded-xl bg-light flex items-center justify-center text-dark/20 shrink-0"><UserIcon className="w-4 h-4" /></div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-dark/40 uppercase tracking-widest mb-0.5">Nama Lengkap</p>
                                                        <p className="text-[11px] font-black text-dark uppercase">{booking.customer_name}</p>
                                                    </div>
                                                </div>
                                                {booking.booking_type === 'audience' ? (
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-8 h-8 rounded-xl bg-light flex items-center justify-center text-dark/20 shrink-0"><IdentificationIcon className="w-4 h-4" /></div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-dark/40 uppercase tracking-widest mb-0.5">NIK</p>
                                                            <p className="text-[11px] font-black text-dark uppercase">{booking.customer_nik || '-'}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-8 h-8 rounded-xl bg-light flex items-center justify-center text-dark/20 shrink-0"><AcademicCapIcon className="w-4 h-4" /></div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-dark/40 uppercase tracking-widest mb-0.5">Institusi & Divisi</p>
                                                            <p className="text-[11px] font-black text-dark uppercase">{booking.school_name || '-'} / {booking.division || '-'}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Card */}
                                <div className="pt-10 border-t border-dark/5">
                                    <div className="bg-light/50 border border-dark/5 rounded-[32px] p-8 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                            <div className="w-20 h-20 bg-white rounded-3xl shadow-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                                <TicketIcon className="w-10 h-10" />
                                            </div>
                                            <div className="text-center md:text-left flex-1">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div>
                                                        <h4 className="text-xl font-black text-dark uppercase tracking-tight leading-none italic mb-2">E-TIKET RESMI</h4>
                                                        <p className="text-[10px] font-bold text-dark/30 uppercase tracking-[0.2em]">SUGOI 8.0 OFFICIAL REGISTRATION</p>
                                                    </div>
                                                    <div className="flex justify-center md:justify-end gap-3 font-black text-[10px] uppercase">
                                                        <span className="bg-white px-4 py-2 rounded-xl shadow-sm text-emerald-500">{booking.quantity} TIKET</span>
                                                        <span className={`bg-white px-4 py-2 rounded-xl shadow-sm ${statusInfo.color}`}>{booking.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
