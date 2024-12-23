/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Cek token di localStorage saat aplikasi pertama kali dimuat
    const token = localStorage.getItem("tokenUser")

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user)
          setIsAuthenticated(true)
        })
        .catch((error) => {
          console.error("Error fetching user:", error.message)
          setIsAuthenticated(false)
        })
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("tokenUser")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
