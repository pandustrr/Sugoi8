import { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    Cog6ToothIcon,
    UserIcon,
    ShieldCheckIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import SidebarAdmin from '../../Components/SidebarAdmin';


export default function Settings() {
    const { auth, flash } = usePage().props;
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: auth.user.username,
        password: '',
        password_confirmation: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            onSuccess: () => {
                reset('password', 'password_confirmation');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
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
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-dark leading-none">{auth.user.name}</p>
                            <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mt-1">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-light rounded-xl flex items-center justify-center border border-dark/5">
                            <UserIcon className="w-5 h-5 text-dark/40" />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-4xl">
                    {isSuccess && (
                        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-800 animate-in fade-in slide-in-from-top-4 duration-500">
                            <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                            <p className="font-bold uppercase text-[10px] tracking-widest">Pengaturan admin berhasil diperbarui.</p>
                        </div>
                    )}

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

                        <form onSubmit={handleSubmit} className="space-y-8">
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

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
