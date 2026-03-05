import { useState, Fragment } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    PlusIcon,
    TrashIcon,
    PhotoIcon,
    XMarkIcon,
    LinkIcon,
    ArrowUpTrayIcon,
    MagnifyingGlassPlusIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';

const imgSrc = (url) => url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

export default function Index({ programs }) {
    const { flash } = usePage().props;
    const [isAdding, setIsAdding] = useState(false);
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const [editingProgram, setEditingProgram] = useState(null);
    const [formPreviewUrl, setFormPreviewUrl] = useState(null);
    const [editPreviewUrl, setEditPreviewUrl] = useState(null);

    // ── Add form ──
    const addForm = useForm({ title: '', registration_link: '', image: null });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        addForm.setData('image', file);
        setFormPreviewUrl(URL.createObjectURL(file));
    };

    const handleAddClose = () => {
        setIsAdding(false);
        setFormPreviewUrl(null);
        addForm.reset();
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addForm.post(route('admin.programs.store'), { onSuccess: handleAddClose });
    };

    // ── Edit form ──
    const editForm = useForm({ title: '', registration_link: '', image: null });

    const openEdit = (program) => {
        setEditingProgram(program);
        setEditPreviewUrl(imgSrc(program.image_url));
        editForm.setData({ title: program.title, registration_link: program.registration_link, image: null });
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        editForm.setData('image', file);
        setEditPreviewUrl(URL.createObjectURL(file));
    };

    const handleEditClose = () => {
        setEditingProgram(null);
        setEditPreviewUrl(null);
        editForm.reset();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.post(route('admin.programs.update', editingProgram.id), { onSuccess: handleEditClose });
    };

    // ── Delete ──
    const handleDelete = (id) => {
        if (confirm('Hapus program ini?')) {
            router.delete(route('admin.programs.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-light flex">
            <Head title="Program Lainnya | Sugoi 8 Admin" />
            <SidebarAdmin activePage="programs" />

            <main className="grow min-w-0 pt-[52px] lg:pt-0">
                {/* ── Header ── */}
                <header className="bg-white px-4 md:px-8 py-4 md:py-6 border-b border-dark/5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-base md:text-xl font-black text-dark uppercase tracking-tight leading-none mb-1">Program Lainnya</h1>
                        <p className="text-dark/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            Total {programs.length} Program
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="shrink-0 bg-primary text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20 font-black text-[9px] md:text-[10px] uppercase tracking-widest"
                    >
                        <PlusIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Content</span>
                    </button>
                </header>

                {/* ── Grid ── */}
                <div className="p-4 md:p-8">
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-2xl font-bold text-sm">
                            {flash.success}
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {programs.map((program) => {
                            const src = imgSrc(program.image_url);
                            return (
                                <div key={program.id} className="bg-white rounded-[24px] md:rounded-[32px] border border-dark/5 overflow-hidden shadow-sm flex flex-col">
                                    {/* Poster — klik untuk preview */}
                                    <button
                                        type="button"
                                        onClick={() => src && setLightboxSrc(src)}
                                        className="aspect-4/5 relative overflow-hidden group/img block w-full"
                                        title="Klik untuk perbesar"
                                    >
                                        {src ? (
                                            <img src={src} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" alt={program.title} />
                                        ) : (
                                            <div className="w-full h-full bg-light flex items-center justify-center">
                                                <PhotoIcon className="w-10 h-10 text-dark/10" />
                                            </div>
                                        )}
                                        {src && (
                                            <div className="absolute top-2 right-2 w-8 h-8 bg-dark/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                <MagnifyingGlassPlusIcon className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </button>

                                    {/* Info */}
                                    <div className="p-4 flex flex-col grow gap-2">
                                        <h3 className="font-black text-dark uppercase text-[10px] md:text-xs italic line-clamp-2 leading-snug">{program.title}</h3>
                                        <a
                                            href={program.registration_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-[9px] font-bold text-primary hover:underline truncate"
                                        >
                                            <LinkIcon className="w-3 h-3 shrink-0" />
                                            <span className="truncate">Lihat Link</span>
                                        </a>

                                        {/* Click count indicator */}
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-dark/40 bg-dark/5 w-fit px-2 py-1 rounded-md mt-1">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                            </svg>
                                            <span>{program.clicks_count || 0} Klik</span>
                                        </div>

                                        {/* Action buttons — always visible */}
                                        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-dark/5">
                                            {/* Preview */}
                                            <button
                                                type="button"
                                                onClick={() => src && setLightboxSrc(src)}
                                                disabled={!src}
                                                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-light hover:bg-dark/5 text-dark/40 hover:text-dark transition-all text-[8px] font-black uppercase tracking-wider disabled:opacity-30"
                                            >
                                                <MagnifyingGlassPlusIcon className="w-3.5 h-3.5" />
                                                <span className="hidden sm:inline">Preview</span>
                                            </button>
                                            {/* Edit */}
                                            <button
                                                type="button"
                                                onClick={() => openEdit(program)}
                                                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-400 hover:text-blue-600 transition-all text-[8px] font-black uppercase tracking-wider"
                                            >
                                                <PencilSquareIcon className="w-3.5 h-3.5" />
                                                <span className="hidden sm:inline">Edit</span>
                                            </button>
                                            {/* Delete */}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(program.id)}
                                                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-all text-[8px] font-black uppercase tracking-wider"
                                            >
                                                <TrashIcon className="w-3.5 h-3.5" />
                                                <span className="hidden sm:inline">Hapus</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {programs.length === 0 && (
                            <div className="col-span-full py-16 md:py-24 text-center bg-white rounded-[32px] md:rounded-[40px] border-2 border-dashed border-dark/5">
                                <PhotoIcon className="w-12 h-12 md:w-16 md:h-16 text-dark/5 mx-auto mb-4" />
                                <p className="text-dark/20 font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                                    Belum ada program. Klik "Add Content" untuk mulai.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ── Lightbox ── */}
            <Transition show={!!lightboxSrc} as={Fragment}>
                <Dialog as="div" className="relative z-300" onClose={() => setLightboxSrc(null)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-dark/95 backdrop-blur-xl" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8">
                        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="relative w-full max-w-2xl">
                                <button onClick={() => setLightboxSrc(null)} className="absolute -top-12 right-0 text-white hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Tutup</span>
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                                <img src={lightboxSrc} className="max-h-[80vh] md:max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl border border-white/10" alt="Preview" />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            {/* ── Modal Add ── */}
            <ProgramFormModal
                show={isAdding}
                onClose={handleAddClose}
                onSubmit={handleAddSubmit}
                form={addForm}
                previewUrl={formPreviewUrl}
                onImageChange={handleImageChange}
                title="Add Content"
                submitLabel={addForm.processing ? 'Menyimpan...' : 'Save Content'}
                imageRequired
            />

            {/* ── Modal Edit ── */}
            <ProgramFormModal
                show={!!editingProgram}
                onClose={handleEditClose}
                onSubmit={handleEditSubmit}
                form={editForm}
                previewUrl={editPreviewUrl}
                onImageChange={handleEditImageChange}
                title="Edit Content"
                submitLabel={editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                imageRequired={false}
            />
        </div>
    );
}

// ── Shared form modal ──────────────────────────────────────────────────────────
function ProgramFormModal({ show, onClose, onSubmit, form, previewUrl, onImageChange, title, submitLabel, imageRequired }) {
    return (
        <Transition show={show} as={Fragment}>
            <Dialog as="div" className="relative z-300" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-lg bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 relative">
                                <div className="flex items-center justify-between mb-6 md:mb-8">
                                    <h2 className="text-xl md:text-2xl font-black text-dark uppercase tracking-tighter italic">{title}</h2>
                                    <button onClick={onClose} className="text-dark/20 hover:text-dark transition-colors"><XMarkIcon className="w-6 h-6" /></button>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-5">
                                    {/* Image Picker */}
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">
                                            Poster Program {!imageRequired && <span className="normal-case font-medium">(opsional, kosongkan jika tidak ganti)</span>}
                                        </label>
                                        <div className="relative group/picker">
                                            <input
                                                type="file"
                                                onChange={onImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                accept="image/*"
                                                required={imageRequired}
                                            />
                                            {previewUrl ? (
                                                <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-dark/5 shadow-sm">
                                                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                                    <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover/picker:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                        <ArrowUpTrayIcon className="w-7 h-7 text-white" />
                                                        <p className="text-white font-black text-[10px] uppercase tracking-widest">Ganti Gambar</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="aspect-video rounded-2xl md:rounded-3xl border-2 border-dashed border-dark/10 bg-light flex flex-col items-center justify-center gap-3 group-hover/picker:border-primary/30 group-hover/picker:bg-primary/5 transition-all">
                                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover/picker:scale-110 transition-transform">
                                                        <PhotoIcon className="w-6 h-6 text-dark/20 group-hover/picker:text-primary/40 transition-colors" />
                                                    </div>
                                                    <div className="text-center px-4">
                                                        <p className="text-[10px] font-black text-dark/40 uppercase tracking-widest">Pilih Poster</p>
                                                        <p className="text-[9px] font-medium text-dark/20 mt-1">JPG, PNG, WEBP — Maks 2MB</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {form.errors.image && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.image}</p>}
                                    </div>

                                    {/* Judul */}
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Judul Program</label>
                                        <input
                                            type="text"
                                            value={form.data.title}
                                            onChange={e => form.setData('title', e.target.value)}
                                            className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none transition-all placeholder:text-dark/20"
                                            placeholder="Contoh: Lomba Mewarnai"
                                            required
                                        />
                                        {form.errors.title && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.title}</p>}
                                    </div>

                                    {/* Link */}
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Link Pendaftaran</label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/20 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={form.data.registration_link}
                                                onChange={e => form.setData('registration_link', e.target.value)}
                                                className="w-full bg-light border border-dark/5 rounded-2xl pl-11 pr-4 py-4 text-sm text-dark font-bold focus:border-primary outline-none transition-all placeholder:text-dark/20"
                                                placeholder="https://forms.gle/... atau link lainnya"
                                                required
                                            />
                                        </div>
                                        {form.errors.registration_link && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.registration_link}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="w-full bg-primary text-white py-4 md:py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {submitLabel}
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
