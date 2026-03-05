<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventContent extends Model
{
    protected $fillable = [
        'event_id',
        'title',
        'image_url',
        'registration_link',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
