import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useLang } from '../hooks/useLang';
import Container from '../Components/UI/Container';
import TextRun from '../Components/UI/TextRun';
import Button from '../Components/UI/Button';
import { HandRaisedIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Partners({ partners: dbPartners = [] }) {
    const { settings } = usePage().props;
    const [lang, setLang] = useLang('en');
    const [darkMode, setDarkMode] = useState(false);

    const getPlaceholder = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=F9D783&color=1E1A1A&bold=true&size=512&font-size=0.35`;

    const demoPartners = [
        { id: 'd1', name: 'Alpha Tech', industry: 'Technology', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Alpha&backgroundColor=F9D783' },
        { id: 'd2', name: 'Quantum Creative', industry: 'Media', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Quantum&backgroundColor=00675D' },
        { id: 'd3', name: 'Global Finance', industry: 'Finance', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Finance&backgroundColor=1E1A1A' },
        { id: 'd4', name: 'Nexus Solutions', industry: 'Technology', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Nexus&backgroundColor=F5F5F5' },
        { id: 'd5', name: 'Vantage Corp', industry: 'Logistics', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Vantage&backgroundColor=F9D783' },
        { id: 'd6', name: 'Zenith Studio', industry: 'Entertainment', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Zenith&backgroundColor=00675D' },
        { id: 'd7', name: 'Horizon MICE', industry: 'Event', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Horizon&backgroundColor=1E1A1A' },
        { id: 'd8', name: 'Apex Production', industry: 'Media', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Apex&backgroundColor=F5F5F5' },
        { id: 'd9', name: 'Summit Group', industry: 'Finance', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Summit&backgroundColor=F9D783' },
        { id: 'd10', name: 'Delta Systems', industry: 'Technology', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Delta&backgroundColor=00675D' },
        { id: 'd11', name: 'Velocity Auto', industry: 'Automotive', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Velocity&backgroundColor=1E1A1A' },
        { id: 'd12', name: 'Pulse Agency', industry: 'Marketing', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Pulse&backgroundColor=F5F5F5' },
        { id: 'd13', name: 'Origin Food', industry: 'F&B', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Origin&backgroundColor=F9D783' },
        { id: 'd14', name: 'Evolve Fashion', industry: 'Fashion', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Evolve&backgroundColor=00675D' },
        { id: 'd15', name: 'Titan Media', industry: 'Media', logo: 'https://api.dicebear.com/9.x/shapes/svg?seed=Titan&backgroundColor=1E1A1A' },
    ];

    const displayPartners = dbPartners.length > 0 ? dbPartners : demoPartners;

    const heroImage = settings?.partners_hero_bg || "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000";

    const t = {
        en: {
            title: "Our Partners",
            subtitle: "Trust and Collaboration",
            desc: "We believe in the power of strategic partnerships. Together, we build experiences that drive real impact.",
            cta: "Become a Partner",
            noPartners: "Our partner list is coming soon.",
        },
        id: {
            title: "Mitra Kami",
            subtitle: "Kepercayaan dan Kolaborasi",
            desc: "Kami percaya pada kekuatan kemitraan strategis. Bersama-sama, kami membangun pengalaman yang memberikan dampak nyata.",
            cta: "Menjadi Mitra",
            noPartners: "Daftar mitra kami segera hadir.",
        }
    }[lang] || {
        title: "Our Partners",
        subtitle: "Trust and Collaboration",
        desc: "We believe in the power of strategic partnerships. Together, we build experiences that drive real impact.",
        cta: "Become a Partner",
        noPartners: "Our partner list is coming soon.",
    };

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head>
                <title>{t.title}</title>
                <meta name="description" content={t.desc} />
                <meta name="keywords" content="partner sugoi 8, mitra sugoi 8 jember, klien sugoi 8 management, kerjasama event jember" />
            </Head>

            {/* ── HERO ── */}
            <section className="relative min-h-[600px] pt-52 pb-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        className="w-full h-full object-cover opacity-70 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/25 to-transparent" />
                </div>

                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }} />
                    <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2 animate-pulse pointer-events-none transform-gpu" />
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-20 pointer-events-none">
                        <div className="w-px h-32 bg-linear-to-b from-transparent via-white to-transparent" />
                        <span className="text-[12px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">CREATIVE EXCELLENCE</span>
                        <div className="w-px h-32 bg-linear-to-b from-transparent via-white to-transparent" />
                    </div>
                    <div className="absolute -left-20 bottom-0 text-[30rem] font-black text-white/2 uppercase leading-none select-none tracking-tighter rotate-[-5deg]">
                        TRUST
                    </div>
                </div>

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.subtitle}</span>
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-10 text-white leading-[0.9] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            {t.title.split(' ').map((word, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <span className="block animate-in slide-in-from-bottom-full duration-1000" style={{ transitionDelay: `${i * 150}ms` }}>
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </h1>
                        <p className="text-sm md:text-xl text-white/50 font-medium leading-relaxed max-w-2xl mt-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 italic border-l-4 border-secondary pl-6">
                            {t.desc}
                        </p>
                    </div>
                </Container>
            </section>

            {/* ── MARQUEE ── */}
            <TextRun />

            {/* ── PARTNER GRID ── */}
            <section className="py-24 md:py-48 bg-white relative overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-5 pointer-events-none" />
                <Container>
                    <div className="space-y-20 md:space-y-32">
                        {/* Grouping Logic */}
                        {Object.entries(
                            displayPartners.reduce((acc, partner) => {
                                const industry = partner.industry || 'General';
                                if (!acc[industry]) acc[industry] = [];
                                acc[industry].push(partner);
                                return acc;
                            }, {})
                        ).map(([industry, items]) => (
                            <div key={industry} className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-px bg-dark/5 grow" />
                                    <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-dark/30 whitespace-nowrap">
                                        {industry}
                                    </h2>
                                    <div className="h-px bg-dark/5 grow" />
                                </div>
                                <div className="flex flex-wrap justify-center gap-6 md:gap-10 relative z-10">
                                    {items.map((partner) => (
                                        <div
                                            key={partner.id}
                                            className="flex flex-col items-center group w-40 md:w-52"
                                        >
                                            {/* Logo on white bg */}
                                            <div className="w-full aspect-square bg-white rounded-[32px] md:rounded-[48px] border border-dark/5 flex items-center justify-center p-6 md:p-8 overflow-hidden transition-all duration-500 shadow-sm border-white group-hover:shadow-[0_0_30px_rgba(249,215,131,0.3)]">
                                                <img
                                                    src={partner.logo || getPlaceholder(partner.name)}
                                                    alt={partner.name}
                                                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(249,215,131,0.8)]"
                                                />
                                            </div>

                                            {/* Direct Info (No Hover) */}
                                            <div className="mt-4 text-center">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-dark mb-1">{partner.name}</p>
                                                {partner.website && (
                                                    <a
                                                        href={partner.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[8px] font-bold text-dark/20 hover:text-secondary transition-colors"
                                                    >
                                                        Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>

                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10" />
            </section>

            {/* ── CTA ── */}
            <section className="py-16 md:py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
                        backgroundSize: '48px 48px'
                    }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/10 rounded-full blur-[160px] animate-pulse" />
                </div>
                <Container className="relative z-10 text-center">
                    <div className="relative inline-block mb-6 md:mb-8">
                        <HandRaisedIcon className="w-12 h-12 md:w-16 md:h-16 text-secondary animate-float" />
                        <div className="absolute -inset-6 bg-secondary/20 rounded-full blur-2xl animate-pulse -z-10" />
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8 md:mb-10 leading-[0.9]">
                        LET'S GROW<br /><span className="text-secondary">TOGETHER</span>
                    </h2>
                    <Button variant="white" className="h-14 md:h-16 px-10 md:px-12 text-[10px] md:text-xs font-black tracking-widest shadow-2xl hover:scale-110 transition-transform">
                        {t.cta}
                    </Button>
                </Container>
            </section>

        </MainLayout>
    );
}
