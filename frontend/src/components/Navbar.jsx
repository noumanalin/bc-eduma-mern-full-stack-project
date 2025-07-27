import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {ShoppingCart, Search, ChevronDown, Menu} from 'lucide-react' 
const Navbar = () => {

  return (
    <nav className='cont flex-bc py-3'>
      {/* Nav Logo */}
      <Link href='/'>
        <img src="/logo.svg" alt="logo" />
      </Link>

      {/* Nav Links */}
        <ul className='hidden  lg:flex gap-7 nav-links'>
          <li><NavLink to={'/'} >Home</NavLink></li>
          <li><NavLink to={'/courses'} className={`flex items-center gap-1`}>Courses <ChevronDown size={20} strokeWidth={1.5} /></NavLink></li>
          <li><NavLink to={'/pages'} className={`flex items-center gap-1`}>Pages <ChevronDown size={20} strokeWidth={1.5} /></NavLink></li>
          <li><NavLink to={'/blogs'} >Blog</NavLink></li>
          <li><NavLink to={'/backend-demo'} >Backend Demo</NavLink></li>
        </ul>
      {/* Nav Actions */}
      <div className="flex-bc gap-6">
        <button onClick={()=>alert('hello')} className='color-smooth hover:text-[var(--primary-color)] '><Search  size={23}/></button>
        <button onClick={()=>alert('hello')} className='relative color-smooth hover:text-[var(--primary-color)] '><ShoppingCart  size={23}/> <span className='absolute -top-3 -right-2 text-xs text-white w-5 h-5 center-center rounded-full bg-[var(--primary-color)]'>0</span></button>
        <button className=' text-sm font-semibold rounded-md px-5 py-3 hover:bg-blue-600 transition-colors duration-300 text-gray-100 bg-[var(--primary-color)]'>Login</button>
        <button onClick={()=>alert('hello menu')} className=' lg:hidden color-smooth hover:text-[var(--primary-color)] '><Menu size={23}/></button>
      </div>
    </nav>
  )
}

export default Navbar