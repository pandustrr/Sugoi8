import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';

export default function Portfolio() {
    const [lang, setLang] = useState('en');
    const [filter, setFilter] = useState('All');

    const categoriesEn = ['All', 'MICE', 'Show Management', 'EO', 'Production'];
    const categoriesId = ['Semua', 'MICE', 'Manajemen Show', 'EO', 'Produksi'];

    const items = [
        { title: 'Global Tech Summit', category: 'MICE', year: '2024', image: 'https://images.unsplash.com/photo-1540575861501-7c037137b204?auto=format&fit=crop&q=80&w=800' },
        { title: 'Neon Lights Festival', category: 'Show Management', year: '2023', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
        { title: 'Luxury Brand Launch', category: 'EO', year: '2024', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800' },
        { title: 'Corporate Gala Dinner', category: 'EO', year: '2023', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
        { title: 'Digital Innovation Expo', category: 'Production', year: '2024', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800' },
        { title: 'Influencer Gathering', category: 'Show Management', year: '2024', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800' },
    ];

    const filteredItems = filter === 'All' || filter === 'Semua' ? items : items.filter(item => item.category === filter);

    const t = {
        en: {
            title: "Portfolio",
            subtitle: "Our Creative Journey",
            desc: "A showcase of exceptional experiences we've crafted for world-class brands."
        },
        id: {
            title: "Portofolio",
            subtitle: "Perjalanan Kreatif Kami",
            desc: "Kumpulan pengalaman luar biasa yang telah kami rancang untuk brand kelas dunia."
        }
    }[lang];

    return (
        <MainLayout lang={lang} onLangChange={setLang}>
            <Head title={t.title} />

            <section className="relative pt-40 pb-20 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1551817958-c1995a75cf2d?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-10 grayscale"
                        alt="Portfolio Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-primary/40" />
                </div>
                <Container className="relative z-10">
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 block">{t.subtitle}</span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 md:mb-12 leading-none">
                        {t.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-2xl font-medium leading-relaxed">
                        {t.desc}
                    </p>
                </Container>
            </section>

            <section className="py-16 md:py-24 bg-white min-h-screen">
                <Container>
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-12 md:mb-20">
                        {(lang === 'en' ? categoriesEn : categoriesId).map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setFilter(cat)}
                                className={`px-5 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-primary text-white shadow-lg' : 'bg-light text-dark/40 hover:bg-dark/5'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {filteredItems.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-4/5 rounded-[32px] md:rounded-[40px] overflow-hidden mb-6 md:mb-8 relative shadow-xl">
                                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.title} />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="px-2 md:px-4">
                                    <p className="text-secondary text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2">{item.category} • {item.year}</p>
                                    <h3 className="text-2xl md:text-3xl font-black text-dark group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </MainLayout>
    );
}
