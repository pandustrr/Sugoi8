import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import {
    CalendarIcon,
    TicketIcon,
    PresentationChartBarIcon,
    WrenchScrewdriverIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Services() {
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);

    const content = {
        en: {
            title: "Our Expertise",
            subtitle: "What We Deliver",
            desc: "Sugoi 8 provides end-to-end creative management solutions. From local activations to global-scale festivals.",
            list: [
                {
                    title: "Event Organizer",
                    items: ["Event Planning", "Kreator", "Team Show", "Koreografer", "Event Branding", "Team Production", "Marketing Agency"],
                    icon: CalendarIcon,
                    image: "https://images.unsplash.com/photo-1540575861501-7c037137b204?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Show Management",
                    items: ["Talent Handling", "Stage Manager", "Precise Rundown Control", "Show Director"],
                    icon: TicketIcon,
                    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Service MICE",
                    items: ["Corporate Meetings", "Incentive Trips", "Conventions", "Exhibitions & Expos"],
                    icon: PresentationChartBarIcon,
                    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Production & Equipment",
                    items: ["Sound System", "Lighting Design", "LED Visuals", "Stage Construction"],
                    icon: WrenchScrewdriverIcon,
                    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800"
                }
            ]
        },
        id: {
            title: "Keahlian Kami",
            subtitle: "Apa Yang Kami Berikan",
            desc: "Sugoi 8 menyediakan solusi manajemen kreatif dari awal hingga akhir. Dari aktivasi lokal hingga festival skala global.",
            list: [
                {
                    title: "Penyelenggara Acara",
                    items: ["Perencana Acara", "Kreator", "Tim Pertunjukan", "Koreografer", "Branding Acara", "Tim Produksi", "Agensi Pemasaran"],
                    icon: CalendarIcon,
                    image: "https://images.unsplash.com/photo-1540575861501-7c037137b204?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Manajemen Pertunjukan",
                    items: ["Penanganan Talenta", "Manajer Panggung", "Kontrol Rundown Presisi", "Direktur Pertunjukan"],
                    icon: TicketIcon,
                    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Layanan MICE",
                    items: ["Pertemuan Korporat", "Perjalanan Insentif", "Konvensi", "Pameran & Expo"],
                    icon: PresentationChartBarIcon,
                    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Produksi & Peralatan",
                    items: ["Sistem Suara", "Desain Pencahayaan", "Visual LED", "Konstruksi Panggung"],
                    icon: WrenchScrewdriverIcon,
                    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800"
                }
            ]
        }
    };

    const t = content[lang];

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head title={t.title} />

            <section className="relative min-h-[600px] pt-40 pb-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-20 grayscale scale-110 motion-safe:animate-[pulse_12s_ease-in-out_infinite]"
                        alt="Services Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/95 via-primary/60 to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
                        backgroundSize: '32px 32px'
                    }} />

                    <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />

                    {/* Ghost Branding */}
                    <div className="absolute -left-20 bottom-0 text-[30rem] font-black text-white/[0.02] uppercase leading-none select-none tracking-tighter rotate-[-5deg]">
                        EXPERT
                    </div>
                </div>

                <Container className="relative z-10">
                    <div className="max-w-4xl text-left">
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.subtitle}</span>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-10 text-white leading-[0.85] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            {t.title.split(' ').map((word, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <span className="block animate-in slide-in-from-bottom-full duration-1000" style={{ transitionDelay: `${i * 150}ms` }}>
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <p className="text-xl md:text-3xl text-white/50 font-medium leading-relaxed max-w-2xl mt-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
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

            <section className="pt-24 md:pt-48 pb-32 md:pb-64 bg-white overflow-hidden">
                <Container>
                    <div className="space-y-48 md:space-y-80">
                        {t.list.map((s, i) => (
                            <div key={i} className={`flex flex-col lg:flex-row gap-20 md:gap-40 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="aspect-16/10 rounded-[60px] md:rounded-[100px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] relative">
                                        <img
                                            src={s.image}
                                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                                            alt={s.title}
                                        />
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                    <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] group-hover:bg-secondary/20 transition-all duration-700" />
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="flex flex-col mb-12 md:mb-16">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-[32px] flex items-center justify-center shrink-0 group-hover:rotate-6 transition-all">
                                                <s.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                                            </div>
                                            <span className="text-secondary font-black text-xs tracking-[0.4em] uppercase">Service 0{i + 1}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-dark uppercase tracking-tighter leading-[0.9]">{s.title}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        {s.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-6 p-6 md:p-10 glass-navbar rounded-[40px] border-dark/5 hover:border-primary/20 hover:scale-105 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
                                                <div className="w-2 h-2 rounded-full bg-secondary group-hover:animate-ping shrink-0" />
                                                <span className="font-extrabold text-dark/80 text-sm md:text-lg group-hover:text-dark transition-colors">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-12 md:mt-20">
                                        <Button variant="secondary" className="group w-full sm:w-auto h-20 px-12 text-[10px] font-black tracking-widest shadow-2xl shadow-secondary/10">
                                            EXPLORE NOW
                                            <ArrowRightIcon className="w-4 h-4 ml-4 group-hover:translate-x-3 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </MainLayout>
    );
}
