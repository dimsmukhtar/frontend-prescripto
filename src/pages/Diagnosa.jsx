import React, { useState, useEffect } from "react"
import { getPenyakitWithGejala, submitDiagnosa } from "../utils/api"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Diagnosa = () => {
  const [penyakitList, setPenyakitList] = useState([])
  const [currentPenyakitIndex, setCurrentPenyakitIndex] = useState(0) // Indeks penyakit saat ini
  const [currentGejalaIndex, setCurrentGejalaIndex] = useState(0) // Indeks gejala saat ini
  const [selectedGejala, setSelectedGejala] = useState([]) // Gejala yang dipilih
  const [loading, setLoading] = useState(false)
  const [diagnosaResult, setDiagnosaResult] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPenyakit = async () => {
      try {
        const data = await getPenyakitWithGejala()
        setPenyakitList(data)
      } catch (error) {
        toast.error("Gagal memuat data penyakit dan gejala.")
      }
    }
    fetchPenyakit()
  }, [])

  const handleAnswer = (answer) => {
    const currentPenyakit = penyakitList[currentPenyakitIndex]

    if (answer === "ya") {
      const selectedGejalaId = currentPenyakit.gejala[currentGejalaIndex].id

      // Tambahkan gejala ke daftar yang dipilih
      setSelectedGejala((prev) => {
        const updatedGejala = [...prev, selectedGejalaId]

        // Jika semua gejala untuk penyakit ini sudah terjawab, kirim data ke backend
        if (currentGejalaIndex + 1 >= currentPenyakit.gejala.length) {
          handleSubmit(updatedGejala) // Kirimkan gejala yang sudah diperbarui
        } else {
          // Lanjutkan ke gejala berikutnya
          setCurrentGejalaIndex((prevIndex) => prevIndex + 1)
        }

        return updatedGejala
      })
    } else {
      // Jika "tidak", lanjutkan ke penyakit berikutnya
      if (currentPenyakitIndex + 1 >= penyakitList.length) {
        toast.error("Tidak ada penyakit yang terdiagnosa.")
        setDiagnosaResult("Tidak terdiagnosa penyakit.")
        return
      }

      setCurrentPenyakitIndex((prevIndex) => prevIndex + 1)
      setCurrentGejalaIndex(0) // Reset indeks gejala
    }
  }

  const handleSubmit = async (updatedGejala) => {
    try {
      const data = {
        gejala: updatedGejala, // Pastikan gejala yang dikirimkan adalah versi terbaru
      }
      console.log("selected gejala:", data)

      const result = await submitDiagnosa(data)
      setDiagnosaResult(result.hasil)

      if (result.success) {
        toast.success("Diagnosa berhasil!")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error?.message || "Gagal mengirim diagnosa.")
    } finally {
      setLoading(false)
    }
  }

  if (diagnosaResult) {
    return (
      <div className="min-h-screen py-10 px-5 md:px-20">
        <h1 className="text-3xl font-bold text-primary mb-6">Hasil Diagnosa Anda</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{diagnosaResult.nama}</h2>
          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Deskripsi:</span> {diagnosaResult.deskripsi}
          </p>
          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Solusi:</span> {diagnosaResult.solusi}
          </p>
        </div>
        <button
          onClick={() => {
            setDiagnosaResult(null) // Hapus hasil diagnosa
            setSelectedGejala([]) // Reset gejala yang dipilih
            setCurrentPenyakitIndex(0) // Reset indeks penyakit
            setCurrentGejalaIndex(0) // Reset indeks gejala
          }} // Refresh untuk diagnosa ulang
          className="mt-6 bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-dark transition-all"
        >
          Diagnosa Ulang
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Diagnosa Kesehatan Gigi Anda</h1>
      <p className="mb-8 text-gray-700">
        {penyakitList.length > 0
          ? penyakitList[currentPenyakitIndex]?.gejala[currentGejalaIndex]?.deskripsi
          : "Memuat pertanyaan..."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => handleAnswer("ya")}
          className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-all"
        >
          Ya
        </button>
        <button
          onClick={() => handleAnswer("tidak")}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-400 transition-all"
        >
          Tidak
        </button>
      </div>
    </div>
  )
}

export default Diagnosa
