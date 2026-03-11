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
        Schema::table('audience_tickets', function (Blueprint $table) {
            $table->foreignId('main_audience_category_id')->nullable()->after('id')->constrained('main_audience_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('audience_tickets', function (Blueprint $table) {
            $table->dropForeign(['main_audience_category_id']);
            $table->dropColumn('main_audience_category_id');
        });
    }
};
