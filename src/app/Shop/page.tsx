import { getallproducts } from "_/api/services/rout.services";
import ProductCard from "../_components/ProductCard/ProductCard";
import Header from "./../_components/Header/Header";
import { BsBoxSeamFill } from "react-icons/bs";

export default async function page() {
  const allproducts = await getallproducts();
  return (
    <div>
      <Header
        title="All Products"
        p="Explore our complete product collection"
        labels={[{ label: "Shop" }]}
        icon={<BsBoxSeamFill size={50}/>}
      />
      <div className="p-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allproducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
