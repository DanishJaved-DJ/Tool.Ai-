import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div
            onClick={() => setExpanded(!expanded)}
            className={`transition-shadow duration-200 shadow-md hover:shadow-xl bg-gradient-to-br from-gray-50 to-gray-200 border border-gray-300 rounded-xl cursor-pointer p-0 max-w-4xl`}
            style={{ fontFamily: 'Adobe Clean, Arial, sans-serif' }}
        >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.prompt}</h2>
                    <p className="text-xs text-gray-500 mt-1">
                        {item.type} &middot; {new Date(item.created_at).toLocaleDateString()}
                    </p>
                </div>
                <button
                    className="bg-white border border-blue-400 text-blue-700 px-4 py-1 rounded-full font-medium shadow-sm hover:bg-blue-50 transition"
                    style={{ letterSpacing: '0.03em' }}
                >
                    {item.type}
                </button>
            </div>
            {expanded && (
                <div className="px-6 py-5 bg-white rounded-b-xl">
                    {item.type === 'image' ? (
                        <div className="flex justify-center items-center">
                            <img
                                src={item.content}
                                alt="image"
                                className="mt-2 rounded-lg border border-gray-200 shadow-sm max-w-md w-full"
                                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                            />
                        </div>
                    ) : (
                        <div className="mt-2 text-base text-gray-800 leading-relaxed max-h-96 overflow-y-auto">
                            <div className="reset-tw">
                                <Markdown>{item.content}</Markdown>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreationItem
