import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useLang } from '../hooks/useLang';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import TextRun from '../Components/UI/TextRun';
import {
    CalendarIcon,
    TicketIcon,
    PresentationChartBarIcon,
    WrenchScrewdriverIcon,
    ArrowRightIcon,
    SparklesIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

import { SERVICE_SUB_ITEMS } from '@/constants/serviceItems';

export default function Services() {
    const { settings } = usePage().props;
    const [lang, setLang] = useLang('en');
    const [darkMode, setDarkMode] = useState(false);

    const getLabel = (catId, item, overrideLang) => {
        const targetLang = overrideLang || lang;
        const key = `service_item_label_${catId}_${item.id}_${targetLang}`;
        return settings?.[key] || (targetLang === 'id' ? item.id_label : item.en);
    };

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
                    id: 'eo',
                    title: "Event Organizer",
                    items: SERVICE_SUB_ITEMS.eo.map(i => ({ id: i.id, label: getLabel('eo', i, 'en') })),
                    icon: CalendarIcon,
                    image: serviceImages.event_organizer
                },
                {
                    id: 'show',
                    title: "Show Management",
                    items: SERVICE_SUB_ITEMS.show.map(i => ({ id: i.id, label: getLabel('show', i, 'en') })),
                    icon: TicketIcon,
                    image: serviceImages.show_management
                },
                {
                    id: 'mice',
                    title: "Service MICE",
                    items: SERVICE_SUB_ITEMS.mice.map(i => ({ id: i.id, label: getLabel('mice', i, 'en') })),
                    icon: PresentationChartBarIcon,
                    image: serviceImages.mice
                },
                {
                    id: 'production',
                    title: "Production & Equipment",
                    items: SERVICE_SUB_ITEMS.production.map(i => ({ id: i.id, label: getLabel('production', i, 'en') })),
                    icon: WrenchScrewdriverIcon,
                    image: serviceImages.production
                },
                {
                    id: 'digital',
                    title: "Digital Solutions",
                    items: SERVICE_SUB_ITEMS.digital.map(i => ({ id: i.id, label: getLabel('digital', i, 'en') })),
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
                    id: 'eo',
                    title: "Penyelenggara Acara",
                    items: SERVICE_SUB_ITEMS.eo.map(i => ({ id: i.id, label: getLabel('eo', i, 'id') })),
                    icon: CalendarIcon,
                    image: serviceImages.event_organizer
                },
                {
                    id: 'show',
                    title: "Manajemen Pertunjukan",
                    items: SERVICE_SUB_ITEMS.show.map(i => ({ id: i.id, label: getLabel('show', i, 'id') })),
                    icon: TicketIcon,
                    image: serviceImages.show_management
                },
                {
                    id: 'mice',
                    title: "Layanan MICE",
                    items: SERVICE_SUB_ITEMS.mice.map(i => ({ id: i.id, label: getLabel('mice', i, 'id') })),
                    icon: PresentationChartBarIcon,
                    image: serviceImages.mice
                },
                {
                    id: 'production',
                    title: "Produksi & Peralatan",
                    items: SERVICE_SUB_ITEMS.production.map(i => ({ id: i.id, label: getLabel('production', i, 'id') })),
                    icon: WrenchScrewdriverIcon,
                    image: serviceImages.production
                },
                {
                    id: 'digital',
                    title: "Solusi Digital",
                    items: SERVICE_SUB_ITEMS.digital.map(i => ({ id: i.id, label: getLabel('digital', i, 'id') })),
                    icon: SparklesIcon,
                    image: serviceImages.digital
                }
            ]
        }
    };

    const t = content[lang] || content['en'];
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemCatId, setItemCatId] = useState(null);
    const [isCategoryView, setIsCategoryView] = useState(false);

    // Lock body scroll when modal is open so modal content can scroll independently
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedItem]);


    const openModal = (item, catId, isCat = false) => {
        setSelectedItem(item);
        setItemCatId(catId);
        setIsCategoryView(isCat);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setItemCatId(null);
        setIsCategoryView(false);
    };

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head>
                <title>{t.title}</title>
                <meta name="description" content={t.desc} />
                <meta name="keywords" content="layanan event jember, eo jember, jasa panggung jember, sewa alat panggung jember, mice jember, digital solution jember" />
            </Head>

            {/* Modal via Portal — renders directly on body, bypasses overflow-x-hidden on layout */}
            {selectedItem && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-200 flex items-center justify-center p-2 sm:p-6 md:p-10">
                    <div
                        className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* Visual-First Modal: Photo & Gallery Only */}
                    <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl md:rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.35)] border border-dark/5 flex flex-col animate-in zoom-in-95 duration-300" style={{ maxHeight: '92vh', overflow: 'hidden' }}>

                        {/* Header */}
                        <div className="px-5 py-4 md:px-6 md:py-5 border-b border-dark/5 flex items-center justify-between shrink-0 bg-white z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <h4 className="text-[10px] font-black text-dark uppercase tracking-widest">
                                    {isCategoryView ? 'SERVICE CAPABILITIES' : 'PROJECT GALLERY'}
                                </h4>
                            </div>
                            <button onClick={closeModal} className="p-2 bg-light hover:bg-dark text-dark/40 hover:text-white rounded-full transition-all">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto min-h-0 bg-[#fefefe]">

                            {/* Banner Image */}
                            <div className="w-full aspect-21/9 md:aspect-2.5/1 relative overflow-hidden group">
                                {(() => {
                                    const slug = isCategoryView ? null : selectedItem.id;
                                    const mainImg = isCategoryView
                                        ? serviceImages[itemCatId === 'eo' ? 'event_organizer' : itemCatId === 'show' ? 'show_management' : itemCatId]
                                        : settings?.[`service_item_${itemCatId}_${slug}_main`];
                                    return (
                                        <img
                                            src={mainImg || `https://placehold.co/1200x500/1a1a1a/ffffff?text=${isCategoryView ? selectedItem : selectedItem.label}`}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            alt={isCategoryView ? selectedItem : selectedItem.label}
                                        />
                                    );
                                })()}
                                <div className="absolute inset-0 bg-linear-to-t from-dark/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 md:left-8 text-left">
                                    <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] mb-1">SUGOI GALLERY</p>
                                <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
                                    {isCategoryView ? selectedItem : selectedItem.label}
                                </h3>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="px-5 py-6 md:px-10 md:py-10">
                            {isCategoryView ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                                    {t.list.find(l => l.id === itemCatId)?.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-dark/5 hover:border-secondary/20 transition-all shadow-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                            <span className="font-bold text-dark text-[11px] uppercase tracking-wide">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.3em] shrink-0">Photos</p>
                                        <div className="h-px w-full bg-dark/5" />
                                    </div>

                                    {(() => {
                                        const slug = selectedItem.id;
                                        const subImgs = [];
                                        if (slug) {
                                            let idx = 1;
                                            while (idx <= 100) {
                                                const img = settings?.[`service_item_${itemCatId}_${slug}_sub_${idx}`];
                                                if (!img && idx > 6) break;
                                                subImgs.push({ i: idx, img: img || null });
                                                idx++;
                                            }
                                        }

                                        return (
                                            <div className="grid grid-cols-3 gap-2 md:gap-4">
                                                {subImgs.map(({ i, img }) => (
                                                    <div key={i} className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-dark/5 bg-light ${img ? 'shadow-md group cursor-zoom-in' : 'opacity-[0.15]'}`}>
                                                        {img
                                                            ? <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Gallery ${i}`} />
                                                            : <div className="w-full h-full flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-dark/10" /></div>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-4 md:px-8 md:py-6 border-t border-dark/5 shrink-0 bg-white">
                        <button
                            onClick={closeModal}
                            className="w-full py-4 bg-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-secondary transition-all"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
            , document.body)}


        <section className="relative min-h-[600px] pt-52 pb-24 bg-primary text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                {heroImage?.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                    <video
                        src={heroImage}
                        className="w-full h-full object-cover opacity-70 scale-110"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <img
                        src={heroImage}
                        className="w-full h-full object-cover opacity-70 grayscale-0 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                        alt="Hero Background"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/25 to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }} />
                <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transform-gpu" />
                <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-20 pointer-events-none">
                    <div className="w-px h-32 bg-linear-to-b from-transparent via-white to-transparent" />
                    <span className="text-[12px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">CREATIVE EXCELLENCE</span>
                    <div className="w-px h-32 bg-linear-to-b from-transparent via-white to-transparent" />
                </div>
                <div className="absolute -left-20 bottom-0 text-[30rem] font-black text-white/2 uppercase leading-none select-none tracking-tighter rotate-[-5deg]">
                    EXPERT
                </div>
            </div>

            <Container className="relative z-10">
                <div className="max-w-4xl text-left">
                    <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.subtitle}</span>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-10 text-white leading-[0.85] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        {(settings?.[`services_title_${lang}`] || t.title).split(' ').map((word, i) => (
                            <span key={i} className="block overflow-hidden">
                                <span className="block animate-in slide-in-from-bottom-full duration-1000" style={{ transitionDelay: `${i * 150}ms` }}>
                                    {word}
                                </span>
                            </span>
                        ))}
                    </h1>
                    <p className="text-sm md:text-xl text-white/50 font-medium leading-relaxed max-w-2xl mt-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 italic border-l-4 border-secondary pl-6">
                        {settings?.[`services_desc_${lang}`] || t.desc}
                    </p>
                </div>
            </Container>
        </section>

        <TextRun />

        <section className="pt-12 md:pt-24 pb-20 md:pb-36 bg-white overflow-hidden">
            <Container>
                <div className="space-y-16 md:space-y-36">
                    {t.list.map((s, i) => {
                        const catId = s.id;

                        return (
                            <div key={i} className={`flex flex-col lg:flex-row gap-8 md:gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div
                                    className="w-full lg:w-5/12 relative group max-w-2xl lg:max-w-none cursor-pointer"
                                    onClick={() => openModal(s.title, catId, true)}
                                >
                                    <div className="w-full h-[200px] md:h-[380px] lg:h-[450px] rounded-[20px] md:rounded-[40px] lg:rounded-[56px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative transform-gpu">
                                        <img
                                            src={s.image}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 will-change-transform"
                                            alt={s.title}
                                        />
                                        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-all duration-500 flex items-center justify-center">
                                            <div className="bg-white/90 p-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl scale-75 group-hover:scale-100">
                                                <SparklesIcon className="w-8 h-8 text-primary" />
                                            </div>
                                        </div>
                                        {/* Arrow hint badge */}
                                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/50 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            <span className="text-[9px] font-black text-dark uppercase tracking-widest">Overview</span>
                                            <ArrowRightIcon className="w-3 h-3 text-primary" />
                                        </div>
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
                                            {settings?.[`service_title_${catId}_${lang}`] || s.title}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                                        {s.items.map((item, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => openModal(item, catId)}
                                                    className="flex items-center gap-2 p-3 md:p-5 glass-navbar rounded-[20px] border-dark/5 hover:border-primary/20 hover:scale-105 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer transition-all duration-500 group"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:animate-ping shrink-0" />
                                                    <span className="font-extrabold text-white text-[10px] md:text-sm flex-1">{item.label}</span>
                                                    <ArrowRightIcon className="w-3 h-3 text-white/30 group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
        </MainLayout>
    );
}

