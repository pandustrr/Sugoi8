import { Head, useForm, Link } from '@inertiajs/react';
import {
    UserIcon,
    TicketIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    InformationCircleIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function CheckStatus() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        booking_code: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('eventprogram.doCheckStatus'));
    };

    return (
        <div className="min-h-screen bg-light flex flex-col">
            <Head title="Login Pendaftar | Sugoi 8" />
            <Navbar />

            <main className="grow flex items-center justify-center pt-32 pb-20 px-4">
                <div className="w-full max-w-md">
                    {/* Compact Single Container */}
                    <div className="bg-white rounded-[40px] border border-dark/5 shadow-2xl overflow-hidden relative group">
                        {/* Accent Decor */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

                        <div className="p-8 md:p-10 relative z-10">
                            {/* Header inside container */}
                            <div className="mb-8">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-dark/20 hover:text-primary transition-colors mb-4 group/link"
                                >
                                    <ChevronLeftIcon className="w-3 h-3 group-hover/link:-translate-x-1 transition-transform" />
                                    Beranda
                                </Link>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-xl bg-dark flex items-center justify-center text-white">
                                        <LockClosedIcon className="w-4 h-4" />
                                    </div>
                                    <h1 className="text-2xl font-black text-dark uppercase tracking-tighter italic">
                                        Login <span className="text-primary italic">Pendaftar</span>
                                    </h1>
                                </div>
                                <p className="text-[11px] font-bold text-dark/30 uppercase tracking-widest leading-relaxed">
                                    Pantau status & detail tiket Anda.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email / WA */}
                                <div className="space-y-2">
                                    <label className="block text-[9px] font-black uppercase tracking-widest text-dark/40 px-1">Email / WhatsApp</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Masukkan Email atau No. WA"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full bg-light/50 border border-dark/5 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold text-dark focus:border-primary outline-none transition-all placeholder:text-dark/10"
                                        />
                                    </div>
                                    {errors.email && <p className="text-[9px] font-bold text-red-500 px-1">{errors.email}</p>}
                                </div>

                                {/* Password / ID Pesan */}
                                <div className="space-y-2">
                                    <label className="block text-[9px] font-black uppercase tracking-widest text-dark/40 px-1">ID Pemesanan (Password)</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20">
                                            <TicketIcon className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="S8-XXXX / ID-XXXX"
                                            value={data.booking_code}
                                            onChange={e => setData('booking_code', e.target.value)}
                                            className="w-full bg-light/50 border border-dark/5 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold text-dark focus:border-primary outline-none transition-all placeholder:text-dark/10 uppercase"
                                        />
                                    </div>
                                    {errors.booking_code && <p className="text-[9px] font-bold text-red-500 px-1">{errors.booking_code}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-dark text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-dark/10 flex items-center justify-center gap-3"
                                >
                                    {processing ? 'Masuk...' : 'Masuk Dashboard'}
                                    <ArrowRightIcon className="w-3.5 h-3.5" />
                                </button>
                            </form>

                            {/* Help Note inside container */}
                            <div className="mt-8 pt-8 border-t border-dark/5 flex gap-3">
                                <InformationCircleIcon className="w-4 h-4 text-primary shrink-0" />
                                <p className="text-[9px] font-bold text-dark/30 leading-relaxed uppercase tracking-wider">
                                    Butuh bantuan login? hubungi CS kami via WhatsApp di link yang tersedia di Beranda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
