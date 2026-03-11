<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AudienceTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminAudienceTicketController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AudienceTickets/Index', [
            'categories' => \App\Models\MainAudienceCategory::with('audienceTickets')->latest()->get()
        ]);
    }

    public function storeMainCategory(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => 'required|string|max:255|unique:main_audience_categories',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'title'       => $validated['title'],
            'slug'        => \Illuminate\Support\Str::slug($validated['slug']),
            'description' => $validated['description'] ?? null,
            'is_active'   => true,
        ];

        if ($request->hasFile('image')) {
            $data['image_url'] = $request->file('image')->store('main_audience_categories', 'public');
        }

        \App\Models\MainAudienceCategory::create($data);

        return back()->with('success', 'Main Kategori berhasil dibuat.');
    }

    public function updateMainCategory(Request $request, \App\Models\MainAudienceCategory $mainCategory)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => 'required|string|max:255|unique:main_audience_categories,slug,' . $mainCategory->id,
            'description' => 'nullable|string',
            'is_active'   => 'required|boolean',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'title'       => $validated['title'],
            'slug'        => \Illuminate\Support\Str::slug($validated['slug']),
            'description' => $validated['description'] ?? null,
            'is_active'   => $validated['is_active'],
        ];

        if ($request->hasFile('image')) {
            if ($mainCategory->image_url) {
                Storage::disk('public')->delete($mainCategory->image_url);
            }
            $data['image_url'] = $request->file('image')->store('main_audience_categories', 'public');
        }

        $mainCategory->update($data);

        return back()->with('success', 'Main Kategori berhasil diperbarui.');
    }

    public function destroyMainCategory(\App\Models\MainAudienceCategory $mainCategory)
    {
        if ($mainCategory->image_url) {
            Storage::disk('public')->delete($mainCategory->image_url);
        }
        $mainCategory->delete();

        return back()->with('success', 'Main Kategori berhasil dihapus.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'main_audience_category_id' => 'required|exists:main_audience_categories,id',
            'title'                     => 'required|string|max:255',
            'description'               => 'nullable|string',
            'price'                     => 'required|numeric|min:0',
            'stock'                     => 'required|integer|min:0',
            'image'                     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'main_audience_category_id' => $validated['main_audience_category_id'],
            'title'                     => $validated['title'],
            'description'               => $validated['description'] ?? null,
            'price'                     => $validated['price'],
            'stock'                     => $validated['stock'],
            'is_active'                 => true,
        ];

        if ($request->hasFile('image')) {
            $data['image_url'] = $request->file('image')->store('audience_tickets', 'public');
        }

        AudienceTicket::create($data);

        return back()->with('success', 'Sub Kategori (Tiket) berhasil dibuat.');
    }

    public function update(Request $request, AudienceTicket $audienceTicket)
    {
        $validated = $request->validate([
            'main_audience_category_id' => 'required|exists:main_audience_categories,id',
            'title'                     => 'required|string|max:255',
            'description'               => 'nullable|string',
            'price'                     => 'required|numeric|min:0',
            'stock'                     => 'required|integer|min:0',
            'is_active'                 => 'required|boolean',
            'image'                     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'main_audience_category_id' => $validated['main_audience_category_id'],
            'title'                     => $validated['title'],
            'description'               => $validated['description'] ?? null,
            'price'                     => $validated['price'],
            'stock'                     => $validated['stock'],
            'is_active'                 => $validated['is_active'],
        ];

        if ($request->hasFile('image')) {
            if ($audienceTicket->image_url) {
                Storage::disk('public')->delete($audienceTicket->image_url);
            }
            $data['image_url'] = $request->file('image')->store('audience_tickets', 'public');
        }

        $audienceTicket->update($data);

        return back()->with('success', 'Sub Kategori (Tiket) berhasil diperbarui.');
    }

    public function destroy(AudienceTicket $audienceTicket)
    {
        if ($audienceTicket->image_url) {
            Storage::disk('public')->delete($audienceTicket->image_url);
        }
        $audienceTicket->delete();

        return back()->with('success', 'Sub Kategori (Tiket) berhasil dihapus.');
    }
}
