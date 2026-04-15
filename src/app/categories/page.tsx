import { getAllCategories } from '_/api/services/rout.services';
import Link from "next/link";
import SubCategoriesCard from '../_components/SubCategoriesCard/SubCategoriesCard';
import Header from '../_components/Header/Header';


export default async function page() {
    const categories = await getAllCategories();
  return (
    <div>
       <Header
              title="Top Brands"
              p="Shop from your favorite brands"
              labels={[{ label: "Brand" }]}
             
            />
      
      <div className="p-6">
  

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">
      Shop By <span className="text-green-600">Category</span>
    </h2>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {categories?.map((cat) => (
      <SubCategoriesCard
        key={cat._id}
        id={cat._id}
        name={cat.name}
        image={cat.image}
        width={150}
        height={150}
        roundnecess='md'
        homePage={false}
      />
    ))}
  </div>

</div>

    </div>
  )
}
