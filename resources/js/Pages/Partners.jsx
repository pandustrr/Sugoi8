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

            <section className="relative min-h-[600px] pt-52 pb-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-70 grayscale-0 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/25 to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }} />

                    <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[160px] translate-x-1/3 -translate-y-1/2 animate-pulse" />

                    {/* Vertical Text Branding */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-20">
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">CREATIVE EXCELLENCE</span>
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                    </div>

                    {/* Ghost Branding */}
                    <div className="absolute -left-20 bottom-0 text-[30rem] font-black text-white/2 uppercase leading-none select-none tracking-tighter rotate-[-5deg]">
                        TRUST
                    </div>
                </div>

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.subtitle}</span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-8 text-white leading-[0.9] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            {t.title.split(' ').map((word, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <span className="block animate-in slide-in-from-bottom-full duration-1000" style={{ transitionDelay: `${i * 150}ms` }}>
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <p className="text-base md:text-xl text-white/50 font-medium leading-relaxed max-w-2xl mt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 italic border-l-4 border-secondary pl-6">
                            {t.desc}
                        </p>
                    </div>
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

            <section className="py-32 md:py-64 bg-white relative overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-5 pointer-events-none" />
                <Container>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
                        {Array(12).fill(0).map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square glass-navbar border-dark/5 hover:border-secondary/20 flex flex-col items-center justify-center p-8 md:p-12 group transition-all duration-700 hover:scale-105 hover:rotate-2 rounded-[48px] md:rounded-[64px] ${i % 2 === 1 ? 'lg:translate-y-16' : ''}`}
                            >
                                <div className="w-full aspect-square bg-dark/5 rounded-[40px] flex items-center justify-center font-black text-dark/10 text-xl group-hover:bg-secondary/10 group-hover:text-secondary transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10 text-[10px] tracking-widest uppercase">PARTNER LOGO</span>
                                </div>
                                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary text-center">Brand Excellence</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>

                {/* Floating Decorative Elements */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10" />
            </section>

            <section className="py-32 md:py-64 bg-primary text-white overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
                        backgroundSize: '48px 48px'
                    }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/10 rounded-full blur-[160px] animate-pulse" />
                </div>

                <Container className="relative z-10 text-center">
                    <div className="relative inline-block mb-12 md:mb-16">
                        <HandRaisedIcon className="w-16 h-16 md:w-24 md:h-24 text-secondary animate-float" />
                        <div className="absolute -inset-8 bg-secondary/20 rounded-full blur-3xl animate-pulse -z-10" />
                    </div>
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-12 md:mb-20 leading-[0.85]">
                        LET'S GROW<br /><span className="text-secondary hover:text-glow-secondary transition-all">TOGETHER</span>
                    </h2>
                    <Button variant="white" className="w-full sm:w-auto h-20 md:h-24 px-16 md:px-24 text-[12px] md:text-sm font-black tracking-widest shadow-2xl hover:scale-110 transition-transform">
                        {t.cta}
                    </Button>
                </Container>
            </section>
        </MainLayout>
    );
}
