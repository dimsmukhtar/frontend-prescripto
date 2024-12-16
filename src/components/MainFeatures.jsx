import React from "react"
import { FaSearch, FaUserMd, FaChartLine } from "react-icons/fa"

const MainFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Diagnosis Cepat dan Akurat",
      description:
        "Dapatkan hasil diagnosis kesehatan gigi dalam hitungan menit dengan sistem pakar berbasis teknologi.",
      icon: <FaSearch size={40} className="text-primary" />,
    },
    {
      id: 2,
      title: "Konsultasi Pakar Kesehatan",
      description:
        "Berkonsultasi dengan pakar kesehatan gigi profesional untuk perawatan yang tepat dan berkelanjutan.",
      icon: <FaUserMd size={40} className="text-primary" />,
    },
    {
      id: 3,
      title: "Riwayat Diagnosis Lengkap",
      description:
        "Pantau hasil diagnosis Anda dengan riwayat lengkap dan akses mudah di mana saja.",
      icon: <FaChartLine size={40} className="text-primary" />,
    },
  ]

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Fitur Utama Kami</h2>
        <p className="text-center text-gray-600 mb-12">
          Tiga keunggulan yang menjadi fokus utama sistem pakar untuk diagnosis kesehatan gigi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainFeatures
