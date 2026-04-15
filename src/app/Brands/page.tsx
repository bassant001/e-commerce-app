import Link from "next/link";
import BrandCard from "../_components/BrandCard/BrandCard";
import { getBrands } from "_/api/services/rout.services";
import Header from "../_components/Header/Header";
import { CiShoppingTag } from "react-icons/ci";

export default async function Page() {
  const allbrands = await getBrands();
  return (
    <div>
      <Header
        title="Top Brands"
        p="Shop from your favorite brands"
        labels={[{ label: "Brand" }]}
        icon={<CiShoppingTag  size={50}/>}
      />

      <div className="p-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {allbrands?.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
