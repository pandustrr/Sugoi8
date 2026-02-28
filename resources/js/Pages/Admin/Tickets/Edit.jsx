import { useState, Fragment } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    ChevronLeftIcon,
    PhotoIcon,
    InformationCircleIcon,
    PlusIcon,
    TrashIcon,
    PencilSquareIcon,
    MagnifyingGlassPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ event }) {
    const { flash } = usePage().props;
    const [previewSrc, setPreviewSrc] = useState(null);

    // ── Main event form ────────────────────────────────────────────────────
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        title: event.title,
        slug: event.slug || '',
        description: event.description || '',
        date: event.date,
        time: event.time,
        location: event.location,
        steps: Array.isArray(event.steps) ? event.steps : [],
        divisions: Array.isArray(event.divisions) ? event.divisions : [],
        image: null,
    });

    const handleUpdateEvent = (e) => {
        e.preventDefault();
        post(route('admin.tickets.update', event.id));
    };

    // ── Category CRUD ──────────────────────────────────────────────────────
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const categoryForm = useForm({ title: '', price: '', stock: '' });
    const editCategoryForm = useForm({ title: '', price: '', stock: '' });

    const handleAddCategory = (e) => {
        e.preventDefault();
        categoryForm.post(route('admin.categories.store', event.id), {
            onSuccess: () => { setIsAddingCategory(false); categoryForm.reset(); },
        });
    };

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        editCategoryForm.patch(route('admin.categories.update', editingCategory.id), {
            onSuccess: () => { setEditingCategory(null); editCategoryForm.reset(); },
        });
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini?')) router.delete(route('admin.categories.destroy', id));
    };

    // ── Steps local CRUD (saved together with event form) ──────────────────
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [editingStepIdx, setEditingStepIdx] = useState(null);
    const [newStep, setNewStep] = useState({ title: '', date: '' });
    const [editStep, setEditStep] = useState({ title: '', date: '' });

    const addStep = () => {
        if (!newStep.title.trim()) return;
        setData('steps', [...data.steps, { ...newStep, id: Date.now() }]);
        setNewStep({ title: '', date: '' });
        setIsAddingStep(false);
    };

    const saveEditStep = (idx) => {
        const updated = data.steps.map((s, i) => i === idx ? { ...s, ...editStep } : s);
        setData('steps', updated);
        setEditingStepIdx(null);
    };

    const removeStep = (idx) => {
        setData('steps', data.steps.filter((_, i) => i !== idx));
    };

    // ── Divisions local CRUD ─────────────────────────────────────────
    const [isAddingDivision, setIsAddingDivision] = useState(false);
    const [editingDivisionIdx, setEditingDivisionIdx] = useState(null);
    const [newDivision, setNewDivision] = useState('');
    const [editDivision, setEditDivision] = useState('');

    const addDivision = () => {
        if (!newDivision.trim()) return;
        setData('divisions', [...data.divisions, newDivision]);
        setNewDivision('');
        setIsAddingDivision(false);
    };

    const saveEditDivision = (idx) => {
        if (!editDivision.trim()) return;
        const updated = data.divisions.map((c, i) => i === idx ? editDivision : c);
        setData('divisions', updated);
        setEditingDivisionIdx(null);
    };

    const removeDivision = (idx) => {
        setData('divisions', data.divisions.filter((_, i) => i !== idx));
    };

    // ─────────────────────────────────────────────────────────────────────
    return (
        <>
            <div className="min-h-screen bg-light flex">
                <Head title={`Edit ${event.title} | Sugoi 8 Admin`} />
                <SidebarAdmin activePage="tickets" />

                <main className="grow">
                    <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center gap-4">
                        <Link
                            href={route('admin.tickets.index')}
                            className="w-10 h-10 bg-light rounded-xl flex items-center justify-center text-dark/40 hover:bg-primary/10 hover:text-primary transition-all"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </Link>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight italic">Edit Data Lomba</h1>
                    </header>

                    <div className="p-8">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* ── LEFT: Event Details ── */}
                            <div className="lg:col-span-2 space-y-8">
                                {flash?.success && (
                                    <div className="p-4 bg-green-100 border border-green-200 text-green-700 rounded-2xl font-bold text-sm">
                                        {flash.success}
                                    </div>
                                )}

                                <form onSubmit={handleUpdateEvent} className="bg-white rounded-[40px] border border-dark/5 p-10 shadow-sm space-y-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <InformationCircleIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-sm font-black text-dark uppercase tracking-widest">Informasi Utama</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:col-span-2 space-y-6">
                                            {/* Title */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Judul Event / Lomba</label>
                                                <input
                                                    type="text"
                                                    value={data.title}
                                                    onChange={e => setData('title', e.target.value)}
                                                    className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all"
                                                />
                                                {errors.title && <p className="mt-2 text-xs font-bold text-red-500">{errors.title}</p>}
                                            </div>

                                            {/* Slug */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1 italic">Link Kustom (Slug)</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20 text-[10px] font-black pointer-events-none">sugoi8.id/ticket?event=</span>
                                                    <input
                                                        type="text"
                                                        value={data.slug}
                                                        onChange={e => setData('slug', e.target.value)}
                                                        className="w-full bg-light border border-dark/5 rounded-2xl py-4 pl-[135px] pr-4 text-dark font-bold focus:border-primary outline-none transition-all"
                                                        placeholder="tari-nusantara"
                                                    />
                                                </div>
                                                {errors.slug && <p className="mt-2 text-xs font-bold text-red-500">{errors.slug}</p>}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Deskripsi &amp; Info Lengkap</label>
                                            <textarea
                                                rows="4"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all resize-none"
                                            />
                                            <div className="mt-3 flex flex-wrap gap-2 px-1">
                                                {['Kategori:', 'Benefit:', 'CP:', 'Pendaftaran:', 'Grand Final:'].map(tag => (
                                                    <span key={tag} className="text-[9px] font-black bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-xl uppercase tracking-wider">{tag}</span>
                                                ))}
                                            </div>
                                            <p className="mt-2 text-[9px] font-medium text-dark/30 leading-relaxed italic px-1">
                                                * Gunakan kata kunci di atas agar tampilan publik otomatis terbagi rapi.
                                            </p>
                                        </div>

                                        {/* Date */}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Tanggal</label>
                                            <input type="date" value={data.date} onChange={e => setData('date', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all" />
                                        </div>

                                        {/* Time */}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Waktu</label>
                                            <input type="time" value={data.time} onChange={e => setData('time', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all" />
                                        </div>

                                        {/* Location */}
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Lokasi Lomba</label>
                                            <input type="text" value={data.location} onChange={e => setData('location', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-dark font-bold focus:border-primary outline-none transition-all" />
                                        </div>

                                        {/* Poster */}
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Poster Lomba</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="relative group">
                                                    <input type="file" onChange={e => setData('image', e.target.files[0])}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                                                    <div className="w-full aspect-video rounded-[32px] border-2 border-dashed border-dark/5 bg-light flex flex-col items-center justify-center gap-4 group-hover:border-primary/20 transition-all">
                                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-dark/20 group-hover:text-primary transition-colors">
                                                            <PhotoIcon className="w-6 h-6" />
                                                        </div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-dark">Ganti Poster</p>
                                                    </div>
                                                </div>

                                                {/* Preview thumbnail — klik untuk fullscreen */}
                                                <div
                                                    className="w-full aspect-video rounded-[32px] overflow-hidden bg-light border border-dark/5 relative group/thumb cursor-zoom-in"
                                                    onClick={() => {
                                                        const src = data.image
                                                            ? URL.createObjectURL(data.image)
                                                            : event.image_url
                                                                ? (event.image_url.startsWith('http') ? event.image_url : `/storage/${event.image_url}`)
                                                                : null;
                                                        if (src) setPreviewSrc(src);
                                                    }}
                                                >
                                                    {data.image ? (
                                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500" alt="" />
                                                    ) : event.image_url ? (
                                                        <img src={event.image_url.startsWith('http') ? event.image_url : `/storage/${event.image_url}`} className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-dark/10 font-black uppercase italic text-sm">Preview</div>
                                                    )}
                                                    {/* Zoom overlay */}
                                                    <div className="absolute inset-0 bg-dark/0 group-hover/thumb:bg-dark/30 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white">
                                                            <MagnifyingGlassPlusIcon className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-dark text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Detail Event'}
                                    </button>
                                </form>
                            </div>

                            {/* ── RIGHT: Categories + Steps ── */}
                            <div className="space-y-6">

                                {/* Categories Panel */}
                                <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-dark shadow-sm bg-light px-3 py-1 rounded-full">Daftar Kategori</h2>
                                        <button onClick={() => setIsAddingCategory(true)} className="text-primary hover:text-primary/70 transition-colors">
                                            <PlusIcon className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {event.tickets.map(cat => (
                                            <div key={cat.id} className="p-5 rounded-3xl bg-light/50 border border-dark/5 hover:border-primary/20 transition-all group">
                                                {editingCategory?.id === cat.id ? (
                                                    <form onSubmit={handleUpdateCategory} className="space-y-3">
                                                        <input className="w-full bg-white border border-dark/5 rounded-xl p-2.5 text-[11px] font-bold outline-none focus:border-primary"
                                                            value={editCategoryForm.data.title} onChange={e => editCategoryForm.setData('title', e.target.value)} placeholder="Nama Kategori" />
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <input type="number" className="w-full bg-white border border-dark/5 rounded-xl p-2.5 text-[11px] font-bold outline-none focus:border-primary"
                                                                value={editCategoryForm.data.price} onChange={e => editCategoryForm.setData('price', e.target.value)} placeholder="Harga" />
                                                            <input type="number" className="w-full bg-white border border-dark/5 rounded-xl p-2.5 text-[11px] font-bold outline-none focus:border-primary"
                                                                value={editCategoryForm.data.stock} onChange={e => editCategoryForm.setData('stock', e.target.value)} placeholder="Stok" />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button type="submit" className="grow bg-primary text-white py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">Simpan</button>
                                                            <button type="button" onClick={() => setEditingCategory(null)} className="px-4 bg-dark/5 text-dark/40 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">Batal</button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="text-[12px] font-black text-dark uppercase tracking-tight">{cat.title}</h4>
                                                                <p className="text-[10px] font-bold text-primary italic">Rp {new Intl.NumberFormat('id-ID').format(cat.price)}</p>
                                                            </div>
                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button onClick={() => { setEditingCategory(cat); editCategoryForm.setData({ title: cat.title, price: cat.price, stock: cat.stock }); }}
                                                                    className="p-2 text-dark/20 hover:text-primary transition-colors">
                                                                    <PencilSquareIcon className="w-4 h-4" />
                                                                </button>
                                                                <button onClick={() => handleDeleteCategory(cat.id)} className="p-2 text-dark/20 hover:text-red-500 transition-colors">
                                                                    <TrashIcon className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="grow h-1.5 bg-dark/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-primary" style={{ width: '100%' }} />
                                                            </div>
                                                            <span className="text-[9px] font-black text-dark/30 uppercase tracking-widest shrink-0">{cat.stock} Sisa</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}

                                        {isAddingCategory ? (
                                            <div className="p-5 rounded-3xl bg-primary/5 border border-dashed border-primary/30">
                                                <form onSubmit={handleAddCategory} className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Tambah Kategori Baru</h4>
                                                    <input className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary"
                                                        value={categoryForm.data.title} onChange={e => categoryForm.setData('title', e.target.value)} placeholder="Contoh: Duet / Grup" autoFocus />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input type="number" className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary"
                                                            value={categoryForm.data.price} onChange={e => categoryForm.setData('price', e.target.value)} placeholder="Harga (Rp)" />
                                                        <input type="number" className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary"
                                                            value={categoryForm.data.stock} onChange={e => categoryForm.setData('stock', e.target.value)} placeholder="Kuota" />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button type="submit" className="grow bg-primary text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Tambah</button>
                                                        <button type="button" onClick={() => setIsAddingCategory(false)} className="px-6 bg-dark text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Batal</button>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <button onClick={() => setIsAddingCategory(true)}
                                                className="w-full py-5 border-2 border-dashed border-dark/5 rounded-[32px] flex flex-col items-center justify-center gap-2 text-dark/20 hover:text-primary hover:border-primary/20 transition-all hover:bg-primary/5 group">
                                                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <PlusIcon className="w-5 h-5" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Tambah Kategori Lain</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Divisi Panel */}
                                <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-dark shadow-sm bg-light px-3 py-1 rounded-full">Divisi</h2>
                                        <button type="button" onClick={() => setIsAddingDivision(true)} className="text-primary hover:text-primary/70 transition-colors">
                                            <PlusIcon className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.divisions.map((cat, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-light/50 border border-dark/5 group">
                                                {editingDivisionIdx === i ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            className="grow bg-white border border-dark/5 rounded-xl p-2.5 text-[11px] font-bold outline-none focus:border-primary"
                                                            value={editDivision}
                                                            onChange={e => setEditDivision(e.target.value)}
                                                            autoFocus
                                                        />
                                                        <button type="button" onClick={() => saveEditDivision(i)} className="bg-primary text-white px-3 rounded-xl text-[9px] font-black uppercase tracking-widest">Simpan</button>
                                                        <button type="button" onClick={() => setEditingDivisionIdx(null)} className="bg-dark/5 text-dark/40 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest">Batal</button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>
                                                            <p className="text-[11px] font-black text-dark uppercase tracking-tight">{cat}</p>
                                                        </div>
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button type="button" onClick={() => { setEditingDivisionIdx(i); setEditDivision(cat); }}
                                                                className="p-2 text-dark/20 hover:text-primary transition-colors">
                                                                <PencilSquareIcon className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" onClick={() => removeDivision(i)} className="p-2 text-dark/20 hover:text-red-500 transition-colors">
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
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
                                                    <button type="button" onClick={addDivision} className="grow bg-primary text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Tambah</button>
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

                                {/* Steps Panel */}
                                <div className="bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-dark shadow-sm bg-light px-3 py-1 rounded-full">Tahapan Lomba</h2>
                                        <button type="button" onClick={() => setIsAddingStep(true)} className="text-primary hover:text-primary/70 transition-colors">
                                            <PlusIcon className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.steps.map((step, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-light/50 border border-dark/5 group">
                                                {editingStepIdx === i ? (
                                                    <div className="space-y-2">
                                                        <input
                                                            className="w-full bg-white border border-dark/5 rounded-xl p-2.5 text-[11px] font-bold outline-none focus:border-primary"
                                                            value={editStep.title}
                                                            onChange={e => setEditStep({ ...editStep, title: e.target.value })}
                                                            placeholder="Nama tahapan"
                                                            autoFocus
                                                        />
                                                        <input
                                                            className="w-full bg-white border border-dark/5 rounded-xl p-2.5 text-[11px] font-bold outline-none focus:border-primary"
                                                            value={editStep.date}
                                                            onChange={e => setEditStep({ ...editStep, date: e.target.value })}
                                                            placeholder="Tanggal / periode"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button type="button" onClick={() => saveEditStep(i)} className="grow bg-primary text-white py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">Simpan</button>
                                                            <button type="button" onClick={() => setEditingStepIdx(null)} className="px-4 bg-dark/5 text-dark/40 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">Batal</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0">{i + 1}</span>
                                                            <div>
                                                                <p className="text-[11px] font-black text-dark uppercase tracking-tight">{step.title}</p>
                                                                {step.date && <p className="text-[9px] font-bold text-primary">{step.date}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button type="button" onClick={() => { setEditingStepIdx(i); setEditStep({ title: step.title, date: step.date || '' }); }}
                                                                className="p-2 text-dark/20 hover:text-primary transition-colors">
                                                                <PencilSquareIcon className="w-4 h-4" />
                                                            </button>
                                                            <button type="button" onClick={() => removeStep(i)} className="p-2 text-dark/20 hover:text-red-500 transition-colors">
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {isAddingStep ? (
                                            <div className="p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/30 space-y-3">
                                                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Tambah Tahapan</p>
                                                <input
                                                    className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary"
                                                    value={newStep.title}
                                                    onChange={e => setNewStep({ ...newStep, title: e.target.value })}
                                                    placeholder="Nama tahap (Registrasi, Upload Karya, ...)"
                                                    autoFocus
                                                />
                                                <input
                                                    className="w-full bg-white border border-dark/5 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-primary"
                                                    value={newStep.date}
                                                    onChange={e => setNewStep({ ...newStep, date: e.target.value })}
                                                    placeholder="Tanggal / periode (opsional)"
                                                />
                                                <div className="flex gap-2">
                                                    <button type="button" onClick={addStep} className="grow bg-primary text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Tambah</button>
                                                    <button type="button" onClick={() => setIsAddingStep(false)} className="px-5 bg-dark text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Batal</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button type="button" onClick={() => setIsAddingStep(true)}
                                                className="w-full py-5 border-2 border-dashed border-dark/5 rounded-2xl flex items-center justify-center gap-2 text-dark/20 hover:text-primary hover:border-primary/20 transition-all hover:bg-primary/5">
                                                <PlusIcon className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Tambah Tahapan Baru</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Save steps note */}
                                    {data.steps.length > 0 && (
                                        <p className="mt-6 text-[9px] font-bold text-dark/30 italic text-center leading-relaxed">
                                            * Klik "Simpan Detail Event" di kiri untuk menyimpan perubahan tahapan.
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── Fullscreen Poster Preview ── */}
            <Transition show={!!previewSrc} as={Fragment}>
                <Dialog as="div" className="relative z-[300]" onClose={() => setPreviewSrc(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
                        leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-dark/95 backdrop-blur-xl" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex items-center justify-center p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative max-w-4xl w-full">
                                <button
                                    onClick={() => setPreviewSrc(null)}
                                    className="absolute -top-12 right-0 text-white hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Tutup</span>
                                    <XMarkIcon className="w-7 h-7" />
                                </button>
                                <img
                                    src={previewSrc}
                                    className="max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                                    alt="Preview Poster"
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
