import React, { useState, useEffect } from "react"
import { assets } from "../assets/assets"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext" // Import useAuth from AuthContext

const Navbar = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth() // Menggunakan AuthContext untuk status login dan logout
  const [showMenu, setShowMenu] = useState(false)

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    logout() // Memanggil logout dari AuthContext
    navigate("/login") // Mengarahkan ke halaman login setelah logout
  }

  useEffect(() => {
    // Update menu berdasarkan status login
    setShowMenu(false)
  }, [isAuthenticated]) // Efek setiap kali status autentikasi berubah

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={() => navigate("/")} className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className="hidden md:flex items-start gap-8 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/diagnosa">
          <li className="py-1">DIAGNOSA</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">TENTANG KAMI</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">KONTAK</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {isAuthenticated ? ( // Cek status login dari AuthContext
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={user.profileUrl} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  Profil Saya
                </p>
                <p
                  onClick={() => navigate("/riwayat-diagnosa")}
                  className="hover:text-black cursor-pointer"
                >
                  Riwayat Diagnosa
                </p>
                <p
                  onClick={() => navigate("/konsultasi")}
                  className="hover:text-black cursor-pointer"
                >
                  Konsultasi
                </p>
                <p onClick={handleLogout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-10 py-3 rounded-full font-light hidden md:block"
          >
            Masuk
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* --------- mobile menu ------------ */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to={"/"}>
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/diagnosa"}>
              <p className="px-4 py-2 rounded inline-block">Diagnosa</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
              <p className="px-4 py-2 rounded inline-block">Tentang Kami</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
              <p className="px-4 py-2 rounded inline-block">Kontak</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/login"}>
              <p className="px-4 py-2 rounded inline-block">Masuk</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
