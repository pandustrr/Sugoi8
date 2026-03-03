<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageResizer
{
    /**
     * Resize & simpan gambar ke storage/public.
     *
     * @param UploadedFile $file
     * @param string       $directory  contoh: 'portfolio', 'partners', 'services', 'site'
     * @param int          $maxWidth   lebar maksimum (px)
     * @param int          $maxHeight  tinggi maksimum (px) — 0 = proporsional
     * @param int          $quality    JPEG quality 1-100
     * @return string  path relatif dari public/storage, e.g. '/storage/portfolio/abc.jpg'
     */
    public static function resizeAndStore(
        UploadedFile $file,
        string $directory,
        int $maxWidth  = 1280,
        int $maxHeight = 0,
        int $quality   = 85
    ): string {
        $ext     = strtolower($file->getClientOriginalExtension());
        // PNG tetap PNG (jaga transparansi), selain itu simpan sebagai JPEG
        $outExt  = ($ext === 'png') ? 'png' : 'jpg';
        $filename = Str::uuid() . '.' . $outExt;
        $diskPath = $directory . '/' . $filename;
        $fullPath = storage_path('app/public/' . $diskPath);

        // Buat direktori jika belum ada
        if (!is_dir(dirname($fullPath))) {
            mkdir(dirname($fullPath), 0755, true);
        }

        // Load gambar sumber sesuai ekstensi
        $src = match ($ext) {
            'png'  => @imagecreatefrompng($file->getRealPath()),
            'webp' => @imagecreatefromwebp($file->getRealPath()),
            'gif'  => @imagecreatefromgif($file->getRealPath()),
            default => @imagecreatefromjpeg($file->getRealPath()),
        };

        // Fallback: simpan statis jika GD gagal membaca
        if (!$src) {
            $file->storeAs($directory, $filename, 'public');
            return '/storage/' . $diskPath;
        }

        $origW = imagesx($src);
        $origH = imagesy($src);

        // Hitung rasio resize
        if ($maxHeight === 0) {
            // Hanya batasi lebar
            if ($origW <= $maxWidth) {
                $newW = $origW;
                $newH = $origH;
            } else {
                $newW = $maxWidth;
                $newH = (int) round($origH * ($maxWidth / $origW));
            }
        } else {
            $ratioW = $maxWidth  / $origW;
            $ratioH = $maxHeight / $origH;
            $ratio  = min($ratioW, $ratioH, 1.0); // tidak pernah upscale
            $newW   = (int) round($origW * $ratio);
            $newH   = (int) round($origH * $ratio);
        }

        // Buat canvas baru
        $dst = imagecreatetruecolor($newW, $newH);

        // Pertahankan transparansi untuk PNG
        if ($ext === 'png' || $ext === 'webp') {
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            $transparent = imagecolorallocatealpha($dst, 255, 255, 255, 127);
            imagefill($dst, 0, 0, $transparent);
        }

        imagecopyresampled($dst, $src, 0, 0, 0, 0, $newW, $newH, $origW, $origH);

        // Simpan sesuai format output
        if ($outExt === 'png') {
            imagepng($dst, $fullPath, 7); // compression level 7
        } else {
            imagejpeg($dst, $fullPath, $quality);
        }

        imagedestroy($src);
        imagedestroy($dst);

        return '/storage/' . $diskPath;
    }
}
