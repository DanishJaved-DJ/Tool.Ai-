import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import LOGO from '../assets/LOGO.png'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    <div className="fixed z-10 h-16 w-full bg-[#22223b] flex justify-between items-center px-6 sm:px-16 xl:px-32 shadow-lg border-b border-[#39395f]">
      <div className="flex items-center gap-4">
        <img
          src={LOGO}
          alt="logo"
          className="w-32 cursor-pointer"
          onClick={() => navigate('/')}
        />
        
      </div>
      <div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 rounded-md text-sm font-medium cursor-pointer bg-gradient-to-r from-[#ff6f00] to-[#ff8e53] text-white px-6 py-2 shadow hover:scale-105 transition"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
