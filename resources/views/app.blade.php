<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Sugoi 8 Management') }}</title>

    <!-- Meta SEO Dasar -->

    <meta name="keywords" content="event organizer, show management, MICE, event production, sugoi 8, sugoi 8 management, jember, bali, jakarta, manajemen acara">
    <meta name="author" content="Sugoi 8 Management">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ url()->current() }}">


    <!-- Open Graph / Social Media (Facebook, WA, LinkedIn) -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Sugoi 8 Management - Designing Dreams & Crafting Experiences">
    <meta property="og:description" content="Solusi total untuk event impian anda, dari konsep hingga eksekusi panggung profesional.">
    <meta property="og:image" content="{{ asset('8-sugoi-trans.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="Sugoi 8 Management - Designing Dreams & Crafting Experiences">
    <meta property="twitter:description" content="Solusi total untuk event impian anda, dari konsep hingga eksekusi panggung profesional.">
    <meta property="twitter:image" content="{{ asset('8-sugoi-trans.png') }}">

    <link rel="icon" type="image/png" sizes="32x32" href="/8-sugoi-trans.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/8-sugoi-trans.png">
    <link rel="shortcut icon" href="/8-sugoi-trans.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/8-sugoi-trans.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sugoi 8 Management",
            "url": "https://sugoi8management.com",
            "logo": "https://sugoi8management.com/8-sugoi-trans.png",
            "description": "Designing Dreams & Crafting Experiences. Sugoi 8 Management adalah penyedia solusi total untuk event organizer, MICE, dan manajemen pertunjukan profesional.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Piere Tendean, Karangrejo, Sumbersari",
                "addressLocality": "Jember",
                "addressRegion": "Jawa Timur",
                "postalCode": "68124",
                "addressCountry": "ID"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+6285954464539",
                "contactType": "customer service"
            }
        }
    </script>

    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>