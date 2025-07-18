import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#23272F] via-[#2D313A] to-[#181A20] px-4 sm:px-20 xl:px-32">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-[#23272F] bg-opacity-80 border-b border-[#353945]">
                <img src={assets.logo} alt="Logo" className="h-8" />
                <div className="flex gap-6 text-gray-300 text-sm">
                    <button className="hover:text-white transition">Home</button>
                    <button className="hover:text-white transition">Features</button>
                    <button className="hover:text-white transition">Pricing</button>
                    <button className="hover:text-white transition">Contact</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center mt-24">
                <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] 2xl:text-[5rem] font-bold text-white tracking-tight leading-tight text-center drop-shadow-lg">
                    Create <span className="text-[#FF9A00]">amazing content</span> <br /> with <span className="text-[#00C8FF]">AI tools</span>
                </h1>
                <p className="mt-6 max-w-xl text-center text-gray-300 text-lg sm:text-xl">
                    Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
                </p>
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => navigate('/ai')}
                        className="bg-gradient-to-r from-[#FF9A00] to-[#FF3C3C] text-white px-10 py-3 rounded-lg shadow-lg font-semibold hover:scale-105 active:scale-95 transition"
                    >
                        Start creating now
                    </button>
                    <button className="bg-[#23272F] border border-[#353945] text-white px-10 py-3 rounded-lg shadow-lg font-semibold hover:scale-105 active:scale-95 transition">
                        Watch demo
                    </button>
                </div>
                <div className="flex items-center gap-3 mt-10 text-gray-400 text-base">
                    <img src={assets.user_group} alt="" className="h-8" />
                    <span>Trusted by <span className="text-white font-semibold">10k+</span> people</span>
                </div>
            </div>

            {/* Decorative Adobe-style gradient shapes */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#FF9A00] via-[#FF3C3C] to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#00C8FF] via-[#23272F] to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />
        </div>
    )
}

export default Hero
