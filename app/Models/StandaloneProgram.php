<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StandaloneProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image_url',
        'registration_link',
        'order'
    ];

    public function clicks()
    {
        return $this->hasMany(ProgramClick::class, 'standalone_program_id');
    }
}
