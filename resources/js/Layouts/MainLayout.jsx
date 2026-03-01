import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import WhatsAppWidget from '../Components/UI/WhatsAppWidget';

export default function MainLayout({ children, lang = 'en', onLangChange, darkMode, onDarkModeToggle }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-700 selection:bg-primary/30 ease-in-out overflow-x-hidden relative mesh-gradient ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </Head>
            {/* Premium Grain Texture */}
            <div className="grain-overlay" />

            <Navbar lang={lang} onLangChange={onLangChange} darkMode={darkMode} onDarkModeToggle={onDarkModeToggle} />

            <main className={`relative isolate grow transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.99]'}`}>
                {children}
            </main>

            <Footer darkMode={darkMode} />
            <WhatsAppWidget />
        </div>
    );
}
