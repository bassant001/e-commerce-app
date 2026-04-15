import { brandType } from "_/api/services/types";
import Link from "next/link";
interface Props {
  brand: brandType;
}


export default function BrandCard({ brand }: Props) {
  
  return (
     <div className="max-w-72 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group relative">
      {/* image */}
      <div className="relative bg-[#f6f6f6] rounded-xl overflow-hidden aspect-4/5">
        <img
          src={brand.image}
          alt={brand.name}
          className="h-full object-contain"
        />
      </div>

      {/* name */}
      <h3 className="mt-4 text-gray-700 font-medium">
        {brand.name}
      </h3>
      <Link href={`/BrandDetails/${brand._id}` } className="hover:text-fuchsia-950">view products</Link>
    </div>
  );
}