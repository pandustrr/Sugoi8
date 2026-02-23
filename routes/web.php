<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/contact', function () {
    return Inertia::render('Contact');
});
