import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import { HandRaisedIcon } from '@heroicons/react/24/outline';

export default function Partners() {
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);

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
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head title={t.title} />

            <section className="relative min-h-[480px] pt-32 pb-16 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-50 grayscale"
                        alt="Partners Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/40 via-primary/10 to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Architectural Mesh */}
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }} />

                    {/* Collaboration Orbs */}
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[90px] -translate-y-1/2" />
                    <div className="absolute top-1/4 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] translate-x-1/2" />

                    {/* Decorative Slant */}
                    <div className="absolute bottom-0 right-0 w-full h-1/2 bg-linear-to-t from-black/20 to-transparent skew-y-[-2deg] origin-bottom-right" />
                </div>
                <Container className="relative z-10">
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 block">{t.subtitle}</span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 md:mb-10 leading-none">
                        {t.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed max-w-2xl">
                        {t.desc}
                    </p>
                </Container>
            </section>

            {/* ── MARQUEE STRIP ── */}
            <div className="bg-secondary py-3 overflow-hidden">
                <div className="flex items-center whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
                    {Array(2).fill(null).map((_, gi) => (
                        <span key={gi} className="flex items-center gap-8 px-8 shrink-0">
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Event Organizer</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Show Management</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">MICE Services</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Production</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Event Branding</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Talent Handling</span>
                            <span className="text-dark/40 text-lg">✦</span>
                            <span className="text-dark font-black uppercase tracking-widest text-[10px]">Sugoi 8 Management</span>
                            <span className="text-dark/40 text-lg">✦</span>
                        </span>
                    ))}
                </div>
            </div>

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
