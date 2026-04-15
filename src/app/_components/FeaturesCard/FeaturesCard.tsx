import { ReactNode } from "react";


export default function FeaturesCard({ icon, title, description, color }: FeaturesCardProps) {
    const iconColor = color; 
  return (
    <div className="flex items-center p-4 border rounded-xl flex-1 min-w-62.5 bg-white shadow-sm">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4" style={{ backgroundColor: color + "20", color: iconColor }}>
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-800">{title}</h3>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </div>
  )
}
