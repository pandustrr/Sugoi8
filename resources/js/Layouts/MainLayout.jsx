import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function MainLayout({ children, lang = 'en', onLangChange }) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-dark selection:bg-primary/30">
            <Navbar lang={lang} onLangChange={onLangChange} />

            <main className="relative isolate grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
