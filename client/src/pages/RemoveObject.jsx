import { Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (object.split(' ').length > 1) {
        return toast('Please enter only one object name')
      }
      const formData = new FormData()
      formData.append('image', input)
      formData.append('object', object)
      const { data } = await axios.post('/api/ai/remove-image-object', formData, { headers: { Authorization: `Bearer ${await getToken()}` } })
      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="h-full min-h-screen bg-[#23272f] flex flex-col items-center justify-center py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-6 bg-[#31343b] rounded-2xl shadow-lg p-8 w-full md:max-w-md border border-[#444857]"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-7 h-7 text-[#ffb400]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Remove Object</h1>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#b0b3b8] mb-2">Upload Image</label>
            <input
              onChange={(e) => setInput(e.target.files[0])}
              type="file"
              accept="image/*"
              className="w-full bg-[#23272f] border border-[#444857] rounded-lg px-4 py-2 text-[#b0b3b8] focus:outline-none focus:ring-2 focus:ring-[#ffb400] transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#b0b3b8] mb-2">Object Name to Remove</label>
            <textarea
              onChange={(e) => setObject(e.target.value)}
              value={object}
              rows={3}
              className="w-full bg-[#23272f] border border-[#444857] rounded-lg px-4 py-2 text-[#b0b3b8] focus:outline-none focus:ring-2 focus:ring-[#ffb400] transition"
              placeholder="e.g., watch or spoon (single object name)"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ffb400] to-[#ff4c4c] text-white font-semibold px-4 py-2 rounded-xl shadow transition hover:scale-[1.03] disabled:opacity-60"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <Scissors className="w-5 h-5" />
            )}
            Remove Object
          </button>
        </form>
        {/* Right Panel */}
        <div className="flex flex-col bg-[#31343b] rounded-2xl shadow-lg p-8 w-full md:max-w-lg border border-[#444857] min-h-[28rem]">
          <div className="flex items-center gap-3 mb-2">
            <Scissors className="w-6 h-6 text-[#ff4c4c]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Result</h1>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {!content ? (
              <div className="flex flex-col items-center gap-4 text-[#b0b3b8]">
                <Scissors className="w-12 h-12 text-[#444857]" />
                <p className="text-base text-center">Upload an image and click <span className="text-[#ffb400] font-semibold">Remove Object</span> to get started.</p>
              </div>
            ) : (
              <img
                src={content}
                alt="Processed"
                className="mt-3 w-full h-auto rounded-xl border border-[#444857] shadow"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveObject
