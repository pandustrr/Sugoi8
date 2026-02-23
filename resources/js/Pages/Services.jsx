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
        <MainLayout lang={lang} onLangChange={setLang}>
            <Head title={t.title} />

            <section className="relative pt-40 pb-20 md:pb-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1540575861501-7c037137b204?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-10 grayscale"
                        alt="Services Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary/40" />
                </div>
                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 block">{t.subtitle}</span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 md:mb-12 text-white leading-none">
                            {t.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed max-w-2xl">
                            {t.desc}
                        </p>
                    </div>
                </Container>
            </section>

            <section className="pb-24 md:pb-40 bg-white">
                <Container>
                    <div className="space-y-24 md:space-y-40">
                        {t.list.map((s, i) => (
                            <div key={i} className={`flex flex-col lg:flex-row gap-12 md:gap-24 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-1/2">
                                    <div className="aspect-16/10 rounded-[32px] md:rounded-[60px] overflow-hidden shadow-2xl">
                                        <img src={s.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={s.title} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/5 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                            <s.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark uppercase leading-tight">{s.title}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                        {s.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 md:p-4 bg-light rounded-xl md:rounded-2xl border border-dark/5 hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary shrink-0" />
                                                <span className="font-bold text-dark/70 text-sm md:text-base">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 md:mt-12">
                                        <Button variant="outline" className="group w-full sm:w-auto h-16 md:h-auto py-5 px-10">
                                            Inquiry Now
                                            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
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
