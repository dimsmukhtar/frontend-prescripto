import React, { useState } from "react"

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index) // Toggle state
  }

  const faqs = [
    {
      question: "Apa itu Prescripto?",
      answer:
        "Prescripto adalah sistem pakar berbasis AI yang digunakan untuk mendiagnosis penyakit gigi secara cepat dan akurat.",
    },
    {
      question: "Bagaimana cara menggunakan Prescripto?",
      answer:
        "Cukup jawab pertanyaan tentang gejala yang Anda alami, dan Prescripto akan memberikan diagnosis serta rekomendasi perawatan.",
    },
    {
      question: "Apakah Prescripto gratis?",
      answer:
        "Ya, Prescripto bisa digunakan secara gratis untuk mendapatkan diagnosis awal. Beberapa fitur lanjutan mungkin membutuhkan biaya.",
    },
    {
      question: "Apakah diagnosis dari Prescripto akurat?",
      answer:
        "Prescripto menggunakan teknologi sistem pakar berbasis AI dan data medis terkini untuk memberikan diagnosis yang akurat. Namun, kami menyarankan konsultasi lebih lanjut dengan profesional medis jika diperlukan.",
    },
    {
      question: "Bagaimana cara melihat riwayat diagnosis saya?",
      answer:
        "Anda bisa melihat riwayat diagnosis Anda melalui menu 'Riwayat Diagnosa' di bagian profil. Semua hasil diagnosis yang telah dilakukan akan tercatat di sana.",
    },
    {
      question: "Apakah data saya aman?",
      answer:
        "Kami menjaga privasi dan keamanan data Anda dengan standar keamanan tinggi, dan tidak akan membagikan informasi pribadi Anda ke pihak ketiga tanpa izin.",
    },
  ]

  return (
    <div className="faq-section py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Pertanyaan yang Sering Diajukan
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-lg rounded-lg transition-all duration-300"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left font-semibold text-lg text-primary flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span
                className={`transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                &#x25BC;
              </span>
            </button>
            <div
              className={`mt-4 text-gray-600 transition-all duration-100 ease-in-out overflow-hidden ${
                activeIndex === index ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq
