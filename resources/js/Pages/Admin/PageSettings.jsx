import { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    WrenchScrewdriverIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';
import SidebarAdmin from '../../Components/SidebarAdmin';
import ServiceImagesPanel from './ServiceImagesPanel';
import PortfolioPanel from './PortfolioPanel';
import PartnerPanel from './PartnerPanel';

const PAGES = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'partners', label: 'Partners' },
    { id: 'ticket', label: 'Ticket' },
];

export default function PageSettings() {
    const { settings, portfolioItems = [], portfolioCategories = [], partners = [] } = usePage().props;
    const [isSuccess, setIsSuccess] = useState(false);
    const [activePageTab, setActivePageTab] = useState(PAGES[0].id);

    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        key: `${PAGES[0].id}_hero_bg`,
    });

    const getPreview = (pageId) => {
        if (activePageTab === pageId && data.image) {
            return URL.createObjectURL(data.image);
        }
        return settings[`${pageId}_hero_bg`] || settings['hero_background_image'];
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setData('image', file);
    };

    const handleTabChange = (pageId) => {
        setActivePageTab(pageId);
        setData({ image: null, key: `${pageId}_hero_bg` });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.siteSettings.update'), {
            onSuccess: () => {
                reset('image');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-light selection:bg-primary/30 flex">
            <Head title="Page Settings | Sugoi 8" />
            <SidebarAdmin activePage="site-settings" />

            <main className="grow">
                {/* Header */}
                <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                            <WrenchScrewdriverIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Page Setting</h1>
                    </div>
                </header>

                <div className="p-10 max-w-5xl mx-auto space-y-10">
                    {/* Tab Selector */}
                    <div className="flex flex-wrap gap-2">
                        {PAGES.map((page) => (
                            <button
                                key={page.id}
                                onClick={() => handleTabChange(page.id)}
                                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activePageTab === page.id
                                    ? 'bg-dark text-white shadow-lg'
                                    : 'bg-white text-dark/40 hover:text-dark hover:bg-white/80 border border-dark/5'
                                    }`}
                            >
                                {page.label}
                            </button>
                        ))}
                    </div>

                    {/* Success Toast */}
                    {isSuccess && (
                        <div className="p-5 bg-emerald-50 border border-emerald-100/50 rounded-[24px] flex items-center gap-4 text-emerald-800 animate-in fade-in slide-in-from-top-2 duration-300">
                            <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                            <p className="font-bold uppercase text-xs tracking-widest">Pengaturan hero berhasil diperbarui.</p>
                        </div>
                    )}

                    {/* Hero BG Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border border-dark/5 p-10 md:p-12 shadow-sm hover:shadow-md transition-all duration-500 space-y-10">
                        <div className="flex items-center gap-5">
                            <div className="w-2.5 h-10 bg-primary rounded-full" />
                            <div>
                                <h2 className="text-base font-black text-dark uppercase tracking-tight">
                                    {PAGES.find(p => p.id === activePageTab)?.label} — Hero Background
                                </h2>
                                <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">Gambar latar utama halaman</p>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="relative aspect-video rounded-[32px] overflow-hidden bg-light border border-dark/5 flex items-center justify-center group shadow-inner">
                            {getPreview(activePageTab) ? (
                                <img
                                    src={getPreview(activePageTab)}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Preview"
                                />
                            ) : (
                                <div className="text-center opacity-20">
                                    <PhotoIcon className="w-12 h-12 mx-auto mb-3" />
                                    <p className="text-xs font-black uppercase tracking-widest">Belum Ada Gambar</p>
                                </div>
                            )}
                        </div>

                        {/* Upload */}
                        <div className="p-8 bg-light rounded-3xl border border-dark/5">
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <div className="grow w-full">
                                    <p className="text-[11px] font-bold text-dark/40 uppercase tracking-widest mb-1.5">Rekomendasi Ukuran</p>
                                    <p className="text-[10px] text-dark/20 font-bold uppercase tracking-widest leading-relaxed">
                                        1920x1080px (16:9). Maks 2MB.
                                    </p>
                                </div>
                                <div className="shrink-0 w-full sm:w-auto">
                                    <input type="file" id="hero-image" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    <label
                                        htmlFor="hero-image"
                                        className="block w-full px-10 py-4 bg-white border border-dark/10 rounded-2xl text-center cursor-pointer hover:border-primary transition-all shadow-sm"
                                    >
                                        <p className="text-xs font-black text-dark hover:text-primary uppercase tracking-widest">
                                            {data.image && data.key === `${activePageTab}_hero_bg` ? data.image.name : 'Ganti Gambar Hero'}
                                        </p>
                                    </label>
                                </div>
                            </div>
                            {errors.image && data.key === `${activePageTab}_hero_bg` && <p className="text-xs text-red-500 font-bold mt-4">{errors.image}</p>}
                        </div>

                        <div className="pt-6 flex justify-end border-t border-dark/5">
                            <button
                                type="submit"
                                disabled={processing || !data.image || data.key !== `${activePageTab}_hero_bg`}
                                className="px-12 py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-dark/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40"
                            >
                                {processing && data.key === `${activePageTab}_hero_bg` ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>

                    {/* Home Specific: Section About Gallery */}
                    {activePageTab === 'home' && (
                        <div className="bg-white rounded-[32px] border border-dark/5 p-8 shadow-sm space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-8 bg-secondary rounded-full" />
                                <div>
                                    <h2 className="text-sm font-black text-dark uppercase tracking-tight">Home — About Gallery</h2>
                                    <p className="text-[10px] text-dark/30 font-bold uppercase tracking-wider">1 Gambar Utama & 2 Gambar Pendukung</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Main Image Side */}
                                <div className="space-y-4">
                                    <p className="text-[9px] font-black uppercase text-dark/40 tracking-widest ml-1">Main Image (Top)</p>
                                    <div className="bg-light/50 p-5 rounded-2xl border border-dark/5 space-y-4">
                                        <div className="aspect-video max-w-xs mx-auto rounded-xl overflow-hidden bg-white shadow-sm border border-dark/5">
                                            <img
                                                src={(data.image && data.key === 'home_about_main') ? URL.createObjectURL(data.image) : (settings.home_about_main || settings.home_about_img || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400")}
                                                className="w-full h-full object-cover"
                                                alt="Main Preview"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <input type="file" id="about-main" className="hidden" accept="image/*" onChange={(e) => setData({ image: e.target.files[0], key: 'home_about_main' })} />
                                            <label htmlFor="about-main" className="grow px-4 py-3 bg-white border border-dark/10 rounded-xl text-center cursor-pointer hover:border-secondary transition-all">
                                                <p className="text-[9px] font-black text-dark uppercase tracking-widest">{data.image && data.key === 'home_about_main' ? 'Terpilih' : 'Pilih Foto'}</p>
                                            </label>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={processing || data.key !== 'home_about_main'}
                                                className="px-6 py-3 bg-secondary text-dark rounded-xl font-black text-[9px] uppercase tracking-widest disabled:opacity-30"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sub Images Side */}
                                <div className="space-y-4">
                                    <p className="text-[9px] font-black uppercase text-dark/40 tracking-widest ml-1">Supporting Images (Bottom)</p>
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="bg-light/50 p-4 rounded-2xl border border-dark/5 flex flex-col justify-between space-y-4">
                                                <div className="aspect-square w-20 mx-auto rounded-lg overflow-hidden bg-white border border-dark/5">
                                                    <img
                                                        src={(data.image && data.key === `home_about_sub_${i}`) ? URL.createObjectURL(data.image) : (settings[`home_about_sub_${i}`] || `https://images.unsplash.com/photo-155676117${i}-b413da4baf72?auto=format&fit=crop&q=80&w=200`)}
                                                        className="w-full h-full object-cover"
                                                        alt={`Sub ${i} Preview`}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <input type="file" id={`about-sub-${i}`} className="hidden" accept="image/*" onChange={(e) => setData({ image: e.target.files[0], key: `home_about_sub_${i}` })} />
                                                    <label htmlFor={`about-sub-${i}`} className="block w-full py-2 bg-white border border-dark/10 rounded-lg text-center cursor-pointer hover:bg-light transition-all">
                                                        <p className="text-[8px] font-black text-dark uppercase tracking-widest">Pilih {i}</p>
                                                    </label>
                                                    <button
                                                        onClick={handleSubmit}
                                                        disabled={processing || data.key !== `home_about_sub_${i}`}
                                                        className="w-full py-2 bg-dark text-white rounded-lg font-black text-[8px] uppercase tracking-widest disabled:opacity-30"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Home Specific: Website Stats */}
                    {activePageTab === 'home' && (
                        <div className="bg-white rounded-[40px] border border-dark/5 p-10 md:p-12 shadow-sm space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2.5 h-10 bg-emerald-500 rounded-full" />
                                <div>
                                    <h2 className="text-base font-black text-dark uppercase tracking-tight">Home — Website Stats</h2>
                                    <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">Angka pencapaian (10+, 500+, dsb.)</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { key: 'stat_years', label: 'Experience', default: '10+' },
                                    { key: 'stat_events', label: 'Events', default: '500+' },
                                    { key: 'stat_partners', label: 'Partners', default: '120+' },
                                    { key: 'stat_minds', label: 'Creative Minds', default: '50+' },
                                ].map((stat) => (
                                    <div key={stat.key} className="space-y-3">
                                        <label className="text-[10px] font-black text-dark/40 uppercase tracking-widest ml-1">{stat.label}</label>
                                        <input
                                            type="text"
                                            defaultValue={settings[stat.key] || stat.default}
                                            id={`input-${stat.key}`}
                                            className="w-full px-5 py-4 bg-light border border-dark/5 rounded-2xl font-black text-dark text-lg focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 flex justify-end border-t border-dark/5">
                                <button
                                    onClick={() => {
                                        const values = {};
                                        ['stat_years', 'stat_events', 'stat_partners', 'stat_minds'].forEach(k => {
                                            values[k] = document.getElementById(`input-${k}`).value;
                                        });
                                        router.post(route('admin.siteSettings.text.update'), {
                                            settings: values
                                        }, {
                                            onSuccess: () => {
                                                setIsSuccess(true);
                                                setTimeout(() => setIsSuccess(false), 3000);
                                            }
                                        });
                                    }}
                                    className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/10 hover:bg-emerald-700 transition-all"
                                >
                                    Update Semua Statistik
                                </button>
                            </div>
                        </div>
                    )}
                    {/* About Specific: Vision & Mission Image */}
                    {activePageTab === 'about' && (
                        <div className="bg-white rounded-[40px] border border-dark/5 p-10 md:p-12 shadow-sm space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2.5 h-10 bg-primary rounded-full" />
                                <div>
                                    <h2 className="text-base font-black text-dark uppercase tracking-tight">About — Vision & Mission Image</h2>
                                    <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">Gambar yang muncul di samping teks Visi & Misi</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-light border border-dark/5">
                                    <img
                                        src={(data.image && data.key === 'about_vision_mission_img') ? URL.createObjectURL(data.image) : (settings.about_vision_mission_img || "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200")}
                                        className="w-full h-full object-cover"
                                        alt="Vision & Mission Preview"
                                    />
                                </div>

                                <div className="space-y-6">
                                    <input
                                        type="file"
                                        id="about-vision-img"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) setData({ image: file, key: 'about_vision_mission_img' });
                                        }}
                                    />
                                    <label
                                        htmlFor="about-vision-img"
                                        className="block px-8 py-5 bg-light border-2 border-dashed border-dark/10 rounded-2xl text-center cursor-pointer hover:border-secondary transition-all"
                                    >
                                        <PhotoIcon className="w-8 h-8 mx-auto mb-2 text-dark/20" />
                                        <p className="text-[10px] font-black text-dark uppercase tracking-widest">
                                            {data.image && data.key === 'about_vision_mission_img' ? data.image.name : 'Pilih Foto Baru'}
                                        </p>
                                    </label>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={processing || !data.image || data.key !== 'about_vision_mission_img'}
                                        className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-40"
                                    >
                                        {processing && data.key === 'about_vision_mission_img' ? 'Menyimpan...' : 'Update Foto Visi & Misi'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Service Images Panel — hanya muncul di tab Services */}
                    {activePageTab === 'services' && (
                        <ServiceImagesPanel settings={settings} />
                    )}

                    {/* Portfolio Panel */}
                    {activePageTab === 'portfolio' && (
                        <PortfolioPanel
                            portfolioItems={portfolioItems}
                            portfolioCategories={portfolioCategories}
                        />
                    )}

                    {/* Partner Panel */}
                    {activePageTab === 'partners' && (
                        <PartnerPanel partners={partners} />
                    )}
                </div>
            </main>
        </div>
    );
}
