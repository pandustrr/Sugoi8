<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AdminTicketController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Tickets/Index', [
            'events' => Event::with('tickets')->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tickets/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'                        => 'required|string|max:255',
            'slug'                         => 'nullable|string|max:255|unique:events,slug',
            'description'                  => 'nullable|string',
            'date'                         => 'required|date',
            'time'                         => 'required',
            'location'                     => 'required|string|max:255',
            'steps'                        => 'nullable|array',
            'steps.*.title'                => 'required_with:steps|string|max:255',
            'steps.*.date'                 => 'nullable|string|max:255',
            'divisions'                    => 'nullable|array',
            'divisions.*'                  => 'string|max:255',
            'image'                        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'tickets'                      => 'required|array|min:1',
            'tickets.*.title'              => 'required|string|max:255',
            'tickets.*.price'              => 'required|numeric|min:0',
            'tickets.*.stock'              => 'required|integer|min:0',
        ]);

        DB::transaction(function () use ($request, $validated) {
            $eventData = [
                'title'                  => $validated['title'],
                'slug'                   => $validated['slug'] ?? null,
                'description'            => $validated['description'] ?? null,
                'date'                   => $validated['date'],
                'time'                   => $validated['time'],
                'location'               => $validated['location'],
                'steps'                  => $validated['steps'] ?? [],
                'divisions'              => $validated['divisions'] ?? [],
            ];

            if ($request->hasFile('image')) {
                $eventData['image_url'] = $request->file('image')->store('tickets', 'public');
            }

            $event = Event::create($eventData);

            foreach ($validated['tickets'] as $ticket) {
                $event->tickets()->create([
                    'title' => $ticket['title'],
                    'price' => $ticket['price'],
                    'stock' => $ticket['stock'],
                ]);
            }
        });

        return redirect()->route('admin.tickets.index')->with('success', 'Event berhasil dibuat.');
    }

    public function edit(Event $ticket)
    {
        return Inertia::render('Admin/Tickets/Edit', [
            'event' => $ticket->load('tickets')
        ]);
    }

    public function update(Request $request, Event $ticket)
    {
        $validated = $request->validate([
            'title'                        => 'sometimes|required|string|max:255',
            'slug'                         => 'nullable|string|max:255|unique:events,slug,' . $ticket->id,
            'description'                  => 'nullable|string',
            'date'                         => 'sometimes|required|date',
            'time'                         => 'sometimes|required',
            'location'                     => 'sometimes|required|string|max:255',
            'steps'                        => 'nullable|array',
            'steps.*.title'                => 'required_with:steps|string|max:255',
            'steps.*.date'                 => 'nullable|string|max:255',
            'divisions'                    => 'nullable|array',
            'divisions.*'                  => 'string|max:255',
            'image'                        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($ticket->image_url && !str_starts_with($ticket->image_url, 'http')) {
                Storage::disk('public')->delete($ticket->image_url);
            }
            $validated['image_url'] = $request->file('image')->store('tickets', 'public');
        }

        $ticket->update($validated);

        return redirect()->route('admin.tickets.index')->with('success', 'Event berhasil diperbarui.');
    }

    public function destroy(Event $ticket)
    {
        if ($ticket->image_url && !str_starts_with($ticket->image_url, 'http')) {
            Storage::disk('public')->delete($ticket->image_url);
        }
        $ticket->delete();
        return redirect()->route('admin.tickets.index')->with('success', 'Event berhasil dihapus.');
    }

    public function addCategory(Request $request, Event $event)
    {
        $event->tickets()->create($request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]));
        return back()->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function updateCategory(Request $request, Ticket $ticket)
    {
        $ticket->update($request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]));
        return back()->with('success', 'Kategori berhasil diperbarui.');
    }

    public function deleteCategory(Ticket $ticket)
    {
        $ticket->delete();
        return back()->with('success', 'Kategori berhasil dihapus.');
    }

    public function bookings()
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::with('ticket.event')->latest()->get()
        ]);
    }

    public function updateBookingStatus(Request $request, Booking $booking)
    {
        $booking->update($request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]));
        return back()->with('success', 'Status berhasil diperbarui.');
    }

    public function deleteBooking(Booking $booking)
    {
        $booking->delete();
        return back()->with('success', 'Pemesanan berhasil dihapus.');
    }
}
