<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
