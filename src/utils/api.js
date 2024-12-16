import axios from "axios"

export const signup = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, {
      nama: data.nama,
      email: data.email,
      password: data.password,
    })
    return response.data // Mengembalikan response JSON dari API
  } catch (error) {
    throw error.response?.data
  }
}

export const login = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, {
      email: data.email,
      password: data.password,
    })
    return response.data
  } catch (error) {
    throw error.response?.data
  }
}

export const verifyCode = async (verificationCode) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/verify-email`, {
      code: verificationCode,
    })
    return response.data
  } catch (error) {
    throw error.response?.data
  }
}

export const getGejala = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/gejala`)
    return response.data.gejala
  } catch (error) {
    console.error("Error fetching gejala:", error)
    throw error
  }
}

export const getPenyakitById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/penyakit/${id}`)
    return response.data.penyakit // Kembalikan data penyakit
  } catch (error) {
    console.error("Error fetching penyakit:", error)
    throw error
  }
}

export const submitDiagnosa = async (data) => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/diagnosa`,
      { gejala: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Error submitting diagnosa:", error)
    throw error
  }
}
