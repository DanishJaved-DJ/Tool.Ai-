import { Edit, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedLength.length }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

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
    <div className="h-full min-h-screen overflow-y-auto p-6 flex flex-wrap gap-6 bg-neutral-950 text-slate-100">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-neutral-900 rounded-2xl shadow-md p-6 border border-neutral-800 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-6 h-6 text-[#4A7AFF]" />
          <h1 className="text-lg font-semibold">Article Configuration</h1>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Article Topic</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="The future of artificial intelligence..."
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A7AFF] transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Article Length</label>
          <div className="flex gap-2 flex-wrap">
            {articleLength.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-3 py-1 rounded-full cursor-pointer border transition ${
                  selectedLength.text === item.text
                    ? 'bg-[#4A7AFF]/20 text-[#4A7AFF] border-[#4A7AFF]'
                    : 'text-gray-400 border-neutral-700 hover:bg-neutral-800'
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          ) : (
            <Edit className="w-5" />
          )}
          Generate Article
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg bg-neutral-900 rounded-2xl shadow-md p-6 border border-neutral-800 flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-2 mb-1">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-lg font-semibold">Generated Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-gray-500 flex flex-col items-center gap-3 text-center text-sm">
              <Edit className="w-9 h-9 text-neutral-700" />
              <p>Enter a topic and click <span className="text-[#4A7AFF] font-semibold">Generate Article</span> to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-2 overflow-y-auto text-sm text-gray-300 prose prose-invert">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
