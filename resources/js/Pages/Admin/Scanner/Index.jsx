import { useState, useRef, useEffect, Fragment } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import { Html5Qrcode } from 'html5-qrcode';
import {
    QrCodeIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    BoltIcon,
    CameraIcon
} from '@heroicons/react/24/outline';

export default function Scanner() {
    const { props } = usePage();
    const flash = props.flash || {};
    const [lastScan, setLastScan] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scannerError, setScannerError] = useState(null);
    const inputRef = useRef(null);
    const scannerRef = useRef(null);

    const { data, setData, post, processing, reset } = useForm({
        barcode: '',
    });

    // Auto focus input
    useEffect(() => {
        if (inputRef.current && !isScanning) inputRef.current.focus();
    }, [isScanning]);

    useEffect(() => {
        if (flash.scanSuccess) {
            setLastScan({ type: 'success', data: flash.scanSuccess });
            reset('barcode');
            if (isScanning) stopScanner();
        }
        if (props.errors && props.errors.barcode) {
            setLastScan({ type: 'error', message: props.errors.barcode });
            reset('barcode');
            if (isScanning) stopScanner();
        }
    }, [flash, props.errors]);

    const stopScanner = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current = null;
            } catch (err) {
                console.error('Failed to stop scanner:', err);
            }
        }
        setIsScanning(false);
    };

    const startScanner = async () => {
        setLastScan(null);
        setScannerError(null);
        setIsScanning(true);

        // Slight delay to ensure element is rendered
        setTimeout(async () => {
            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            try {
                await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    (decodedText) => {
                        setData('barcode', decodedText);
                        // Submit manually via post
                        post(route('admin.scanner.verify'), {
                            data: { barcode: decodedText },
                            preserveScroll: true,
                        });
                        stopScanner();
                    },
                    (errorMessage) => {
                        // Just a scan fail, ignore or log
                    }
                );
            } catch (err) {
                setScannerError("Gagal mengakses kamera. Pastikan izin kamera diberikan.");
                setIsScanning(false);
            }
        }, 300);
    };

    const handleScan = (e) => {
        e.preventDefault();
        if (!data.barcode || processing) return;

        post(route('admin.scanner.verify'), {
            preserveScroll: true,
            onSuccess: () => {
                if (inputRef.current) inputRef.current.focus();
            }
        });
    };

    return (
        <div className="flex h-screen bg-dark overflow-hidden">
            <Head title="Scanner Tiket | Admin Sugoi 8" />

            <SidebarAdmin activePage="scanner" />

            <main className="flex-1 flex flex-col bg-light min-w-0 overflow-y-auto">
                <header className="p-4 md:p-6 bg-white border-b border-dark/5 flex items-center justify-between sticky top-0 z-20">
                    <div>
                        <h1 className="text-lg md:text-xl font-black text-dark uppercase tracking-tighter italic leading-none">
                            Ticket <span className="text-primary tracking-normal not-italic font-black">Scanner</span>
                        </h1>
                        <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mt-1.5 italic">Validation System 8.0</p>
                    </div>
                </header>

                <div className="p-4 md:p-8 flex flex-col items-center justify-center grow pb-10">
                    <div className="w-full max-w-md space-y-6">

                        {/* Status / Scanner Area */}
                        <div className="min-h-[180px] flex items-center justify-center relative">
                            {isScanning ? (
                                <div className="w-full aspect-square max-w-[300px] bg-dark rounded-[32px] overflow-hidden relative border-4 border-primary shadow-2xl animate-in zoom-in-95 duration-300">
                                    <div id="reader" className="w-full h-full"></div>
                                    <button
                                        onClick={stopScanner}
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg z-10"
                                    >
                                        Batal Scan
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {!lastScan && !processing && (
                                        <div className="text-center space-y-3 opacity-10">
                                            <QrCodeIcon className="w-16 h-16 mx-auto stroke-1" />
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] italic">Siap Melakukan Scan Tiket...</p>
                                        </div>
                                    )}

                                    {processing && (
                                        <div className="text-center space-y-3">
                                            <ArrowPathIcon className="w-10 h-10 mx-auto text-primary animate-spin" />
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary italic">Memverifikasi Database...</p>
                                        </div>
                                    )}

                                    {lastScan?.type === 'success' && !processing && (
                                        <div className="w-full bg-emerald-500 text-white rounded-[32px] p-6 shadow-xl shadow-emerald-500/10">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                                    <CheckCircleIcon className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Check-in Berhasil!</p>
                                                    <h3 className="text-xl font-black tracking-tighter uppercase italic leading-none mt-1">{lastScan.data.name}</h3>
                                                </div>
                                            </div>
                                            <div className="space-y-3 pt-4 border-t border-white/10">
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                    <span className="opacity-60 italic">Kategori</span>
                                                    <span className="bg-white/10 px-2.5 py-1 rounded-lg">{lastScan.data.category}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                    <span className="opacity-60 italic">Jenis Tiket</span>
                                                    <span>{lastScan.data.ticket}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic text-emerald-100">
                                                    <span className="opacity-80">Waktu Masuk</span>
                                                    <span className="bg-dark/20 px-2.5 py-1 rounded-lg">{lastScan.data.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {lastScan?.type === 'error' && !processing && (
                                        <div className="w-full bg-rose-500 text-white rounded-[32px] p-6 shadow-xl shadow-rose-500/10">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                                    <XCircleIcon className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Scan Ditolak!</p>
                                                    <h3 className="text-lg font-black tracking-tighter uppercase italic leading-tight mt-1">Akses dilarang</h3>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-white/10">
                                                <p className="text-[11px] font-bold uppercase italic leading-relaxed">
                                                    {lastScan.message}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setLastScan(null)}
                                                className="mt-4 w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all"
                                            >
                                                Tutup
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="bg-white rounded-[32px] p-6 shadow-xl border border-dark/5 relative overflow-hidden group">
                            <div className="absolute top-0 inset-x-0 h-1 bg-primary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />

                            <form onSubmit={handleScan} className="space-y-4">
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-dark/10 group-focus-within:text-primary transition-colors duration-300">
                                        <QrCodeIcon className="w-6 h-6" />
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Scan Barcode / Kode..."
                                        className="w-full h-14 bg-light border-0 rounded-[20px] pl-14 pr-16 text-sm font-black tracking-[0.15em] focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-dark/5 placeholder:tracking-normal placeholder:font-bold uppercase"
                                        value={data.barcode}
                                        onChange={e => setData('barcode', e.target.value)}
                                        disabled={processing || isScanning}
                                        autoComplete="off"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <button
                                            type="submit"
                                            disabled={processing || !data.barcode || isScanning}
                                            className="w-10 h-10 bg-dark text-white rounded-xl flex items-center justify-center hover:bg-primary transition-all disabled:opacity-0 disabled:scale-90 active:scale-90"
                                        >
                                            <BoltIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="button"
                                        onClick={startScanner}
                                        disabled={isScanning || processing}
                                        className="flex-1 bg-secondary text-dark py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-secondary/10 active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        <CameraIcon className="w-4 h-4" />
                                        Buka Kamera HP
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLastScan(null);
                                            reset('barcode');
                                            inputRef.current?.focus();
                                        }}
                                        className="bg-light hover:bg-dark/5 text-dark/40 px-6 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all"
                                    >
                                        Reset
                                    </button>
                                </div>
                                {scannerError && <p className="text-[10px] font-bold text-rose-500 uppercase text-center">{scannerError}</p>}
                            </form>
                        </div>

                        {/* Tips */}
                        <div className="bg-white/50 backdrop-blur-sm p-5 rounded-[28px] border border-dark/5 flex items-start gap-4">
                            <div className="w-8 h-8 bg-dark/5 rounded-xl flex items-center justify-center shrink-0">
                                <BoltIcon className="w-4 h-4 text-dark/20" />
                            </div>
                            <p className="text-[9px] font-black text-dark/40 uppercase tracking-widest leading-relaxed italic">
                                <b>Entry 8.0</b>: Gunakan smartphone secara landscape atau portrait. Mendukung scanner eksternal untuk verifikasi massal.
                                <br /><span className="text-primary/40 font-bold">* Pastikan izin kamera aktif (HTTPS).</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
