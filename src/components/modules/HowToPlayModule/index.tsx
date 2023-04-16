import { NextSeo } from 'next-seo'
import React from 'react'

export const HowToPlayModule: React.FC = () => {
  // TODO: Write module's logic

  return (
    <>
      <NextSeo title="How To Play Scan Me" />
      <main className="flex min-h-screen flex-col items-center justify-center bg-background-light p-4 pt-24 md:p-20 md:pt-32 lg:flex-row">
        <h1 className="text-shadow-lg font-outline-4 mb-6 text-center font-retro text-display-medium shadow-orange-dark md:text-display-large">
          Cara Bermain Scan Me
        </h1>
        <div className="space-y-2 font-poppins">
          <p>
            1. Gunakan perangkatmu untuk scan barcode yang tersebar di seluruh
            area Fasilkom UI!
          </p>
          <p>
            2. Login (jika perlu) dan lihat tantangan apa yang kamu dapatkan
          </p>
          <p>
            3. Lakukan tantangan tersebut berdasarkan deskripsi yang tertera!
          </p>
          <p>
            4. Jika sudah, jangan lupa untuk submit bukti penyelesaian tantangan
            di website PERAK
          </p>
          <p>
            5. Eits, sabar dulu, lihat status verifikasi bukti di bagian slot
            pengumpulan! Kalau ditolak, berarti kamu belum menyelesaikan
            tantangan dengan benar, nih!
          </p>
          <p>
            6. Jika lolos, selamat! Kamu telah menyelesaikan tantangan tersebut
            dan mendapatkan suatu petunjuk untuk final puzzle.
          </p>
          <p>
            7.Rangkailah sebuah kalimat yang berisi 5 kata menggunakan
            petunjuk-petunjuk tersebut.
          </p>
          <p>
            8.Jawablah final puzzle dengan kalimat yang kamu temukan di IG Story
            PERAK pada tanggal 5 Mei 2023! Jam-nya menyusul ya!
          </p>
        </div>
      </main>
    </>
  )
}
