import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24 bg-gradient-to-br from-[#23272A] to-[#181A1B] min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-white text-[42px] font-bold tracking-tight drop-shadow-lg">Powerful AI Tools</h2>
        <p className="text-gray-300 max-w-lg mx-auto text-lg mt-4">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap gap-8 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="group relative p-8 max-w-xs rounded-2xl bg-gradient-to-br from-[#2D2F36] to-[#181A1B] shadow-2xl border border-[#35363A] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
            onClick={() => user && navigate(tool.path)}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-[#FF6F00] text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">NEW</span>
            </div>
            <tool.Icon
              className="w-14 h-14 p-3 text-white rounded-xl mb-6"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}
            />
            <h3 className="mb-2 text-xl text-white font-semibold tracking-wide">{tool.title}</h3>
            <p className="text-gray-400 text-base">{tool.description}</p>
            <button className="mt-6 w-full py-2 bg-[#FF6F00] text-white rounded-lg font-bold text-sm tracking-wide shadow hover:bg-[#FF8F00] transition-colors duration-200">
              Try Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiTools
