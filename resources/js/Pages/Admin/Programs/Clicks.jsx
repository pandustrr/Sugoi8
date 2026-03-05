import { Head, Link } from '@inertiajs/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import { ArrowLeftIcon, ChartBarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

dayjs.extend(relativeTime);
dayjs.locale('id');

const imgSrc = (url) => url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

export default function Clicks({ program, clicks }) {
    return (
        <div className="min-h-screen bg-light flex">
            <Head title={`Track: ${program.title} | Sugoi 8 Admin`} />
            <SidebarAdmin activePage="program-clicks" />

            <main className="grow min-w-0 pt-[52px] lg:pt-0">
                <header className="bg-white px-4 md:px-8 py-4 border-b border-dark/5 flex flex-col md:flex-row md:items-center gap-4">
                    <Link
                        href={route('admin.programs.allClicks')}
                        className="w-10 h-10 shrink-0 bg-light rounded-xl flex items-center justify-center text-dark/40 hover:bg-dark hover:text-white transition-all shadow-sm"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div className="flex-1 min-w-0 flex items-center gap-4">
                        <div className="w-12 h-12 bg-light border border-dark/5 rounded-xl shrink-0 overflow-hidden">
                            {program.image_url ? (
                                <img src={imgSrc(program.image_url)} alt="Thumbnail" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex justify-center items-center">
                                    <ChartBarIcon className="w-6 h-6 text-dark/20" />
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-sm md:text-base font-black text-dark uppercase tracking-tight truncate">
                                Track: {program.title}
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold text-dark/50 bg-dark/5 px-2 py-0.5 rounded-md uppercase tracking-widest flex items-center gap-1">
                                    <ChartBarIcon className="w-3 h-3" /> Total {clicks.total} Klik
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    <div className="bg-white border border-dark/5 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm">
                        <div className="p-4 md:p-6 border-b border-dark/5 flex items-center justify-between">
                            <h2 className="text-xs md:text-sm font-black text-dark uppercase tracking-widest flex items-center gap-2">
                                <ClockIcon className="w-4 h-4 text-primary" /> Riwayat Lengkap
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-light/50 border-b border-dark/5">
                                        <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-dark/40 w-48">Waktu</th>
                                        <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-dark/40 w-48">IP Address</th>
                                        <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-dark/40">Browser / User Agent</th>
                                        <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-dark/40">Referer</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark/5">
                                    {clicks.data.map(click => (
                                        <tr key={click.id} className="hover:bg-light/30 transition-colors group">
                                            <td className="px-5 py-4 align-top">
                                                <p className="text-xs font-bold text-dark group-hover:text-primary transition-colors">{dayjs(click.created_at).fromNow()}</p>
                                                <p className="text-[10px] text-dark/40 mt-0.5">{dayjs(click.created_at).format('DD MMM YYYY, HH:mm:ss')}</p>
                                            </td>
                                            <td className="px-5 py-4 align-top text-xs">
                                                <span className="font-mono text-[10px] bg-dark/5 px-2 py-1 rounded-md text-dark/60 inline-flex items-center gap-1">
                                                    <MapPinIcon className="w-3 h-3 text-dark/40" /> {click.ip_address || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 align-top">
                                                <p className="text-[10px] leading-relaxed font-medium text-dark/60 max-w-sm break-all line-clamp-3" title={click.user_agent}>
                                                    {click.user_agent || '-'}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 align-top">
                                                <p className="text-[10px] leading-relaxed font-medium text-dark/60 max-w-[200px] break-all line-clamp-2">
                                                    {click.referer || '-'}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                    {clicks.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-16 text-dark/30 font-bold text-sm">
                                                Belum ada data klik untuk program ini.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {clicks.links.length > 3 && (
                            <div className="p-4 md:p-6 bg-light/30 border-t border-dark/5 flex flex-wrap justify-center gap-1.5">
                                {clicks.links.map((link, i) => {
                                    const active = link.active;
                                    const disabled = !link.url;
                                    const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');

                                    if (disabled) {
                                        return (
                                            <span key={i} className="px-3 md:px-4 py-2 bg-dark/5 text-dark/30 rounded-xl text-[10px] md:text-xs font-bold uppercase cursor-not-allowed">
                                                {label}
                                            </span>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`px-3 md:px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase transition-all ${active
                                                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                                                : 'bg-white border border-dark/10 text-dark/60 hover:bg-dark hover:text-white hover:border-dark hover:-translate-y-0.5 shadow-sm'
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
