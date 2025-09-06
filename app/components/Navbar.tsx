'use client'
import React from 'react'
import { useState } from 'react'

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosCloseCircle } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='h-full'>
      <div className={`bg-white dark:bg-black fixed inset-0 z-50 transform transition-transform duration-500 ease-out ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className='m-10 h-[calc(100%-5rem)]'>
          <div className='flex justify-between'>
            <h1 className='text-4xl font-bold'>MENU</h1>
            <button onClick={() => setMenuOpen(!menuOpen)} className='hover:cursor-pointer'><IoIosCloseCircle className='text-4xl'/></button>
          </div>
          <ul className='mt-5 [&>li]:text-2xl [&>li]:border-b [&>li]:border-black [&>li]:dark:border-white'>
            <li><a href='/'>Homepage</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/escape-room'>Escape Room</a></li>
            <li><a href='#'>Coding Races</a></li>
            <li><a href='#'>Court Room</a></li>
          </ul>
        </div>
      </div>
      <div className='flex justify-between'>
        <ul className='flex justify-center [&>li]:p-2 [&>li]:border-r [&>li]:border-black [&>li]:dark:border-white'>
          <li><a href='/'>Homepage</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/escape-room'>Escape Room</a></li>
          <li><a href='#'>Coding Races</a></li>
          <li><a href='#'>Court Room</a></li>
        </ul>
        <button className='aspect-square mr-2 flex items-center hover:cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
          <RxHamburgerMenu className='text-2xl'/>
        </button>

      </div>
    </nav>
  )
}

export default Navbar
