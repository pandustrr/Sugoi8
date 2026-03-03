<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'client',
        'location',
        'year',
        'image',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'featured'   => 'boolean',
        'sort_order' => 'integer',
    ];
}
