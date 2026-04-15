import React from 'react';
export default function AdCard({ hint, title, description, code, discount, buttonText, bagroundClass, buttonTextColor }: AdCardProps) {
  return (
       <div className="flex flex-wrap gap-6 p-6 font-sans  w-full">
          {/* Green Banner - Fresh Organic Fruits */}
          <div className="flex-1 min-w-75 p-8 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-500 text-white relative overflow-hidden shadow-lg" style={{background: bagroundClass || 'linear-gradient(135deg, #6B46C1, #805AD5)'}}>
            {/* Decorative Circle (Subtle effect) */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>

            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-4">
                {hint}
            </span>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-white/80 text-sm mb-6">
              {description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black">{discount}</span>
              <span className="text-xs opacity-70">
                Use code: <span className="font-bold">{code}</span>
              </span>
            </div>

            <button 
              className="bg-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
              style={{ color: buttonTextColor || '#2D8F5B' }}
            >
              {buttonText}
            </button>
          </div>
        </div>
  )
}
