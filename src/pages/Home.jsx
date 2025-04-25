import React from 'react'
import Navbar from '../compnents/Navbar'
import Hero from '../compnents/Hero'
import Footer from '../compnents/Footer'
import BestToday from '../compnents/BestToday'
import Subscribe from '../compnents/Subscribe.jsx'

const Home = () => {
  return (
   <main>
     <Navbar />
     <Hero />
     <BestToday />
     <Subscribe />
     <Footer />
   </main>
  )
}

export default Home