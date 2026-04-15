import { getallproducts } from "_/api/services/rout.services";
import ProductCard from "../ProductCard/ProductCard";

// components/ProductList.tsx
export default async function ProductList() {
  const allproducts = await getallproducts(); 
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {allproducts?.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}