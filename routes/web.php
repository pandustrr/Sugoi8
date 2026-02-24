<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

use Inertia\Inertia;
use Illuminate\Foundation\Application;

Route::get('/', function () {
    return Inertia::render('Welcome');
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

Route::get('/admin/login', [AdminController::class, 'login'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'store'])->name('admin.login.post');

Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::post('/admin/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
});
