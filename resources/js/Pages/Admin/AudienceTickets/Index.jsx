import { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    PlusIcon,
    TrashIcon,
    PencilSquareIcon,
    TicketIcon,
    CheckCircleIcon,
    Squares2X2Icon,
    ShareIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';
import MainCategoryModal from './MainCategoryModal';
import SubCategoryModal from './SubCategoryModal';

const imgSrc = (url) => url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;
const fmtPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

export default function Index({ categories = [] }) {
    const { flash } = usePage().props;
    const [isAddingMain, setIsAddingMain] = useState(false);
    const [editingMain, setEditingMain] = useState(null);
    const [isAddingSub, setIsAddingSub] = useState(false);
    const [editingSub, setEditingSub] = useState(null);

    const [mainPreviewUrl, setMainPreviewUrl] = useState(null);
    const [subPreviewUrl, setSubPreviewUrl] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const copyLink = (cat) => {
        const url = `${window.location.origin}/eventprogram/ticket/${cat.slug}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(cat.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    // ── Main Category Form ──
    const mainForm = useForm({ title: '', slug: '', description: '', image: null, is_active: 1 });

    const handleMainSubmit = (e) => {
        e.preventDefault();
        if (editingMain) {
            mainForm.post(route('admin.audience-tickets.main.update', editingMain.id), {
                onSuccess: () => { setEditingMain(null); mainForm.reset(); setMainPreviewUrl(null); },
                forceFormData: true
            });
        } else {
            mainForm.post(route('admin.audience-tickets.main.store'), {
                onSuccess: () => { setIsAddingMain(false); mainForm.reset(); setMainPreviewUrl(null); },
                forceFormData: true
            });
        }
    };

    // ── Sub Category (Ticket) Form ──
    const subForm = useForm({ main_audience_category_id: '', title: '', description: '', price: '', stock: '', image: null, is_active: 1 });

    const handleSubSubmit = (e) => {
        e.preventDefault();
        if (editingSub) {
            subForm.post(route('admin.audience-tickets.update', editingSub.id), {
                onSuccess: () => { setEditingSub(null); subForm.reset(); setSubPreviewUrl(null); },
                forceFormData: true
            });
        } else {
            subForm.post(route('admin.audience-tickets.store'), {
                onSuccess: () => { setIsAddingSub(false); subForm.reset(); setSubPreviewUrl(null); },
                forceFormData: true
            });
        }
    };

    const openEditMain = (cat) => {
        setEditingMain(cat);
        setMainPreviewUrl(imgSrc(cat.image_url));
        mainForm.setData({ title: cat.title, slug: cat.slug || '', description: cat.description || '', is_active: cat.is_active, image: null });
    };

    const openAddSub = (mainId) => {
        subForm.setData('main_audience_category_id', mainId);
        setIsAddingSub(true);
    };

    const openEditSub = (sub) => {
        setEditingSub(sub);
        setSubPreviewUrl(imgSrc(sub.image_url));
        subForm.setData({ main_audience_category_id: sub.main_audience_category_id, title: sub.title, description: sub.description || '', price: sub.price, stock: sub.stock, is_active: sub.is_active, image: null });
    };

    const handleDeleteMain = (id) => {
        if (confirm('Hapus Main Kategori ini? Seluruh Sub Tiket di dalamnya juga akan terhapus.')) {
            router.delete(route('admin.audience-tickets.main.destroy', id));
        }
    };

    const handleDeleteSub = (id) => {
        if (confirm('Hapus Sub Tiket ini?')) {
            router.delete(route('admin.audience-tickets.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-light flex">
            <Head title="Kelola Tiket Penonton | Sugoi 8 Admin" />
            <SidebarAdmin activePage="audience-tickets" />

            <main className="grow min-w-0 pt-[52px] lg:pt-0">
                {/* ── Header ── */}
                <header className="bg-white px-4 md:px-8 py-4 md:py-6 border-b border-dark/5 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-base md:text-xl font-black text-dark uppercase tracking-tight leading-none mb-1 italic">Kelola Tiket</h1>
                        <p className="text-dark/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-none">Main &amp; Sub Kategori · {categories.length} Kategori</p>
                    </div>
                    <button
                        onClick={() => { setIsAddingMain(true); mainForm.reset(); setMainPreviewUrl(null); }}
                        className="bg-primary text-white px-4 md:px-6 py-2.5 md:py-3.5 rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20 font-black text-[9px] md:text-[10px] uppercase tracking-widest"
                    >
                        <Squares2X2Icon className="w-4 h-4" />
                        <span>Main Kategori Baru</span>
                    </button>
                </header>

                {/* ── Content ── */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
                    {flash?.success && (
                        <div className="p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                            <CheckCircleIcon className="w-5 h-5" />
                            {flash.success}
                        </div>
                    )}

                    {categories.length === 0 ? (
                        <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-dark/5">
                            <Squares2X2Icon className="w-16 h-16 text-dark/5 mx-auto mb-4" />
                            <p className="text-dark/20 font-black uppercase tracking-widest text-[10px]">Belum ada kategori tiket.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {categories.map((cat) => (
                                <div key={cat.id} className="bg-white rounded-[40px] border border-dark/5 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-dark/5 transition-shadow duration-300">

                                    {/* ── Main Category Header ── */}
                                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start border-b border-dark/5 bg-light/20">
                                        {/* Thumbnail */}
                                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-[20px] overflow-hidden bg-light shrink-0 border border-dark/5">
                                            {cat.image_url ? (
                                                <img src={imgSrc(cat.image_url)} className="w-full h-full object-cover" alt={cat.title} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-10">
                                                    <Squares2X2Icon className="w-10 h-10" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="grow min-w-0">
                                            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                                <h3 className="text-xl md:text-2xl font-black text-dark uppercase tracking-tighter leading-tight">{cat.title}</h3>
                                                {!cat.is_active && (
                                                    <span className="px-2.5 py-0.5 bg-red-100 text-red-600 text-[8px] font-black uppercase tracking-widest rounded-lg">Non-Aktif</span>
                                                )}
                                            </div>
                                            <p className="text-xs font-bold text-dark/30 font-mono mb-1">/eventprogram/ticket/{cat.slug}</p>
                                            <p className="text-[11px] font-medium text-dark/40 line-clamp-2 leading-relaxed">
                                                {cat.description || 'Tidak ada deskripsi.'}
                                            </p>
                                        </div>

                                        {/* Action buttons — icon only */}
                                        <div className="flex items-center gap-2 shrink-0 self-start mt-1">
                                            {/* Salin Link */}
                                            <button
                                                onClick={() => copyLink(cat)}
                                                className={`p-2.5 rounded-2xl flex items-center transition-all border shadow-sm ${copiedId === cat.id ? 'bg-green-500 text-white border-green-500 shadow-green-500/20' : 'bg-light text-dark/60 border-dark/5 hover:bg-dark hover:text-white'}`}
                                                title="Salin Link Publik"
                                            >
                                                {copiedId === cat.id ? <CheckIcon className="w-4 h-4" /> : <ShareIcon className="w-4 h-4" />}
                                            </button>
                                            {/* Edit */}
                                            <button
                                                onClick={() => openEditMain(cat)}
                                                className="p-2.5 bg-light text-dark/60 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all border border-dark/5 shadow-sm"
                                                title="Edit Kategori"
                                            >
                                                <PencilSquareIcon className="w-4 h-4" />
                                            </button>
                                            {/* Hapus */}
                                            <button
                                                onClick={() => handleDeleteMain(cat.id)}
                                                className="p-2.5 bg-light text-dark/60 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-dark/5 shadow-sm"
                                                title="Hapus Kategori"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                            {/* Tambah Sub */}
                                            <button
                                                onClick={() => openAddSub(cat.id)}
                                                className="p-2.5 bg-primary text-white rounded-2xl hover:scale-105 transition-all shadow-md shadow-primary/20"
                                                title="Tambah Sub Tiket"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* ── Sub Tickets Table ── */}
                                    <div className="px-5 md:px-8 py-5 md:py-6">
                                        <div className="bg-light/50 rounded-[28px] p-2 border border-dark/5">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-left border-b border-dark/5">
                                                        <th className="px-4 py-3.5 text-[9px] font-black uppercase tracking-widest text-dark/30">Sub Tiket</th>
                                                        <th className="px-4 py-3.5 text-[9px] font-black uppercase tracking-widest text-dark/30">Harga</th>
                                                        <th className="px-4 py-3.5 text-[9px] font-black uppercase tracking-widest text-dark/30 text-center">Stok</th>
                                                        <th className="px-4 py-3.5 text-[9px] font-black uppercase tracking-widest text-dark/30 text-center">Status</th>
                                                        <th className="px-4 py-3.5 text-[9px] font-black uppercase tracking-widest text-dark/30 text-right">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-dark/5">
                                                    {(cat.audience_tickets || []).length === 0 ? (
                                                        <tr>
                                                            <td colSpan={5} className="px-4 py-8 text-center">
                                                                <p className="text-dark/20 font-black uppercase tracking-widest text-[9px]">
                                                                    Belum ada sub tiket — klik <span className="text-primary">+</span> untuk menambahkan
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        (cat.audience_tickets || []).map((sub) => (
                                                            <tr key={sub.id} className="hover:bg-white/60 transition-colors">
                                                                <td className="px-4 py-3.5">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-light border border-dark/5 shrink-0">
                                                                            {sub.image_url ? (
                                                                                <img src={imgSrc(sub.image_url)} className="w-full h-full object-cover" alt={sub.title} />
                                                                            ) : (
                                                                                <div className="w-full h-full flex items-center justify-center opacity-10">
                                                                                    <TicketIcon className="w-4 h-4" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <span className="text-[11px] font-black text-dark uppercase tracking-tight">{sub.title}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3.5">
                                                                    <span className="text-[11px] font-bold text-primary italic">{fmtPrice(sub.price)}</span>
                                                                </td>
                                                                <td className="px-4 py-3.5 text-center">
                                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${sub.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                                                                        {sub.stock} Sisa
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3.5 text-center">
                                                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${sub.is_active ? 'bg-green-100 text-green-600' : 'bg-dark/5 text-dark/30'}`}>
                                                                        {sub.is_active ? 'Aktif' : 'Non-Aktif'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3.5 text-right">
                                                                    <div className="flex items-center justify-end gap-1.5">
                                                                        <button
                                                                            onClick={() => openEditSub(sub)}
                                                                            className="p-2 bg-white text-dark/40 rounded-xl hover:bg-primary/10 hover:text-primary transition-all border border-dark/5 shadow-sm"
                                                                            title="Edit"
                                                                        >
                                                                            <PencilSquareIcon className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteSub(sub.id)}
                                                                            className="p-2 bg-white text-dark/40 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-dark/5 shadow-sm"
                                                                            title="Hapus"
                                                                        >
                                                                            <TrashIcon className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* ── Modals ── */}
            <MainCategoryModal
                show={isAddingMain || !!editingMain}
                onClose={() => { setIsAddingMain(false); setEditingMain(null); mainForm.reset(); setMainPreviewUrl(null); }}
                onSubmit={handleMainSubmit}
                form={mainForm}
                previewUrl={mainPreviewUrl}
                onImageChange={(file) => { mainForm.setData('image', file); setMainPreviewUrl(URL.createObjectURL(file)); }}
                isEdit={!!editingMain}
            />
            <SubCategoryModal
                show={isAddingSub || !!editingSub}
                onClose={() => { setIsAddingSub(false); setEditingSub(null); subForm.reset(); setSubPreviewUrl(null); }}
                onSubmit={handleSubSubmit}
                form={subForm}
                previewUrl={subPreviewUrl}
                onImageChange={(file) => { subForm.setData('image', file); setSubPreviewUrl(URL.createObjectURL(file)); }}
                isEdit={!!editingSub}
                categories={categories}
            />
        </div>
    );
}
