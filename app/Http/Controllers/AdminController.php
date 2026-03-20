<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Helpers\ImageResizer;

class AdminController extends Controller
{
    public function login()
    {
        return Inertia::render('Admin/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/admin/dashboard');
        }

        return back()->withErrors([
            'username' => 'Username atau password salah.',
        ])->onlyInput('username');
    }

    public function dashboard()
    {
        $today = now()->startOfDay();
        $thisMonth = now()->startOfMonth();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_bookings'     => \App\Models\Booking::count(),
                'pending_bookings'   => \App\Models\Booking::where('status', 'pending')->count(),
                'confirmed_bookings' => \App\Models\Booking::where('status', 'confirmed')->count(),
                'total_revenue'      => (float) \App\Models\Booking::where('status', 'confirmed')->sum('total_price'),
                'revenue_today'      => (float) \App\Models\Booking::where('status', 'confirmed')->where('created_at', '>=', $today)->sum('total_price'),
                'revenue_month'      => (float) \App\Models\Booking::where('status', 'confirmed')->where('created_at', '>=', $thisMonth)->sum('total_price'),
                'total_events'       => \App\Models\Event::count(),
                'total_portfolio'    => \App\Models\PortfolioItem::count(),
                'total_partners'     => \App\Models\Partner::count(),
                'page_visits'        => \App\Models\PageVisit::count(),
                'page_visits_today'  => \App\Models\PageVisit::where('created_at', '>=', $today)->count(),
            ],
            'recentBookings' => \App\Models\Booking::with('ticket.event')->latest()->limit(5)->get(),
            'upcomingEvents' => \App\Models\Event::with('tickets')->where('date', '>=', now()->toDateString())->orderBy('date')->limit(3)->get(),
            'topTickets' => \App\Models\Booking::where('status', 'confirmed')
                ->select('ticket_id', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
                ->groupBy('ticket_id')
                ->orderByDesc('total')
                ->with('ticket.event')
                ->limit(5)
                ->get(),
            'recentPageVisits' => \App\Models\PageVisit::latest()->limit(50)->get(),
        ]);
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => \App\Models\SiteSetting::all()->pluck('value', 'key'),
        ]);
    }

    public function updateSettings(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $request->validate([
            'username'            => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'password'            => ['nullable', 'string', 'min:8', 'confirmed'],
            'payment_methods'     => ['nullable', 'string'],
            'payment_qris_image'  => ['nullable', 'image', 'max:2048'],
            'contact_email'       => ['nullable', 'email', 'max:255'],
            'contact_wa'          => ['nullable', 'string', 'max:30'],
        ]);

        $user->username = $request->username;
        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }
        $user->save();

        // Simpan payment
        if ($request->has('payment_methods')) {
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => 'payment_methods'],
                ['value' => $request->payment_methods]
            );
        }
        if ($request->hasFile('payment_qris_image')) {
            $path = $request->file('payment_qris_image')->store('site', 'public');
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => 'payment_qris_image'],
                ['value' => '/storage/' . $path]
            );
        }

        // Simpan kontak
        foreach (['contact_email', 'contact_wa'] as $key) {
            if ($request->has($key)) {
                \App\Models\SiteSetting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $request->$key ?? '']
                );
            }
        }

        return back()->with('success', 'Pengaturan berhasil diperbarui.');
    }

    public function siteSettings()
    {
        return Inertia::render('Admin/PageSettings', [
            'settings'            => \App\Models\SiteSetting::all()->pluck('value', 'key'),
            'portfolioItems'      => \App\Models\PortfolioItem::orderBy('sort_order')->orderBy('id', 'desc')->get(),
            'portfolioCategories' => \App\Models\PortfolioItem::distinct()->pluck('category')->filter()->values(),
            'partners'            => \App\Models\Partner::orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function updateSiteSettings(Request $request)
    {
        $request->validate([
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,mp4,mov,ogg,webm', 'max:10240'],
            'key' => ['required', 'string'],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $mimeType = $file->getMimeType();

            if (str_starts_with($mimeType, 'image/')) {
                // Hero BG: 1920×1080, quality 85
                $storedPath = ImageResizer::resizeAndStore(
                    $file,
                    'site',
                    1920,
                    1080,
                    85
                );
            } else {
                // Handle video upload
                $path = $file->store('site/videos', 'public');
                $storedPath = '/storage/' . $path;
            }

            \App\Models\SiteSetting::updateOrCreate(
                ['key' => $request->key],
                ['value' => $storedPath]
            );
        }

        return back()->with('success', 'Pengaturan hero berhasil diperbarui.');
    }

    public function updateTextSettings(Request $request)
    {
        $data = $request->validate([
            'settings' => ['required', 'array'],
        ]);

        foreach ($data['settings'] as $key => $value) {
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? '']
            );
        }

        return back()->with('success', 'Statistik berhasil diperbarui.');
    }

    public function updateServiceImage(Request $request)
    {
        $request->validate([
            'image' => ['nullable', 'image', 'max:4096'],
            'key'   => ['required', 'string'],
        ]);

        if ($request->hasFile('image')) {
            // Service image: max 1200×800, quality 85
            $storedPath = ImageResizer::resizeAndStore(
                $request->file('image'),
                'services',
                1200,
                800,
                85
            );
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => $request->key],
                ['value' => $storedPath]
            );
        }

        return back()->with('success', 'Gambar service berhasil diperbarui.');
    }

    public function resetServiceImage(Request $request)
    {
        $request->validate([
            'key' => ['required', 'string'],
        ]);

        \App\Models\SiteSetting::where('key', $request->key)->delete();

        return back()->with('success', 'Gambar service direset ke default.');
    }

    public function storePartner(Request $request)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'industry'   => ['nullable', 'string', 'max:100'],
            'website'    => ['nullable', 'url', 'max:255'],
            'sort_order' => ['integer'],
            'logo'       => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('logo')) {
            // Logo partner: max 600×600 (kotak), quality 90
            $data['logo'] = ImageResizer::resizeAndStore(
                $request->file('logo'),
                'partners',
                600,
                600,
                90
            );
        }

        \App\Models\Partner::create($data);
        return back()->with('success', 'Partner berhasil ditambahkan.');
    }

    public function updatePartner(Request $request, \App\Models\Partner $partner)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'industry'   => ['nullable', 'string', 'max:100'],
            'website'    => ['nullable', 'url', 'max:255'],
            'sort_order' => ['integer'],
            'logo'       => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('logo')) {
            // Logo partner: max 600×600 (kotak), quality 90
            $data['logo'] = ImageResizer::resizeAndStore(
                $request->file('logo'),
                'partners',
                600,
                600,
                90
            );
        } else {
            unset($data['logo']);
        }

        $partner->update($data);
        return back()->with('success', 'Partner berhasil diperbarui.');
    }

    public function destroyPartner(\App\Models\Partner $partner)
    {
        $partner->delete();
        return back()->with('success', 'Partner berhasil dihapus.');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/admin/login');
    }
}
