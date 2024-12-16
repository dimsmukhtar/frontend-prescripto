/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { assets } from "../assets/assets"

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="text-gray-700">
          Tentang <span className="text-primary font-medium">Kami</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Selamat datang di Prescripto, mitra terpercaya Anda dalam mengelola kebutuhan kesehatan
            gigi dengan mudah dan efisien. Di Prescripto, kami memahami tantangan yang dihadapi
            individu saat ingin memeriksakan kesehatan gigi dan mendapatkan diagnosis yang akurat.
            Kami hadir untuk memberikan solusi yang lebih baik dalam menjaga kesehatan gigi Anda.
          </p>
          <p>
            Prescripto berkomitmen untuk memberikan pelayanan terbaik dalam teknologi kesehatan
            gigi. Kami terus berupaya untuk meningkatkan platform kami, mengintegrasikan kemajuan
            teknologi terbaru untuk meningkatkan pengalaman pengguna dan memberikan layanan yang
            lebih unggul. Baik Anda sedang melakukan pemeriksaan pertama atau memantau kesehatan
            gigi Anda secara rutin, Prescripto siap mendukung Anda di setiap langkah.
          </p>
          <b className="text-gray-800">Visi Kami</b>
          <p>
            Visi kami di Prescripto adalah menciptakan pengalaman diagnosa untuk penyakit gigi yang
            lancar dan terintegrasi untuk setiap pengguna. Kami bertujuan untuk menjembatani
            kesenjangan antara pasien dan tenaga medis, mempermudah Anda untuk mengakses perawatan
            gigi yang Anda butuhkan, kapan pun Anda membutuhkannya.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          Kenapa <span className="text-gray-700 font-semibold">Pilih Kami</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFISIENSI:</b>
          <p>Proses diagnosis gigi yang cepat dan akurat untuk menghemat waktu Anda.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>KEMUDAHAN:</b>
          <p>
            Akses mudah untuk mendapatkan diagnosa penyakit gigi yang tepat di mana saja dan kapan
            saja.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALISASI:</b>
          <p>Rekomendasi diagnosis yang disesuaikan dengan kondisi gigi Anda.</p>
        </div>
      </div>
    </div>
  )
}

export default About
