<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAudienceBookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::where('booking_type', 'audience')
            ->with(['audienceTicket.mainCategory', 'attendeeTickets'])
            ->orderByDesc('created_at')
            ->get();

        // Auto-fix missing barcodes for confirmed bookings
        foreach ($bookings as $booking) {
            if ($booking->status === 'confirmed' && $booking->attendeeTickets->count() === 0) {
                for ($i = 0; $i < $booking->quantity; $i++) {
                    $booking->attendeeTickets()->create([
                        'barcode'     => 'S8' . strtoupper(bin2hex(random_bytes(4))),
                        'is_attended' => false,
                    ]);
                }
                // Refresh relation
                $booking->load('attendeeTickets');
            }
        }

        return Inertia::render('Admin/AudienceBookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate(['status' => 'required|in:pending,confirmed,cancelled']);

        $booking->update(['status' => $request->status]);

        // Jika status confirmed, pastikan barcode dibuat
        if ($request->status === 'confirmed' && $booking->booking_type === 'audience') {
            if ($booking->attendeeTickets()->count() === 0) {
                for ($i = 0; $i < $booking->quantity; $i++) {
                    $booking->attendeeTickets()->create([
                        'barcode'     => 'S8' . strtoupper(bin2hex(random_bytes(4))),
                        'is_attended' => false,
                    ]);
                }
            }
        }

        return back()->with('success', 'Status berhasil diperbarui.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return back()->with('success', 'Data tiket penonton berhasil dihapus.');
    }

    public function scanner()
    {
        return Inertia::render('Admin/Scanner/Index');
    }

    public function scanRecord(Request $request)
    {
        $request->validate(['barcode' => 'required|string']);

        $ticket = \App\Models\AttendeeTicket::with(['booking.audienceTicket.mainCategory'])
            ->where('barcode', $request->barcode)
            ->first();

        if (!$ticket) {
            return back()->withErrors(['barcode' => 'Tiket tidak ditemukan! Pastikan kode benar.']);
        }

        if ($ticket->is_attended) {
            return back()->withErrors([
                'barcode' => 'Tiket ini SUDAH DIGUNAKAN pada ' . $ticket->attended_at->format('d M Y H:i')
            ]);
        }

        if ($ticket->booking->status !== 'confirmed') {
            return back()->withErrors(['barcode' => 'Pembayaran tiket ini belum diverifikasi oleh admin.']);
        }

        // Check in
        $ticket->update([
            'is_attended' => true,
            'attended_at' => now(),
        ]);

        return back()->with('scanSuccess', [
            'name'     => $ticket->booking->customer_name,
            'ticket'   => $ticket->booking->audienceTicket->title,
            'category' => $ticket->booking->audienceTicket->mainCategory->title,
            'time'     => $ticket->attended_at->format('H:i:s'),
        ]);
    }
}
