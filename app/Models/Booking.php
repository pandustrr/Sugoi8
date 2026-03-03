<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'ticket_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'school_name',
        'division',
        'quantity',
        'total_price',
        'status',
        'payment_proof'
    ];

    protected $appends = ['booking_code'];

    public function getBookingCodeAttribute()
    {
        if (!$this->relationLoaded('ticket') || !$this->ticket || !$this->ticket->relationLoaded('event') || !$this->ticket->event) {
            return 'S8-' . str_pad($this->id ?: 0, 4, '0', STR_PAD_LEFT);
        }

        // Event Initial
        $eventName = preg_replace('/[^A-Za-z0-9\s]/', '', $this->ticket->event->title);
        $eventWords = array_filter(explode(' ', $eventName));
        $eventInitial = '';
        foreach ($eventWords as $word) {
            $eventInitial .= strtoupper(substr($word, 0, 1));
        }

        // Ticket Initial
        $ticketName = preg_replace('/[^A-Za-z0-9\s]/', '', $this->ticket->title);
        $ticketWords = array_filter(explode(' ', $ticketName));
        $ticketInitial = '';
        if (count($ticketWords) === 1) {
            $ticketInitial = strtoupper(substr($ticketName, 0, 3));
        } else {
            foreach ($ticketWords as $word) {
                $ticketInitial .= strtoupper(substr($word, 0, 1));
            }
        }

        return $eventInitial . '-' . $ticketInitial . '-' . str_pad($this->id ?: 0, 4, '0', STR_PAD_LEFT);
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
