import React, { useState } from "react"
import { signup, login } from "../utils/api"
import { toast } from "react-hot-toast" // Import Toast

const Login = () => {
  const [state, setState] = useState("Sign Up") // Sign Up or Login
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nama, setNama] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (state === "Sign Up") {
        // Call signup API
        const response = await signup({ nama, email, password })

        if (response.success) {
          toast.success(response.message) // Tampilkan pesan sukses dari API
          window.location.replace("/verify-email") // Arahkan ke halaman Verify Email
        }
      } else {
        // Call login API
        const response = await login({ email, password })

        if (response.success) {
          toast.success(response.message)
          localStorage.setItem("tokenUser", response.token)
          window.location.replace("/") // Redirect ke home setelah login
        }
      }
    } catch (error) {
      setError(error.message || "Terjadi kesalahan. Coba lagi.")
    }
  }

  const togglePasswordVisibility = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "Sign Up" ? "Buat Akun" : "Masuk"}</p>
        <p>Silakan {state === "Sign Up" ? "daftar" : "masuk"} untuk melanjutkan.</p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Nama Lengkap</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setNama(e.target.value)}
              value={nama}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <div className="relative">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-primary"
            >
              {showPassword ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Buat Akun" : "Masuk"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Sudah punya akun?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Masuk di sini
            </span>
          </p>
        ) : (
          <p>
            Belum punya akun?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Daftar di sini
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
