"use server"
import { z } from "zod";
import { brandType, CartResponse, CategoryType, ProductType, WishlistResponse } from "./types";
import { registerSchema } from "./auth";
import { loginSchema } from "./auth";
import decodeAuthenticatedUserToken from "_/app/utils";


export async function getallproducts(): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products",
      {
        cache: 'force-cache',
        next: {
          tags: ['getallproducts'],
           revalidate: 60*60*24
        }
       
      }
    );
    const finalres = await res.json();
    console.log("finalres", finalres);
    return finalres.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function getProductDetails(
  id: string,
): Promise<ProductType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    const getProductDetails = await res.json();
    console.log("getProductDetails", getProductDetails);
    return getProductDetails.data;
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
}

export async function getBrands(): Promise<brandType[] | undefined> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands",
      {
        cache: 'force-cache',
        next: {
          tags: ['getBrands'],
           revalidate: 60*60*24
        }
       
      }
    );
    const finalres = await res.json();
    console.log("finalres", finalres);
    return finalres.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function getBrandDetails(
  id: string,
): Promise<brandType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      {
        cache: 'force-cache',
        next: {
          tags: ['getBrandDetails'],
           revalidate: 60*60*24
        }
       
      }

    );
    const getProductDetails = await res.json();
    console.log("getBrandDetails", getProductDetails);
    return getProductDetails.data;
  } catch (error) {
    console.log("error", error);
    return;
  }
}

export async function getBrandProducts(id: string): Promise<ProductType[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      {
        cache: 'force-cache',
        next: {
          tags: ['getBrandProducts'],
           revalidate: 60*60*24
        }
       
      }
    );
    const getProductDetails = await res.json();
    console.log("getBrandDetails", getProductDetails);
    return getProductDetails.data || [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function getAllCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    const finalres = await res.json();
    console.log("getAllCategories", finalres);
    return finalres.data || [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function getAllProductsOnCategory(
  id: string,
): Promise<ProductType[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
      {
        cache: 'force-cache',
        next: {
          tags: ['getAllProductsOnCategory'],
           revalidate: 60*60*24
        }
       
      }
    );
    const finalres = await res.json();
    console.log("getAllProductsOnCategory", finalres);
    return finalres.data || [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function getaCategory(
  id: string,
): Promise<CategoryType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    );
    const finalres = await res.json();
    console.log("getCategory", finalres);
    return finalres.data;
  } catch (error) {
    console.log("error", error);
    return;
  }
}

export async function getUserCart(): Promise<CartResponse | undefined> {
  const tk = await decodeAuthenticatedUserToken();
  if (!tk) {
    console.log("No token found, user might not be authenticated.");
    return undefined;
  }

  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
      headers: { 'token': tk },
      cache: 'no-store'
    });
    const finalres = await res.json();
    console.log("getUserCart", finalres);
    return finalres; 
  } catch (error) {
    console.log(error);
  }
}

export async function signupUser(userData: z.infer<typeof registerSchema>) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      },
    );
    const data = await response.json();

    return data;

    return data;
  } catch (error) {
    console.error("Signup Error:", error);
    return { message: "Network Error or Server is down" };
  }
}

export async function signinUser(userData: z.infer<typeof loginSchema>) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        
      },
      
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return { message: "Network error" };
  }
}

export async function getLoggedUserCart()
{
  return getUserCart();
}

export async function getUserWishlist(): Promise<WishlistResponse | undefined> {
  const tk = await decodeAuthenticatedUserToken();
  if (!tk) {
    console.log("No token found, user might not be authenticated.");
    return undefined;
  }

  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: { 'token': tk },
      cache: 'no-store'
    });
    const finalres = await res.json();
    console.log("getUserWishlist", finalres);
    return finalres; 
  } catch (error) {
    console.log(error);
  }
}
