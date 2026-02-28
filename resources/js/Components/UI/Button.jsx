import { Link } from '@inertiajs/react';

export default function Button({ children, href, className = '', variant = 'primary', ...props }) {
    const baseClasses = "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase";

    const variants = {
        primary: "bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary/90 focus-visible:outline-primary relative overflow-hidden after:absolute after:inset-0 after:bg-linear-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-1000",
        secondary: "bg-secondary text-dark shadow-xl shadow-secondary/20 hover:bg-secondary/90 focus-visible:outline-secondary relative overflow-hidden after:absolute after:inset-0 after:bg-linear-to-r after:from-transparent after:via-white/40 after:to-transparent after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-1000",
        dark: "bg-dark text-white hover:bg-dark/90 focus-visible:outline-dark",
        outline: "bg-transparent text-primary ring-2 ring-primary hover:bg-primary hover:text-white transition-all",
        ghost: "bg-black/5 text-dark hover:bg-black/10",
        white: "bg-white text-primary shadow-sm hover:bg-light transition-colors",
    };

    const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
