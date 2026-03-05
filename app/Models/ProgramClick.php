<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramClick extends Model
{
    protected $fillable = [
        'standalone_program_id',
        'ip_address',
        'user_agent',
        'referer',
    ];

    public function program()
    {
        return $this->belongsTo(StandaloneProgram::class, 'standalone_program_id');
    }
}
