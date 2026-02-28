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

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
