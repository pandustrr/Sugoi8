import Container from './UI/Container';
import { Link } from '@inertiajs/react';

export default function Footer({ settings = {} }) {
    const email = settings?.contact_email || 'hello@sugoi8.id';
    const waDisplay = settings?.contact_wa || '0859-5446-4539';
    const waNumber = waDisplay.replace(/[^0-9]/g, '').replace(/^0/, '62');

    return (
        <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/5">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <img
                                src="/logo-putih.png"
                                alt="Sugoi 8 Management"
                                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-white/40 max-w-sm mb-8 text-base leading-relaxed font-medium">
                            Redefining the creative landscape through elite talent management, cutting-edge production, and strategic brand solutions.
                        </p>
                        <div className="flex gap-4">
                            {[
                                {
                                    name: 'Instagram',
                                    href: '#',
                                    svg: <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                },
                                {
                                    name: 'LinkedIn',
                                    href: '#',
                                    svg: <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                },
                                {
                                    name: 'WhatsApp',
                                    href: '#',
                                    svg: <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fillRule="evenodd" d="M12.031 0C5.385 0 0 5.384 0 12.031c0 2.126.549 4.192 1.593 6.015L.175 24l6.101-1.598A11.97 11.97 0 0012.031 24C18.675 24 24 18.614 24 11.969 24 5.32 18.625 0 11.984 0h.047zM6.91 5.922c-.287 0-.756.108-1.152.535-.395.428-1.508 1.474-1.508 3.593S5.803 14.21 5.922 14.37c.108.161 2.766 4.417 6.845 6.088 2.871 1.178 3.992 1.025 4.71.861.85-.195 2.656-1.085 3.033-2.13.376-1.045.376-1.942.263-2.13-.112-.186-.411-.295-.861-.518-.45-.224-2.655-1.311-3.068-1.462-.412-.153-.717-.224-1.022.224-.305.45-1.15 1.462-1.408 1.767-.26.305-.512.342-.962.116-2.455-1.228-3.924-2.28-5.393-4.502-.341-.518.341-.482 1.213-2.214.162-.324.081-.61-.035-.833-.116-.224-1.022-2.463-1.408-3.374-.376-.884-.757-.764-1.023-.778-.26-.013-.565-.013-.87-.013z" clipRule="evenodd" /></svg>
                                }
                            ].map((social) => (
                                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-dark transition-all duration-300 cursor-pointer shadow-xl hover:shadow-secondary/20">
                                    <span className="sr-only">{social.name}</span>
                                    {social.svg}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Navigation</h4>
                        <ul className="space-y-3">
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
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Connect</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Location</p>
                                <p className="text-sm font-bold text-white/60">Kab. Jember, Jawa Timur</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Inquiries</p>
                                <p className="text-sm font-bold text-white/60">{email}</p>
                            </div>
                            <Link href="/contact" className="inline-block text-[10px] font-black uppercase tracking-widest bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
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
