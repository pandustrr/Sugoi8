import { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    Cog6ToothIcon,
    UserIcon,
    ShieldCheckIcon,
    LockClosedIcon,
    PhotoIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline';
import SidebarAdmin from '../../Components/SidebarAdmin';

export default function Settings() {
    const { auth, settings } = usePage().props;
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: auth.user.username,
        password: '',
        password_confirmation: '',
        payment_methods: settings?.payment_methods || '',
        payment_qris_image: null,
    });

    const [qrisPreview, setQrisPreview] = useState(settings?.payment_qris_image || null);

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setData(field, file);
            if (field === 'payment_qris_image') setQrisPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            onSuccess: () => {
                reset('password', 'password_confirmation', 'payment_qris_image');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-light selection:bg-primary/30 flex">
            <Head title="Account Settings | Sugoi 8" />

            <SidebarAdmin activePage="settings" />

            {/* Main Content */}
            <main className="grow">
                {/* Header */}
                <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                            <Cog6ToothIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Account Settings</h1>
                    </div>
                </header>

                <div className="p-10 max-w-7xl mx-auto">
                    {isSuccess && (
                        <div className="mb-10 p-5 bg-emerald-50 border border-emerald-100/50 rounded-[24px] flex items-center gap-4 text-emerald-800 animate-in fade-in slide-in-from-top-2 duration-300">
                            <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                            <p className="font-bold uppercase text-xs tracking-widest">Pengaturan berhasil diperbarui.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Account Credentials Module */}
                        <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border border-dark/5 p-10 md:p-12 shadow-sm hover:shadow-md transition-all duration-500 space-y-10 h-full flex flex-col">
                            <div className="grow space-y-10">
                                <div className="flex items-center gap-5 mb-4">
                                    <div className="w-2.5 h-10 bg-secondary rounded-full" />
                                    <div>
                                        <h2 className="text-base font-black text-dark uppercase tracking-tight">Kredensial Admin</h2>
                                        <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">Keamanan Akun</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="block text-[11px] font-black uppercase tracking-widest text-dark/40 ml-1">Username Baru</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                <UserIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.username}
                                                onChange={e => setData('username', e.target.value)}
                                                className="block w-full pl-14 pr-6 py-4 bg-light border-none rounded-2xl text-dark text-base font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                required
                                            />
                                        </div>
                                        {errors.username && <p className="text-xs text-red-500 font-bold ml-1">{errors.username}</p>}
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="block text-[11px] font-black uppercase tracking-widest text-dark/40 ml-1">Password Baru</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                    <LockClosedIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                                </div>
                                                <input
                                                    type="password"
                                                    value={data.password}
                                                    onChange={e => setData('password', e.target.value)}
                                                    className="block w-full pl-14 pr-6 py-4 bg-light border-none rounded-2xl text-dark text-base font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                            {errors.password && <p className="text-xs text-red-500 font-bold ml-1">{errors.password}</p>}
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-[11px] font-black uppercase tracking-widest text-dark/40 ml-1">Konfirmasi Password</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                    <LockClosedIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                                </div>
                                                <input
                                                    type="password"
                                                    value={data.password_confirmation}
                                                    onChange={e => setData('password_confirmation', e.target.value)}
                                                    className="block w-full pl-14 pr-6 py-4 bg-light border-none rounded-3xl text-dark text-base font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-end border-t border-dark/5 mt-auto">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-dark/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Update Akun Admin'}
                                </button>
                            </div>
                        </form>

                        {/* Payment Settings Module */}
                        <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border border-dark/5 p-10 md:p-12 shadow-sm hover:shadow-md transition-all duration-500 space-y-10 h-full flex flex-col">
                            <div className="grow space-y-10">
                                <div className="flex items-center gap-5 mb-4">
                                    <div className="w-2.5 h-10 bg-emerald-500 rounded-full" />
                                    <div>
                                        <h2 className="text-base font-black text-dark uppercase tracking-tight">Pengaturan Pembayaran</h2>
                                        <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">Metode Pembayaran</p>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="space-y-3">
                                        <label className="block text-[11px] font-black uppercase tracking-widest text-dark/40 ml-1">Instruksi Transfer</label>
                                        <textarea
                                            value={data.payment_methods}
                                            onChange={e => setData('payment_methods', e.target.value)}
                                            rows={4}
                                            className="block w-full px-6 py-5 bg-light border-none rounded-3xl text-dark text-base font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none leading-relaxed"
                                            placeholder="Contoh: BCA 12345678 A/n Sugoi Team"
                                        />
                                    </div>

                                    <div className="space-y-5">
                                        <label className="block text-[11px] font-black uppercase tracking-widest text-dark/40 ml-1">QRIS Transaksi</label>

                                        <div className="flex flex-col sm:flex-row gap-8 items-start">
                                            <div className="w-32 h-32 shrink-0 rounded-3xl overflow-hidden bg-dark/5 border border-dark/5 flex items-center justify-center p-3 group">
                                                {qrisPreview ? (
                                                    <img src={qrisPreview} className="w-full h-full object-contain mix-blend-multiply" alt="QRIS Preview" />
                                                ) : (
                                                    <div className="text-center opacity-20">
                                                        <PhotoIcon className="w-8 h-8 mx-auto mb-2" />
                                                        <p className="text-[9px] font-black uppercase tracking-tighter">No Image</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grow space-y-5 w-full">
                                                <div className="p-6 bg-light rounded-3xl border border-dark/5">
                                                    <input
                                                        type="file"
                                                        id="qris-image"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'payment_qris_image')}
                                                    />
                                                    <label
                                                        htmlFor="qris-image"
                                                        className="inline-block px-7 py-3 bg-white border border-dark/10 rounded-2xl text-center cursor-pointer hover:border-primary transition-all group shadow-sm"
                                                    >
                                                        <p className="text-xs font-black text-dark group-hover:text-primary uppercase tracking-widest">Update QRIS Gambar</p>
                                                    </label>
                                                    <p className="text-[10px] text-dark/20 font-bold mt-4 uppercase tracking-widest">
                                                        Maksimal 2MB. Format PNG/JPG.
                                                    </p>
                                                </div>
                                                {errors.payment_qris_image && <p className="text-xs text-red-500 font-bold ml-1">{errors.payment_qris_image}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-end border-t border-dark/5 mt-auto">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-dark/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Pembayaran'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
