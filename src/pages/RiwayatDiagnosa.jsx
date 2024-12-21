import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const RiwayatDiagnosa = () => {
  const [diagnosas, setDiagnosas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const token = localStorage.getItem("tokenUser")
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/diagnosa/riwayat`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDiagnosas(response.data.diagnosas)
      } catch (error) {
        toast.error("Gagal memuat riwayat diagnosa.")
      } finally {
        setLoading(false)
      }
    }
    fetchRiwayat()
  }, [])

  if (loading) {
    return <p>Memuat riwayat diagnosa...</p>
  }

  if (diagnosas.length === 0) {
    return <p>Anda belum memiliki riwayat diagnosa.</p>
  }

  return (
    <div className="min-h-screen py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Riwayat Diagnosa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagnosas.map((diagnosa) => (
          <div key={diagnosa.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{diagnosa.namaPenyakit}</h2>
            <p className="text-gray-600 mb-2">{diagnosa.deskripsiPenyakit}</p>
            <p className="text-sm text-gray-500">
              Diagnosa pada: {new Date(diagnosa.tanggalDiagnosa).toLocaleDateString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiwayatDiagnosa
