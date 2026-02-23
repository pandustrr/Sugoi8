import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import {
    UsersIcon,
    StarIcon,
    LightBulbIcon,
    GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/outline';

export default function About() {
    const [lang, setLang] = useState('en');

    const content = {
        en: {
            title: "About Sugoi 8",
            subtitle: "Redefining Creative Management",
            desc: "Founded on the principles of excellence and innovation, Sugoi 8 Management has grown from a boutique agency into a powerhouse of creative solutions.",
            vision: "Our Vision",
            visionDesc: "To be the global benchmark for creative management, where every idea is polished into a masterpiece.",
            mission: "Our Mission",
            missionDesc: "We provide comprehensive event and talent solutions that bridge the gap between imagination and reality.",
            stats: [
                { label: "Years Experience", value: "10+" },
                { label: "Successful Events", value: "500+" },
                { label: "Global Partners", value: "120+" },
                { label: "Creative Minds", value: "50+" },
            ]
        },
        id: {
            title: "Tentang Sugoi 8",
            subtitle: "Mendefinisikan Ulang Manajemen Kreatif",
            desc: "Didirikan di atas prinsip keunggulan dan inovasi, Sugoi 8 Management telah tumbuh dari agensi butik menjadi pusat solusi kreatif yang kuat.",
            vision: "Visi Kami",
            visionDesc: "Menjadi tolok ukur global untuk manajemen kreatif, di mana setiap ide dipoles menjadi sebuah karya agung.",
            mission: "Misi Kami",
            missionDesc: "Kami menyediakan solusi acara dan talenta komprehensif yang menjembatani kesenjangan antara imajinasi dan realitas.",
            stats: [
                { label: "Tahun Pengalaman", value: "10+" },
                { label: "Acara Berhasil", value: "500+" },
                { label: "Mitra Global", value: "120+" },
                { label: "Pikiran Kreatif", value: "50+" },
            ]
        }
    };

    const t = content[lang];

    return (
        <MainLayout lang={lang} onLangChange={setLang}>
            <Head title={t.title} />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-10 grayscale"
                        alt="About Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary/40" />
                </div>
                <Container className="relative z-10">
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 block">{t.subtitle}</span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 md:mb-12 text-white leading-none">
                        {t.title}
                    </h1>
                    <p className="text-xl md:text-3xl lg:text-4xl text-white/60 font-medium max-w-4xl leading-tight">
                        {t.desc}
                    </p>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="py-10 md:py-14 bg-primary/95 text-white border-y border-white/5">
                <Container>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {t.stats.map((stat, i) => (
                            <div key={i} className="text-center group">
                                <p className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary mb-3 group-hover:scale-105 transition-transform">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/40">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="py-24 md:py-40 bg-white">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                        <div className="space-y-12 md:space-y-16 order-2 lg:order-1">
                            <div>
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                                    <StarIcon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-dark uppercase mb-4 md:mb-6">{t.vision}</h2>
                                <p className="text-lg md:text-xl text-dark/60 leading-relaxed font-medium">
                                    {t.visionDesc}
                                </p>
                            </div>
                            <div>
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                                    <LightBulbIcon className="w-7 h-7 md:w-8 md:h-8 text-secondary" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-dark uppercase mb-4 md:mb-6">{t.mission}</h2>
                                <p className="text-lg md:text-xl text-dark/60 leading-relaxed font-medium">
                                    {t.missionDesc}
                                </p>
                            </div>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-4/5 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Values */}
            <section className="py-24 md:py-40 bg-light">
                <Container>
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-4xl md:text-5xl font-black text-dark uppercase tracking-tighter">Our Core Assets</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { icon: UsersIcon, title: "Expert Team", desc: "Collaborating with market leaders across industries." },
                            { icon: GlobeAsiaAustraliaIcon, title: "Global Network", desc: "Executing projects with international standards." },
                            { icon: LightBulbIcon, title: "Innovation", desc: "Always first in technology and creative trends." },
                        ].map((v, i) => (
                            <div key={i} className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-dark/5">
                                <v.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-6 md:mb-8" />
                                <h3 className="text-xl md:text-2xl font-black text-dark mb-4">{v.title}</h3>
                                <p className="text-sm md:text-base text-dark/40 font-medium">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </MainLayout>
    );
}
