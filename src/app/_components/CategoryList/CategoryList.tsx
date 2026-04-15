import { getAllCategories } from "_/api/services/rout.services";
import SubCategoriesCard from "../SubCategoriesCard/SubCategoriesCard";

export default async  function CategoryList() {

const categories = await getAllCategories();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {categories?.map((cat) => (
                  <SubCategoriesCard
                    key={cat._id}
                    id={cat._id}
                    name={cat.name}
                    image={cat.image}
                  />
                ))}
              </div>
  )
}
