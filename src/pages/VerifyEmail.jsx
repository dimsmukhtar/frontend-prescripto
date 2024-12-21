import React, { useState } from "react"
import { verifyCode } from "../utils/api"
import { toast } from "react-hot-toast"

const VerifyEmail = () => {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await verifyCode(code)

      if (response.success) {
        // Menampilkan toast sukses
        toast.success(response.message || "Verifikasi berhasil!")
        setTimeout(() => {
          window.location.replace("/") // Redirect ke halaman utama setelah 2 detik
        }, 2000)
      }
    } catch (error) {
      // Menampilkan toast error
      toast.error(error.message || "Kode salah atau kadaluwarsa")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Verifikasi Email</p>
        <p>Masukkan kode verifikasi yang dikirimkan ke email Anda.</p>

        <div className="w-full">
          <p>Kode Verifikasi</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {loading ? "Memverifikasi..." : "Verifikasi"}
        </button>
      </div>
    </form>
  )
}

export default VerifyEmail
