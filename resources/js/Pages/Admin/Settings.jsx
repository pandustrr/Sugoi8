import { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    Cog6ToothIcon,
    UserIcon,
    ShieldCheckIcon,
    LockClosedIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import SidebarAdmin from '../../Components/SidebarAdmin';
import Button from '../../Components/UI/Button';


export default function Settings() {
    const { auth, flash, settings } = usePage().props;
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: auth.user.username,
        password: '',
        password_confirmation: '',
        hero_background_image: null,
    });

    const [preview, setPreview] = useState(settings?.hero_background_image || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('hero_background_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we are uploading a file, we use post with forceFormData: true or just let Inertia handle it if it detects a file
        post(route('admin.settings.update'), {
            onSuccess: () => {
                reset('password', 'password_confirmation', 'hero_background_image');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-light selection:bg-primary/30 flex">
            <Head title="Admin Settings | Sugoi 8" />

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

                <div className="p-8 max-w-4xl">
                    {isSuccess && (
                        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-800 animate-in fade-in slide-in-from-top-4 duration-500">
                            <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                            <p className="font-bold uppercase text-[10px] tracking-widest">Pengaturan berhasil diperbarui.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Account Credentials */}
                        <div className="bg-white rounded-[40px] border border-dark/5 p-8 md:p-12 shadow-sm">
                            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-dark/5">
                                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                                    <ShieldCheckIcon className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-dark uppercase">Kredensial Admin</h2>
                                    <p className="text-xs text-dark/40 font-medium tracking-wide">Ubah username dan password untuk keamanan akun Anda.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Username Baru</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <UserIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.username}
                                                onChange={e => setData('username', e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 bg-light border-none rounded-2xl text-dark font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                required
                                            />
                                        </div>
                                        {errors.username && <p className="text-xs text-red-500 font-bold ml-1">{errors.username}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Password Baru (Opsional)</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <LockClosedIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={e => setData('password', e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 bg-light border-none rounded-2xl text-dark font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        {errors.password && <p className="text-xs text-red-500 font-bold ml-1">{errors.password}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Konfirmasi Password Baru</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <LockClosedIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={e => setData('password_confirmation', e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 bg-light border-none rounded-2xl text-dark font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Section Management */}
                        <div className="bg-white rounded-[40px] border border-dark/5 p-8 md:p-12 shadow-sm">
                            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-dark/5">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <PhotoIcon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-dark uppercase">Homepage Hero Settings</h2>
                                    <p className="text-xs text-dark/40 font-medium tracking-wide">Kelola tampilan hero section di halaman depan.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Background Image</label>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                        {/* Preview Area */}
                                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-light border-2 border-dashed border-dark/10 flex items-center justify-center group">
                                            {preview ? (
                                                <img src={preview} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                                            ) : (
                                                <div className="text-center">
                                                    <PhotoIcon className="w-12 h-12 text-dark/10 mx-auto mb-2" />
                                                    <p className="text-[10px] font-bold text-dark/20 uppercase">No Image Selected</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Upload area */}
                                        <div className="space-y-4">
                                            <div className="p-6 bg-light rounded-3xl border border-dark/5">
                                                <input
                                                    type="file"
                                                    id="hero-image"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <label
                                                    htmlFor="hero-image"
                                                    className="block w-full py-4 px-6 bg-white border border-dark/10 rounded-2xl text-center cursor-pointer hover:border-primary transition-all group"
                                                >
                                                    <p className="text-xs font-black text-dark group-hover:text-primary uppercase tracking-widest">Pilih Gambar</p>
                                                </label>
                                                <p className="text-[9px] text-dark/30 font-bold mt-4 leading-relaxed uppercase tracking-wider text-center">
                                                    Rekomendasi ukuran: 1920x1080px (Max 2MB).
                                                </p>
                                            </div>
                                            {errors.hero_background_image && <p className="text-xs text-red-500 font-bold ml-1">{errors.hero_background_image}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-12 py-5 bg-dark text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-dark/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
