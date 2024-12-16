import React from "react"
import Header from "../components/Header"
import SpecialityMenu from "../components/SpecialityMenu"
import Banner from "../components/Banner"
import MainFeatures from "../components/MainFeatures"
import Faq from "../components/Faq"

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <MainFeatures />
      <Banner />
      <Faq />
    </div>
  )
}

export default Home
