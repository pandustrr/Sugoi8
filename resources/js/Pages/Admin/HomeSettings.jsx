import { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    WrenchScrewdriverIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import SidebarAdmin from '../../Components/SidebarAdmin';


export default function HomeSettings() {
    const { settings } = usePage().props;
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        hero_background_image: null,
    });

    const [preview, setPreview] = useState(settings?.hero_background_image || null);

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setData(field, file);
            if (field === 'hero_background_image') setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.siteSettings.update'), {
            onSuccess: () => {
                reset('hero_background_image');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-light selection:bg-primary/30 flex">
            <Head title="Home Settings | Sugoi 8" />

            <SidebarAdmin activePage="site-settings" />

            {/* Main Content */}
            <main className="grow">
                {/* Header */}
                <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                            <WrenchScrewdriverIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Home Setting</h1>
                    </div>
                </header>

                <div className="p-10 max-w-4xl mx-auto">
                    {isSuccess && (
                        <div className="mb-10 p-5 bg-emerald-50 border border-emerald-100/50 rounded-[24px] flex items-center gap-4 text-emerald-800 animate-in fade-in slide-in-from-top-2 duration-300">
                            <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                            <p className="font-bold uppercase text-xs tracking-widest">Pengaturan hero berhasil diperbarui.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border border-dark/5 p-10 md:p-12 shadow-sm hover:shadow-md transition-all duration-500 space-y-10">
                        {/* Hero Background Module */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-5 mb-4">
                                <div className="w-2.5 h-10 bg-primary rounded-full" />
                                <div>
                                    <h2 className="text-base font-black text-dark uppercase tracking-tight">Homepage Hero Settings</h2>
                                    <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">Visual & Tampilan Utama</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-5">
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-dark/40 ml-1">Latar Belakang (Hero BG)</label>

                                    <div className="space-y-8">
                                        {/* Preview Area */}
                                        <div className="relative aspect-video rounded-[32px] overflow-hidden bg-light border border-dark/5 flex items-center justify-center group shadow-inner bg-dark/5">
                                            {preview ? (
                                                <img src={preview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Preview" />
                                            ) : (
                                                <div className="text-center opacity-20">
                                                    <PhotoIcon className="w-12 h-12 mx-auto mb-3" />
                                                    <p className="text-xs font-black uppercase tracking-widest">No Image Background</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Upload area */}
                                        <div className="p-8 bg-light rounded-3xl border border-dark/5">
                                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                                <div className="grow w-full">
                                                    <p className="text-[11px] font-bold text-dark/40 uppercase tracking-widest mb-1.5">Rekomendasi Ukuran</p>
                                                    <p className="text-[10px] text-dark/20 font-bold uppercase tracking-widest leading-relaxed">
                                                        1920x1080px (Aspek 16:9). Maksimal file 2MB untuk performa terbaik.
                                                    </p>
                                                </div>
                                                <div className="shrink-0 w-full sm:w-auto">
                                                    <input
                                                        type="file"
                                                        id="hero-image"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'hero_background_image')}
                                                    />
                                                    <label
                                                        htmlFor="hero-image"
                                                        className="block w-full px-10 py-4 bg-white border border-dark/10 rounded-2xl text-center cursor-pointer hover:border-primary transition-all group shadow-sm hover:shadow-primary/5"
                                                    >
                                                        <p className="text-xs font-black text-dark group-hover:text-primary uppercase tracking-widest">Ganti Gambar Hero</p>
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.hero_background_image && <p className="text-xs text-red-500 font-bold mt-4 ml-1">{errors.hero_background_image}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex justify-end border-t border-dark/5">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-12 py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-dark/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan Visual'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
