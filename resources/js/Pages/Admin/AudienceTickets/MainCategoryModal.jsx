import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

export default function MainCategoryModal({ show, onClose, onSubmit, form, previewUrl, onImageChange, isEdit }) {
    return (
        <Transition show={show} as={Fragment}>
            <Dialog as="div" className="relative z-300" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden bg-white rounded-[40px] p-6 md:p-10 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl md:text-2xl font-black text-dark uppercase tracking-tighter italic leading-none">
                                        {isEdit ? 'Edit Main Kategori' : 'Main Kategori Baru'}
                                    </h2>
                                    <button onClick={onClose} className="text-dark/20 hover:text-dark transition-colors">
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        {/* Image Picker */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Thumbnail (Pilihan)</label>
                                                <div className="relative aspect-square rounded-3xl overflow-hidden bg-light border-2 border-dashed border-dark/10 transition-all cursor-pointer">
                                                    <input type="file" onChange={(e) => onImageChange(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                                                    {previewUrl ? (
                                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center opacity-50">
                                                            <PhotoIcon className="w-8 h-8" />
                                                            <p className="text-[8px] font-black uppercase tracking-widest mt-2">Pilih Gambar</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Nama */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Nama Kategori</label>
                                                <input
                                                    type="text"
                                                    value={form.data.title}
                                                    onChange={e => form.setData('title', e.target.value)}
                                                    className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none transition-all"
                                                    placeholder="Contoh: FESTIVAL"
                                                    required
                                                />
                                                {form.errors.title && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.title}</p>}
                                            </div>

                                            {/* Slug */}
                                            <div>
                                                <div className="flex items-center justify-between mb-3 px-1">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-dark/60 italic">Link Kustom (Slug)</label>
                                                    <span className="text-[9px] font-bold text-primary italic bg-primary/5 px-2 py-0.5 rounded-lg">Digunakan untuk link public</span>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-dark/10 pr-3 pointer-events-none">
                                                        <span className="text-xs font-black text-dark/30">/ticket/</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={form.data.slug}
                                                        onChange={e => form.setData('slug', e.target.value)}
                                                        className="w-full bg-light border border-dark/5 rounded-2xl py-4 pl-[105px] pr-4 text-dark font-bold text-xs focus:border-primary focus:bg-white outline-none transition-all shadow-inner"
                                                        placeholder="nama-kategori"
                                                        required
                                                    />
                                                </div>
                                                {form.errors.slug && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.slug}</p>}
                                            </div>

                                            {/* Deskripsi */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Deskripsi Utama</label>
                                                <textarea
                                                    value={form.data.description}
                                                    onChange={e => form.setData('description', e.target.value)}
                                                    rows={4}
                                                    className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none transition-all placeholder:font-medium"
                                                    placeholder="Penjelasan singkat mengenai kelompok tiket ini..."
                                                />
                                            </div>

                                            {/* Status toggle (edit only) */}
                                            {isEdit && (
                                                <div className="flex items-center gap-3 bg-light p-4 rounded-2xl">
                                                    <p className="grow text-[10px] font-black uppercase tracking-widest text-dark/40">Status Keaktifan</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => form.setData('is_active', form.data.is_active ? 0 : 1)}
                                                        className={`w-12 h-6 rounded-full relative transition-colors ${form.data.is_active ? 'bg-green-500' : 'bg-red-500'}`}
                                                    >
                                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.data.is_active ? 'left-7' : 'left-1'}`} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="w-full bg-primary text-white py-4 md:py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4"
                                    >
                                        {form.processing ? 'Memproses...' : (isEdit ? 'Simpan Main Kategori' : 'Terbitkan Main Kategori')}
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
