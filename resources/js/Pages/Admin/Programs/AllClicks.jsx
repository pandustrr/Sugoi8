import { Head, Link } from '@inertiajs/react';
import SidebarAdmin from '../../../Components/SidebarAdmin';
import { ChartBarIcon, ArrowTopRightOnSquareIcon, ClockIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

dayjs.extend(relativeTime);
dayjs.locale('id');

const imgSrc = (url) => url ? (url.startsWith('http') ? url : `/storage/${url}`) : null;

export default function AllClicks({ programs, totalClicks, recentClicks }) {
    return (
        <div className="min-h-screen bg-light flex">
            <Head title="Track Program Lainnya | Sugoi 8 Admin" />
            <SidebarAdmin activePage="program-clicks" />

            <main className="grow min-w-0 pt-[52px] lg:pt-0">
                <header className="bg-white px-4 md:px-8 py-4 border-b border-dark/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Track Program</h1>
                        <p className="text-dark/40 text-[10px] font-bold uppercase tracking-widest mt-1">
                            Total {totalClicks} klik pada semua program
                        </p>
                    </div>
                </header>

                <div className="p-4 md:p-8 space-y-8">
                    {/* Ringkasan Program */}
                    <section>
                        <h2 className="text-sm font-black text-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                            <ChartBarIcon className="w-4 h-4 text-primary" /> Statistik per Program
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {programs.map(program => (
                                <Link
                                    key={program.id}
                                    href={route('admin.programs.clicks', program.id)}
                                    className="bg-white rounded-2xl border border-dark/5 p-4 hover:border-primary/50 hover:shadow-lg transition-all group flex items-center gap-4"
                                >
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-light border border-dark/5">
                                        {program.image_url ? (
                                            <img src={imgSrc(program.image_url)} alt={program.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-dark/10"><ChartBarIcon className="w-6 h-6" /></div>
                                        )}
                                    </div>
                                    <div className="grow min-w-0">
                                        <h3 className="text-xs font-black text-dark uppercase truncate group-hover:text-primary transition-colors">{program.title}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-[10px] font-black">{program.clicks_count} Klik</span>
                                        </div>
                                    </div>
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-dark/20 group-hover:text-primary transition-colors shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Riwayat Klik Terbaru Global */}
                    <section>
                        <h2 className="text-sm font-black text-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-primary" /> Riwayat Klik Terbaru
                        </h2>
                        <div className="bg-white rounded-2xl border border-dark/5 overflow-x-auto shadow-sm">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-dark/5 bg-light/50">
                                        <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-dark/40 w-48">Waktu</th>
                                        <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-dark/40">Program</th>
                                        <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-dark/40">IP Address</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark/5">
                                    {recentClicks.map(click => (
                                        <tr key={click.id} className="hover:bg-light/30 transition-colors">
                                            <td className="px-5 py-4">
                                                <p className="text-xs font-bold text-dark">{dayjs(click.created_at).fromNow()}</p>
                                                <p className="text-[10px] text-dark/40 mt-0.5">{dayjs(click.created_at).format('DD MMM YYYY, HH:mm')}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <Link href={route('admin.programs.clicks', click.program.id)} className="text-xs font-bold text-dark hover:text-primary transition-colors line-clamp-1">
                                                    {click.program.title}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="font-mono text-[10px] bg-dark/5 px-2 py-1 rounded-md text-dark/60">
                                                    {click.ip_address || 'Unknown'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentClicks.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-5 py-12 text-center text-dark/30 font-bold text-sm">
                                                Belum ada data klik.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
