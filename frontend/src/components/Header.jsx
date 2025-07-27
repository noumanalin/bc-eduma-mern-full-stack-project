import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header>
        <div className="text-center p-3 bg-[#dfefff]">
            <p className='gray'>Brand new Course Package released! Get 30% off your first purchase with code “Eduma”. <strong>Find out more!</strong></p>
        </div>

        <Navbar/>
        <hr className='opacity-30' />
    </header>
  )
}

export default Header