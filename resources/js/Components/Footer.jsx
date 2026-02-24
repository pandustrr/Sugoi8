import Container from './UI/Container';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-dark text-white pt-24 pb-12 border-t border-white/5">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-8 group">
                            <span className="text-3xl font-black tracking-tighter text-white uppercase italic">SUGOI</span>
                            <div className="w-10 h-10 flex items-center justify-center bg-gradient-logo rounded-xl transition-transform group-hover:rotate-12">
                                <span className="text-white font-black text-2xl">8</span>
                            </div>
                        </Link>
                        <p className="text-white/40 max-w-sm mb-10 text-lg leading-relaxed font-medium">
                            Redefining the creative landscape through elite talent management, cutting-edge production, and strategic brand solutions.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { name: 'Instagram', path: 'M12 2.163...' },
                                { name: 'TikTok', path: 'M12.525.02...' }
                            ].map((social) => (
                                <div key={social.name} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-dark transition-all duration-300 cursor-pointer shadow-xl hover:shadow-secondary/20">
                                    <span className="sr-only">{social.name}</span>
                                    <div className="w-6 h-6 bg-current opacity-70" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'About', href: '/about' },
                                { name: 'Services', href: '/services' },
                                { name: 'Portfolio', href: '/portfolio' },
                                { name: 'Partners', href: '/partners' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm font-bold text-white/50 hover:text-secondary transition-colors underline-offset-4 hover:underline">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Connect</h4>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Location</p>
                                <p className="text-sm font-bold text-white/60">Kab. Jember, Jawa Timur</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Inquiries</p>
                                <p className="text-sm font-bold text-white/60">hello@sugoi8.id</p>
                            </div>
                            <Link href="/contact" className="inline-block text-[10px] font-black uppercase tracking-widest bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                        © {new Date().getFullYear()} SUGOI 8 MANAGEMENT. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-10">
                        <small className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white cursor-pointer transition-colors">Privacy Policy</small>
                        <small className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white cursor-pointer transition-colors">Terms of Service</small>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
