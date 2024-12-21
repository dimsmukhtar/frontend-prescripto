import React, { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"

const MyProfile = () => {
  const [user, setUser] = useState(null) // Menyimpan data user
  const [editMode, setEditMode] = useState(false) // Mode edit
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    image: null, // Untuk menyimpan file gambar
  })
  const [previewImage, setPreviewImage] = useState(null) // Preview gambar yang diunggah
  const [loading, setLoading] = useState(false)

  // Fetch data profil saat halaman dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("tokenUser")
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data.user)
        setFormData({
          nama: response.data.user.nama,
          email: response.data.user.email,
        })
      } catch (error) {
        toast.error("Gagal memuat data profil.")
      }
    }
    fetchProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
      setPreviewImage(URL.createObjectURL(file)) // Buat preview gambar
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("tokenUser")
      const form = new FormData()
      form.append("nama", formData.nama)
      form.append("email", formData.email)
      if (formData.image) {
        form.append("image", formData.image)
      }

      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/me/edit`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Profil berhasil diperbarui.")
      setEditMode(false) // Kembali ke mode tampilan
      setPreviewImage(null) // Reset preview
    } catch (error) {
      toast.error("Gagal memperbarui profil.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <p>Memuat data profil...</p>
  }

  return (
    <div className="min-h-screen py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Profil Saya</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl m-auto">
        {/* Foto Profil */}
        <div className="flex justify-center mb-6">
          <img
            src={previewImage || user.profileUrl || "https://via.placeholder.com/150"}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full object-cover border-2 border-primary"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full px-4 py-2 border rounded-lg ${
                editMode ? "border-gray-300 focus:ring-primary focus:border-primary" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full px-4 py-2 border rounded-lg ${
                editMode ? "border-gray-300 focus:ring-primary focus:border-primary" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Upload Gambar */}
          {editMode && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Foto Profil</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          {/* Tombol */}
          <div className="flex justify-between mt-6">
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false)
                    setPreviewImage(null) // Reset preview gambar
                  }}
                  className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Edit Profil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default MyProfile
