'use client';
import { useCart } from "_/app/_context/CartContext";
import { RemoveFromWishlist} from "_/cart/cartAction";
import { Button } from "_/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function RemoveToCardBTN({ id }: { id: string }) {
  const { updateNumOfCartItems } = useCart();

  const handleRemoveElemnt = async (e: React.MouseEvent) => {
    const newNumOfCartItems = await RemoveFromWishlist(id);

    if (newNumOfCartItems !== -1) {
      updateNumOfCartItems(newNumOfCartItems);
      toast.success("Product removed from cart successfully!");
    } else {
      toast.error("Failed to remove product from cart!");
    }
  };

  
  return (
    <Button onClick={handleRemoveElemnt} className="cursor-pointer">
      <Trash2 size={18} />
    </Button>
  );
}