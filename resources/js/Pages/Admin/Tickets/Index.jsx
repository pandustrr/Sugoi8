import { useState, Fragment } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    TicketIcon,
    MapPinIcon,
    CalendarDaysIcon,
    ShareIcon,
    CheckIcon,
    MagnifyingGlassPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const imgSrc = (url) => url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

export default function Index({ events }) {
    const { flash } = usePage().props;
    const [copiedId, setCopiedId] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Hapus lomba ini beserta seluruh kategorinya?')) {
            router.delete(route('admin.tickets.destroy', id));
        }
    };

    const copyToClipboard = (event) => {
        const identifier = event.slug || event.title;
        const url = route('tickets.index', { event: identifier });
        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(event.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    const handleImageChange = (e, eventId) => {
        const file = e.target.files[0];
        if (!file) return;
        const ev = events.find(x => x.id === eventId);
        router.post(route('admin.tickets.update', eventId), {
            _method: 'PATCH',
            image: file,
            title: ev.title,
            slug: ev.slug,
            date: ev.date,
            time: ev.time,
            location: ev.location,
        }, { forceFormData: true });
    };

    return (
        <>
            <div className="min-h-screen bg-light flex">
                <Head title="Kelola Lomba | Sugoi 8 Admin" />
                <SidebarAdmin activePage="tickets" />

                <main className="grow">
                    <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-black text-dark uppercase tracking-tight leading-none mb-1">Kelola Lomba</h1>
                            <p className="text-dark/30 text-[10px] font-bold uppercase tracking-widest">Total {events.length} Event Terdaftar</p>
                        </div>
                        <Link
                            href={route('admin.tickets.create')}
                            className="bg-primary text-white px-6 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-primary/20 font-black text-[10px] uppercase tracking-widest"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Tambah Lomba Baru
                        </Link>
                    </header>

                    <div className="p-8">
                        {flash?.success && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-2xl font-bold text-sm">
                                {flash.success}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-8">
                            {events.length === 0 ? (
                                <div className="bg-white rounded-[40px] border border-dark/5 p-20 text-center shadow-sm">
                                    <TicketIcon className="w-16 h-16 text-dark/5 mx-auto mb-6" />
                                    <h3 className="text-xl font-black text-dark uppercase tracking-tight mb-2">Belum Ada Lomba</h3>
                                    <p className="text-dark/40 font-medium">Klik "Tambah Lomba Baru" untuk memulai.</p>
                                </div>
                            ) : (
                                events.map((event) => {
                                    const src = imgSrc(event.image_url);
                                    return (
                                        <div key={event.id} className="bg-white rounded-[40px] border border-dark/5 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                                            <div className="p-8 flex flex-col md:flex-row gap-8 items-start">

                                                {/* ── Poster ── */}
                                                <div className="w-full md:w-56 flex flex-col gap-4 shrink-0">
                                                    <div
                                                        className="aspect-square rounded-3xl bg-light overflow-hidden border border-dark/5 group relative cursor-zoom-in"
                                                        onClick={() => src && setPreviewSrc(src)}
                                                    >
                                                        {src ? (
                                                            <img
                                                                src={src}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-dark/10">
                                                                <TicketIcon className="w-16 h-16" />
                                                            </div>
                                                        )}
                                                        {/* Zoom overlay */}
                                                        {src && (
                                                            <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center text-white">
                                                                    <MagnifyingGlassPlusIcon className="w-5 h-5" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <label className="cursor-pointer bg-dark text-white text-[9px] font-black uppercase tracking-widest py-3 px-4 rounded-xl text-center hover:bg-primary transition-all">
                                                        Ganti Poster
                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, event.id)} />
                                                    </label>
                                                </div>

                                                {/* ── Content ── */}
                                                <div className="grow">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                                        <div>
                                                            <div className="flex items-center gap-3 text-dark/30 text-[10px] font-black uppercase tracking-[0.2em] mb-2 font-mono italic">
                                                                <CalendarDaysIcon className="w-3.5 h-3.5" />
                                                                {event.date} • {event.time}
                                                            </div>
                                                            <h3 className="text-2xl font-black text-dark uppercase tracking-tighter leading-tight">{event.title}</h3>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => copyToClipboard(event)}
                                                                className={`px-6 py-3 rounded-2xl flex items-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest ${copiedId === event.id ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-light text-dark/60 hover:bg-dark hover:text-white'}`}
                                                            >
                                                                {copiedId === event.id ? <CheckIcon className="w-4 h-4" /> : <ShareIcon className="w-4 h-4" />}
                                                                {copiedId === event.id ? 'Tersalin' : 'Bagikan Link'}
                                                            </button>
                                                            <Link
                                                                href={route('admin.tickets.edit', event.id)}
                                                                className="p-3 bg-light text-dark/40 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all"
                                                                title="Edit Lomba"
                                                            >
                                                                <PencilSquareIcon className="w-5 h-5" />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(event.id)}
                                                                className="p-3 bg-light text-dark/40 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all"
                                                                title="Hapus Lomba"
                                                            >
                                                                <TrashIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-dark/40 mb-8 font-bold text-xs">
                                                        <MapPinIcon className="w-4 h-4 text-primary" />
                                                        {event.location}
                                                    </div>

                                                    {/* Categories Table */}
                                                    <div className="bg-light/50 rounded-[32px] p-2 border border-dark/5">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr className="text-left border-b border-dark/5">
                                                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/30">Kategori</th>
                                                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/30">Harga</th>
                                                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-dark/30 text-right">Stok</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-dark/5">
                                                                {event.tickets.map((cat) => (
                                                                    <tr key={cat.id} className="hover:bg-white/50 transition-colors">
                                                                        <td className="px-6 py-4">
                                                                            <span className="text-[11px] font-black text-dark uppercase">{cat.title}</span>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <span className="text-[11px] font-bold text-primary italic">Rp {new Intl.NumberFormat('id-ID').format(cat.price)}</span>
                                                                        </td>
                                                                        <td className="px-6 py-4 text-right">
                                                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${cat.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                                                                                {cat.stock} Sisa
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
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
                            <Dialog.Panel className="relative max-w-2xl w-full">
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
