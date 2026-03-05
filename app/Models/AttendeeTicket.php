<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'barcode',
        'is_attended',
        'attended_at',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
