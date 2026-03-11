<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainAudienceCategory extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image_url',
        'is_active',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function audienceTickets()
    {
        return $this->hasMany(AudienceTicket::class);
    }
}
