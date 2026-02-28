import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import Container from '../../Components/UI/Container';
import Button from '../../Components/UI/Button';
import {
    TicketIcon,
    MapPinIcon,
    CalendarIcon,
    ClockIcon,
    ShoppingCartIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function Show({ ticket }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        quantity: 1,
    });

    const increment = () => {
        if (data.quantity < ticket.stock) {
            setData('quantity', data.quantity + 1);
        }
    };

    const decrement = () => {
        if (data.quantity > 1) {
            setData('quantity', data.quantity - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tickets.purchase', ticket.id));
    };

    const totalPrice = ticket.price * data.quantity;

    return (
        <MainLayout lang="id">
            <Head title={`${ticket.title} | Sugoi 8 Management`} />

            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-dark text-white overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
                    <img
                        src={ticket.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"}
                        alt="Background"
                        className="w-full h-full object-cover grayscale blur-sm"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-dark via-dark/80 to-dark" />
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="animate-fade-up">
                            <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8 block">Detail Event & Tiket</span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-10 leading-none">
                                {ticket.title}
                            </h1>

                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-white/40">
                                        <CalendarIcon className="w-5 h-5 text-secondary" />
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-none">Tanggal</p>
                                    </div>
                                    <p className="text-xl font-bold uppercase tracking-tight">{new Date(ticket.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-white/40">
                                        <ClockIcon className="w-5 h-5 text-secondary" />
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-none">Waktu</p>
                                    </div>
                                    <p className="text-xl font-bold uppercase tracking-tight">{ticket.time}</p>
                                </div>
                                <div className="md:col-span-2 space-y-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-3 text-white/40">
                                        <MapPinIcon className="w-5 h-5 text-secondary" />
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-none">Lokasi</p>
                                    </div>
                                    <p className="text-xl font-bold uppercase tracking-tight leading-relaxed">{ticket.location}</p>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] shadow-2xl backdrop-blur-sm">
                                <div className="flex items-start gap-4 mb-4">
                                    <InformationCircleIcon className="w-6 h-6 text-secondary shrink-0" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Deskripsi</p>
                                        <p className="text-white/60 font-medium leading-relaxed">{ticket.description || "Tidak ada deskripsi tersedia untuk event ini."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Form Card */}
                        <div className="bg-white rounded-[48px] p-8 md:p-12 text-dark shadow-2xl relative z-20">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black uppercase tracking-tighter text-dark">Pesan Tiket</h2>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Harga Tiket</span>
                                    <span className="text-2xl font-black text-primary">Rp {new Intl.NumberFormat('id-ID').format(ticket.price)}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Nama Lengkap</label>
                                        <div className="relative">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-dark/30"><UserIcon className="w-5 h-5" /></div>
                                            <input
                                                type="text"
                                                value={data.customer_name}
                                                onChange={e => setData('customer_name', e.target.value)}
                                                placeholder="Sesuai KTP..."
                                                className="w-full bg-light border border-dark/5 rounded-2xl py-4 pl-14 pr-6 text-dark font-bold focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                        {errors.customer_name && <p className="mt-2 text-xs font-bold text-red-500 px-1">{errors.customer_name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Email</label>
                                            <div className="relative">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-dark/30"><EnvelopeIcon className="w-5 h-5" /></div>
                                                <input
                                                    type="email"
                                                    value={data.customer_email}
                                                    onChange={e => setData('customer_email', e.target.value)}
                                                    placeholder="alamat@email.com"
                                                    className="w-full bg-light border border-dark/5 rounded-2xl py-4 pl-14 pr-6 text-dark font-bold focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                            {errors.customer_email && <p className="mt-2 text-xs font-bold text-red-500 px-1">{errors.customer_email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-dark/40 mb-3 px-1">Nomor WhatsApp</label>
                                            <div className="relative">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-dark/30"><PhoneIcon className="w-5 h-5" /></div>
                                                <input
                                                    type="text"
                                                    value={data.customer_phone}
                                                    onChange={e => setData('customer_phone', e.target.value)}
                                                    placeholder="0812XXXXXXXX"
                                                    className="w-full bg-light border border-dark/5 rounded-2xl py-4 pl-14 pr-6 text-dark font-bold focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                            {errors.customer_phone && <p className="mt-2 text-xs font-bold text-red-500 px-1">{errors.customer_phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Counter */}
                                <div className="bg-light p-6 rounded-[32px] border border-dark/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-dark/40 px-1">Jumlah Tiket</p>
                                        <p className="text-[10px] font-bold text-red-500 px-1">Tersisa {ticket.stock} Tiket</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <button
                                                type="button"
                                                onClick={decrement}
                                                className="w-12 h-12 bg-white rounded-xl shadow-sm border border-dark/5 flex items-center justify-center font-black text-xl hover:bg-dark hover:text-white transition-all active:scale-95"
                                            >
                                                -
                                            </button>
                                            <span className="text-3xl font-black text-dark min-w-8 text-center">{data.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={increment}
                                                className="w-12 h-12 bg-white rounded-xl shadow-sm border border-dark/5 flex items-center justify-center font-black text-xl hover:bg-dark hover:text-white transition-all active:scale-95"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Total</p>
                                            <p className="text-2xl font-black text-dark">Rp {new Intl.NumberFormat('id-ID').format(totalPrice)}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-primary text-white py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                    {processing ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                                </button>

                                <p className="text-center text-[9px] font-bold text-dark/30 uppercase tracking-[0.2em]">Cek kembali data pesanan Anda sebelum melanjutkan.</p>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>
        </MainLayout>
    );
}
