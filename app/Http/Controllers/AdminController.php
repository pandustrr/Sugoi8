<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        return Inertia::render('Admin/Dashboard', [
            'totalTickets' => \App\Models\Ticket::count(),
            'totalBookings' => \App\Models\Booking::count(),
            'pendingBookings' => \App\Models\Booking::where('status', 'pending')->count(),
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
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'payment_methods' => ['nullable', 'string'],
            'payment_qris_image' => ['nullable', 'image', 'max:2048'],
        ]);

        $user->username = $request->username;

        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        $user->save();

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

        return back()->with('success', 'Pengaturan berhasil diperbarui.');
    }

    public function siteSettings()
    {
        return Inertia::render('Admin/HomeSettings', [
            'settings' => \App\Models\SiteSetting::all()->pluck('value', 'key'),
        ]);
    }

    public function updateSiteSettings(Request $request)
    {
        $request->validate([
            'hero_background_image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('hero_background_image')) {
            $path = $request->file('hero_background_image')->store('site', 'public');
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => 'hero_background_image'],
                ['value' => '/storage/' . $path]
            );
        }

        return back()->with('success', 'Pengaturan hero berhasil diperbarui.');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/admin/login');
    }
}
