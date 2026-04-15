import {
  getBrandDetails,
  getBrandProducts,
} from "_/api/services/rout.services";
import Header from "_/app/_components/Header/Header";
import ProductCard from "_/app/_components/ProductCard/ProductCard";
import Link from "next/link";
import { BsBoxSeamFill } from "react-icons/bs";
export default async function BrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [brandInfo, products] = await Promise.all([
    getBrandDetails(id),
    getBrandProducts(id),
  ]);

  return (
    <div>
      <Header
        title={`${brandInfo?.name}`}
        p={`Shop ${brandInfo?.name} products`}
        labels={[{ label: "Brand", href:"/Brand"},{ label: `${brandInfo?.name}` }]}
        icon={<img src={brandInfo?.image} alt={brandInfo?.name} className="w-full h-full object-contain" />}
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
    </div>
  );
}
