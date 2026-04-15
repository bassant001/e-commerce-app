
import AddToWishlistBTN from '../../cart/AddToWishlistBTN/AddToWishlistBTN';
export interface ProductType {
  sold: number;
  images: string[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  availableColors: string[];
  imageCover: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  ratingsAverage: number;
  brand: brandType;
  category: CategoryType;
}

export interface brandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    totalCartPrice: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CartItem {
  count: number;
  _id: string;
  product: ProductType; 
  price: number;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: ProductType[]; 
}