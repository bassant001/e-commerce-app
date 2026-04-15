"use client";
import { useCart } from "_/app/_context/CartContext";
import { AddToWishlist } from "_/cart/cartAction";
import { Button } from "_/components/ui/button";
import { toast } from "sonner";
import { Heart } from "lucide-react";

interface cartProp {
  id: string;
  iscard?: boolean;
}

export default function AddToWishlistBTN({ id, iscard = true }: cartProp) {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const result = await AddToWishlist(id);

    if (result !== -1) {
      toast.success("Added to Wishlist!");
    } else {
      toast.error("Failed to add to Wishlist");
    }
  };

  if (!iscard) {
    return (
      <>
        <Button
          className="flex-1 flex items-center justify-center gap-2 text-[14px] font-bold text-gray-600 border border-gray-200 h-12 rounded-xl cursor-pointer bg-white hover:border-green-600 hover:text-green-600"
          onClick={handleClick}
        >
          <Heart size={18} /> Add to Wishlist
        </Button>
      </>
    );
  }

  return (
    <Button
      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-gray-100 text-gray-600 hover:text-red-500 transition-colors"
      onClick={handleClick}
    >
      <Heart size={18} />
    </Button>
  );
}
