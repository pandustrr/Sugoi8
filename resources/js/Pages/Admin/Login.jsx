import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Container from '../../Components/UI/Container';
import Button from '../../Components/UI/Button';
import {
    UserIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.login.post'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-light flex flex-col justify-center relative overflow-hidden selection:bg-primary/30">
            <Head title="Admin Login | Sugoi 8" />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <Container className="relative z-10">
                <div className="max-w-md mx-auto">
                    {/* Logo Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl shadow-primary/5 mb-6 group hover:scale-105 transition-transform">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                                <span className="text-white font-black text-2xl">S8</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black text-dark tracking-tighter uppercase mb-2">Admin Portal</h1>
                        <p className="text-dark/40 font-medium">Selamat datang kembali. Silakan masuk.</p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl shadow-primary/5 border border-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.username}
                                        onChange={e => setData('username', e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-light border-none rounded-2xl text-dark font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder="admin"
                                        required
                                    />
                                </div>
                                {errors.username && <p className="mt-2 text-xs text-red-500 font-bold">{errors.username}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-dark/20 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="block w-full pl-12 pr-12 py-4 bg-light border-none rounded-2xl text-dark font-medium placeholder:text-dark/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-dark/20 hover:text-primary transition-colors" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-dark/20 hover:text-primary transition-colors" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-2 text-xs text-red-500 font-bold">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="w-5 h-5 rounded-lg border-none bg-light text-primary focus:ring-offset-0 focus:ring-primary/20 cursor-pointer"
                                    />
                                    <span className="ml-3 text-sm font-bold text-dark/40 group-hover:text-dark/60 transition-colors uppercase tracking-wide">Ingat saya</span>
                                </label>
                                <a href="#" className="text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">Lupa Password?</a>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full h-16 rounded-2xl gap-3 text-xs"
                                disabled={processing}
                            >
                                <span>Masuk ke Dashboard</span>
                                <ArrowRightIcon className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-dark/20 font-bold text-[10px] uppercase tracking-[0.2em]">
                            &copy; {new Date().getFullYear()} SUGOI 8 MANAGEMENT
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
