import { getUserCart } from "_/api/services/rout.services";

import Link from "next/link";
import RemoveToCardBTN from "../../cart/RemoveFromCardBTN/RemoveToCardBTN";
import AddToCardBTN from "../../cart/AddToCardBTN/AddToCardBTN";
import UpdateCardCountBTN from "_/cart/UpdateCardCount/UpdateCardCountBTN";

export default async function ShoppingCartPage() {
  const cartData = await getUserCart();


  if (!cartData || cartData.numOfCartItems === 0) {
    return <div className="p-20 text-center font-bold">Your cart is empty</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 ">
      <div className="grow flex flex-col gap-4">

        {cartData.data.products.map((item) => (
          <div key={item._id} className="border rounded-2xl p-4 flex items-center gap-4 shadow-sm relative">
          {/* img */}
            <div className="w-24 h-24  rounded-xl overflow-hidden shrink-0">
              <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" />
            </div>

            {/* details*/}
            <div className="grow">
              <h3 className="font-bold"> {item.product.title} </h3>
              <p className="text-green-600 text-xs font-medium uppercase">{item.product.category.name}</p> 
                   
              <div className="mt-2 flex items-center     justify-between">

                <span className="text-green-600     font-bold text-lg">

                  {item.price} EGP <span className="font-normal">per unit</span>
                </span>
                
                {/* quantity  */}
                <div className="flex items-center  rounded-lgoverflow-hidden h-10">
                  <UpdateCardCountBTN sign={"-"} id={item.product._id} count={item.count}/>

                  <span className="px-5 font-bold">{item.count}</span>

                  <UpdateCardCountBTN sign={"+"} id={item.product._id} count={item.count}/>
                </div>
              </div>
            </div>

            {/* total & delete */}
            <div className="flex flex-col justify-between     items-end min-w-25 h-24">
              
                <RemoveToCardBTN  id={item.product._id} />
             
              <div className="text-right">

                <p className="text-[10px]  uppercase">Total</p>
                <p className="font-bold text-gray">{item.price * item.count} EGP</p>
              </div>
            </div>

          </div>
        
        ))} 
      </div>

      {/* sum up */}
      <div className="w-full lg:w-100">
        <div className="bg-green-600 text-white p-5 rounded-t-3xl flex items-center gap-2">
          <div>
            <h2 className="font-bold text-lg">Order Summary</h2>
            <p className="text-xs text-white/80">{cartData.numOfCartItems} Items in your cart</p>
          </div>
        </div>            

        <div className="bg-white border border-t-0 rounded-b-3xl p-6 shadow-sm space-y-6 ">
          <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 border border-green-100">
            <div>
              <p className="text-green-700 font-bold text-sm">Free Shipping!</p>
              <p className="text-green-600 text-[11px]">You qualify for free delivery</p>
            </div>
          </div>
          <div className="space-y-3 text-gray-500     text-sm">
            <div className="flex justify-between">
              <span className="text-gray-800">Subtotal</span>
              <span className="font-bold text-gray-800 text-base">{cartData.data.totalCartPrice} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800">Shipping</span>
              <span className="font-bold text-green-600">FREE</span>
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="text-gray-800 font-bold text-lg">Total</span>
              <span className="text-gray-800 font-black text-xl">{cartData.data.totalCartPrice} EGP</span>
            </div>
          </div>

          <Link href={`/checkout/${cartData.cartId}`} className="w-full bg-gray-800 cursor-pointer hover:bg-gray-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg">
             Secure Checkout
          </Link>
          
          <Link href="/" className="w-full text-green-600 text-sm ">
             ← Continue Shopping
          </Link>
        </div>
      </div>

    </div>
  );
}