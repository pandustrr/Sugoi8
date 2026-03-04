import { useState, useMemo } from 'react';
import { useForm, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    PhotoIcon,
    ArrowPathIcon,
    XMarkIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export const SERVICE_IMAGES = [
    {
        id: 'eo',
        key: 'service_img_event_organizer',
        label: 'Event Organizer',
        default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'show',
        key: 'service_img_show_management',
        label: 'Show Management',
        default: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'mice',
        key: 'service_img_mice',
        label: 'Service MICE',
        default: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'production',
        key: 'service_img_production',
        label: 'Production & Equipment',
        default: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'digital',
        key: 'service_img_digital',
        label: 'Digital Solutions',
        default: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    },
];

function ServiceItemModal({ categoryId, item, onBlur, settings }) {
    const slug = item?.toLowerCase().replace(/\s+/g, '_');
    const mainKey = `service_item_${categoryId}_${slug}_main`;
    const { data, setData, post, processing, reset } = useForm({
        image: null,
        key: mainKey,
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [extraSlots, setExtraSlots] = useState(0);

    // Count how many sub images already exist in settings
    const existingCount = useMemo(() => {
        let count = 0;
        while (settings[`service_item_${categoryId}_${slug}_sub_${count + 1}`]) {
            count++;
        }
        return count;
    }, [settings, categoryId, slug]);

    const totalSlots = existingCount + 1 + extraSlots; // existing + 1 empty + extras

    const handleFile = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            setData({ image: file, key: key });
        }
    };

    const handleSubmit = (e, key) => {
        if (e) e.preventDefault();
        post(route('admin.siteSettings.update'), {
            onSuccess: () => {
                reset('image');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            forceFormData: true,
        });
    };


    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity duration-500"
                onClick={onBlur}
            />

            <div className="relative z-10 w-full max-w-md bg-white rounded-[40px] shadow-2xl border border-dark/5 flex flex-col animate-in zoom-in-95 duration-300" style={{ height: '90vh', overflow: 'hidden' }}>
                {/* Static Header */}
                <div className="p-8 pb-4 border-b border-dark/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <h4 className="text-xs font-black text-dark uppercase tracking-widest leading-none">GALLERY: {item}</h4>
                    </div>
                    <button onClick={onBlur} className="p-2.5 bg-light hover:bg-dark text-dark/40 hover:text-white rounded-full transition-all group shadow-sm">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 space-y-8" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
                    {isSuccess && (
                        <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center justify-center gap-2">
                            <CheckCircleIcon className="w-4 h-4" /> Updated Successfully
                        </div>
                    )}

                    {/* Main Image for Item */}
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase text-dark/30 tracking-widest">Display Photo</p>
                        <div className="aspect-video bg-light rounded-3xl overflow-hidden border border-dark/5 relative group">
                            <img
                                src={(data.image && data.key === mainKey) ? URL.createObjectURL(data.image) : (settings[mainKey] || "https://placehold.co/800x450/f8f8f8/dark?text=" + item)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt={item}
                            />
                        </div>
                        <div className="flex gap-2">
                            <input type="file" id={`file-${mainKey}`} className="hidden" accept="image/*" onChange={(e) => handleFile(e, mainKey)} />
                            <label htmlFor={`file-${mainKey}`} className="flex-1 py-3 bg-light border border-dark/10 rounded-2xl text-center cursor-pointer hover:bg-dark hover:text-white transition-all group">
                                <p className="text-[10px] font-black uppercase tracking-widest">{data.image && data.key === mainKey ? 'READY' : 'Pilih'}</p>
                            </label>
                            <button
                                onClick={() => handleSubmit(null, mainKey)}
                                disabled={processing || data.key !== mainKey}
                                className="px-6 py-3 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30 shadow-xl shadow-primary/20"
                            >
                                UPLOAD
                            </button>
                        </div>
                    </div>

                    {/* Gallery for Item — Unlimited */}
                    <div className="pt-6 border-t border-dark/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase text-dark/30 tracking-widest">Gallery ({totalSlots} Slots)</p>
                            <button
                                onClick={() => setExtraSlots(s => s + 1)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full transition-all text-[9px] font-black uppercase tracking-widest"
                            >
                                <PlusIcon className="w-3 h-3" /> Add Slot
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {Array.from({ length: totalSlots }, (_, idx) => idx + 1).map((i) => {
                                const subKey = `service_item_${categoryId}_${slug}_sub_${i}`;
                                const hasImage = !!settings[subKey];
                                return (
                                    <div key={i} className="space-y-2">
                                        <div className={`aspect-square rounded-2xl overflow-hidden border ${hasImage ? 'border-dark/5 bg-light' : 'border-dashed border-dark/20 bg-light/50'}`}>
                                            {hasImage || (data.image && data.key === subKey) ? (
                                                <img
                                                    src={(data.image && data.key === subKey) ? URL.createObjectURL(data.image) : settings[subKey]}
                                                    className="w-full h-full object-cover"
                                                    alt={`Sub ${i}`}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                                    <PhotoIcon className="w-5 h-5 text-dark/15" />
                                                    <span className="text-[7px] font-black text-dark/20 uppercase tracking-widest">{i}</span>
                                                </div>
                                            )}
                                        </div>
                                        <input type="file" id={`file-${subKey}`} className="hidden" accept="image/*" onChange={(e) => handleFile(e, subKey)} />
                                        <label htmlFor={`file-${subKey}`} className="block w-full py-1.5 bg-light border border-dark/10 rounded-xl text-center cursor-pointer hover:bg-dark hover:text-white transition-all">
                                            <p className="text-[7px] font-black uppercase tracking-widest">{data.image && data.key === subKey ? '✓ Ready' : 'Pilih'}</p>
                                        </label>
                                        <button
                                            onClick={() => handleSubmit(null, subKey)}
                                            disabled={processing || data.key !== subKey}
                                            className="w-full py-1.5 bg-dark text-white rounded-xl font-black text-[7px] uppercase tracking-widest disabled:opacity-30 shadow-lg"
                                        >
                                            SAVE
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ServiceImageCard({ service, currentImage, settings }) {
    const [activeItem, setActiveItem] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        image: null,
        key: service.key,
    });

    const handleMainFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ image: file, key: service.key });
        }
    };

    const handleMainSubmit = (e) => {
        e.preventDefault();
        post(route('admin.siteSettings.update'), {
            onSuccess: () => {
                reset('image');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            forceFormData: true,
        });
    };

    // Items list (mirrored from frontend content for consistency)
    const items = {
        eo: ["Event Planning", "Kreator", "Team Show", "Koreografer", "Event Branding", "Team Production", "Marketing Agency", "Others"],
        show: ["Talent Handling", "Stage Manager", "Precise Rundown Control", "Show Director"],
        mice: ["Corporate Meetings", "Incentive Trips", "Conventions", "Exhibitions & Expos"],
        production: ["Sound System", "Lighting Design", "LED Visuals", "Stage Construction"],
        digital: ["Web Development", "Landing Pages", "Digital Systems", "UI/UX Design", "E-Commerce", "Digital Marketing"]
    };

    return (
        <div className="relative bg-white rounded-[40px] border border-dark/5 p-8 shadow-sm group text-left transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-primary rounded-full" />
                    <h3 className="text-sm font-black text-dark uppercase tracking-widest">{service.label}</h3>
                </div>
                {isSuccess && (
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                        <CheckCircleIcon className="w-3 h-3" /> Updated
                    </div>
                )}
            </div>

            {/* Main Category Image CRUD */}
            <div className="mb-10 space-y-4">
                <p className="text-[10px] font-black uppercase text-dark/30 tracking-widest">Category Cover Image</p>
                <div className="aspect-video bg-light rounded-3xl overflow-hidden border border-dark/5 relative group/img">
                    <img
                        src={(data.image && data.key === service.key) ? URL.createObjectURL(data.image) : (currentImage || service.default)}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                        alt={service.label}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-dark/5">
                        <p className="text-[8px] font-black text-dark uppercase tracking-widest">{currentImage ? 'Custom' : 'Default'}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <input type="file" id={`main-file-${service.id}`} className="hidden" accept="image/*" onChange={handleMainFile} />
                    <label htmlFor={`main-file-${service.id}`} className="flex-1 py-3 bg-light/50 border border-dark/5 rounded-2xl text-center cursor-pointer hover:bg-dark hover:text-white transition-all group/btn">
                        <span className="text-[10px] font-black text-dark group-hover/btn:text-white transition-colors uppercase tracking-widest">
                            {data.image && data.key === service.key ? 'Ready to Save' : 'Pilih Gambar'}
                        </span>
                    </label>
                    <button
                        onClick={handleMainSubmit}
                        disabled={processing || data.key !== service.key}
                        className="px-8 py-3 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30 shadow-xl shadow-primary/20"
                    >
                        Save
                    </button>
                </div>
            </div>

            <div className="pt-8 border-t border-dark/5">
                <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.2em] mb-6 text-center">Manage Sub-Item Galleries</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {items[service.id].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveItem(item)}
                            className={`px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeItem === item ? 'bg-primary text-white border-primary shadow-xl shadow-primary/30' : 'bg-light/40 text-dark/50 border-dark/5 hover:border-primary/40 hover:text-dark hover:bg-white'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {activeItem && (
                <ServiceItemModal
                    categoryId={service.id}
                    item={activeItem}
                    onBlur={() => setActiveItem(null)}
                    settings={settings}
                />
            )}
        </div>
    );
}

export default function ServiceImagesPanel({ settings }) {
    return (
        <div className="space-y-10">
            <div className="flex items-center gap-4">
                <div className="w-2.5 h-10 bg-secondary rounded-full" />
                <div>
                    <h2 className="text-base font-black text-dark uppercase tracking-tight">Service Content Management</h2>
                    <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">
                        Manage detailed images and galleries for each specific service item
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SERVICE_IMAGES.map((service) => (
                    <ServiceImageCard
                        key={service.key}
                        service={service}
                        currentImage={settings?.[service.key] || null}
                        settings={settings}
                    />
                ))}
            </div>
        </div>
    );
}
