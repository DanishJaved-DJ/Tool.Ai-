import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('resume', input);

      const { data } = await axios.post('/api/ai/resume-review', formData, {
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
    <div className="h-full overflow-y-auto p-6 flex flex-wrap gap-6 bg-neutral-950 text-slate-100">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-neutral-900 rounded-xl p-6 shadow-md border border-neutral-800 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-lg font-semibold">Resume Review</h1>
        </div>
        <p className="text-sm font-medium text-slate-300">Upload your PDF resume</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="application/pdf"
          className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-700 text-sm text-slate-200 placeholder:text-slate-400 file:text-slate-200"
          required
        />

        <p className="text-xs text-gray-500">PDF only, max size ~5MB.</p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-2 rounded-lg hover:opacity-90 transition"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          ) : (
            <FileText className="w-5" />
          )}
          Review Resume
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg bg-neutral-900 rounded-xl p-6 shadow-md border border-neutral-800 flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-[#00DA83]" />
          <h1 className="text-lg font-semibold">Analysis Results</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col justify-center items-center text-gray-500 text-sm gap-3">
            <FileText className="w-9 h-9" />
            <p>Upload a resume and click "Review Resume" to get started</p>
          </div>
        ) : (
          <div className="mt-2 overflow-y-auto text-sm text-slate-300 prose prose-invert">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
