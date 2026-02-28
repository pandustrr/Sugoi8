<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        $event = Event::create([
            'title'       => 'Lomba Karya Tari Nusantara 2026',
            'slug'        => 'tari',
            'description' =>
            "Dalam rangka Hari Pendidikan Nasional, Sugoi 8 Management mempersembahkan Lomba Karya Tari Nusantara 2026. Nasional Competition. Online System. Total Hadiah Rp 20.000.000.\n"
                . "Kategori: TK sederajat, SD sederajat, SMP sederajat, SMA dan Mahasiswa.\n"
                . "Benefit: E-sertifikat ALL, Trophy + Uang Pembinaan, Doorprice.\n"
                . "CP: IMAS 083149406469 / ANGGI 0895600185134",
            'date'        => '2026-04-18',
            'time'        => '08:00:00',
            'location'    => 'Online System (Grand Final Live)',
            'image_url'   => null,
            'steps'       => [
                [
                    'title' => 'Registrasi & Pembayaran',
                    'date'  => '2 Maret – 9 April',
                ],
                [
                    'title' => 'Upload Karya & Penilaian',
                    'date'  => '10 – 13 April',
                ],
                [
                    'title' => 'Pengumuman Finalis',
                    'date'  => '14 April 2026',
                ],
                [
                    'title' => 'Grand Final (Live)',
                    'date'  => '18 April 2026',
                ],
            ],
            'divisions' => [
                'TK sederajat',
                'SD sederajat',
                'SMP sederajat',
                'SMA dan Mahasiswa'
            ],
        ]);

        $event->tickets()->createMany([
            ['title' => 'Tunggal', 'price' => 100000, 'stock' => 100],
            ['title' => 'Duet',    'price' => 150000, 'stock' => 60],
            ['title' => 'Grup (Maks. 5 orang)', 'price' => 250000, 'stock' => 40],
        ]);
    }
}
