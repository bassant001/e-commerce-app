"use client";
import { Button } from "_/components/ui/button";
import React from "react";
import { UpdateProductCart } from "../cartAction";
import { toast } from "sonner";
interface cardProp {
  sign: "+" | "-";
  id: string;
  count: number;
}

export default function UpdateCardCountBTN({ sign, id, count }: cardProp) {
    async function handleAddToCart() {

      const result =  await UpdateProductCart(id, (count + (sign === "+" ? 1 : -1)));
      if(result !== -1){
        toast.success("Product updated successfully!");
      }
      else{
        toast.error("Failed to update product!");
      }
        

    }

  if (sign === "+") {
    return <Button className="px-3 cursor-pointer bg-white text-gray-400 hover:text-green-400"
    onClick={handleAddToCart}>+</Button>;
  } else {
    return <Button className="px-3 cursor-pointer bg-white text-gray-400 hover:text-green-400"
    onClick={handleAddToCart} disabled={count === 1}>-</Button>;
  }
}
