import React from 'react'
import CryptoSwap from './CryptoSwap'
const HeroSection = () => {
  return (

  <section className='px-4 lg:flex lg:py-8 lg:pt-12'>
    {/* <div className='veify_card md:hidden'>
     <div className='bg-[#2087C2] rounded-lg min-h-28 min-w-28 mt-6 px-4 py-2 flex flex-col  justify-start items-start gap-6 '>
      <h2 className='text-white'>Account verifaction</h2>
       <button className='bg-white text-green-600 px-4 py-1 rounded-md font-medium'>Verify</button>
     </div>
    </div> */}

<div className="  w-full md:w-1/2 px-4 py-8  flex-col  justify-center items-center hidden lg:flex bg-red">
  <div className="max-w-lg mx-auto text-start">
    <h1 className="text-4xl font-bold mb-4 text-gray-800">
      WELCOME TO <br />
      <span className="text-cyan-600">SHIELD</span>
    </h1>
    <p className="text-xl font-semibold text-gray-600 mb-4">
      Your Best Money Transfer Partner
    </p>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
      Convert your payments between cash and crypto easily
    </h2>
    <h3 className="text-lg text-gray-500">
      Experience the freedom of fluid finances. Convert between cash and crypto easily, and open up a world of financial possibilities today.
    </h3>
  </div>
</div>


    <CryptoSwap/>
  </section>
  )
}

export default HeroSection
