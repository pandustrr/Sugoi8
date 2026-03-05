import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon, TicketIcon } from '@heroicons/react/24/outline';

const fmtPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

export default function SubCategoryModal({ show, onClose, onSubmit, form, previewUrl, onImageChange, isEdit, categories }) {
    return (
        <Transition show={show} as={Fragment}>
            <Dialog as="div" className="relative z-300" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-2xl bg-white rounded-[40px] p-6 md:p-10 relative">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl md:text-2xl font-black text-dark uppercase tracking-tighter italic leading-none">
                                        {isEdit ? 'Edit Sub Tiket' : 'Sub Tiket Baru'}
                                    </h2>
                                    <button onClick={onClose} className="text-dark/20 hover:text-dark transition-colors">
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        {/* Kiri: image + kategori + nama */}
                                        <div className="space-y-6">
                                            {/* Image Picker */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Poster Tiket (Opsional)</label>
                                                <div className="relative aspect-video rounded-3xl overflow-hidden bg-light border-2 border-dashed border-dark/10 cursor-pointer">
                                                    <input type="file" onChange={(e) => onImageChange(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                                                    {previewUrl ? (
                                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-30">
                                                            <PhotoIcon className="w-8 h-8" />
                                                            <p className="text-[8px] font-black uppercase tracking-widest">Pilih Gambar</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Main Kategori */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Main Kategori</label>
                                                <select
                                                    value={form.data.main_audience_category_id}
                                                    onChange={e => form.setData('main_audience_category_id', e.target.value)}
                                                    className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none appearance-none"
                                                    required
                                                >
                                                    <option value="">Pilih Main Kategori</option>
                                                    {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                                </select>
                                            </div>

                                            {/* Nama Sub Tiket */}
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Nama Sub Tiket</label>
                                                <input
                                                    type="text"
                                                    value={form.data.title}
                                                    onChange={e => form.setData('title', e.target.value)}
                                                    className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none"
                                                    placeholder="Contoh: EARLY BIRD"
                                                    required
                                                />
                                                {form.errors.title && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.title}</p>}
                                            </div>
                                        </div>

                                        {/* Kanan: harga + stok + deskripsi + status */}
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Harga (IDR)</label>
                                                    <input
                                                        type="number"
                                                        value={form.data.price}
                                                        onChange={e => form.setData('price', e.target.value)}
                                                        className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none"
                                                        placeholder="20000"
                                                        required
                                                    />
                                                    {form.errors.price && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.price}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Stok Kursi</label>
                                                    <input
                                                        type="number"
                                                        value={form.data.stock}
                                                        onChange={e => form.setData('stock', e.target.value)}
                                                        className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none"
                                                        placeholder="100"
                                                        required
                                                    />
                                                    {form.errors.stock && <p className="mt-2 text-[10px] font-bold text-red-500">{form.errors.stock}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 ml-1">Detail / Benefit</label>
                                                <textarea
                                                    value={form.data.description}
                                                    onChange={e => form.setData('description', e.target.value)}
                                                    rows={5}
                                                    className="w-full bg-light border border-dark/5 rounded-2xl p-4 text-sm text-dark font-bold focus:border-primary outline-none"
                                                    placeholder="Benefit khusus sub tiket ini..."
                                                />
                                            </div>

                                            {/* Status toggle (edit only) */}
                                            {isEdit && (
                                                <div className="flex items-center gap-3 bg-light p-4 rounded-2xl">
                                                    <p className="grow text-[10px] font-black uppercase tracking-widest text-dark/40">Status Tiket</p>
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
                                        className="w-full bg-primary text-white py-4 md:py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 mt-4"
                                    >
                                        {form.processing ? 'Memproses...' : (isEdit ? 'Simpan Sub Tiket' : 'Tambah Sub Tiket')}
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
