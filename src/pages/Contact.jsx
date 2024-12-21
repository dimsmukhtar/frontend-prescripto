import React from "react"
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"

const Contact = () => {
  const teamMembers = [
    {
      name: "Dimas Mukhtar Yuliawan",
      email: "dimsmukhtar@gmail.com",
      instagram: "https://instagram.com/dimsmukhtar._",
      linkedin: "https://linkedin.com/in/dimasmukhtar",
      github: "https://github.com/dimsmukhtar",
    },
    {
      name: "Dimas Arga Sadewa",
      email: "argasadewa133@gmail.com",
      instagram: "https://instagram.com/argooddd",
      linkedin: "https://linkedin.com/in/dimas-arga-sadewa",
      github: "https://github.com/argasadewa",
    },
    {
      name: "Chandra Dwi Setiawan",
      email: "chandradwisetiawan80@gmail.com",
      instagram: "https://instagram.com/candradwi__",
      linkedin: "https://linkedin.com/in/chandra-dwi-setiawan",
      github: "https://github.com/chandradwi",
    },
    {
      name: "Lina Setiawati",
      email: "linasetiawati342@gmail.com",
      instagram: "https://instagram.com/linasetya__",
      linkedin: "https://linkedin.com/in/lina-setiawati",
      github: "https://github.com/linasetiawati",
    },
  ]

  return (
    <div className="contact-section py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-4">Kontak Tim Kami</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="contact-card bg-white p-6 shadow-lg rounded-lg transition-transform hover:scale-105 duration-300"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">{member.name}</h3>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center text-gray-600 hover:text-primary transition-colors break-words"
                >
                  <FaEnvelope className="mr-2 text-xl text-primary" />
                  <span className="overflow-wrap-break-word">{member.email}</span>
                </a>
                {/* Instagram */}
                <a
                  href={member.instagram}
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="mr-2 text-xl text-primary" />
                  Instagram
                </a>
                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2 text-xl text-primary" />
                  LinkedIn
                </a>
                {/* GitHub */}
                <a
                  href={member.github}
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2 text-xl text-primary" />
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact
