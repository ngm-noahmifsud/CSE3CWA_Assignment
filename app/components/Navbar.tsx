'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

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
            <li><Link href='/'>Homepage</Link></li>
            <li><Link href='/about'>About</Link></li>
            <li><Link href='/escape-room'>Escape Room</Link></li>
            <li><Link href='/api'>API</Link></li>
          </ul>
        </div>
      </div>
      <div className='flex justify-between'>
        <ul className='flex justify-center [&>li]:p-2 [&>li]:border-r [&>li]:border-black [&>li]:dark:border-white'>
          <li><Link href='/'>Homepage</Link></li>
          <li><Link href='/about'>About</Link></li>
          <li><Link href='/escape-room'>Escape Room</Link></li>
          <li><Link href='/api'>API</Link></li>
        </ul>
        <button className='aspect-square mr-2 flex items-center hover:cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
          <RxHamburgerMenu className='text-2xl'/>
        </button>

      </div>
    </nav>
  )
}

export default Navbar
