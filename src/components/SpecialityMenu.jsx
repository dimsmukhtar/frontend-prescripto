import React from "react"
import { specialityData } from "../assets/assets"
import { Link } from "react-router-dom"

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
      <h1 className="text-3xl font-medium">Kenali Tim Kami</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Tim di balik Prescripto, yang berdedikasi untuk menyediakan diagnosis kesehatan gigi terbaik
        bagi Anda.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img
              className="object-cover w-20 md:w-28 h-20 md:h-28 mb-2 rounded-full shadow"
              src={item.image}
              alt=""
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu