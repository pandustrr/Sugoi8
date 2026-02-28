import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    ChevronLeftIcon,
    PhotoIcon,
    InformationCircleIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: null,
        tickets: [],
        steps: [],
        divisions: [],
    });

    // Local state for Divisi
    const [isAddingDivision, setIsAddingDivision] = useState(false);
    const [newDivision, setNewDivision] = useState('');

    const handleAddDivision = () => {
        if (!newDivision.trim()) return;
        setData('divisions', [...(data.divisions || []), newDivision]);
        setNewDivision('');
        setIsAddingDivision(false);
    };

    const removeDivision = (idx) => {
        setData('divisions', (data.divisions || []).filter((_, i) => i !== idx));
    };

    // Local state for adding a category
    const [isAddingCategory, setIsAddingCategory] = useState(true);
    const [newCat, setNewCat] = useState({ title: '', price: '', stock: '' });

    // Local state for adding a step
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStep, setNewStep] = useState({ title: '', date: '' });

    const handleAddCategoryLocal = () => {
        if (!newCat.title || !newCat.price || !newCat.stock) {
            alert('Mohon isi semua data kategori');
            return;
        }

        const updatedTickets = [...data.tickets, { ...newCat, id: Date.now() }];
        setData('tickets', updatedTickets);
        setNewCat({ title: '', price: '', stock: '' });
        setIsAddingCategory(false);
    };

    const removeCategoryLocal = (tempId) => {
        setData('tickets', data.tickets.filter(t => t.id !== tempId));
    };

    const handleAddStep = () => {
        if (!newStep.title) return;
        setData('steps', [...(data.steps || []), { ...newStep, id: Date.now() }]);
        setNewStep({ title: '', date: '' });
        setIsAddingStep(false);
    };

    const removeStep = (id) => {
        setData('steps', (data.steps || []).filter(s => s.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.tickets.length === 0) {
            alert('Mohon tambahkan setidaknya satu kategori lomba');
            return;
        }
        post(route('admin.tickets.store'));
    };

    return (
        <div className="min-h-screen bg-light flex">
            <Head title="Tambah Lomba Baru | Sugoi 8 Admin" />
            <SidebarAdmin activePage="tickets" />

            <main className="grow">
                <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.tickets.index')}
                            className="w-10 h-10 bg-light rounded-xl flex items-center justify-center text-dark/40 hover:bg-primary/10 hover:text-primary transition-all underline-none"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </Link>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight italic">Tambah Data Lomba</h1>
                    </div>
                </header>

                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-[40px] border border-dark/5 p-10 shadow-sm space-y-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <InformationCircleIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-sm font-black text-dark uppercase tracking-widest">Informasi Utama</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:col-span-2 space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Judul Event / Lomba</label>
                                                <input
                                                    type="text"
                                                    value={data.title}
                                                    onChange={e => setData('title', e.target.value)}
                                                    className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all"
                                                    placeholder="Contoh: Lomba Karya Tari Nusantara 2026"
                                                />
                                                {errors.title && <p className="mt-2 text-xs font-bold text-red-500">{errors.title}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1 italic">Link Kustom (Slug)</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20 text-[10px] font-black pointer-events-none">sugoi8.id/ticket?event=</span>
                                                    <input
                                                        type="text"
                                                        value={data.slug}
                                                        onChange={e => setData('slug', e.target.value)}
                                                        className="w-full bg-light border border-dark/5 rounded-2xl py-4 pl-[135px] pr-4 text-dark font-bold focus:border-primary outline-none transition-all"
                                                        placeholder="tari-nuansa"
                                                    />
                                                </div>
                                                {errors.slug && <p className="mt-2 text-xs font-bold text-red-500">{errors.slug}</p>}
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Deskripsi & Info Lengkap</label>
                                            <textarea
                                                rows="4"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all resize-none"
                                                placeholder="Contoh: Dalam rangka Hari Pendidikan Nasional..."
                                            />
                                            <div className="mt-4 flex flex-wrap gap-2 px-1">
                                                {['Kategori:', 'Benefit:', 'CP:', 'Pendaftaran:', 'Grand Final:'].map(tag => (
                                                    <span key={tag} className="text-[9px] font-black bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="mt-3 text-[9px] font-medium text-dark/30 leading-relaxed italic px-1">
                                                * Gunakan kata kunci di atas dalam deskripsi agar tampilan di publik otomatis terbagi menjadi bagian yang rapi dan profesional.
                                            </p>
                                            {errors.description && <p className="mt-2 text-xs font-bold text-red-500">{errors.description}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Tanggal</label>
                                            <input
                                                type="date"
                                                value={data.date}
                                                onChange={e => setData('date', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all"
                                            />
                                            {errors.date && <p className="mt-2 text-xs font-bold text-red-500">{errors.date}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Waktu</label>
                                            <input
                                                type="time"
                                                value={data.time}
                                                onChange={e => setData('time', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all"
                                            />
                                            {errors.time && <p className="mt-2 text-xs font-bold text-red-500">{errors.time}</p>}
                                        </div>



                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Lokasi Lomba</label>
                                            <input
                                                type="text"
                                                value={data.location}
                                                onChange={e => setData('location', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all"
                                                placeholder="Contoh: Gedung Seni Budaya / Online System"
                                            />
                                            {errors.location && <p className="mt-2 text-xs font-bold text-red-500">{errors.location}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Poster Lomba (Hanya 1 Gambar)</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="relative group">
                                                    <input
                                                        type="file"
                                                        onChange={e => setData('image', e.target.files[0])}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        accept="image/*"
                                                    />
                                                    <div className="w-full aspect-video rounded-[32px] border-2 border-dashed border-dark/5 bg-light flex flex-col items-center justify-center gap-4 group-hover:border-primary/20 transition-all">
                                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-dark/20 group-hover:text-primary transition-colors">
                                                            <PhotoIcon className="w-6 h-6" />
                                                        </div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-dark">Pilih Poster</p>
                                                    </div>
                                                </div>

                                                <div className="w-full aspect-video rounded-[32px] overflow-hidden bg-light border border-dark/5">
                                                    {data.image ? (
                                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-dark/10 italic">Preview Poster</div>
                                                    )}
                                                </div>
                                            </div>
                                            {errors.image && <p className="mt-2 text-xs font-bold text-red-500">{errors.image}</p>}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-dark text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all disabled:opacity-50"
                                    >
                                        {processing ? 'Menerbitkan...' : 'Terbitkan Lomba & Seluruh Kategori'}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">

                                {/* Divisi Panel */}
                                <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-dark shadow-sm bg-light px-3 py-1 rounded-full">Divisi</h2>
                                        <button type="button" onClick={() => setIsAddingDivision(true)} className="text-primary hover:text-primary/70 transition-colors">
                                            <PlusIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(data.divisions || []).map((cat, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-light/50 border border-dark/5 group flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>
                                                    <p className="text-[11px] font-black text-dark uppercase tracking-tight">{cat}</p>
                                                </div>
                                                <button type="button" onClick={() => removeDivision(i)} className="p-2 text-dark/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {isAddingDivision ? (
                                            <div className="p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/30 space-y-3">
                                                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Tambah Divisi</p>
                                                <input
                                                    className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary"
                                                    value={newDivision}
                                                    onChange={e => setNewDivision(e.target.value)}
                                                    placeholder="Contoh: SMA Sederajat"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button type="button" onClick={handleAddDivision} className="grow bg-primary text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Tambah</button>
                                                    <button type="button" onClick={() => setIsAddingDivision(false)} className="px-5 bg-dark text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Batal</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button type="button" onClick={() => setIsAddingDivision(true)}
                                                className="w-full py-5 border-2 border-dashed border-dark/5 rounded-2xl flex items-center justify-center gap-2 text-dark/20 hover:text-primary hover:border-primary/20 transition-all hover:bg-primary/5">
                                                <PlusIcon className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Tambah Divisi</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Categories Panel */}
                                <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-dark shadow-sm bg-light px-3 py-1 rounded-full">Daftar Kategori</h2>
                                        <button type="button" onClick={() => setIsAddingCategory(true)} className="text-primary hover:text-primary/70 transition-colors">
                                            <PlusIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {data.tickets.map((cat) => (
                                            <div key={cat.id} className="p-5 rounded-3xl bg-light/50 border border-dark/5 hover:border-primary/20 transition-all group relative">
                                                <button type="button" onClick={() => removeCategoryLocal(cat.id)} className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="text-[12px] font-black text-dark uppercase tracking-tight">{cat.title}</h4>
                                                        <p className="text-[10px] font-bold text-primary italic">Rp {new Intl.NumberFormat('id-ID').format(cat.price)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="grow h-1 bg-dark/5 rounded-full" />
                                                    <span className="text-[9px] font-black text-dark/30 uppercase tracking-widest">{cat.stock} Kuota</span>
                                                </div>
                                            </div>
                                        ))}
                                        {isAddingCategory ? (
                                            <div className="p-5 rounded-3xl bg-primary/5 border border-dashed border-primary/30 space-y-4">
                                                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Tambah Kategori Baru</h4>
                                                <div>
                                                    <label className="text-[8px] font-bold uppercase text-dark/30 mb-2 block">Nama Kategori</label>
                                                    <input className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary" value={newCat.title} onChange={e => setNewCat({ ...newCat, title: e.target.value })} placeholder="Contoh: Duet / Grup" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[8px] font-bold uppercase text-dark/30 mb-2 block">Harga</label>
                                                        <input type="number" className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary" value={newCat.price} onChange={e => setNewCat({ ...newCat, price: e.target.value })} placeholder="Rp" />
                                                    </div>
                                                    <div>
                                                        <label className="text-[8px] font-bold uppercase text-dark/30 mb-2 block">Kuota</label>
                                                        <input type="number" className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary" value={newCat.stock} onChange={e => setNewCat({ ...newCat, stock: e.target.value })} placeholder="Jml" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button type="button" onClick={handleAddCategoryLocal} className="grow bg-primary text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Tambah</button>
                                                    {data.tickets.length > 0 && (
                                                        <button type="button" onClick={() => setIsAddingCategory(false)} className="px-6 bg-dark text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Batal</button>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <button type="button" onClick={() => setIsAddingCategory(true)} className="w-full py-5 border-2 border-dashed border-dark/5 rounded-[32px] flex flex-col items-center justify-center gap-2 text-dark/20 hover:text-primary hover:border-primary/20 transition-all hover:bg-primary/5 group">
                                                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <PlusIcon className="w-5 h-5" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Tambah Kategori Lain</span>
                                            </button>
                                        )}
                                        {errors.tickets && <p className="text-xs font-bold text-red-500 text-center">{errors.tickets}</p>}
                                    </div>
                                </div>

                                {/* Steps / Tahapan Panel */}
                                <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-dark shadow-sm bg-light px-3 py-1 rounded-full">Tahapan Lomba</h2>
                                        <button type="button" onClick={() => setIsAddingStep(true)} className="text-primary hover:text-primary/70 transition-colors">
                                            <PlusIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(data.steps || []).map((step, i) => (
                                            <div key={step.id} className="p-4 rounded-2xl bg-light/50 border border-dark/5 flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0">{i + 1}</span>
                                                    <div>
                                                        <p className="text-[11px] font-black text-dark uppercase tracking-tight">{step.title}</p>
                                                        {step.date && <p className="text-[9px] font-bold text-primary">{step.date}</p>}
                                                    </div>
                                                </div>
                                                <button type="button" onClick={() => removeStep(step.id)} className="text-dark/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {isAddingStep ? (
                                            <div className="p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/30 space-y-3">
                                                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Tambah Tahapan</p>
                                                <input className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary" value={newStep.title} onChange={e => setNewStep({ ...newStep, title: e.target.value })} placeholder="Nama tahap (Registrasi, Upload Karya, ...)" />
                                                <input className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary" value={newStep.date} onChange={e => setNewStep({ ...newStep, date: e.target.value })} placeholder="Tanggal / periode (opsional)" />
                                                <div className="flex gap-2">
                                                    <button type="button" onClick={handleAddStep} className="grow bg-primary text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Tambah</button>
                                                    <button type="button" onClick={() => setIsAddingStep(false)} className="px-5 bg-dark text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Batal</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button type="button" onClick={() => setIsAddingStep(true)} className="w-full py-5 border-2 border-dashed border-dark/5 rounded-2xl flex items-center justify-center gap-2 text-dark/20 hover:text-primary hover:border-primary/20 transition-all hover:bg-primary/5">
                                                <PlusIcon className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Tambah Tahapan Baru</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
