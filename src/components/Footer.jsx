/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { assets } from "../assets/assets"
import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ----- left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Prescripto adalah Sistem Pakar Diagnosis Penyakit Gigi yang Mudah Digunakan. Berikan
            Senyum Sehat dengan Teknologi Canggih yang Membantu Anda Mendiagnosis Penyakit Gigi
            dengan Tepat. Terima kasih telah menggunakan Prescripto. Kami berkomitmen untuk membantu
            Anda menjaga kesehatan gigi dengan layanan diagnosis yang mudah diakses dan berbasis
            teknologi terbaru.
          </p>
        </div>
        {/* ----- center section */}
        <div>
          <p className="text-xl font-medium mb-5">Prescripto</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <li className="py-1">Home</li>
            </NavLink>
            <NavLink to="/about" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <li>Tentang Kami</li>
            </NavLink>
            <NavLink to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <li>Kontak Kami</li>
            </NavLink>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/* ----- right section */}
        <div>
          <p className="text-xl font-medium mb-5">Capai Kami</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+622323232323</li>
            <li>xxxxxx@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* ----------Copyright text-------- */}
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2024 Prescripto - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
