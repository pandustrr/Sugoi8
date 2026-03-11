<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\Booking;
use App\Models\EventContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AdminTicketController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Tickets/Index', [
            'events' => Event::with(['tickets', 'contents'])->latest()->get()
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
            'end_date'                     => 'nullable|date|after_or_equal:date',
            'time'                         => 'required',
            'location'                     => 'required|string|max:255',
            'steps'                        => 'nullable|array',
            'steps.*.title'                => 'required_with:steps|string|max:255',
            'steps.*.date'                 => 'nullable|string|max:255',
            'divisions'                    => 'nullable|array',
            'divisions.*'                  => 'string|max:255',
            'image'                        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_2'                      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_3'                      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'tickets'                      => 'required|array|min:1',
            'tickets.*.title'              => 'required|string|max:255',
            'tickets.*.price'              => 'required|numeric|min:0',
            'tickets.*.stock'              => 'required|integer|min:0',
            'tickets.*.gdrive_link'        => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $validated) {
            $eventData = [
                'title'                  => $validated['title'],
                'slug'                   => $validated['slug'] ?? null,
                'description'            => $validated['description'] ?? null,
                'date'                   => $validated['date'],
                'end_date'               => $validated['end_date'] ?? null,
                'time'                   => $validated['time'],
                'location'               => $validated['location'],
                'steps'                  => $validated['steps'] ?? [],
                'divisions'              => $validated['divisions'] ?? [],
            ];

            if ($request->hasFile('image')) {
                $eventData['image_url'] = $request->file('image')->store('tickets', 'public');
            }
            if ($request->hasFile('image_2')) {
                $eventData['image_url_2'] = $request->file('image_2')->store('tickets', 'public');
            }
            if ($request->hasFile('image_3')) {
                $eventData['image_url_3'] = $request->file('image_3')->store('tickets', 'public');
            }

            $event = Event::create($eventData);

            foreach ($validated['tickets'] as $ticket) {
                $event->tickets()->create([
                    'title' => $ticket['title'],
                    'price' => $ticket['price'],
                    'stock' => $ticket['stock'],
                    'gdrive_link' => $ticket['gdrive_link'] ?? null,
                ]);
            }
        });

        return redirect()->route('admin.tickets.index')->with('success', 'Event berhasil dibuat.');
    }

    public function edit(Event $event)
    {
        return Inertia::render('Admin/Tickets/Edit', [
            'event' => $event->load(['tickets', 'contents'])
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title'                        => 'sometimes|required|string|max:255',
            'slug'                         => 'nullable|string|max:255|unique:events,slug,' . $event->id,
            'description'                  => 'nullable|string',
            'date'                         => 'sometimes|required|date',
            'end_date'                     => 'nullable|date|after_or_equal:date',
            'time'                         => 'sometimes|required',
            'location'                     => 'sometimes|required|string|max:255',
            'steps'                        => 'nullable|array',
            'steps.*.title'                => 'required_with:steps|string|max:255',
            'steps.*.date'                 => 'nullable|string|max:255',
            'divisions'                    => 'nullable|array',
            'divisions.*'                  => 'string|max:255',
            'image'                        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_2'                      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_3'                      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'remove_image_2'               => 'nullable|boolean',
            'remove_image_3'               => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($event->image_url && !str_starts_with($event->image_url, 'http')) {
                Storage::disk('public')->delete($event->image_url);
            }
            $validated['image_url'] = $request->file('image')->store('tickets', 'public');
        }

        if ($request->hasFile('image_2')) {
            if ($event->image_url_2 && !str_starts_with($event->image_url_2, 'http')) {
                Storage::disk('public')->delete($event->image_url_2);
            }
            $validated['image_url_2'] = $request->file('image_2')->store('tickets', 'public');
        } elseif ($request->boolean('remove_image_2')) {
            if ($event->image_url_2 && !str_starts_with($event->image_url_2, 'http')) {
                Storage::disk('public')->delete($event->image_url_2);
            }
            $validated['image_url_2'] = null;
        }

        if ($request->hasFile('image_3')) {
            if ($event->image_url_3 && !str_starts_with($event->image_url_3, 'http')) {
                Storage::disk('public')->delete($event->image_url_3);
            }
            $validated['image_url_3'] = $request->file('image_3')->store('tickets', 'public');
        } elseif ($request->boolean('remove_image_3')) {
            if ($event->image_url_3 && !str_starts_with($event->image_url_3, 'http')) {
                Storage::disk('public')->delete($event->image_url_3);
            }
            $validated['image_url_3'] = null;
        }

        $event->update($validated);

        return redirect()->route('admin.tickets.index')->with('success', 'Event berhasil diperbarui.');
    }

    public function destroy(Event $event)
    {
        if ($event->image_url && !str_starts_with($event->image_url, 'http')) {
            Storage::disk('public')->delete($event->image_url);
        }
        if ($event->image_url_2 && !str_starts_with($event->image_url_2, 'http')) {
            Storage::disk('public')->delete($event->image_url_2);
        }
        if ($event->image_url_3 && !str_starts_with($event->image_url_3, 'http')) {
            Storage::disk('public')->delete($event->image_url_3);
        }
        $event->delete();
        return redirect()->route('admin.tickets.index')->with('success', 'Event berhasil dihapus.');
    }

    public function addCategory(Request $request, Event $event)
    {
        $event->tickets()->create($request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'gdrive_link' => 'nullable|string',
        ]));
        return back()->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function updateCategory(Request $request, Ticket $ticket)
    {
        $ticket->update($request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'gdrive_link' => 'nullable|string',
        ]));
        return back()->with('success', 'Kategori berhasil diperbarui.');
    }

    public function deleteCategory(Ticket $ticket)
    {
        $ticket->delete();
        return back()->with('success', 'Kategori berhasil dihapus.');
    }

    public function addContent(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title'             => 'nullable|string|max:255',
            'registration_link' => 'required|url',
            'image'             => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $contentData = [
            'title'             => $validated['title'] ?? null,
            'registration_link' => $validated['registration_link'],
        ];

        if ($request->hasFile('image')) {
            $contentData['image_url'] = $request->file('image')->store('event_contents', 'public');
        }

        $event->contents()->create($contentData);

        return back()->with('success', 'Konten berhasil ditambahkan.');
    }

    public function deleteContent(EventContent $content)
    {
        if ($content->image_url) {
            Storage::disk('public')->delete($content->image_url);
        }
        $content->delete();
        return back()->with('success', 'Konten berhasil dihapus.');
    }

    public function downloadSubmission(Booking $booking)
    {
        if (!$booking->submission_file) {
            return abort(404, 'File pendaftaran belum diunggah.');
        }

        // Tentukan disk berdasarkan format path
        $isPublic = str_starts_with($booking->submission_file, '/storage/');
        $disk = $isPublic ? 'public' : 'google';
        $path = $isPublic ? str_replace('/storage/', '', $booking->submission_file) : $booking->submission_file;

        try {
            /** @var \Illuminate\Filesystem\FilesystemAdapter $storageDisk */
            $storageDisk = Storage::disk($disk);
            return $storageDisk->download($path);
        } catch (\Exception $e) {
            return abort(404, 'Gagal mendownload file: ' . $e->getMessage());
        }
    }

    public function bookings()
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::with(['ticket.event', 'audienceTicket'])->latest()->get()
        ]);
    }

    public function updateBookingStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $oldStatus = $booking->status;
        $booking->update($validated);

        // Jika baru di-confirm dan tipe-nya audience, generate barcode individual
        if ($booking->status === 'confirmed' && $oldStatus !== 'confirmed' && $booking->booking_type === 'audience') {
            // Hapus barcode lama jika ada (mencegah duplikasi jika status di-flip-flop)
            $booking->attendeeTickets()->delete();

            for ($i = 0; $i < $booking->quantity; $i++) {
                \App\Models\AttendeeTicket::create([
                    'booking_id' => $booking->id,
                    'barcode'    => 'AUD-' . strtoupper(bin2hex(random_bytes(6))) . '-' . ($i + 1),
                    'is_attended' => false,
                ]);
            }
        }

        return back()->with('success', 'Status berhasil diperbarui.');
    }

    public function updateBookingGDrive(Request $request, Booking $booking)
    {
        $booking->update($request->validate([
            'gdrive_link' => 'nullable|string'
        ]));
        return back()->with('success', 'Link Google Drive berhasil diperbarui.');
    }

    public function deleteBooking(Booking $booking)
    {
        $booking->delete();
        return back()->with('success', 'Pemesanan berhasil dihapus.');
    }
}
