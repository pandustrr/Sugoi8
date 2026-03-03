<?php

namespace App\Http\Controllers;

use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\ImageResizer;

class AdminPortfolioController extends Controller
{
    public function index()
    {
        $items      = PortfolioItem::orderBy('sort_order')->orderBy('id', 'desc')->get();
        $categories = PortfolioItem::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Admin/Portfolio/Index', [
            'items'      => $items,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'category'    => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'client'      => ['nullable', 'string', 'max:255'],
            'location'    => ['nullable', 'string', 'max:255'],
            'year'        => ['nullable', 'digits:4', 'integer'],
            'featured'    => ['boolean'],
            'sort_order'  => ['integer'],
            'image'       => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('image')) {
            // Portfolio image: max 1200×800, quality 85
            $data['image'] = ImageResizer::resizeAndStore(
                $request->file('image'),
                'portfolio',
                1200,
                800,
                85
            );
        }

        PortfolioItem::create($data);

        return back()->with('success', 'Portofolio berhasil ditambahkan.');
    }

    public function update(Request $request, PortfolioItem $portfolioItem)
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'category'    => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'client'      => ['nullable', 'string', 'max:255'],
            'location'    => ['nullable', 'string', 'max:255'],
            'year'        => ['nullable', 'digits:4', 'integer'],
            'featured'    => ['boolean'],
            'sort_order'  => ['integer'],
            'image'       => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('image')) {
            // Portfolio image: max 1200×800, quality 85
            $data['image'] = ImageResizer::resizeAndStore(
                $request->file('image'),
                'portfolio',
                1200,
                800,
                85
            );
        } else {
            unset($data['image']); // jangan overwrite jika tidak ada file baru
        }

        $portfolioItem->update($data);

        return back()->with('success', 'Portofolio berhasil diperbarui.');
    }

    public function destroy(PortfolioItem $portfolioItem)
    {
        $portfolioItem->delete();
        return back()->with('success', 'Portofolio berhasil dihapus.');
    }
}
