<?php

namespace App\Http\Controllers;

use App\Models\StandaloneProgram;
use App\Models\ProgramClick;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminProgramController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Programs/Index', [
            'programs' => StandaloneProgram::withCount('clicks')
                ->orderBy('order')
                ->orderBy('created_at', 'desc')
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'registration_link' => 'required|string|max:500',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $path = $request->file('image')->store('programs', 'public');

        StandaloneProgram::create([
            'title' => $validated['title'],
            'registration_link' => $validated['registration_link'],
            'image_url' => $path
        ]);

        return back()->with('success', 'Program berhasil ditambahkan.');
    }

    public function update(Request $request, StandaloneProgram $program)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'registration_link' => 'required|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'title' => $validated['title'],
            'registration_link' => $validated['registration_link'],
        ];

        if ($request->hasFile('image')) {
            if ($program->image_url) {
                Storage::disk('public')->delete($program->image_url);
            }
            $data['image_url'] = $request->file('image')->store('programs', 'public');
        }

        $program->update($data);

        return back()->with('success', 'Program berhasil diperbarui.');
    }

    public function destroy(StandaloneProgram $program)
    {
        if ($program->image_url) {
            Storage::disk('public')->delete($program->image_url);
        }
        $program->delete();

        return back()->with('success', 'Program berhasil dihapus.');
    }

    /** Track public Join click & redirect */
    public function trackClick(Request $request, StandaloneProgram $program)
    {
        // Cegah klik berulang dari IP yang sama dalam 24 jam terakhir
        $recentClick = ProgramClick::where('standalone_program_id', $program->id)
            ->where('ip_address', $request->ip())
            ->where('created_at', '>=', now()->subDay())
            ->first();

        if (!$recentClick) {
            ProgramClick::create([
                'standalone_program_id' => $program->id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'referer' => $request->headers->get('referer'),
            ]);
        }

        return redirect($program->registration_link);
    }

    /** Admin: show click log for a program */
    public function clicks(StandaloneProgram $program)
    {
        $clicks = $program->clicks()
            ->latest()
            ->paginate(50);

        return Inertia::render('Admin/Programs/Clicks', [
            'program' => $program,
            'clicks' => $clicks,
        ]);
    }

    /** Admin: show all clicks across all programs */
    public function allClicks()
    {
        $programs = StandaloneProgram::withCount('clicks')
            ->with(['clicks' => fn($q) => $q->latest()->limit(5)])
            ->orderByDesc('clicks_count')
            ->get();

        $totalClicks = ProgramClick::count();

        $recentClicks = ProgramClick::with('program')
            ->latest()
            ->limit(30)
            ->get();

        return Inertia::render('Admin/Programs/AllClicks', [
            'programs'     => $programs,
            'totalClicks'  => $totalClicks,
            'recentClicks' => $recentClicks,
        ]);
    }
}
