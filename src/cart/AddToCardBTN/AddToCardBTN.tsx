"use client";
import { useCart } from "_/app/_context/CartContext";
import addToProductCart from "_/cart/cartAction";
import { Button } from "_/components/ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface cartProp {
    id: string;
    iscard?: boolean; 

}

export default function AddToCardBTN({ id, iscard = true }: cartProp) {
  const {updateNumOfCartItems} = useCart();
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    
   const newNumOfCartItems= await addToProductCart(id);

   if(newNumOfCartItems !== -1)
   {
    console.log("success in add to cart");
    updateNumOfCartItems(newNumOfCartItems);
    toast.success("Product added to cart successfully!");
   }

   else
   {
    console.log("error in add to cart");
    toast.error("Failed to add product to cart!");
   }

  };


  if (iscard) {
    return (
      <Button 
        className="bg-[#48a15e] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#3d8b50] shadow-lg shadow-green-100 transition-all active:scale-90 p-0"
        onClick={handleClick}
      >
        <Plus size={24} strokeWidth={3} />
      </Button>
    );
  }


  return (
    <Button 
      className="col-span-3 bg-[#48a15e] hover:bg-[#3d8b50] text-white font-black h-14 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-green-100"
      onClick={handleClick}
    >
      <ShoppingCart size={20} />
      <span>Add To Cart</span>
    </Button>
  );
}