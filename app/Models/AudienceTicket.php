<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AudienceTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'main_audience_category_id',
        'title',
        'description',
        'price',
        'stock',
        'is_active',
        'image_url',
    ];

    public function mainCategory()
    {
        return $this->belongsTo(MainAudienceCategory::class, 'main_audience_category_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
