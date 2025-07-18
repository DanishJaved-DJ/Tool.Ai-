import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy style',
    'Realistic style',
    '3D style',
    'Portrait style',
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
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
    <div className="h-full min-h-screen bg-[#181818] overflow-y-scroll p-10 flex items-start flex-wrap gap-8 text-gray-100 font-sans">
      {/* Left Panel */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-8 bg-[#232323] rounded-2xl shadow-lg border border-[#2c2c2c]"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-7 h-7 text-[#FF6F00]" />
          <h1 className="text-2xl font-bold tracking-tight">AI Image Generator</h1>
        </div>
        <label className="block text-sm font-semibold mb-2">Describe Your Image</label>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-3 bg-[#1a1a1a] text-gray-100 rounded-lg border border-[#333] focus:border-[#FF6F00] outline-none transition mb-6"
          placeholder="Describe what you want to see in the image..."
          required
        />

        <label className="block text-sm font-semibold mb-2">Style</label>
        <div className="flex gap-2 flex-wrap mb-6">
          {imageStyle.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-2 rounded-full cursor-pointer transition ${
                selectedStyle === item
                  ? 'bg-[#FF6F00] text-white shadow'
                  : 'bg-[#222] text-gray-300 border border-[#333]'
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-8">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-[#333] rounded-full peer-checked:bg-[#FF6F00] transition"></div>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <span className="text-sm">Make this image Public</span>
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF6F00] to-[#FFB300] text-white px-5 py-3 text-base rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition cursor-pointer"
        >
          {loading ? (
            <span className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
          ) : (
            <Image className="w-6 h-6" />
          )}
          Generate Image
        </button>
      </form>
      {/* Right Panel */}
      <div className="w-full max-w-lg p-8 bg-[#232323] rounded-2xl shadow-lg border border-[#2c2c2c] min-h-[24rem] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Image className="w-6 h-6 text-[#FF6F00]" />
          <h1 className="text-2xl font-bold tracking-tight">Generated Image</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
              <Image className="w-12 h-12" />
              <p>Enter a topic and click “Generate Image” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full flex justify-center items-center">
            <img
              src={content}
              alt="image"
              className="rounded-xl shadow-lg border border-[#333] max-h-[20rem] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
