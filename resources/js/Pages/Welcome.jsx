import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import {
    SparklesIcon,
    RocketLaunchIcon,
    UserGroupIcon,
    PresentationChartBarIcon,
    TicketIcon,
    WrenchScrewdriverIcon,
    PhotoIcon,
    HandRaisedIcon,
    InformationCircleIcon,
    PlayCircleIcon
} from '@heroicons/react/24/outline';

const servicesList = [
    { id: 'eo', icon: UserGroupIcon, color: 'text-primary', bg: 'bg-primary/5', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
    { id: 'show', icon: TicketIcon, color: 'text-secondary', bg: 'bg-secondary/5', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800' },
    { id: 'mice', icon: PresentationChartBarIcon, color: 'text-accent-deep', bg: 'bg-accent-deep/5', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800' },
    { id: 'production', icon: WrenchScrewdriverIcon, color: 'text-accent-fresh', bg: 'bg-accent-fresh/5', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800' }
];

const portfolioItems = [
    { titleEn: 'Global Tech Summit', titleId: 'Pertemuan Teknologi Global', category: 'MICE • 2024', image: 'https://images.unsplash.com/photo-1540575861501-7c037137b204?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Neon Lights Festival', titleId: 'Festival Lampu Neon', category: 'Show Management • 2023', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Luxury Brand Launch', titleId: 'Peluncuran Brand Mewah', category: 'Event Branding • 2024', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Corporate Gala Dinner', titleId: 'Makan Malam Gala Korporat', category: 'EO • 2023', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Digital Innovation Expo', titleId: 'Pameran Inovasi Digital', category: 'Production • 2024', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800' },
    { titleEn: 'Influencer Gathering', titleId: 'Pertemuan Influencer', category: 'Talent Handling • 2024', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800' },
];

const translations = {
    en: {
        metaTitle: "Sugoi 8 Management - Designing Dreams, Crafting Experiences",
        heroTag: "Creative Management Hub",
        heroTitle1: "DESIGNING",
        heroTitle2: "DREAMS",
        heroDesc: "Crafting world-class experiences through professional event management and technical excellence.",
        heroBtn: "GET STARTED",
        heroShowreel: "Watch Showreel",
        aboutTag: "WHO WE ARE",
        aboutTitle: "YOUR PARTNER IN CREATIVE EXCELLENCE.",
        aboutDesc1: "SUGOI 8 MANAGEMENT is a premier creative agency dedicated to transforming visions into high-impact realities. Based in Jakarta, we specialize in bridging the gap between exceptional talent and global brands.",
        aboutDesc2: "We believe that every event is an opportunity to tell a unique story. Through strategic management and cutting-edge production, we deliver results that resonate and inspire.",
        aboutExp: "Years of Experience",
        aboutEvents: "Successful Events",
        aboutPartners: "Global Partners",
        aboutMinds: "Creative Minds",
        servicesTag: "WHAT WE DO",
        servicesTitle: "INTEGRATED SERVICE",
        servicesDesc: "We bridge creativity and technology to deliver unforgettable moments.",
        servicesExplore: "EXPLORE ALL",
        serviceEo: "Event Organizer",
        serviceEoDesc: "Comprehensive planning and execution including Event Planner, Creators, and Production teams.",
        serviceShow: "Show Management",
        serviceShowDesc: "Elite managing of performances: Talent handling, stage management, and precise rundown control.",
        serviceMice: "Service MICE",
        serviceMiceDesc: "Professional handling for Meetings, Incentives, Conventions, and Exhibitions for corporate clients.",
        serviceProd: "Production & Equipment",
        serviceProdDesc: "Premium technical support including Sound Systems, Lighting, LED Visuals, and Stage Setup.",
        portfolioTag: "PORTFOLIO",
        portfolioTitle1: "LATEST",
        portfolioTitle2: "PROJECTS",
        ctaTitle: "READY TO CREATE THE UNFORGETTABLE?",
        ctaDesc: "Let's discuss how we can bring your next vision to life with professional management.",
        ctaBtn: "START CONVERSATION",
        contactTag: "CONTACT US",
        contactTitle: "Let's Build Something Great.",
        contactOffice: "Visit Our Office",
        contactOfficeDesc: "Jakarta, Indonesia - Dynamic Hub for Creative Minds.",
        contactInq: "General Inquiries",
        contactFormTitle: "Send us a message",
        formName: "Your Name",
        formEmail: "Your Email",
        formService: "Select Service",
        formMessage: "How can we help?",
        formBtn: "Send Message",
    },
    id: {
        metaTitle: "Sugoi 8 Management - Mewujudkan Mimpi, Merancang Pengalaman",
        heroTag: "Pusat Manajemen Kreatif",
        heroTitle1: "MEWUJUDKAN",
        heroTitle2: "MIMPI",
        heroDesc: "Merancang pengalaman kelas dunia melalui manajemen acara profesional dan keunggulan teknis.",
        heroBtn: "MULAI SEKARANG",
        heroShowreel: "Lihat Showreel",
        aboutTag: "SIAPA KAMI",
        aboutTitle: "MITRA ANDA DALAM KREATIVITAS TERBAIK.",
        aboutDesc1: "SUGOI 8 MANAGEMENT adalah agensi kreatif terkemuka yang berdedikasi untuk mengubah visi menjadi realitas berlipat ganda. Berbasis di Jakarta, kami ahli dalam menjembatani talenta luar biasa dengan brand global.",
        aboutDesc2: "Kami percaya setiap acara adalah kesempatan untuk menceritakan kisah unik. Melalui manajemen strategis dan produksi mutakhir, kami memberikan hasil yang berkesan dan menginspirasi.",
        aboutExp: "Tahun Pengalaman",
        aboutEvents: "Acara Berhasil",
        aboutPartners: "Mitra Global",
        aboutMinds: "Pikiran Kreatif",
        servicesTag: "APA YANG KAMI LAKUKAN",
        servicesTitle: "LAYANAN TERPADU",
        servicesDesc: "Kami menjembatani kreativitas dan teknologi untuk memberikan momen yang tak terlupakan.",
        servicesExplore: "LIHAT SEMUA",
        serviceEo: "Penyelenggara Acara",
        serviceEoDesc: "Perencanaan dan eksekusi komprehensif termasuk Perencana Acara, Kreator, dan tim Produksi.",
        serviceShow: "Manajemen Pertunjukan",
        serviceShowDesc: "Manajemen pertunjukan elit: Penanganan talenta, manajemen panggung, dan kontrol rundown yang presisi.",
        serviceMice: "Layanan MICE",
        serviceMiceDesc: "Penanganan profesional untuk Pertemuan, Insentif, Konvensi, dan Pameran untuk klien korporat.",
        serviceProd: "Produksi & Peralatan",
        serviceProdDesc: "Dukungan teknis premium termasuk Sistem Suara, Pencahayaan, Visual LED, dan Pengaturan Panggung.",
        portfolioTag: "PORTOFOLIO",
        portfolioTitle1: "PROYEK",
        portfolioTitle2: "TERBARU",
        ctaTitle: "SIAP MEWUJUDKAN HAL YANG LUAR BIASA?",
        ctaDesc: "Mari diskusikan bagaimana kami bisa menghidupkan visi Anda berikutnya dengan manajemen profesional.",
        ctaBtn: "MULAI KONSULTASI",
        contactTag: "HUBUNGI KAMI",
        contactTitle: "Mari Bangun Sesuatu yang Hebat.",
        contactOffice: "Kunjungi Kantor Kami",
        contactOfficeDesc: "Jakarta, Indonesia - Pusat Dinamis bagi Pikiran Kreatif.",
        contactInq: "Pertanyaan Umum",
        contactFormTitle: "Kirim pesan kepada kami",
        formName: "Nama Anda",
        formEmail: "Email Anda",
        formService: "Pilih Layanan",
        formMessage: "Bagaimana kami bisa membantu?",
        formBtn: "Kirim Pesan",
    }
};

export default function Welcome() {
    const [lang, setLang] = useState('en');
    const t = translations[lang];

    const services = servicesList.map(s => {
        let title, desc;
        if (s.id === 'eo') { title = t.serviceEo; desc = t.serviceEoDesc; }
        else if (s.id === 'show') { title = t.serviceShow; desc = t.serviceShowDesc; }
        else if (s.id === 'mice') { title = t.serviceMice; desc = t.serviceMiceDesc; }
        else { title = t.serviceProd; desc = t.serviceProdDesc; }
        return { ...s, title, description: desc };
    });

    return (
        <MainLayout lang={lang} onLangChange={setLang}>
            <Head title={t.metaTitle} />

            {/* 1. Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-20 grayscale"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary/40" />
                </div>

                <Container className="relative z-10 py-20">
                    <div className="max-w-5xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-xl">
                            <SparklesIcon className="w-4 h-4" />
                            {t.heroTag}
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-8 uppercase">
                            <span className="block opacity-20 text-outline-white mb-2 underline decoration-primary decoration-4 sm:decoration-8 underline-offset-3">SUGOI 8</span>
                            <span className="block italic">{t.heroTitle1}</span>
                            <span className="block text-secondary">{t.heroTitle2}</span>
                        </h1>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-12 mt-12 md:mt-16 transition-all">
                            <div className="grow max-w-xl">
                                <p className="text-lg md:text-2xl text-white/50 font-medium leading-relaxed">
                                    {t.heroDesc}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                                <Button variant="secondary" href="/about" className="w-full sm:w-auto px-12 py-5 h-16 flex items-center justify-center gap-3 text-xs tracking-widest">
                                    <RocketLaunchIcon className="w-5 h-5" />
                                    {t.heroBtn}
                                </Button>
                                <button className="flex items-center justify-center gap-4 text-white group px-4 py-2">
                                    <PlayCircleIcon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{t.heroShowreel}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 2. About Section */}
            <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="relative">
                            <div className="relative z-10 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" alt="About" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-[80px] -z-10" />
                        </div>
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">{t.aboutTag}</span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-dark mb-10 leading-[0.9]">
                                {t.aboutTitle}
                            </h2>
                            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-dark/60 leading-relaxed font-medium">
                                <p>{t.aboutDesc1}</p>
                                <p>{t.aboutDesc2}</p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-12 md:mt-16">
                                <div>
                                    <p className="text-3xl md:text-4xl font-black text-primary mb-2">10+</p>
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40">{t.aboutExp}</p>
                                </div>
                                <div>
                                    <p className="text-3xl md:text-4xl font-black text-secondary mb-2">500+</p>
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40">{t.aboutEvents}</p>
                                </div>
                                <div className="hidden lg:block">
                                    <p className="text-3xl md:text-4xl font-black text-primary mb-2">120+</p>
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40">{t.aboutPartners}</p>
                                </div>
                                <div className="hidden lg:block">
                                    <p className="text-3xl md:text-4xl font-black text-secondary mb-2">50+</p>
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40">{t.aboutMinds}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 3. Services Section */}
            <section id="services" className="py-24 md:py-40 bg-light/50">
                <Container>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 md:mb-32">
                        <div className="max-w-2xl">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">{t.servicesTag}</span>
                            <h2 className="text-4xl md:text-5xl lg:text-[5rem] font-black tracking-tighter text-dark mb-8 leading-none uppercase">
                                {t.servicesTitle}
                            </h2>
                            <p className="text-lg md:text-xl text-dark/40 max-w-lg leading-relaxed">
                                {t.servicesDesc}
                            </p>
                        </div>
                        <Button variant="outline" href="/services" className="w-full sm:w-auto text-[10px] tracking-widest py-4 px-10">{t.servicesExplore}</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24">
                        {services.map((service) => (
                            <div key={service.id} className="group cursor-pointer">
                                <div className="aspect-video mb-8 md:mb-10 overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl relative">
                                    <img src={service.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={service.title} />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-6 left-6 md:top-8 md:left-8">
                                        <div className={`w-12 h-12 md:w-14 md:h-14 ${service.bg} rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl`}>
                                            <service.icon className={`w-6 h-6 md:w-7 md:h-7 ${service.color}`} />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-dark mb-4 flex items-center gap-4">
                                    {service.title}
                                    <span className="h-px shrink-0 grow bg-dark/10 group-hover:grow-2 transition-all" />
                                </h3>
                                <p className="text-base md:text-lg text-dark/50 leading-relaxed max-w-xl">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 4. Portfolio Section */}
            <section id="portfolio" className="py-24 md:py-40 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">{t.portfolioTag}</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-dark underline decoration-secondary decoration-4 sm:decoration-8 underline-offset-8">
                            {t.portfolioTitle1} <span className="italic text-primary">{t.portfolioTitle2}</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-outline-fix">
                        {portfolioItems.map((item, i) => (
                            <div key={i} className="group relative aspect-4/5 bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
                                <img src={item.image} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={item.category} />
                                <div className="absolute inset-x-6 md:inset-x-8 bottom-6 md:bottom-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white font-black text-2xl md:text-3xl mb-2 leading-tight">{lang === 'en' ? item.titleEn : item.titleId}</p>
                                    <p className="text-secondary text-[10px] font-black uppercase tracking-[0.2em]">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 5. CTA Section - Smaller & Mantab */}
            <section id="cta" className="py-16 md:py-20 bg-white">
                <Container>
                    <div className="bg-dark rounded-[32px] md:rounded-[40px] p-8 md:p-16 text-left text-white relative overflow-hidden group flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 shadow-2xl">
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-6 uppercase leading-tight italic">
                                {t.ctaTitle}
                            </h2>
                            <p className="text-white/40 text-base md:text-lg font-medium">
                                {t.ctaDesc}
                            </p>
                        </div>
                        <div className="relative z-10 shrink-0 w-full lg:w-auto">
                            <Button variant="secondary" href="/contact" className="w-full lg:w-auto px-10 py-5 h-16 text-xs font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-secondary/20">
                                {t.ctaBtn}
                            </Button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-1000" />
                    </div>
                </Container>
            </section>

            {/* 6. Contact Section */}
            <section id="contact" className="py-24 md:py-32 bg-dark">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                        <div>
                            <span className="text-secondary font-black uppercase tracking-widest text-[10px] md:text-sm block mb-6">{t.contactTag}</span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-10 leading-none">
                                {t.contactTitle}
                            </h2>
                            <div className="space-y-8 md:space-y-10">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0"><HandRaisedIcon className="w-6 h-6 md:w-7 md:h-7 text-primary" /></div>
                                    <div><p className="text-white font-bold text-lg md:text-xl mb-2">{t.contactOffice}</p><p className="text-slate-400 text-sm md:text-base">{t.contactOfficeDesc}</p></div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0"><InformationCircleIcon className="w-6 h-6 md:w-7 md:h-7 text-secondary" /></div>
                                    <div><p className="text-white font-bold text-lg md:text-xl mb-2">{t.contactInq}</p><p className="text-slate-400 text-sm md:text-base">contact@sugoi8.id<br />+62 812 XXXX XXXX</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 md:p-14 rounded-[32px] md:rounded-[40px] border border-white/10">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-8">{t.contactFormTitle}</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <input type="text" placeholder={t.formName} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-colors text-sm md:text-base" />
                                    <input type="email" placeholder={t.formEmail} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-colors text-sm md:text-base" />
                                </div>
                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-colors appearance-none text-sm md:text-base">
                                    <option className="bg-dark">{t.formService}</option>
                                    <option className="bg-dark">Event Organizer</option>
                                    <option className="bg-dark">Show Management</option>
                                </select>
                                <textarea rows="3" placeholder={t.formMessage} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-colors resize-none text-sm md:text-base"></textarea>
                                <Button variant="primary" className="w-full h-16 text-xs font-black tracking-widest">{t.formBtn}</Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>

        </MainLayout>
    );
}
