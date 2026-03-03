import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
    PhotoIcon,
    CheckCircleIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';

// ─── Form Modal Tambah / Edit ────────────────────────────────────────────────

const EMPTY = { name: '', industry: '', website: '', sort_order: 0, logo: null };

function PartnerFormModal({ item, onClose }) {
    const isEdit = !!item?.id;
    const [preview, setPreview] = useState(item?.logo || null);

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? { ...item, logo: null } : { ...EMPTY }
    );

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (f) { setData('logo', f); setPreview(URL.createObjectURL(f)); }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = isEdit ? 'admin.partners.update' : 'admin.partners.store';
        const params = isEdit ? { partner: item.id } : {};
        post(route(name, params), {
            onSuccess: () => { reset(); onClose(); },
            forceFormData: true,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-7 border-b border-dark/5 sticky top-0 bg-white rounded-t-[40px] z-10">
                    <div>
                        <h3 className="text-sm font-black text-dark uppercase tracking-tight">
                            {isEdit ? 'Edit Partner' : 'Tambah Partner'}
                        </h3>
                        <p className="text-[10px] text-dark/30 font-bold uppercase tracking-wider mt-0.5">
                            {isEdit ? item.name : 'Partner baru di halaman Partners'}
                        </p>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 rounded-xl bg-light flex items-center justify-center hover:bg-dark/5 transition-all">
                        <XMarkIcon className="w-4 h-4 text-dark/40" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-7 space-y-4">
                    {/* Logo */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">Logo Partner</label>
                        <div className="relative rounded-[20px] overflow-hidden bg-white border-2 border-dashed border-dark/10 hover:border-primary transition-all cursor-pointer flex items-center justify-center shadow-sm" style={{ minHeight: '140px' }}>
                            {preview ? (
                                <img src={preview} className="max-h-28 max-w-full object-contain p-4" alt="preview" />
                            ) : (
                                <div className="flex flex-col items-center text-dark/20 py-6">
                                    <PhotoIcon className="w-8 h-8 mb-2" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Upload Logo</p>
                                    <p className="text-[9px] text-dark/20 mt-1">PNG · JPG · WEBP diterima</p>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                        {errors.logo && <p className="text-[9px] text-red-500 font-bold mt-1">{errors.logo}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Nama Partner *</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                            className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                            placeholder="Nama perusahaan / brand" />
                        {errors.name && <p className="text-[9px] text-red-500 font-bold mt-1">{errors.name}</p>}
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Industri</label>
                        <input type="text" value={data.industry || ''} onChange={e => setData('industry', e.target.value)}
                            className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                            placeholder="Technology, Entertainment, Finance..." />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Website</label>
                        <div className="relative">
                            <GlobeAltIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/20" />
                            <input type="url" value={data.website || ''} onChange={e => setData('website', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                                placeholder="https://example.com" />
                        </div>
                        {errors.website && <p className="text-[9px] text-red-500 font-bold mt-1">{errors.website}</p>}
                    </div>

                    {/* Sort Order */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1.5">Urutan Tampil</label>
                        <input type="number" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 bg-light border border-dark/5 rounded-xl text-sm font-bold text-dark focus:outline-none focus:border-primary transition-all"
                            placeholder="0" />
                    </div>

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

// ─── Kartu Partner ───────────────────────────────────────────────────────────

function PartnerCard({ partner, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-[24px] border border-dark/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Logo Area — white bg, object-contain */}
            <div className="bg-light/50 p-6 flex items-center justify-center" style={{ minHeight: '120px' }}>
                <div className="w-full flex items-center justify-center" style={{ height: '80px' }}>
                    {partner.logo ? (
                        <img
                            src={partner.logo}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all duration-500"
                            alt={partner.name}
                        />
                    ) : (
                        <div className="flex flex-col items-center text-dark/10 group-hover:text-dark/20 transition-colors">
                            <PhotoIcon className="w-7 h-7 mb-1" />
                            <span className="text-[8px] font-black uppercase tracking-widest">No Logo</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-1 border-t border-dark/5">
                <h3 className="font-black text-dark text-xs line-clamp-1">{partner.name}</h3>
                {partner.industry && (
                    <span className="inline-block text-[8px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                        {partner.industry}
                    </span>
                )}
                {partner.website && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[9px] text-dark/30 font-bold hover:text-primary transition-colors truncate"
                        onClick={e => e.stopPropagation()}>
                        <GlobeAltIcon className="w-3 h-3 shrink-0" />
                        {partner.website.replace(/^https?:\/\//, '')}
                    </a>
                )}
                <div className="flex gap-2 pt-2">
                    <button onClick={() => onEdit(partner)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-light text-dark/40 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all">
                        <PencilSquareIcon className="w-3 h-3" /> Edit
                    </button>
                    <button onClick={() => onDelete(partner)}
                        className="px-3 py-2 bg-light text-dark/30 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">
                        <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Panel Utama (di-export untuk PageSettings) ──────────────────────────────

export default function PartnerPanel({ partners = [] }) {
    const [modal, setModal] = useState(null); // null | 'add' | partner
    const [flash, setFlash] = useState('');

    const handleDelete = (partner) => {
        if (!confirm(`Hapus partner "${partner.name}"?`)) return;
        router.delete(route('admin.partners.destroy', { partner: partner.id }), {
            onSuccess: () => { setFlash('Partner berhasil dihapus.'); setTimeout(() => setFlash(''), 3000); },
        });
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-10 bg-secondary rounded-full" />
                    <div>
                        <h2 className="text-base font-black text-dark uppercase tracking-tight">Daftar Partner</h2>
                        <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-0.5">
                            {partners.length} partner · tampil di halaman Partners
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setModal('add')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-dark text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-dark/10"
                >
                    <PlusIcon className="w-3.5 h-3.5" /> Tambah Partner
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
            {partners.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-[32px] border border-dark/5">
                    <p className="text-4xl mb-3">🤝</p>
                    <p className="text-dark/30 font-black uppercase tracking-widest text-xs mb-4">Belum ada partner</p>
                    <button onClick={() => setModal('add')}
                        className="px-6 py-2.5 bg-dark text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all">
                        Tambah Sekarang
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {partners.map((partner) => (
                        <PartnerCard
                            key={partner.id}
                            partner={partner}
                            onEdit={(p) => setModal(p)}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {modal && (
                <PartnerFormModal
                    item={modal === 'add' ? null : modal}
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    );
}
