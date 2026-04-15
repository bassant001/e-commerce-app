import Link from "next/link";
import { ReactNode } from "react";
import { CiShoppingTag } from "react-icons/ci";

interface Props {
  title: string;
  p?: string;
  labels: { label: string; href?: string }[];
  icon?: ReactNode; 
  gradientClass?: string;
}

export default function Header({ title, p, labels, icon, gradientClass }: Props) {
  
  return (
    <div className={`bg-linear-to-r from-purple-600 to-indigo-500 p-10 text-white h-75 flex flex-col justify-center items-start gap-6 rounded-lg ${gradientClass || ""}`}>
      
      <nav className="flex items-center gap-2 text-[13px] mb-6 opacity-90 font-medium">
        <Link href="/" className="hover:underline transition-all">Home</Link>

        {labels.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="opacity-50">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:underline transition-all lowercase">
                {item.label}
              </Link>
            ) : (
              <span className="font-bold">{item.label}</span>
            )}
          </div>
        ))}

      </nav>
      <div className="flex flex-col md:flex-row items-center gap-6">


        <div className="m-2">
          <div className="p-3 bg-amber-50/45 rounded-2xl">
           {icon ? icon : <CiShoppingTag size={50} />}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">
            {title}
          </h1>
          {p && (
            <p className="text-sm opacity-90 font-medium tracking-wide">
              {p}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}