/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const [redirect, setRedirect] = useState(null) // State untuk menentukan redirect

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Silakan login untuk mengakses menu Diagnosa")
      setRedirect("/login") // Set tujuan redirect
    } else if (!user.isVerified) {
      toast.error("Email Anda belum terverifikasi. Silakan verifikasi email Anda.")
      setRedirect("/verify-email") // Set tujuan redirect
    }
  }, [isAuthenticated, user]) // Efek ini dijalankan saat `isAuthenticated` atau `user` berubah

  // Jika redirect diset, lakukan navigasi
  if (redirect) {
    return <Navigate to={redirect} />
  }

  // Jika tidak ada masalah, render komponen anak
  return children
}

export default ProtectedRoute
