import React from 'react'

export default  function ServiceIcon({icon, title, desc}: any) {
  return (
    <div className="flex flex-col items-center text-center gap-2 p-4 rounded-3xl bg-white border border-gray-50 shadow-sm">
      <div className="text-green-600 bg-green-50 p-2 rounded-xl">{icon}</div>
      <div>
        <p className="text-[11px] font-black text-[#2d3a4b] leading-tight">{title}</p>
        <p className="text-[9px] text-gray-400 font-bold">{desc}</p>
      </div>
    </div>
  );
}