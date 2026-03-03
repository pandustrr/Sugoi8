import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
    PhotoIcon,
    CheckCircleIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

// ─── Form Modal Tambah / Edit ───────────────────────────────────────────────

const EMPTY = {
    title: '', category: '', description: '',
    client: '', location: '', year: new Date().getFullYear(),
    featured: false, sort_order: 0, image: null,
};

function PortfolioFormModal({ item, onClose, categories }) {
    const isEdit = !!item?.id;
    const [preview, setPreview] = useState(item?.image || null);

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? { ...item, image: null } : { ...EMPTY }
    );

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (f) { setData('image', f); setPreview(URL.createObjectURL(f)); }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = isEdit ? 'admin.portfolio.update' : 'admin.portfolio.store';
        const params = isEdit ? { portfolioItem: item.id } : {};
        post(route(name, params), {
            onSuccess: () => { reset(); onClose(); },
            forceFormData: true,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-7 border-b border-dark/5 sticky top-0 bg-white rounded-t-[40px] z-10">
                    <div>
                        <h3 className="text-sm font-black text-dark uppercase tracking-tight">
                            {isEdit ? 'Edit Portofolio' : 'Tambah Portofolio'}
                        </h3>
                        <p className="text-[10px] text-dark/30 font-bold uppercase tracking-wider mt-0.5">
                            {isEdit ? item.title : 'Item baru di halaman portofolio'}
                        </p>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 rounded-xl bg-light flex items-center justify-center hover:bg-dark/5 transition-all">
                        <XMarkIcon className="w-4 h-4 text-dark/40" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-7 space-y-4">
                    {/* Image */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">Foto</label>
                        <div className="relative aspect-video rounded-[20px] overflow-hidden bg-light border-2 border-dashed border-dark/10 hover:border-primary transition-all cursor-pointer">
                            {preview
                                ? <img src={preview} className="w-full h-full object-cover" alt="preview" />
                                : <div className="flex flex-col items-center justify-center h-full text-dark/20">
                                    <PhotoIcon className="w-8 h-8 mb-2" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Pilih Gambar</p>
                                </div>
                            }
                            <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                        {errors.image && <p className="text-[9px] text-red-500 font-bold mt-1">{errors.image}</p>}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Judul *</label>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)}
                            className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                            placeholder="Nama proyek / event" />
                        {errors.title && <p className="text-[9px] text-red-500 font-bold mt-1">{errors.title}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Kategori *</label>
                        <input type="text" value={data.category} onChange={e => setData('category', e.target.value)}
                            list="porto-cats"
                            className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                            placeholder="EO, MICE, Show Management..." />
                        <datalist id="porto-cats">
                            {['EO', 'MICE', 'Show Management', 'Production', 'Digital Solutions', ...(categories || [])].map((c, i) => <option key={i} value={c} />)}
                        </datalist>
                        {errors.category && <p className="text-[9px] text-red-500 font-bold mt-1">{errors.category}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Deskripsi</label>
                        <textarea value={data.description || ''} onChange={e => setData('description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-medium text-dark focus:outline-none focus:border-primary transition-all resize-none"
                            placeholder="Ceritakan tentang proyek ini (tampil di modal)" />
                    </div>

                    {/* Client + Location */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Klien</label>
                            <input type="text" value={data.client || ''} onChange={e => setData('client', e.target.value)}
                                className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                                placeholder="Nama klien" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Lokasi</label>
                            <input type="text" value={data.location || ''} onChange={e => setData('location', e.target.value)}
                                className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                                placeholder="Kota / Online" />
                        </div>
                    </div>

                    {/* Year + Sort */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Tahun</label>
                            <input type="number" value={data.year || ''} onChange={e => setData('year', e.target.value)}
                                min="2000" max="2099"
                                className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                                placeholder="2024" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Urutan</label>
                            <input type="number" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                                placeholder="0" />
                        </div>
                    </div>

                    {/* Featured toggle */}
                    <label className="flex items-center gap-4 p-4 bg-light rounded-2xl cursor-pointer hover:bg-amber-50/50 transition-all">
                        <div className={`w-10 h-5 rounded-full transition-all relative ${data.featured ? 'bg-amber-400' : 'bg-dark/10'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${data.featured ? 'left-5.5' : 'left-0.5'}`} />
                        </div>
                        <input type="checkbox" className="hidden" checked={data.featured} onChange={e => setData('featured', e.target.checked)} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-dark">Featured</p>
                            <p className="text-[9px] text-dark/30 font-bold">Ditandai bintang di halaman portofolio</p>
                        </div>
                        {data.featured && <StarSolid className="w-4 h-4 text-amber-400 ml-auto" />}
                    </label>

                    {/* Actions */}
                    <div className="flex gap-3 pt-3 border-t border-dark/5">
                        <button type="button" onClick={onClose}
                            className="flex-1 py-3 bg-light text-dark/50 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-dark/5 transition-all">
                            Batal
                        </button>
                        <button type="submit" disabled={processing}
                            className="flex-1 py-3 bg-dark text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all disabled:opacity-40">
                            {processing ? 'Menyimpan...' : (isEdit ? 'Simpan' : 'Tambah')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Kartu Item Portofolio ───────────────────────────────────────────────────

function PortfolioCard({ item, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-[28px] border border-dark/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-light">
                {item.image
                    ? <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                    : <div className="flex items-center justify-center h-full"><PhotoIcon className="w-8 h-8 text-dark/10" /></div>
                }
                <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="bg-dark/70 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {item.category}
                    </span>
                    {item.featured && (
                        <span className="bg-amber-400 text-dark text-[8px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                            <StarSolid className="w-2.5 h-2.5" />
                        </span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
                <h3 className="font-black text-dark text-xs leading-tight line-clamp-1">{item.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                    {item.client && <span className="text-[9px] text-dark/30 font-bold">{item.client}</span>}
                    {item.location && <><span className="text-dark/20">·</span><span className="text-[9px] text-dark/30 font-bold">{item.location}</span></>}
                    {item.year && <><span className="text-dark/20">·</span><span className="text-[9px] text-dark/30 font-bold">{item.year}</span></>}
                </div>
                {item.description && (
                    <p className="text-[9px] text-dark/30 font-medium leading-relaxed line-clamp-2">{item.description}</p>
                )}
                <div className="flex gap-2 pt-1">
                    <button onClick={() => onEdit(item)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-light text-dark/40 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all">
                        <PencilSquareIcon className="w-3 h-3" /> Edit
                    </button>
                    <button onClick={() => onDelete(item)}
                        className="px-3 py-2 bg-light text-dark/30 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">
                        <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Panel Utama (di-export untuk dipakai di PageSettings) ───────────────────

export default function PortfolioPanel({ portfolioItems = [], portfolioCategories = [] }) {
    const [modal, setModal] = useState(null); // null | 'add' | item
    const [flash, setFlash] = useState('');

    const handleDelete = (item) => {
        if (!confirm(`Hapus "${item.title}"?`)) return;
        router.delete(route('admin.portfolio.destroy', { portfolioItem: item.id }), {
            onSuccess: () => { setFlash('Berhasil dihapus.'); setTimeout(() => setFlash(''), 3000); },
        });
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-10 bg-secondary rounded-full" />
                    <div>
                        <h2 className="text-base font-black text-dark uppercase tracking-tight">Item Portofolio</h2>
                        <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-0.5">
                            {portfolioItems.length} item · kelola karya yang tampil di halaman Portofolio
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setModal('add')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-dark text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-dark/10"
                >
                    <PlusIcon className="w-3.5 h-3.5" /> Tambah
                </button>
            </div>

            {/* Flash */}
            {flash && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-[20px] flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    <p className="text-emerald-700 font-bold text-[10px] uppercase tracking-widest">{flash}</p>
                </div>
            )}

            {/* Grid atau Empty */}
            {portfolioItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-[32px] border border-dark/5">
                    <p className="text-4xl mb-3">🎭</p>
                    <p className="text-dark/30 font-black uppercase tracking-widest text-xs mb-4">Belum ada portofolio</p>
                    <button onClick={() => setModal('add')}
                        className="px-6 py-2.5 bg-dark text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all">
                        Tambah Sekarang
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {portfolioItems.map((item) => (
                        <PortfolioCard
                            key={item.id}
                            item={item}
                            onEdit={(i) => setModal(i)}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {modal && (
                <PortfolioFormModal
                    item={modal === 'add' ? null : modal}
                    onClose={() => setModal(null)}
                    categories={portfolioCategories}
                />
            )}
        </div>
    );
}
