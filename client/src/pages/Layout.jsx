import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'
import LOGO from '../assets/logo.png'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className="flex flex-col h-screen bg-[#23272f]">
      {/* Top Bar */}
      <nav className="w-full px-6 h-14 flex items-center justify-between bg-[#1a1d21] border-b border-[#23272f]">
        <img
          className="cursor-pointer w-32 sm:w-44"
          src={LOGO}
          alt=""
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-300 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-300 sm:hidden"
          />
        )}
      </nav>
      {/* Main Area */}
      <div className="flex flex-1 w-full h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <div className="bg-[#1a1d21] w-16 sm:w-64 h-full border-r border-[#23272f]">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        {/* Content */}
        <div className="flex-1 bg-[#2c313a] p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-[#23272f]">
      <SignIn />
    </div>
  )
}

export default Layout
