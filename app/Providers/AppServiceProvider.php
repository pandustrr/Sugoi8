<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Daftarkan driver google jika class-class yang dibutuhkan tersedia
        if (class_exists(\Google\Client::class) && class_exists(\Masbug\Flysystem\GoogleDriveAdapter::class)) {
            try {
                Storage::extend('google', function ($app, $config) {
                    $clientClass = "\Google\Client";
                    $serviceClass = "\Google\Service\Drive";
                    $adapterClass = "\Masbug\Flysystem\GoogleDriveAdapter";
                    $filesystemClass = "\League\Flysystem\Filesystem";
                    $adapterInterface = "\Illuminate\Filesystem\FilesystemAdapter";

                    $client = new $clientClass();
                    $client->setClientId($config['clientId'] ?? '');
                    $client->setClientSecret($config['clientSecret'] ?? '');
                    $token = $client->refreshToken($config['refreshToken'] ?? '');
                    if (isset($token['error'])) {
                        Log::error('GDrive Global Refresh Token Error: ' . json_encode($token));
                    } else {
                        $client->setAccessToken($token);
                    }

                    $service = new $serviceClass($client);
                    $adapter = new $adapterClass($service, $config['folderId'] ?? '/');
                    $driver = new $filesystemClass($adapter);

                    return new $adapterInterface($driver, $adapter);
                });
            } catch (\Exception $e) {
                Log::error('GDrive Registration Error: ' . $e->getMessage());
            }
        }
    }
}
