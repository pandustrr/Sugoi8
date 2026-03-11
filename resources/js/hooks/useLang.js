import { useState } from "react";

const STORAGE_KEY = "sugoi_lang";

/**
 * Hook untuk bahasa yang persisten via localStorage.
 * Ketika user ganti bahasa, pilihan tersimpan dan dipakai
 * di semua halaman secara otomatis.
 */
export function useLang(defaultLang = "en") {
    const getInitial = () => {
        try {
            return localStorage.getItem(STORAGE_KEY) || defaultLang;
        } catch {
            return defaultLang;
        }
    };

    const [lang, setLangState] = useState(getInitial);

    const setLang = (newLang) => {
        try {
            localStorage.setItem(STORAGE_KEY, newLang);
        } catch {
            /* ignore */
        }
        setLangState(newLang);
    };

    return [lang, setLang];
}
