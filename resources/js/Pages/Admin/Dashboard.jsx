import { Head, usePage, Link, router } from '@inertiajs/react';
import Container from '../../Components/UI/Container';
import {
    Squares2X2Icon,
    UserIcon,
    PhotoIcon,
    CalendarIcon,
    ArrowLeftOnRectangleIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import SidebarAdmin from '../../Components/SidebarAdmin';

export default function Dashboard() {
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('admin.logout'));
    };

    const stats = [
        { label: 'Total Proyek', value: '42', icon: PhotoIcon, color: 'text-primary' },
        { label: 'Event Mendatang', value: '12', icon: CalendarIcon, color: 'text-secondary' },
        { label: 'Partner Global', value: '120+', icon: UserIcon, color: 'text-primary' },
        { label: 'Pesan Baru', value: '5', icon: ChatBubbleLeftRightIcon, color: 'text-secondary' },
    ];

    return (
        <div className="min-h-screen bg-light selection:bg-primary/30 flex">
            <Head title="Admin Dashboard | Sugoi 8" />

            <SidebarAdmin activePage="dashboard" />

            {/* Main Content */}
            <main className="grow">
                {/* Header */}
                <header className="bg-white px-8 py-6 border-b border-dark/5 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-black text-dark uppercase tracking-tight">Dashboard Overview</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-dark leading-none">{auth.user.name}</p>
                            <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mt-1">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-light rounded-xl flex items-center justify-center border border-dark/5">
                            <UserIcon className="w-5 h-5 text-dark/40" />
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-[32px] border border-dark/5 shadow-sm hover:shadow-xl transition-all group">
                                <div className={`w-12 h-12 rounded-2xl bg-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-dark">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Content Section Placeholder */}
                    <div className="bg-white rounded-[40px] border border-dark/5 p-10 shadow-sm border-dashed border-2">
                        <div className="text-center py-20">
                            <Squares2X2Icon className="w-16 h-16 text-dark/5 mx-auto mb-6" />
                            <h2 className="text-2xl font-black text-dark uppercase tracking-tighter mb-2">Selamat Datang di Sugoi 8 Admin</h2>
                            <p className="text-dark/40 font-medium max-w-md mx-auto">Gunakan menu di samping untuk mengelola konten website sugopi 8 Anda secara efisien.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
