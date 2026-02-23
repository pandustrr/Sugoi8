import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import { HandRaisedIcon } from '@heroicons/react/24/outline';

export default function Partners() {
    const [lang, setLang] = useState('en');

    const t = {
        en: {
            title: "Our Partners",
            subtitle: "Trust and Collaboration",
            desc: "We believe in the power of strategic partnerships. Together, we build experiences that drive real impact.",
            cta: "Become a Partner"
        },
        id: {
            title: "Mitra Kami",
            subtitle: "Kepercayaan dan Kolaborasi",
            desc: "Kami percaya pada kekuatan kemitraan strategis. Bersama-sama, kami membangun pengalaman yang memberikan dampak nyata.",
            cta: "Menjadi Mitra"
        }
    }[lang];

    const partners = [
        { name: "Global Brand X", industry: "Technology", logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200" },
        { name: "Music Festival Y", industry: "Entertainment", logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200" },
        { name: "Corporate Z", industry: "Finance", logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200" },
        { name: "Brand Alpha", industry: "Automotive", logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200" },
    ];

    return (
        <MainLayout lang={lang} onLangChange={setLang}>
            <Head title={t.title} />

            <section className="relative pt-40 pb-20 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-10 grayscale"
                        alt="Partners Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary/40" />
                </div>
                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 block">{t.subtitle}</span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 md:mb-12 leading-none">
                            {t.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed max-w-2xl">
                            {t.desc}
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-24 md:py-32 bg-white">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 transform rotate-0 lg:rotate-1">
                        {Array(8).fill(0).map((_, i) => (
                            <div key={i} className="aspect-square bg-light flex items-center justify-center grayscale hover:grayscale-0 transition-all border border-dark/5 p-8 md:p-12">
                                <div className="w-full h-full bg-dark/5 rounded-full flex items-center justify-center font-black text-dark/10 text-2xl md:text-4xl">
                                    LOGO
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-24 md:py-40 bg-primary text-white overflow-hidden relative">
                <Container className="relative z-10 text-center">
                    <HandRaisedIcon className="w-12 h-12 md:w-20 md:h-20 text-secondary mx-auto mb-8 md:mb-12" />
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8 md:mb-12 leading-tight">Let's grow together</h2>
                    <Button variant="white" className="w-full sm:w-auto h-16 md:h-20 px-12 md:px-16 text-[10px] md:text-xs font-black tracking-widest">{t.cta}</Button>
                </Container>
            </section>
        </MainLayout>
    );
}
