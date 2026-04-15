import { getProductDetails } from "_/api/services/rout.services";
import Link from "next/link";
import { Star, Truck, ShieldCheck, RotateCcw, Share2, Zap } from "lucide-react";
import AddToCardBTN from "_/cart/AddToCardBTN/AddToCardBTN";
import ServiceIcon from "_/app/_components/ServiceIcon/ServiceIcon";
import { AddToWishlist } from "_/cart/cartAction";
import AddToWishlistBTN from "_/cart/AddToWishlistBTN/AddToWishlistBTN";


export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await getProductDetails(id);

  if (!product) return <div className="text-center p-20">Loading product details...</div>;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12">
      <div className="max-w-325 mx-auto p-4 lg:p-8">
        

        <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-8">
          <Link className="hover:text-green-600 cursor-pointer" href="/">Home</Link>
          <span>/</span>
          <Link  className="hover:text-green-600 cursor-pointer" href="/">{product.category?.name}</Link>
          <span>/</span>
          <Link className="text-gray-600 font-medium" href="/">{product.title}</Link>
        </nav>

        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/*  IMAGES  */}
          <div className="space-y-6">
            <div className="relative border border-gray-100 rounded-[2rem] overflow-hidden bg-white aspect-4/5 flex items-center justify-center p-8 group">
              <img src={product.imageCover} alt={product.title} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {product.images?.map((img: string, i: number) => (
                <div key={i} className={`w-24 h-28 border rounded-2xl overflow-hidden shrink-0 cursor-pointer transition-all ${i === 0 ? 'border-green-500 ring-2 ring-green-50' : 'border-gray-100 hover:border-green-200'}`}>
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/*  CONTENT SEC */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-4">
              <span className="bg-green-50 text-[#48a15e] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-100">{product.category?.name}</span>
              <span className="bg-gray-50 text-gray-500 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-100">{product.brand?.name}</span>
            </div>

            <h1 className="text-3xl font-black text-[#2d3a4b] leading-tight mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-6">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.round(product.ratingsAverage) ? "currentColor" : "none"} strokeWidth={i < Math.round(product.ratingsAverage) ? 0 : 2} />
                ))}
              </div>
              <span className="text-gray-400 text-sm font-medium">4.8 ({product.ratingsQuantity} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-black text-[#2d3a4b]">{product.priceAfterDiscount || product.price} EGP</span>
              {product.priceAfterDiscount && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through text-lg font-medium">{product.price} EGP</span>
                  <span className="bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md">Save {Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-[13px] font-bold text-[#48a15e] mb-6">
              <div className="w-2 h-2 bg-[#48a15e] rounded-full animate-pulse"></div> In Stock
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">{product.description}</p>

        
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex justify-between items-center mb-8">
              <span className="text-gray-500 font-bold text-sm">Total Price:</span>
              <span className="text-xl font-black text-[#48a15e]">{product.priceAfterDiscount || product.price}.00 EGP</span>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <AddToCardBTN id={product.id}  iscard={false}
               />
              <button className="col-span-2 bg-[#1e293b] hover:bg-[#151d2a] text-white font-black h-14 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                <Zap size={20} fill="currentColor" /> Buy Now
              </button>
            </div>

            <div className="flex gap-4 border-b border-gray-100 pb-8 mb-8">
              

              {/* WISHLIST */}
              <AddToWishlistBTN id={product.id} iscard={false}/>
              <button className="w-14 flex items-center justify-center text-gray-600 border border-gray-200 h-12 rounded-xl hover:bg-gray-50 transition-all">
                <Share2 size={18} />
              </button>
            </div>

          {/* ICONS */}
            <div className="grid grid-cols-3 gap-4">
              <ServiceIcon icon={<Truck size={20}/>} title="Free Delivery" desc="Orders over $50" />
              <ServiceIcon icon={<RotateCcw size={20}/>} title="30 Days Return" desc="Money back" />
              <ServiceIcon icon={<ShieldCheck size={20}/>} title="Secure Payment" desc="100% Protected" />
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}

