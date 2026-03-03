import React from 'react';

const TextRun = ({ className = "bg-secondary py-3" }) => {
    const items = [
        "Event Organizer",
        "Show Management",
        "MICE Services",
        "Production",
        "Digital Solutions",
        "Event Branding",
        "Talent Handling",
        "Sugoi 8 Management"
    ];

    return (
        <div className={`${className} overflow-hidden border-y border-dark/5`}>
            <div className="flex items-center whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
                {Array(4).fill(null).map((_, gi) => (
                    <span key={gi} className="flex items-center gap-8 px-8 shrink-0">
                        {items.map((item, i) => (
                            <React.Fragment key={i}>
                                <span className="text-dark font-black uppercase tracking-widest text-[10px]">{item}</span>
                                <span className="text-dark/40 text-lg">✦</span>
                            </React.Fragment>
                        ))}
                    </span>
                ))}
            </div>
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                `}
            </style>
        </div>
    );
};

export default TextRun;
