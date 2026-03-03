import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    PhotoIcon,
    ArrowPathIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export const SERVICE_IMAGES = [
    {
        key: 'service_img_event_organizer',
        label: 'Event Organizer',
        default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    },
    {
        key: 'service_img_show_management',
        label: 'Show Management',
        default: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    },
    {
        key: 'service_img_mice',
        label: 'Service MICE',
        default: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    },
    {
        key: 'service_img_production',
        label: 'Production & Equipment',
        default: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    },
    {
        key: 'service_img_digital',
        label: 'Digital Solutions',
        default: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    },
];

function ServiceImageCard({ service, currentImage }) {
    const [preview, setPreview] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        key: service.key,
    });

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.serviceImage.update'), {
            onSuccess: () => {
                reset('image');
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            },
            forceFormData: true,
        });
    };

    const handleReset = () => {
        if (!confirm(`Reset gambar "${service.label}" ke default Unsplash?`)) return;
        setIsResetting(true);
        router.post(route('admin.serviceImage.reset'), { key: service.key }, {
            onFinish: () => {
                setIsResetting(false);
                setPreview(null);
                reset('image');
            },
        });
    };

    const displayImage = preview || currentImage || service.default;
    const isCustom = !!currentImage;

    return (
        <div className="bg-white rounded-[32px] border border-dark/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Preview */}
            <div className="relative aspect-video overflow-hidden bg-light">
                <img
                    src={displayImage}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={service.label}
                    onError={(e) => { e.target.src = service.default; }}
                />
                <div className={`absolute top-3 right-3 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isCustom ? 'bg-emerald-500' : 'bg-dark/60'}`}>
                    {isCustom ? 'Custom' : 'Default'}
                </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-dark uppercase tracking-widest">{service.label}</h3>
                    {isSuccess && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                            <CheckCircleIcon className="w-3.5 h-3.5" /> Tersimpan
                        </span>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                        <input
                            type="file"
                            id={`file-${service.key}`}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFile}
                        />
                        <label
                            htmlFor={`file-${service.key}`}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-light border border-dark/5 rounded-xl cursor-pointer hover:border-primary transition-all"
                        >
                            <PhotoIcon className="w-3.5 h-3.5 text-dark/30" />
                            <span className="text-[9px] font-black text-dark/50 uppercase tracking-widest truncate max-w-[120px]">
                                {data.image ? data.image.name : 'Pilih Gambar'}
                            </span>
                        </label>
                        {errors.image && <p className="text-[9px] text-red-500 font-bold mt-1">{errors.image}</p>}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing || !data.image}
                            className="flex-1 py-2.5 bg-dark text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all disabled:opacity-30 shadow-sm"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                        {isCustom && (
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={isResetting}
                                title="Reset ke default"
                                className="px-3 py-2.5 bg-light border border-dark/10 text-dark/40 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all disabled:opacity-30"
                            >
                                {isResetting
                                    ? <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                    : <TrashIcon className="w-4 h-4" />
                                }
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ServiceImagesPanel({ settings }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-2.5 h-10 bg-secondary rounded-full" />
                <div>
                    <h2 className="text-base font-black text-dark uppercase tracking-tight">Gambar Setiap Service</h2>
                    <p className="text-[11px] text-dark/30 font-bold uppercase tracking-wider mt-1">
                        Ganti foto untuk masing-masing layanan di halaman Services
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {SERVICE_IMAGES.map((service) => (
                    <ServiceImageCard
                        key={service.key}
                        service={service}
                        currentImage={settings?.[service.key] || null}
                    />
                ))}
            </div>
        </div>
    );
}
