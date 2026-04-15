import { getaCategory, getAllProductsOnCategory } from '_/api/services/rout.services';
import Header from '_/app/_components/Header/Header';
import ProductCard from '_/app/_components/ProductCard/ProductCard';
import React from 'react'
import { CiShoppingTag } from 'react-icons/ci';

export default async function page({ params }: { params: Promise<{ id: string}> }){
     const id = (await params).id;
      const allproduct = await getAllProductsOnCategory(id);
      const cat = await getaCategory(id);
  return (
    <div>
        
         <Header
                title={cat?.name || ""}
                p={cat?.name || ""}
                labels={[{ label: `${cat?.name || ""}` }]}
                icon={cat?.image ? <img src={cat.image} alt={cat.name} className="w-20  object-contain rounded-2xl" /> : <CiShoppingTag size={50} />}
              />
        
              <div className="p-10">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {allproduct?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>

  )
}

