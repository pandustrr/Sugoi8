<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SitemapController;


use Inertia\Inertia;
use Illuminate\Foundation\Application;

use App\Http\Controllers\TicketController;
use App\Http\Controllers\AdminTicketController;
use App\Http\Controllers\AdminPortfolioController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'portfolioItems' => \App\Models\PortfolioItem::orderByDesc('featured')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->limit(6)
            ->get(),
        'partners'       => \App\Models\Partner::orderBy('sort_order')->orderBy('id')->get(),
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/services', function () {
    return Inertia::render('Services');
});

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio', [
        'portfolioItems' => \App\Models\PortfolioItem::orderBy('sort_order')->orderBy('id', 'desc')->get(),
    ]);
});

Route::get('/partners', function () {
    return Inertia::render('Partners', [
        'partners' => \App\Models\Partner::orderBy('sort_order')->orderBy('id')->get(),
    ]);
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/sitemap.xml', [SitemapController::class, 'index']);



// User Booking Monitoring
Route::get('/eventprogram/check-status', [TicketController::class, 'checkStatus'])->name('eventprogram.checkStatus');
Route::post('/eventprogram/check-status', [TicketController::class, 'doCheckStatus'])->name('eventprogram.doCheckStatus');
Route::get('/eventprogram/dashboard/{booking}', [TicketController::class, 'dashboard'])->name('eventprogram.dashboard');
Route::post('/eventprogram/dashboard/{booking}/submit', [TicketController::class, 'submitWork'])->name('eventprogram.submitWork');
Route::post('/eventprogram/logout', [TicketController::class, 'logout'])->name('eventprogram.logout');

// User Ticket Routes (Event Program)
Route::get('/eventprogram', [TicketController::class, 'index'])->name('eventprogram.index');
Route::get('/eventprogram/{event:slug}', [TicketController::class, 'showEvent'])->name('eventprogram.show');
Route::get('/eventprogram/ticket/{ticket}', [TicketController::class, 'show'])->name('eventprogram.ticket.show');
Route::post('/eventprogram/ticket/{ticket}/purchase', [TicketController::class, 'purchase'])->name('eventprogram.purchase');

// Legacy Redirects
Route::get('/tickets', function () {
    return redirect()->route('eventprogram.index');
});
Route::get('/tickets/event/{event:slug}', function (\App\Models\Event $event) {
    return redirect()->route('eventprogram.show', $event->slug);
});
Route::get('/tickets/check-status', function () {
    return redirect()->route('eventprogram.checkStatus');
});

Route::get('/admin/login', [AdminController::class, 'login'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'store'])->name('admin.login.post');

Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::post('/admin/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');
    Route::get('/admin/site-settings', [AdminController::class, 'siteSettings'])->name('admin.siteSettings');
    Route::post('/admin/site-settings/update', [AdminController::class, 'updateSiteSettings'])->name('admin.siteSettings.update');
    Route::post('/admin/site-settings/text/update', [AdminController::class, 'updateTextSettings'])->name('admin.siteSettings.text.update');
    Route::post('/admin/site-settings/service-image', [AdminController::class, 'updateServiceImage'])->name('admin.serviceImage.update');
    Route::post('/admin/service-image/reset', [AdminController::class, 'resetServiceImage'])->name('admin.serviceImage.reset');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

    // Portfolio CRUD
    Route::get('/admin/portfolio', [AdminPortfolioController::class, 'index'])->name('admin.portfolio.index');
    Route::post('/admin/portfolio', [AdminPortfolioController::class, 'store'])->name('admin.portfolio.store');
    Route::post('/admin/portfolio/{portfolioItem}', [AdminPortfolioController::class, 'update'])->name('admin.portfolio.update');
    Route::delete('/admin/portfolio/{portfolioItem}', [AdminPortfolioController::class, 'destroy'])->name('admin.portfolio.destroy');

    // Partners CRUD
    Route::post('/admin/partners', [AdminController::class, 'storePartner'])->name('admin.partners.store');
    Route::post('/admin/partners/{partner}', [AdminController::class, 'updatePartner'])->name('admin.partners.update');
    Route::delete('/admin/partners/{partner}', [AdminController::class, 'destroyPartner'])->name('admin.partners.destroy');

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
    Route::patch('/admin/bookings/{booking}/gdrive', [AdminTicketController::class, 'updateBookingGDrive'])->name('admin.bookings.updateGDrive');
    Route::get('/admin/bookings/{booking}/download-submission', [AdminTicketController::class, 'downloadSubmission'])->name('admin.bookings.downloadSubmission');
    Route::delete('/admin/bookings/{booking}', [AdminTicketController::class, 'deleteBooking'])->name('admin.bookings.destroy');
});
