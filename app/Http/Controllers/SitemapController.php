<?php

namespace App\Http\Controllers;

use App\Models\Event;
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

        // Add dynamically indexed events
        $events = Event::orderBy('date', 'desc')->get();
        foreach ($events as $event) {
            $urls[] = [
                'loc' => route('tickets.event.show', $event->slug),
                'lastmod' => $event->updated_at->format('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => '0.9',
            ];
        }

        $xml = view('sitemap', compact('urls'))->render();

        return Response::make($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
