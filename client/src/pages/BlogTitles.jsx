import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        '/api/ai/generate-blog-title',
        { prompt },
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
    <div className="h-full min-h-screen bg-gradient-to-br from-[#23272F] via-[#2D323B] to-[#181A20] p-10 flex flex-col md:flex-row gap-8 text-slate-100 font-sans">
      {/* Left Panel */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full md:w-1/2 max-w-xl p-8 rounded-2xl shadow-2xl bg-[#23272F] border border-[#353945] flex flex-col gap-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-7 h-7 text-[#FF61F6]" />
          <h1 className="text-2xl font-bold tracking-wide">AI Title Generator</h1>
        </div>
        <label className="text-base font-semibold tracking-wide mb-1">Keyword</label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-3 rounded-lg bg-[#181A20] border border-[#353945] text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-[#FF61F6] transition"
          placeholder="The future of artificial intelligence is..."
          required
        />
        <label className="text-base font-semibold tracking-wide mt-2 mb-1">Category</label>
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`px-4 py-2 rounded-full cursor-pointer transition border ${
                selectedCategory === item
                  ? 'bg-[#FF61F6] text-white border-[#FF61F6] shadow-lg'
                  : 'bg-[#181A20] text-slate-300 border-[#353945] hover:bg-[#23272F]'
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF61F6] to-[#8E37EB] text-white px-5 py-3 mt-6 text-base rounded-xl font-semibold shadow-lg hover:scale-105 transition active:scale-95"
        >
          {loading ? (
            <span className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
          ) : (
            <Hash className="w-6 h-6" />
          )}
          Generate Title
        </button>
      </form>
      {/* Right Panel */}
      <div className="w-full md:w-1/2 max-w-xl p-8 rounded-2xl shadow-2xl bg-[#23272F] border border-[#353945] flex flex-col min-h-[28rem]">
        <div className="flex items-center gap-3 mb-2">
          <Hash className="w-6 h-6 text-[#FF61F6]" />
          <h1 className="text-2xl font-bold tracking-wide">Generated Titles</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex flex-col justify-center items-center text-slate-400">
            <Hash className="w-12 h-12 mb-4" />
            <p className="text-lg">Enter a topic and click “Generate Title” to get started</p>
          </div>
        ) : (
          <div className="mt-4 h-full overflow-y-auto text-base text-slate-200">
            <div className="prose prose-invert max-w-none">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
