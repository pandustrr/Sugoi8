<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\MainAudienceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $urls = [
            ['loc' => url('/'), 'lastmod' => date('Y-m-d'), 'changefreq' => 'weekly', 'priority' => '1.0'],
            ['loc' => route('tickets.index'), 'lastmod' => date('Y-m-d'), 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => url('/about'), 'lastmod' => date('Y-m-d'), 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => url('/services'), 'lastmod' => date('Y-m-d'), 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => url('/portfolio'), 'lastmod' => date('Y-m-d'), 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => url('/partners'), 'lastmod' => date('Y-m-d'), 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => url('/contact'), 'lastmod' => date('Y-m-d'), 'changefreq' => 'yearly', 'priority' => '0.5'],
        ];

        // Halaman detail event (lomba)
        $events = Event::orderBy('date', 'desc')->get();
        foreach ($events as $event) {
            $urls[] = [
                'loc' => route('tickets.event.show', $event->slug),
                'lastmod' => $event->updated_at->format('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => '0.9',
            ];
        }

        // Halaman tiket penonton (audience categories)
        $audienceCategories = MainAudienceCategory::where('is_active', true)
            ->whereNotNull('slug')
            ->orderBy('updated_at', 'desc')
            ->get();
        foreach ($audienceCategories as $cat) {
            $urls[] = [
                'loc' => url('/eventprogram/ticket/' . $cat->slug),
                'lastmod' => $cat->updated_at->format('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => '0.85',
            ];
        }

        $xml = view('sitemap', compact('urls'))->render();

        return Response::make($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
