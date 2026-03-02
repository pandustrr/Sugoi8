<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

use Inertia\Inertia;
use Illuminate\Foundation\Application;

use App\Http\Controllers\TicketController;
use App\Http\Controllers\AdminTicketController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'settings' => \App\Models\SiteSetting::all()->pluck('value', 'key'),
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/services', function () {
    return Inertia::render('Services');
});

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio');
});

Route::get('/partners', function () {
    return Inertia::render('Partners');
});

Route::redirect('/contact', '/about#contact', 301);

// User Ticket Routes
Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show');
Route::post('/tickets/{ticket}/purchase', [TicketController::class, 'purchase'])->name('tickets.purchase');
Route::get('/admin/login', [AdminController::class, 'login'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'store'])->name('admin.login.post');

Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::post('/admin/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');
    Route::get('/admin/site-settings', [AdminController::class, 'siteSettings'])->name('admin.siteSettings');
    Route::post('/admin/site-settings', [AdminController::class, 'updateSiteSettings'])->name('admin.siteSettings.update');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

    // Admin Ticket CRUD (Now Event based)
    Route::get('/admin/tickets', [AdminTicketController::class, 'index'])->name('admin.tickets.index');
    Route::get('/admin/tickets/create', [AdminTicketController::class, 'create'])->name('admin.tickets.create');
    Route::post('/admin/tickets', [AdminTicketController::class, 'store'])->name('admin.tickets.store');
    Route::get('/admin/tickets/{ticket}/edit', [AdminTicketController::class, 'edit'])->name('admin.tickets.edit');
    Route::patch('/admin/tickets/{ticket}', [AdminTicketController::class, 'update'])->name('admin.tickets.update');
    Route::delete('/admin/tickets/{ticket}', [AdminTicketController::class, 'destroy'])->name('admin.tickets.destroy');

    // Category Management
    Route::post('/admin/events/{event}/categories', [AdminTicketController::class, 'addCategory'])->name('admin.categories.store');
    Route::patch('/admin/categories/{ticket}', [AdminTicketController::class, 'updateCategory'])->name('admin.categories.update');
    Route::delete('/admin/categories/{ticket}', [AdminTicketController::class, 'deleteCategory'])->name('admin.categories.destroy');

    // Admin Booking Management
    Route::get('/admin/bookings', [AdminTicketController::class, 'bookings'])->name('admin.bookings.index');
    Route::patch('/admin/bookings/{booking}/status', [AdminTicketController::class, 'updateBookingStatus'])->name('admin.bookings.updateStatus');
    Route::delete('/admin/bookings/{booking}', [AdminTicketController::class, 'deleteBooking'])->name('admin.bookings.destroy');
});
