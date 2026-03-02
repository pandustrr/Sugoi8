import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function Contact() {
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);

    const t = {
        en: {
            title: "Connect",
            subtitle: "Get in Touch",
            desc: "Have a vision? We have the expertise to bring it to life. Let's start a conversation today.",
            formTitle: "Send a Message",
            office: "Our HQ",
            officeDesc: "Jl. Piere Tendean, Sumber Beringin, Karangrejo, Kec. Sumbersari, Kab. Jember, Jawa Timur 68124",
            phone: "0859-5446-4539",
            btn: "Submit Message"
        },
        id: {
            title: "Hubungi",
            subtitle: "Mari Bicara",
            desc: "Punya visi? Kami punya keahlian untuk mewujudkannya. Mari mulai percakapan hari ini.",
            formTitle: "Kirim Pesan",
            office: "Kantor Pusat",
            officeDesc: "Jl. Piere Tendean, Sumber Beringin, Karangrejo, Kec. Sumbersari, Kab. Jember, Jawa Timur 68124",
            phone: "0859-5446-4539",
            btn: "Kirim Pesan"
        }
    }[lang];

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head title={t.title} />

            <section className="relative pt-48 pb-24 bg-primary text-white overflow-hidden text-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-60 grayscale-0 scale-110 motion-safe:animate-[pulse_15s_ease-in-out_infinite]"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/75 via-primary/50 to-primary/20" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[160px]" />
                </div>

                <Container className="relative z-10">
                    <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.subtitle}</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.8] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        {t.title.split('').map((char, i) => (
                            <span key={i} className="inline-block animate-in slide-in-from-bottom-full duration-1000" style={{ transitionDelay: `${i * 30}ms` }}>{char}</span>
                        ))}
                    </h1>
                </Container>
            </section>

            <section className="py-32 md:py-64 bg-white relative">
                <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-start">
                        <div className="space-y-16 md:space-y-24">
                            <h2 className="text-4xl md:text-6xl font-black text-dark/20 uppercase tracking-tighter leading-none max-w-lg">
                                {t.desc}
                            </h2>

                            <div className="space-y-10">
                                <div className="flex gap-8 group transition-all">
                                    <div className="w-16 h-16 md:w-20 md:h-20 glass-navbar border-primary/5 rounded-[32px] flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:rotate-6 transition-all duration-500">
                                        <EnvelopeIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-dark/30 mb-3">Email Us</p>
                                        <p className="text-2xl md:text-3xl font-black text-dark group-hover:text-primary transition-colors">hello@sugoi8.id</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 group transition-all">
                                    <div className="w-16 h-16 md:w-20 md:h-20 glass-navbar border-secondary/10 rounded-[32px] flex items-center justify-center shrink-0 group-hover:bg-secondary/5 group-hover:-rotate-6 transition-all duration-500">
                                        <PhoneIcon className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-dark/30 mb-3">WhatsApp</p>
                                        <a href="https://wa.me/6285954464539" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl font-black text-dark group-hover:text-secondary transition-colors">{t.phone}</a>
                                    </div>
                                </div>
                                <div className="flex gap-8 group transition-all">
                                    <div className="w-16 h-16 md:w-20 md:h-20 glass-navbar border-primary/5 rounded-[32px] flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:rotate-3 transition-all duration-500">
                                        <MapPinIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-dark/30 mb-3">{t.office}</p>
                                        <p className="text-2xl md:text-3xl font-black text-dark leading-tight max-w-md">{t.officeDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-navbar p-10 md:p-16 lg:p-20 rounded-[60px] md:rounded-[80px] border-dark/5 relative overflow-hidden group">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] group-hover:bg-secondary/10 transition-all duration-1000" />

                            <h3 className="text-4xl md:text-5xl font-black text-dark uppercase mb-12 relative z-10">{t.formTitle}</h3>
                            <form className="space-y-8 md:space-y-12 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-6">Full Name</label>
                                        <input type="text" className="w-full bg-white/50 border border-dark/5 rounded-[32px] px-8 h-20 font-bold text-dark outline-none focus:border-primary focus:bg-white transition-all text-base" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-6">Email Address</label>
                                        <input type="email" className="w-full bg-white/50 border border-dark/5 rounded-[32px] px-8 h-20 font-bold text-dark outline-none focus:border-primary focus:bg-white transition-all text-base" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-6">Message</label>
                                    <textarea rows="5" className="w-full bg-white/50 border border-dark/5 rounded-[40px] p-8 font-bold text-dark outline-none focus:border-primary focus:bg-white transition-all resize-none text-base"></textarea>
                                </div>
                                <Button variant="primary" className="w-full h-20 md:h-24 text-[12px] md:text-sm font-black tracking-[0.3em] uppercase shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
                                    {t.btn}
                                </Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>
        </MainLayout>
    );
}
