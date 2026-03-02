import { useState, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Container from '../Components/UI/Container';
import Button from '../Components/UI/Button';
import {
    UsersIcon,
    StarIcon,
    LightBulbIcon,
    GlobeAsiaAustraliaIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

export default function About() {
    const [lang, setLang] = useState('en');
    const [darkMode, setDarkMode] = useState(false);
    const contactRef = useRef(null);

    const content = {
        en: {
            metaTitle: "About — Sugoi 8 Management",
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
            ],
            values: [
                { icon: UsersIcon, title: "Expert Team", desc: "Collaborating with market leaders across industries." },
                { icon: GlobeAsiaAustraliaIcon, title: "Global Network", desc: "Executing projects with international standards." },
                { icon: LightBulbIcon, title: "Innovation", desc: "Always first in technology and creative trends." },
            ],
            coreTitle: "Our Core Assets",
            // Contact section
            contactTag: "Get in Touch",
            contactTitle: "Let's Build Something Great.",
            contactDesc: "Have a vision? We have the expertise to bring it to life. Let's start a conversation today.",
            contactFormTitle: "Send a Message",
            contactOffice: "Our HQ",
            contactOfficeAddr: "Jl. Piere Tendean, Sumber Beringin, Karangrejo, Kec. Sumbersari, Kab. Jember, Jawa Timur 68124",
            contactPhone: "0859-5446-4539",
            contactEmail: "hello@sugoi8.id",
            contactPhoneLabel: "Phone / WhatsApp",
            contactBtn: "Submit Message",
            formName: "Your Name",
            formEmail: "Email Address",
            formMessage: "Message",
            brandingTitle: "Branding & Typography",
            brandingSubtitle: "The DNA of Our Visual Identity",
            brandingDesc: "Our visual identity is built on modern, geometric principles that reflect our commitment to precision and clean design.",
            fontMainTitle: "Primary Font: Gotham / Montserrat",
            fontMainDesc: "Identified by its modern geometric shapes and clean curves, our primary typeface embodies the 'Geometric Sans-Serif' aesthetic.",
            fontDetails: [
                { name: "Gotham (Premium)", detail: "A professional-grade typeface known for its balanced 'S' and sharp, tail-less 'G'. Standard for high-end design." },
                { name: "Montserrat (Web)", detail: "Our digital twin. Nearly identical in thickness and the circular geometry of the letter 'O', optimized for screen clarity." }
            ],
            typoDetails: [
                { part: "SUGOI", font: "Geometric Sans-Serif", style: "Bold weight for strength and impact." },
                { part: "MANAGEMENT", font: "Geometric Sans-Serif", style: "Light weight with expanded kerning for an elegant, premium feel." }
            ]
        },
        id: {
            metaTitle: "Tentang — Sugoi 8 Management",
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
            ],
            values: [
                { icon: UsersIcon, title: "Tim Ahli", desc: "Berkolaborasi dengan pemimpin pasar di berbagai industri." },
                { icon: GlobeAsiaAustraliaIcon, title: "Jaringan Global", desc: "Menjalankan proyek dengan standar internasional." },
                { icon: LightBulbIcon, title: "Inovasi", desc: "Selalu terdepan dalam teknologi dan tren kreatif." },
            ],
            coreTitle: "Keunggulan Kami",
            // Contact section
            contactTag: "Hubungi Kami",
            contactTitle: "Mari Bangun Sesuatu yang Hebat.",
            contactDesc: "Punya visi? Kami punya keahlian untuk mewujudkannya. Mari mulai percakapan hari ini.",
            contactFormTitle: "Kirim Pesan",
            contactOffice: "Kantor Pusat",
            contactOfficeAddr: "Jl. Piere Tendean, Sumber Beringin, Karangrejo, Kec. Sumbersari, Kab. Jember, Jawa Timur 68124",
            contactPhone: "0859-5446-4539",
            contactEmail: "hello@sugoi8.id",
            contactPhoneLabel: "Telepon / WhatsApp",
            contactBtn: "Kirim Pesan",
            formName: "Nama Anda",
            formEmail: "Alamat Email",
            formMessage: "Pesan",
            brandingTitle: "Branding & Tipografi",
            brandingSubtitle: "DNA Identitas Visual Kami",
            brandingDesc: "Identitas visual kami dibangun di atas prinsip geometris modern yang mencerminkan komitmen kami terhadap presisi dan desain yang bersih.",
            fontMainTitle: "Font Utama: Gotham / Montserrat",
            fontMainDesc: "Dilihat dari bentuk hurufnya yang modern dan geometris, font kami sangat identik dengan jenis Geometric Sans-Serif.",
            fontDetails: [
                { name: "Gotham (Premium)", detail: "Font profesional yang dikenal dengan huruf 'S' yang seimbang and 'G' siku yang tegas. Standar desain kelas atas." },
                { name: "Montserrat (Web)", detail: "Kembaran digital kami. Hampir identik dalam ketebalan dan bentuk lingkaran pada huruf 'O', dioptimalkan untuk kejernihan layar." }
            ],
            typoDetails: [
                { part: "SUGOI", font: "Geometric Sans-Serif", style: "Bobot Bold untuk kekuatan dan dampak visual." },
                { part: "MANAGEMENT", font: "Geometric Sans-Serif", style: "Bobot Light dengan kerning (jarak huruf) yang lebar untuk kesan elegan dan premium." }
            ]
        },
        jp: {
            metaTitle: "会社概要 — Sugoi 8 Management",
            title: "Sugoi 8について",
            subtitle: "クリエイティブマネジメントの再定義",
            desc: "卓越さとイノベーションの原則のもとに設立されたSugoi 8 Managementは、ブティックエージェンシーからクリエイティブソリューションの拠点へと成長しました。",
            vision: "ビジョン",
            visionDesc: "すべてのアイデアを傑作に仕上げる、クリエイティブマネジメントのグローバルベンチマークを目指します。",
            mission: "ミッション",
            missionDesc: "想像と現実の間のギャップを埋める、包括的なイベントおよびタレントソリューションを提供します。",
            stats: [
                { label: "年の経験", value: "10+" },
                { label: "成功したイベント", value: "500+" },
                { label: "グローバルパートナー", value: "120+" },
                { label: "クリエイター", value: "50+" },
            ],
            values: [
                { icon: UsersIcon, title: "専門チーム", desc: "各業界のリーダーと協力しています。" },
                { icon: GlobeAsiaAustraliaIcon, title: "グローバルネットワーク", desc: "国際基準でプロジェクトを実行します。" },
                { icon: LightBulbIcon, title: "イノベーション", desc: "テクノロジーとクリエイティブトレンドで常に先頭を走ります。" },
            ],
            coreTitle: "私たちの強み",
            // Contact section
            contactTag: "お問い合わせ",
            contactTitle: "一緒に素晴らしいものを作りましょう。",
            contactDesc: "ビジョンがありますか？それを実現する専門知識があります。今日から会話を始めましょう。",
            contactFormTitle: "メッセージを送る",
            contactOffice: "本社",
            contactOfficeAddr: "Jl. Piere Tendean, Sumber Beringin, Karangrejo, Kec. Sumbersari, Kab. Jember, Jawa Timur 68124",
            contactPhone: "0859-5446-4539",
            contactEmail: "hello@sugoi8.id",
            contactPhoneLabel: "電話 / WhatsApp",
            contactBtn: "メッセージを送信",
            formName: "お名前",
            formEmail: "メールアドレス",
            formMessage: "メッセージ",
            brandingTitle: "ブランディングとタイポグラフィ",
            brandingSubtitle: "私たちの視覚的アイデンティティのDNA",
            brandingDesc: "私たちの視覚的アイデンティティは、精密さとクリーンなデザインへのコミットメントを反映した、モダンで幾何学的な原則に基づいています。",
            fontMainTitle: "主要フォント: Gotham / Montserrat",
            fontMainDesc: "モダンな幾何学的形状とクリーンな曲線が特徴の主要フォントは、「ジオメトリック・サンセリフ」の美学を体現しています。",
            fontDetails: [
                { name: "Gotham (プレミアム)", detail: "バランスの取れた 'S' と鋭い 'G' で知られるプロフェッショナルな書体。高級デザインの標準です。" },
                { name: "Montserrat (ウェブ)", detail: "私たちのデジタルツイン。厚さと 'O' の円形幾何学においてほぼ同一で、画面の鮮明さに最適化されています。" }
            ],
            typoDetails: [
                { part: "SUGOI", font: "ジオメトリック・サンセリフ", style: "力強さとインパクトのためのボールドウェイト。" },
                { part: "MANAGEMENT", font: "ジオメトリック・サンセリフ", style: "エレガントでプレミアムな雰囲気のための、カーニングを広げたライトウェイト。" }
            ]
        },
    };

    const t = content[lang] || content['en'];

    return (
        <MainLayout lang={lang} onLangChange={setLang} darkMode={darkMode} onDarkModeToggle={setDarkMode}>
            <Head title={t.metaTitle} />

            {/* ── 1. HERO ── */}
            <section className="relative min-h-[600px] pt-52 pb-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-70 grayscale-0 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                        style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }}
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/25 to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Dot grid */}
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }} />

                    {/* Soft Glow Orbs */}
                    <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[160px] animate-pulse" />
                    <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />

                    {/* Vertical Text Branding */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 opacity-20">
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">CREATIVE EXCELLENCE</span>
                        <div className="w-px h-24 bg-linear-to-b from-transparent via-white to-transparent" />
                    </div>

                    {/* Giant Ghost "8" */}
                    <div className="absolute -right-20 bottom-0 text-[30rem] font-black text-white/2 leading-none select-none">
                        8
                    </div>
                </div>
                <Container className="relative z-10">
                    <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-700">{t.subtitle}</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-8 text-white leading-[0.9]">
                        {t.title}
                    </h1>
                    <p className="text-base md:text-xl text-white/50 font-medium leading-relaxed max-w-2xl mt-8 italic border-l-4 border-secondary pl-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                        {t.desc}
                    </p>
                </Container>
            </section>

            {/* ── 2. STATS ── */}
            <section className="border-y border-white/10 bg-primary/95">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {t.stats.map((stat, i) => (
                            <div key={i} className={`py-8 px-6 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
                                <p className="text-2xl md:text-3xl font-black text-secondary mb-1">{stat.value}</p>
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 3. VISION & MISSION ── */}
            <section className="py-24 md:py-40 bg-white">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                        <div className="space-y-12 md:space-y-16 order-2 lg:order-1">
                            <div>
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                                    <StarIcon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-dark uppercase mb-4 md:mb-6">{t.vision}</h2>
                                <p className="text-lg md:text-xl text-dark/60 leading-relaxed font-medium">{t.visionDesc}</p>
                            </div>
                            <div>
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                                    <LightBulbIcon className="w-7 h-7 md:w-8 md:h-8 text-secondary" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-dark uppercase mb-4 md:mb-6">{t.mission}</h2>
                                <p className="text-lg md:text-xl text-dark/60 leading-relaxed font-medium">{t.missionDesc}</p>
                            </div>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-4/5 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Team" />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── 4. VALUES ── */}
            <section className="py-24 md:py-40 bg-light">
                <Container>
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-4xl md:text-5xl font-black text-dark uppercase tracking-tighter">{t.coreTitle}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {t.values.map((v, i) => (
                            <div key={i} className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-dark/5">
                                <v.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-6 md:mb-8" />
                                <h3 className="text-xl md:text-2xl font-black text-dark mb-4">{v.title}</h3>
                                <p className="text-sm md:text-base text-dark/40 font-medium">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 4.5 BRANDING & TYPOGRAPHY ── */}
            <section className="py-24 md:py-40 bg-zinc-50 overflow-hidden">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                        <div>
                            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block mb-4">{t.brandingSubtitle}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-dark uppercase tracking-tighter mb-8">{t.brandingTitle}</h2>
                            <p className="text-lg text-dark/60 font-medium mb-12 leading-relaxed max-w-xl">
                                {t.brandingDesc}
                            </p>

                            <div className="space-y-10">
                                <div className="bg-white p-8 rounded-3xl border border-dark/5 shadow-sm">
                                    <h3 className="text-xl font-black text-dark mb-4 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-xs">Aa</div>
                                        {t.fontMainTitle}
                                    </h3>
                                    <p className="text-sm text-dark/50 font-medium mb-6 leading-relaxed">
                                        {t.fontMainDesc}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {t.fontDetails.map((f, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-light/50 border border-dark/5">
                                                <p className="text-xs font-black text-dark mb-2 uppercase tracking-wider">{f.name}</p>
                                                <p className="text-[11px] text-dark/40 font-medium leading-relaxed">{f.detail}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="p-8 md:p-12 bg-primary rounded-[40px] md:rounded-[60px] text-white shadow-2xl relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/60 mb-12">Visual Composition</p>

                                <div className="space-y-12">
                                    {t.typoDetails.map((item, i) => (
                                        <div key={i} className="group">
                                            <div className="flex flex-col mb-4">
                                                <span className={`text-white transition-all duration-500 ${item.part === 'SUGOI' ? 'text-6xl md:text-8xl font-black tracking-tight' : 'text-xl md:text-2xl font-bold tracking-[0.4em]'}`}>
                                                    {item.part}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                                                <span className="text-secondary">{item.font}</span>
                                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                                <span>{item.style}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative Background Elements */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] z-0" />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-[60px] z-0" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── 5. CONTACT ── */}
            <section
                id="contact"
                ref={contactRef}
                className="py-24 md:py-40 bg-white scroll-mt-24"
            >
                <Container>
                    <div className="mb-12 md:mb-20">
                        <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block mb-4">{t.contactTag}</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-dark uppercase leading-none">
                            {t.contactTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                        {/* Left: info kontak */}
                        <div className="space-y-8 md:space-y-10">
                            <p className="text-2xl md:text-3xl font-black text-dark/30 leading-tight">{t.contactDesc}</p>

                            <div className="space-y-6">
                                {/* WhatsApp / Phone */}
                                <a
                                    href="https://wa.me/6285954464539"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-6 md:gap-8 border-b border-dark/5 pb-6 md:pb-8 group"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-light rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                                        <PhoneIcon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40 mb-1 md:mb-2">{t.contactPhoneLabel}</p>
                                        <p className="text-xl md:text-2xl font-black text-dark group-hover:text-primary transition-colors">{t.contactPhone}</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href={`mailto:${t.contactEmail}`}
                                    className="flex gap-6 md:gap-8 border-b border-dark/5 pb-6 md:pb-8 group"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-light rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                                        <EnvelopeIcon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40 mb-1 md:mb-2">Email</p>
                                        <p className="text-xl md:text-2xl font-black text-dark group-hover:text-primary transition-colors break-all">{t.contactEmail}</p>
                                    </div>
                                </a>

                                {/* Alamat */}
                                <div className="flex gap-6 md:gap-8 pb-6 md:pb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-light rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPinIcon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-dark/40 mb-1 md:mb-2">{t.contactOffice}</p>
                                        <p className="text-lg md:text-xl font-black text-dark leading-snug">{t.contactOfficeAddr}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: form */}
                        <div className="bg-light p-8 md:p-16 lg:p-20 rounded-[40px] md:rounded-[60px] shadow-sm">
                            <h3 className="text-3xl md:text-4xl font-black text-dark uppercase mb-8 md:mb-12">{t.contactFormTitle}</h3>
                            <form className="space-y-6 md:space-y-8">
                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">{t.formName}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-dark/5 rounded-2xl md:rounded-3xl p-5 md:p-6 font-bold text-dark outline-none focus:border-primary transition-colors h-16 md:h-20 text-sm md:text-base"
                                    />
                                </div>
                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">{t.formEmail}</label>
                                    <input
                                        type="email"
                                        className="w-full bg-white border border-dark/5 rounded-2xl md:rounded-3xl p-5 md:p-6 font-bold text-dark outline-none focus:border-primary transition-colors h-16 md:h-20 text-sm md:text-base"
                                    />
                                </div>
                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">{t.formMessage}</label>
                                    <textarea
                                        rows="4"
                                        className="w-full bg-white border border-dark/5 rounded-[24px] md:rounded-[32px] p-5 md:p-6 font-bold text-dark outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"
                                    />
                                </div>
                                <Button variant="primary" className="w-full h-16 md:h-20 text-[10px] md:text-xs font-black tracking-widest shadow-2xl shadow-primary/20">
                                    {t.contactBtn}
                                </Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>
        </MainLayout>
    );
}
