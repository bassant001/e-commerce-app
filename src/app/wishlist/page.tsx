import { getUserWishlist } from "_/api/services/rout.services";
import AddToCardBTN from "../../cart/AddToCardBTN/AddToCardBTN";
import RemoveToCardBTN from "../../cart/RemoveFromCardBTN/RemoveToCardBTN";

export default async function page() { 
  const wishlistData = await getUserWishlist();


  if (!wishlistData || wishlistData.count === 0) {
    return <div className="p-20 text-center font-bold">Your Wishlist is empty</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
   
        <div className="grid grid-cols-4 bg-gray-50 p-4 text-sm font-bold text-gray-500 border-b">
          <div>Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Status</div>
          <div className="text-center">Actions</div>
        </div>

  
        <div className="divide-y">
          {wishlistData.data.map((product) => (
            <div key={product._id} className="grid grid-cols-4 items-center p-6">
       
              <div className="flex items-center gap-4">
                <img src={product.imageCover} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div>
                  <h3 className="font-bold text-sm">{product.title}</h3>
                  <p className="text-xs text-gray-400">{product.category.name}</p>
                </div>
              </div>

              
              <div className="text-center font-bold">{product.price} EGP</div>

              
              <div className="text-center">
                <span className="bg-green-50 text-green-600 text-[10px] px-3 py-1 rounded-full font-bold">
                  In Stock
                </span>
              </div>

           
              <div className="flex items-center justify-center gap-2">
         
                <AddToCardBTN id={product._id} iscard={false} />
                
                <RemoveToCardBTN id={product._id}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}