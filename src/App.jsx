import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import VerifyEmail from "./pages/VerifyEmail"
import { Toaster } from "react-hot-toast" // Import Toaster
import ProtectedRoute from "./components/ProtectedRoute"
import Diagnosa from "./pages/Diagnosa"
import RiwayatDiagnosa from "./pages/RiwayatDiagnosa"
import Konsultasi from "./pages/Konsultasi"

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/diagnosa"
          element={
            <ProtectedRoute>
              <Diagnosa />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/riwayat-diagnosa" element={<RiwayatDiagnosa />} />
        <Route path="/konsultasi" element={<Konsultasi />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
