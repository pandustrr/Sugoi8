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

    const t = {
        en: {
            title: "Connect",
            subtitle: "Get in Touch",
            desc: "Have a vision? We have the expertise to bring it to life. Let's start a conversation today.",
            formTitle: "Send a Message",
            office: "Our HQ",
            officeDesc: "Jakarta, Indonesia",
            btn: "Submit Message"
        },
        id: {
            title: "Hubungi",
            subtitle: "Mari Bicara",
            desc: "Punya visi? Kami punya keahlian untuk mewujudkannya. Mari mulai percakapan hari ini.",
            formTitle: "Kirim Pesan",
            office: "Kantor Pusat",
            officeDesc: "Jakarta, Indonesia",
            btn: "Kirim Pesan"
        }
    }[lang];

    return (
        <MainLayout lang={lang} onLangChange={setLang}>
            <Head title={t.title} />

            <section className="relative pt-40 pb-20 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-10 grayscale"
                        alt="Contact Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary/40" />
                </div>
                <Container className="relative z-10">
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 block">{t.subtitle}</span>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
                        {t.title}
                    </h1>
                </Container>
            </section>

            <section className="py-24 md:py-40 bg-white">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                        <div className="space-y-12 md:space-y-16">
                            <p className="text-3xl md:text-4xl font-black text-dark/30 leading-tight">
                                {t.desc}
                            </p>

                            <div className="space-y-8 md:space-y-12">
                                <div className="flex gap-6 md:gap-8 border-b border-dark/5 pb-8 md:pb-10">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-light rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                        <EnvelopeIcon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40 mb-1 md:mb-2">Email Us</p>
                                        <p className="text-xl md:text-2xl font-black text-dark break-all">hello@sugoi8.id</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 md:gap-8 border-b border-dark/5 pb-8 md:pb-10">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-light rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPinIcon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40 mb-1 md:mb-2">{t.office}</p>
                                        <p className="text-xl md:text-2xl font-black text-dark">{t.officeDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light p-8 md:p-16 lg:p-20 rounded-[40px] md:rounded-[60px] shadow-sm">
                            <h3 className="text-3xl md:text-4xl font-black text-dark uppercase mb-8 md:mb-12">{t.formTitle}</h3>
                            <form className="space-y-6 md:space-y-8">
                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Full Name</label>
                                    <input type="text" className="w-full bg-white border border-dark/5 rounded-2xl md:rounded-3xl p-5 md:p-6 font-bold text-dark outline-none focus:border-primary transition-colors h-16 md:h-20 text-sm md:text-base" />
                                </div>
                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Email Address</label>
                                    <input type="email" className="w-full bg-white border border-dark/5 rounded-2xl md:rounded-3xl p-5 md:p-6 font-bold text-dark outline-none focus:border-primary transition-colors h-16 md:h-20 text-sm md:text-base" />
                                </div>
                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Message</label>
                                    <textarea rows="4" className="w-full bg-white border border-dark/5 rounded-[24px] md:rounded-[32px] p-5 md:p-6 font-bold text-dark outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"></textarea>
                                </div>
                                <Button variant="primary" className="w-full h-16 md:h-20 text-[10px] md:text-xs font-black tracking-widest shadow-2xl shadow-primary/20">
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
