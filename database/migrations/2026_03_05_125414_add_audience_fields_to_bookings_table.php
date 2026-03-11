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
        Schema::table('bookings', function (Blueprint $row) {
            $row->foreignId('audience_ticket_id')->nullable()->after('ticket_id')->constrained('audience_tickets')->onDelete('set null');
            $row->string('customer_nik')->nullable()->after('customer_name');
            $row->enum('booking_type', ['competition', 'audience'])->default('competition')->after('total_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $row) {
            $row->dropForeign(['audience_ticket_id']);
            $row->dropColumn(['audience_ticket_id', 'customer_nik', 'booking_type']);
        });
    }
};
