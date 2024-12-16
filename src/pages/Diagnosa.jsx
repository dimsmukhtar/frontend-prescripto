import React, { useState, useEffect } from "react"
import { getGejala, submitDiagnosa, getPenyakitById } from "../utils/api"
import { toast } from "react-hot-toast"

const Diagnosa = () => {
  const [gejalaList, setGejalaList] = useState([])
  const [selectedGejala, setSelectedGejala] = useState([])
  const [loading, setLoading] = useState(false)
  const [diagnosaResult, setDiagnosaResult] = useState(null) // State untuk hasil diagnosa
  const [penyakitDetails, setPenyakitDetails] = useState(null) // State untuk detail penyakit

  useEffect(() => {
    const fetchGejala = async () => {
      try {
        const gejala = await getGejala()
        setGejalaList(gejala)
      } catch (error) {
        toast.error("Gagal memuat data gejala.")
      }
    }
    fetchGejala()
  }, [])

  const handleCheckboxChange = (gejalaId) => {
    setSelectedGejala((prev) =>
      prev.includes(gejalaId) ? prev.filter((id) => id !== gejalaId) : [...prev, gejalaId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedGejala.length === 0) {
      toast.error("Pilih minimal satu gejala.")
      return
    }

    setLoading(true)
    try {
      const result = await submitDiagnosa(selectedGejala) // Kirim data gejala ke backend
      setDiagnosaResult(result.diagnosa) // Simpan hasil diagnosa

      // Panggil API untuk mendapatkan detail penyakit
      const details = await getPenyakitById(result.diagnosa.id_penyakit)
      setPenyakitDetails(details) // Simpan detail penyakit
      toast.success("Diagnosa berhasil!")
    } catch (error) {
      toast.error(error?.message || "Gagal mengirim diagnosa.")
    } finally {
      setLoading(false)
    }
  }

  // Jika diagnosa sudah ada, tampilkan hasilnya
  if (penyakitDetails) {
    return (
      <div className="min-h-screen py-10 px-5 md:px-20">
        <h1 className="text-3xl font-bold text-primary mb-6">Hasil Diagnosa Anda</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {penyakitDetails.nama} {/* Nama penyakit */}
          </h2>
          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Deskripsi:</span> {penyakitDetails.deskripsi}
          </p>
          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Solusi:</span> {penyakitDetails.solusi}
          </p>
        </div>
        <button
          onClick={() => {
            setDiagnosaResult(null)
            setPenyakitDetails(null) // Reset hasil dan detail penyakit
            setSelectedGejala([]) // Reset pilihan gejala
          }}
          className="mt-6 bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-dark transition-all"
        >
          Diagnosa Ulang
        </button>
      </div>
    )
  }

  // Jika diagnosaResult null, tampilkan pertanyaan
  return (
    <div className="min-h-screen py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Diagnosa Kesehatan Gigi Anda</h1>
      <p className="mb-8 text-gray-700">Jawab pertanyaan berikut sesuai dengan kondisi Anda:</p>
      {gejalaList.length === 0 ? (
        <p className="text-gray-500">Memuat gejala...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gejalaList.map((gejala) => (
              <label
                key={gejala.id}
                className="flex items-center gap-3 bg-gray-100 p-4 rounded shadow-sm cursor-pointer hover:shadow-lg transition-all"
              >
                <input
                  type="checkbox"
                  value={gejala.id}
                  onChange={() => handleCheckboxChange(gejala.id)}
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-gray-800">{gejala.deskripsi}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-dark transition-all"
          >
            {loading ? "Mengirim..." : "Diagnosa Sekarang"}
          </button>
        </form>
      )}
    </div>
  )
}

export default Diagnosa
