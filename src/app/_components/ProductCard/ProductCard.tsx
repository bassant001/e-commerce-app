import { ProductType } from "_/api/services/types";
import Link from "next/link";
import { RefreshCw, Eye,  } from "lucide-react";
import AddToCardBTN from '../../../cart/AddToCardBTN/AddToCardBTN';
import AddToWishlistBTN from "../../../cart/AddToWishlistBTN/AddToWishlistBTN";





interface props {
  product: ProductType;
}

export default function ProductCard({ product }: props) {
  const discount =
    product.priceAfterDiscount &&
    Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100,
    );

  return (
    <div className="max-w-72 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group relative">
      {/* DISCOUNT BADGE */}
      {discount && (
        <span className="absolute top-6 left-6 z-10 bg-red-500 text-white text-[12px] font-bold px-2 py-1 rounded-lg">
          -{discount}%
        </span>
      )}

      {/* IMAGE CONTAINER */}
      <div className="relative bg-[#f6f6f6] rounded-xl overflow-hidden aspect-4/5">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* ICONS */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            {/*<Heart></Heart> */}
            <AddToWishlistBTN id={product.id}/>

          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-gray-100 text-gray-600 hover:text-green-500 transition-colors">
            <RefreshCw size={18} />
          </button>

          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-gray-100 text-gray-600 hover:text-green-500 transition-colors">
            <Link href={`/productdetails/${product.id}`} className="w-full to-blue-700" ><Eye size={18} /></Link>
           
          </div>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="mt-4 space-y-2">
        <p className="text-gray-500 text-[13px] font-medium uppercase tracking-tight">
          {product.category?.name || "Category"}
        </p>

        <h3 className="text-[#2d3a4b] font-bold text-[16px] leading-tight line-clamp-2 min-h-10">
          {product.title}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400 text-lg">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.round(product.ratingsAverage) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-gray-400 text-sm font-medium ml-1">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        {/* PRICE & ADD  */}
        <div className="flex items-end justify-between pt-2">
          <div>
            <span className="text-[#27a35c]  text-xl">
              {product.priceAfterDiscount || product.price} EGP
            </span>
          </div>

          <div>
             {product.priceAfterDiscount && (
              <span className="text-gray-400 line-through text-xl">
                {product.price} EGP
              </span>
            )}
          </div>

          <span  
        >
          
            <AddToCardBTN id={product.id} />
          </span>
          
          
        </div>
      </div>
    </div>
  );
}
