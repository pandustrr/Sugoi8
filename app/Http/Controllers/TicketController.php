<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
    public function index()
    {
        return Inertia::render('Ticket', [
            'events' => Event::with(['tickets' => function ($query) {
                $query->where('stock', '>', 0);
            }])
                ->where('date', '>=', now()->toDateString())
                ->orderBy('date')
                ->get(),
            'settings' => \App\Models\SiteSetting::all()->pluck('value', 'key'),
        ]);
    }

    public function showEvent(Event $event)
    {
        return Inertia::render('Tickets/EventShow', [
            'event' => $event->load(['tickets' => function ($query) {
                $query->where('stock', '>', 0);
            }]),
            'settings' => \App\Models\SiteSetting::all()->pluck('value', 'key'),
        ]);
    }

    public function show(Ticket $ticket)
    {
        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket->load('event.tickets'),
            'settings' => \App\Models\SiteSetting::all()->pluck('value', 'key'),
        ]);
    }

    public function purchase(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'customer_name'        => 'required|string|max:255',
            'customer_email'       => 'required|email|max:255',
            'customer_phone'       => 'required|string|max:20',
            'school_name'          => 'nullable|string|max:255',
            'division'             => 'nullable|string|max:255',
            'quantity'             => 'required|integer|min:1|max:' . $ticket->stock,
            'payment_proof'        => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $bookingData = [
            'ticket_id'            => $ticket->id,
            'customer_name'        => $validated['customer_name'],
            'customer_email'       => $validated['customer_email'],
            'customer_phone'       => $validated['customer_phone'],
            'school_name'          => $validated['school_name'] ?? null,
            'division'             => $validated['division'] ?? null,
            'quantity'             => $validated['quantity'],
            'total_price'          => $ticket->price * $validated['quantity'],
            'status'               => 'pending',
            'gdrive_link'          => $ticket->gdrive_link,
        ];

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('bookings', 'public');
            $bookingData['payment_proof'] = '/storage/' . $path;
        }

        $booking = Booking::create($bookingData);

        // Kurangi stok tiket
        $ticket->decrement('stock', $validated['quantity']);

        return back()->with('successBooking', $booking->load('ticket.event'));
    }

    public function checkStatus()
    {
        return Inertia::render('Tickets/CheckStatus');
    }

    public function doCheckStatus(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string',
            'booking_code' => 'required|string',
        ]);

        $booking = Booking::with('ticket.event')
            ->where(function ($query) use ($validated) {
                $query->where('customer_email', $validated['email'])
                    ->orWhere('customer_phone', $validated['email']);
            })
            ->get()
            ->filter(function ($b) use ($validated) {
                return $b->booking_code === $validated['booking_code'];
            })
            ->first();

        if (!$booking) {
            return back()->withErrors(['email' => 'Data pendaftaran tidak ditemukan. Pastikan Email/WA dan ID Pesanan benar.']);
        }

        session()->put('auth_booking', $booking->id);

        return redirect()->route('tickets.dashboard', $booking->id);
    }

    public function dashboard(Request $request, Booking $booking)
    {
        // Simple session-based auth for the specific booking
        if (session('auth_booking') != $booking->id) {
            return redirect()->route('tickets.checkStatus');
        }

        return Inertia::render('Tickets/Dashboard', [
            'booking' => $booking->load('ticket.event')
        ]);
    }

    public function submitWork(Request $request, Booking $booking)
    {
        if (session('auth_booking') != $booking->id) {
            return abort(403);
        }

        if ($booking->status !== 'confirmed') {
            return back()->with('error', 'Pembayaran harus diverifikasi terlebih dahulu sebelum mengunggah karya.');
        }

        if ($booking->submission_file) {
            return back()->with('error', 'Anda sudah mengunggah karya untuk pendaftaran ini.');
        }

        $request->validate([
            'submission_file' => 'required|file|max:1048576|mimes:pdf,zip,rar,jpeg,png,jpg,mp4,m4v,mov,avi,mkv,webm',
        ]);

        if ($request->hasFile('submission_file')) {
            $file = $request->file('submission_file');

            // Ambil ID folder GDrive: Prioritaskan link Booking, lalu link Kategori
            $ticketFolderId = $booking->gdrive_link ?: $booking->ticket->gdrive_link;

            // Handle full URL or just ID
            if ($ticketFolderId && str_contains($ticketFolderId, 'folders/')) {
                $ticketFolderId = explode('folders/', $ticketFolderId)[1];
                $ticketFolderId = explode('?', $ticketFolderId)[0];
            }

            // Fallback to config if not set on ticket
            $folderId = $ticketFolderId ?: config('filesystems.disks.google.folderId');
            $disk = 'google';

            // Upload langsung menggunakan Google Drive API (bukan Flysystem)
            try {
                $client = new \Google\Client();
                $client->setClientId(config('filesystems.disks.google.clientId'));
                $client->setClientSecret(config('filesystems.disks.google.clientSecret'));
                $refreshToken = config('filesystems.disks.google.refreshToken');
                $token = $client->refreshToken($refreshToken);
                if (isset($token['error'])) {
                    Log::error('GDrive Refresh Token Error: ' . json_encode($token));
                    throw new \Exception('Gagal refresh token GDrive: ' . ($token['error_description'] ?? $token['error']));
                }
                $client->setAccessToken($token);

                // Inisialisasi Google Drive Service
                $driveService = new \Google\Service\Drive($client);

                // Nama asli file dari pendaftar
                $originalName = $file->getClientOriginalName();
                $mimeType = $file->getMimeType();

                // Metadata file — 'parents' menentukan folder tujuan di Google Drive
                $fileMetadata = new \Google\Service\Drive\DriveFile([
                    'name'    => $originalName,
                    'parents' => [$folderId],
                ]);

                // Upload file ke Google Drive API secara langsung
                $result = $driveService->files->create($fileMetadata, [
                    'data'       => file_get_contents($file->getRealPath()),
                    'mimeType'   => $mimeType,
                    'uploadType' => 'multipart',
                    'fields'     => 'id,name',
                ]);

                Log::info('GDrive Upload Success: ' . $result->getName() . ' (ID: ' . $result->getId() . ')');

                $booking->update([
                    'submission_file' => 'gdrive:' . $result->getId(),
                    'submission_at'   => now(),
                ]);

                return back()->with('success', 'Karya Anda berhasil diunggah ke Google Drive! Terima kasih telah berpartisipasi.');
            } catch (\Exception $e) {
                Log::error('GDrive Direct Upload Error: ' . $e->getMessage());
                // Fallback ke server lokal jika GDrive gagal
                $path = $file->store('submissions', 'public');
                $booking->update([
                    'submission_file' => '/storage/' . $path,
                    'submission_at'   => now(),
                ]);
                return back()->with('success', 'Karya diunggah ke server lokal (GDrive sedang bermasalah).');
            }
        }

        return back()->with('error', 'Gagal mengunggah file. Silakan coba lagi.');
    }

    public function logout()
    {
        session()->forget('auth_booking');
        return redirect()->route('tickets.checkStatus');
    }
}
