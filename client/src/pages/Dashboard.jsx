import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className="h-full overflow-y-scroll p-0 bg-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-6 bg-[#232323] border-b border-[#333]">
        <h1 className="text-2xl font-bold text-white tracking-wide">Dashboard</h1>
        <div className="flex gap-4">
          <button className="bg-[#0077FF] hover:bg-[#005FCC] text-white px-5 py-2 rounded-md font-medium shadow transition">New Creation</button>
          <button className="bg-[#333] hover:bg-[#444] text-white px-5 py-2 rounded-md font-medium border border-[#444] transition">Upgrade</button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-6 px-10 py-8">
        {/* Total Creations Card */}
        <div className="flex flex-col justify-between w-72 h-32 p-6 bg-gradient-to-br from-[#232323] to-[#2d2d2d] rounded-xl border border-[#333] shadow-lg">
          <div>
            <p className="text-sm text-[#b3b3b3]">Total Creations</p>
            <h2 className="text-2xl font-semibold text-white mt-2">{creations.length}</h2>
          </div>
          <div className="flex items-center justify-end">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex justify-center items-center">
              <Sparkles className="w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex flex-col justify-between w-72 h-32 p-6 bg-gradient-to-br from-[#232323] to-[#2d2d2d] rounded-xl border border-[#333] shadow-lg">
          <div>
            <p className="text-sm text-[#b3b3b3]">Active Plan</p>
            <h2 className="text-2xl font-semibold text-white mt-2">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="flex items-center justify-end">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex justify-center items-center">
              <Gem className="w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="px-10">
        <p className="mt-2 mb-4 text-lg text-white font-semibold tracking-wide">Recent Creations</p>
        {
          loading ?
            (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-11 w-11 border-4 border-[#9E53EE] border-t-transparent"></div>
              </div>
            )
            :
            (
              <div className="flex flex-col gap-4">
                {
                  creations.map((item) => (
                    <div key={item.id} className="mb-2">
                      <CreationItem item={item} />
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Dashboard
