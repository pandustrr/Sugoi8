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
        Schema::create('attendee_tickets', function (Blueprint $row) {
            $row->id();
            $row->foreignId('booking_id')->constrained()->onDelete('cascade');
            $row->string('barcode')->unique();
            $row->boolean('is_attended')->default(false);
            $row->dateTime('attended_at')->nullable();
            $row->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendee_tickets');
    }
};
