import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const Konsultasi = () => {
  const [questions, setQuestions] = useState([])
  const [pertanyaan, setPertanyaan] = useState("")
  const [loading, setLoading] = useState(true) // State untuk loading data

  // Fetch semua pertanyaan milik user saat halaman dimuat
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("tokenUser")
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/question/konsul`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setQuestions(response.data.questions || [])
      } catch (error) {
        toast.error("Gagal memuat pertanyaan.")
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  // Fungsi untuk mengirim pertanyaan
  const handleSendQuestion = async (e) => {
    e.preventDefault()
    if (!pertanyaan.trim()) {
      toast.error("Pertanyaan tidak boleh kosong.")
      return
    }

    try {
      const token = localStorage.getItem("tokenUser")
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/question/konsul`,
        { pertanyaan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success(response.data.message)
      setQuestions((prev) => [
        ...prev,
        { pertanyaan, jawaban: null, id_user: null }, // Tambahkan pertanyaan ke state
      ])
      setPertanyaan("") // Reset input
    } catch (error) {
      toast.error("Gagal mengirim pertanyaan.")
    }
  }

  if (loading) {
    return <p>Memuat data konsultasi...</p>
  }

  return (
    <div className="min-h-screen py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Konsultasi dengan Pakar</h1>

      {/* Form untuk mengajukan pertanyaan */}
      <form onSubmit={handleSendQuestion} className="mb-10">
        <textarea
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          placeholder="Tuliskan pertanyaan Anda di sini..."
          className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        ></textarea>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Kirim Pertanyaan
        </button>
      </form>

      {/* Daftar Pertanyaan */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Riwayat Konsultasi Anda</h2>
        {questions.length === 0 ? (
          <p>Anda belum mengajukan pertanyaan.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-800 font-semibold mb-2">Pertanyaan {index + 1}:</p>
                <p className="text-gray-600 mb-2">{question.pertanyaan}</p>
                <p className="text-sm text-gray-500">
                  Jawaban:{" "}
                  {question.jawaban ? (
                    <span className="text-gray-800">{question.jawaban}</span>
                  ) : (
                    <span className="text-gray-400">Belum dijawab</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Konsultasi
