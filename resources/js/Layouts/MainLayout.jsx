import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function MainLayout({ children, lang = 'en', onLangChange, darkMode, onDarkModeToggle }) {
    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 selection:bg-primary/30 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <Navbar lang={lang} onLangChange={onLangChange} darkMode={darkMode} onDarkModeToggle={onDarkModeToggle} />

            <main className="relative isolate grow">
                {children}
            </main>

            <Footer darkMode={darkMode} />
        </div>
    );
}
