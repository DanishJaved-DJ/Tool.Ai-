import { Eraser, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', input);

      const { data } = await axios.post(
        '/api/ai/remove-image-background',
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-[#232526] to-[#414345] flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="md:w-1/2 w-full p-8 flex flex-col justify-center items-center bg-gradient-to-br from-[#FF4938]/10 to-[#F6AB41]/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-[#FF4938]" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Remove Background
            </h1>
          </div>
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-[#FF4938] rounded-xl p-8 bg-white hover:bg-[#FFF5F2] transition mb-4 w-full"
          >
            <Eraser className="w-12 h-12 text-[#FF4938] mb-2" />
            <span className="text-lg font-medium text-gray-700">
              Click to upload image
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Supports JPG, PNG, and more
            </span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setInput(e.target.files[0])}
              required
            />
          </label>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-6 py-3 mt-2 text-base rounded-xl font-semibold shadow-lg hover:scale-105 transition cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
            ) : (
              <Eraser className="w-6 h-6" />
            )}
            Remove Background
          </button>
        </form>
        {/* Right Panel */}
        <div className="md:w-1/2 w-full p-8 flex flex-col items-center justify-center bg-white">
          <div className="flex items-center gap-3 mb-6">
            <Eraser className="w-7 h-7 text-[#FF4938]" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Result
            </h1>
          </div>
          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400">
              <Eraser className="w-16 h-16 mb-4" />
              <p className="text-base text-center">
                Upload an image and click <span className="font-semibold text-[#FF4938]">Remove Background</span> to get started
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <img
                src={content}
                alt="Processed"
                className="rounded-xl shadow-lg border border-gray-200 w-full max-h-96 object-contain bg-[#F6F6F6]"
              />
              <a
                href={content}
                download="background-removed.png"
                className="mt-6 px-5 py-2 bg-gradient-to-r from-[#FF4938] to-[#F6AB41] text-white rounded-xl font-semibold shadow hover:scale-105 transition"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
