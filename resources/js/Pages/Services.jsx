import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import TextRun from '../Components/UI/TextRun';
import {
    CalendarIcon,
    TicketIcon,
    PresentationChartBarIcon,
    WrenchScrewdriverIcon,
    ArrowRightIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function Services() {
    const { settings } = usePage().props;
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);

    const heroImage = settings?.services_hero_bg || "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000";

    // Gambar default per service — bisa diganti via Admin > Page Settings > Services
    const serviceImages = {
        event_organizer: settings?.service_img_event_organizer || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        show_management: settings?.service_img_show_management || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
        mice: settings?.service_img_mice || "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
        production: settings?.service_img_production || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
        digital: settings?.service_img_digital || "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    };

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
                    image: serviceImages.event_organizer
                },
                {
                    title: "Show Management",
                    items: ["Talent Handling", "Stage Manager", "Precise Rundown Control", "Show Director"],
                    icon: TicketIcon,
                    image: serviceImages.show_management
                },
                {
                    title: "Service MICE",
                    items: ["Corporate Meetings", "Incentive Trips", "Conventions", "Exhibitions & Expos"],
                    icon: PresentationChartBarIcon,
                    image: serviceImages.mice
                },
                {
                    title: "Production & Equipment",
                    items: ["Sound System", "Lighting Design", "LED Visuals", "Stage Construction"],
                    icon: WrenchScrewdriverIcon,
                    image: serviceImages.production
                },
                {
                    title: "Digital Solutions",
                    items: ["Web Development", "Landing Pages", "Digital Systems", "UI/UX Design", "E-Commerce", "Digital Marketing"],
                    icon: SparklesIcon,
                    image: serviceImages.digital
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
                    image: serviceImages.event_organizer
                },
                {
                    title: "Manajemen Pertunjukan",
                    items: ["Penanganan Talenta", "Manajer Panggung", "Kontrol Rundown Presisi", "Direktur Pertunjukan"],
                    icon: TicketIcon,
                    image: serviceImages.show_management
                },
                {
                    title: "Layanan MICE",
                    items: ["Pertemuan Korporat", "Perjalanan Insentif", "Konvensi", "Pameran & Expo"],
                    icon: PresentationChartBarIcon,
                    image: serviceImages.mice
                },
                {
                    title: "Produksi & Peralatan",
                    items: ["Sistem Suara", "Desain Pencahayaan", "Visual LED", "Konstruksi Panggung"],
                    icon: WrenchScrewdriverIcon,
                    image: serviceImages.production
                },
                {
                    title: "Solusi Digital",
                    items: ["Pembuatan Website", "Landing Page", "Sistem Digital", "Desain UI/UX", "E-Commerce", "Pemasaran Digital"],
                    icon: SparklesIcon,
                    image: serviceImages.digital
                }
            ]
        }
    };

    const t = content[lang];

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head title={t.title} />

            <section className="relative min-h-[600px] pt-52 pb-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
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
                    <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-20">
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">CREATIVE EXCELLENCE</span>
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                    </div>
                    <div className="absolute -left-20 bottom-0 text-[30rem] font-black text-white/2 uppercase leading-none select-none tracking-tighter rotate-[-5deg]">
                        EXPERT
                    </div>
                </div>

                <Container className="relative z-10">
                    <div className="max-w-4xl text-left">
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-[9px] md:text-[11px] mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.subtitle}</span>
                        <h1 className="text-2xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 text-white leading-[0.85] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            {(settings?.[`services_title_${lang}`] || t.title).split(' ').map((word, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <span className="block animate-in slide-in-from-bottom-full duration-1000" style={{ transitionDelay: `${i * 150}ms` }}>
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <p className="text-xs md:text-lg text-white/50 font-medium leading-relaxed max-w-2xl mt-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 italic border-l-4 border-secondary pl-6">
                            {settings?.[`services_desc_${lang}`] || t.desc}
                        </p>
                    </div>
                </Container>
            </section>

            <TextRun />

            <section className="pt-12 md:pt-24 pb-20 md:pb-36 bg-white overflow-hidden">
                <Container>
                    <div className="space-y-16 md:space-y-36">
                        {t.list.map((s, i) => (
                            <div key={i} className={`flex flex-col lg:flex-row gap-8 md:gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-5/12 relative group max-w-2xl lg:max-w-none">
                                    <div className="w-full h-[200px] md:h-[380px] lg:h-[450px] rounded-[20px] md:rounded-[40px] lg:rounded-[56px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative">
                                        <img
                                            src={s.image}
                                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                                            alt={s.title}
                                        />
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                    <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 bg-secondary/10 rounded-full blur-[80px] group-hover:bg-secondary/20 transition-all duration-700" />
                                </div>
                                <div className="w-full lg:w-7/12">
                                    <div className="flex flex-col mb-8 md:mb-12">
                                        <div className="flex items-center gap-4 mb-4 md:mb-8">
                                            <div className="w-10 h-10 md:w-14 md:h-14 bg-primary/5 rounded-[16px] flex items-center justify-center shrink-0 group-hover:rotate-6 transition-all">
                                                <s.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                                            </div>
                                            <span className="text-secondary font-black text-[9px] tracking-[0.4em] uppercase">Service 0{i + 1}</span>
                                        </div>
                                        <h2 className="text-xl md:text-4xl lg:text-5xl font-black text-dark uppercase tracking-tighter leading-[0.9]">
                                            {(() => {
                                                const ids = ['eo', 'show', 'mice', 'production', 'digital'];
                                                return settings?.[`service_title_${ids[i]}_${lang}`] || s.title;
                                            })()}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                                        {s.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-3 md:p-6 glass-navbar rounded-[20px] border-dark/5 hover:border-primary/20 hover:scale-105 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:animate-ping shrink-0" />
                                                <span className="font-extrabold text-white text-[10px] md:text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <div className="mt-10 md:mt-12">
                                        <Button variant="secondary" className="group w-full sm:w-auto h-16 px-10 text-[10px] font-black tracking-widest shadow-2xl shadow-secondary/10">
                                            EXPLORE NOW
                                            <ArrowRightIcon className="w-4 h-4 ml-4 group-hover:translate-x-3 transition-transform" />
                                        </Button>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </MainLayout>
    );
}
