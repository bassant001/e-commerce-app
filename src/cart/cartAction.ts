"use server";

import decodeAuthenticatedUserToken from "_/app/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export default async function addToProductCart(id: string) {
  const bodyobject = {
    productId: id,
  };

  const tk = await decodeAuthenticatedUserToken();
  if (!tk) {
    console.log("no token found");
    return new Error("no token found");
  }

  try {
    console.log("cart action");
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "POST",
      headers: {
        token: tk,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyobject),
    });

    if (res.ok) {
      console.log("success add in cart action");
      const finalResult = await res.json();
      console.log(finalResult);
      revalidatePath("/ShoppingCart");
      return finalResult.numOfCartItems;
    }

    if (!res.ok) {
      console.log("error add in cart action");
      return -1;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function removeProductFromCart(id: string) {
  const tk = await decodeAuthenticatedUserToken();
  if (!tk) {
    console.log("no token found");
    return new Error("no token found");
  }

  try {
    console.log("cart action");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      {
        method: "delete",
        headers: {
          token: tk,
        },
      },
    );

    if (res.ok) {
      console.log("success remove in cart action");
      const finalResult = await res.json();
      console.log(finalResult);
      revalidatePath("/ShoppingCart");
      return finalResult.numOfCartItems;
    }

    if (!res.ok) {
      console.log("error remove in cart action");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function AddToWishlist(id: string) {
  const bodyobject = {
    productId: id,
  };

  const tk = await decodeAuthenticatedUserToken();
  if (!tk) {
    console.log("no token found");
    return new Error("no token found");
  }

  try {
    console.log("FAV cart action");
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token: tk,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyobject),
    });

    if (res.ok) {
      console.log("success add in FAV cart action");
      const finalResult = await res.json();
      console.log(finalResult);
      revalidatePath("/wishlist");
      return finalResult.numOfCartItems;
    }

    if (!res.ok) {
      console.log("error add in FAV cart action");
      return -1;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function RemoveFromWishlist(id: string) {
  const bodyobject = {
    productId: id,
  };

  const tk = await decodeAuthenticatedUserToken();
  if (!tk) {
    console.log("no token found");
    return new Error("no token found");
  }

  try {
    console.log("FAV cart action");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        method: "delete",
        headers: {
          token: tk,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyobject),
      },
    );

    if (res.ok) {
      console.log("success delete in FAV cart action");
      const finalResult = await res.json();
      console.log(finalResult);
      revalidatePath("/wishlist");
      return finalResult.numOfCartItems;
    }

    if (!res.ok) {
      console.log("error delete in FAV cart action");
      return -1;
    }
  } catch (error) {
    console.log(error);
  }
}

export  async function UpdateProductCart(id: string, newcount:number) {
 const tk = await decodeAuthenticatedUserToken();
  if (!tk) return -1;

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
      method: "PUT",
      headers: {
        token: tk,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: newcount })
    });
    if (res.ok) {
      console.log("success add in UpdateProductCart action");
      const finalResult = await res.json();
      console.log(finalResult);
      revalidatePath("/ShoppingCart");
      return finalResult.numOfCartItems;
    }

    if (!res.ok) {
      console.log("error in  UpdateProductCart action");
      return -1;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createCashOrder(cartId: string, bodyObject: any) {
  const token= await decodeAuthenticatedUserToken();

  if (token) {
    try {

      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {

        method: "POST", headers: 
        {
          "token": token,
          "content-type": "application/json",
        },body: JSON.stringify(bodyObject),});

      if (res.ok) {
        const finalRes = await res.json();
        console.log('Success creating Cash order:', finalRes);
        
   
        return true
      } else {
        const errorRes = await res.json();
        console.log('Error creating Cash order:', errorRes)
        return false;
      }
    } catch (error) {
      console.log('Network Error:', error)
      return false; 
    }
  }

  console.log("No token found");
  return false;
}

export async function createOnlineOrder(cartId: string, bodyObject: any) {
  const token= await decodeAuthenticatedUserToken();

  if (token) {
    try {

      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`, {

        method: "POST", headers: 
        {
          "token": token,
          "content-type": "application/json",
        },body: JSON.stringify(bodyObject),});

      if (res.ok) {
        const finalRes = await res.json();
        console.log('success  Cash order:', finalRes);

        
   
        return finalRes.session.url;
      } else {
        const errorRes = await res.json();
        console.log('error Cash order:', errorRes)
        return false;
      }
    } catch (error) {
      console.log(error);
      return false; 
    }
  }

  console.log("No token found");
  return false;
}
