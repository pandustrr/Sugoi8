<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'date',
        'end_date',
        'time',
        'location',
        'steps',
        'divisions',
        'image_url',
        'image_url_2',
        'image_url_3',
    ];

    protected $casts = [
        'steps'     => 'array',
        'divisions' => 'array',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function contents()
    {
        return $this->hasMany(EventContent::class);
    }
}
