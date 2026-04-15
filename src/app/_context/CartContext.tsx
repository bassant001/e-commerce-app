'use client'
import { CartResponse } from '_/api/services/types';
import React, { createContext, ReactNode, useContext, useState } from 'react'




export const cartContext = createContext({} as any);

export default function CartContextProvider({children, res}:{children :ReactNode, res: CartResponse | undefined}) {
  const [numOfCartItems, setNumOfCartItems] = useState(() => {
    return res?.numOfCartItems || 0; 
  });

  function updateNumOfCartItems(number: number) {
    setNumOfCartItems(number);
  }

  
  return (
    <cartContext.Provider value={{numOfCartItems, updateNumOfCartItems}}>
      {children}
    </cartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
}