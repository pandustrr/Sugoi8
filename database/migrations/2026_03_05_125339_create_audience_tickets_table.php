<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('audience_tickets', function (Blueprint $row) {
            $row->id();
            $row->string('title');
            $row->text('description')->nullable();
            $row->decimal('price', 15, 2);
            $row->integer('stock')->default(0);
            $row->boolean('is_active')->default(true);
            $row->string('image_url')->nullable();
            $row->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audience_tickets');
    }
};
