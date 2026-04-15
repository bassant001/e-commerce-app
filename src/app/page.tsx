import { getAllCategories, getallproducts } from "_/api/services/rout.services";
// import ProductCard from "./_components/ProductCard/ProductCard";
import MySwiper from "./_components/Swiper/Swiper";
// import SubCategoriesCard from "./_components/SubCategoriesCard/SubCategoriesCard";
import Link from "next/link";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import AdCard from './_components/AdCard/AdCard';
import FeaturesCard from "./_components/FeaturesCard/FeaturesCard";
import { Suspense } from "react";
import CategoryList from "./_components/CategoryList/CategoryList";
import ProductList from "./_components/ProductList/ProductList";
import BarLoader from "react-spinners/BarLoader";


export default async function Home() {
  //no rerender on server dont need effects:)
  // const allproducts = await getallproducts();
  // const categories = await getAllCategories();

  return (
    <div>
      <MySwiper
        imagesList={[
          "/assets/images/banner-4.jpeg",
          "/assets/images/blog-img-1.jpeg",
          "/assets/images/blog-img-2.jpeg",
        ]}
      />

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          {/* Free Shipping */}
          <FeaturesCard 
            icon={<Truck size={24} />}
            title="Free Shipping"
            description="On orders over 500 EGP"
            color="green"
          />  

          {/* Secure Payment */}
          <FeaturesCard
            icon={<ShieldCheck size={24} />}
            title="Secure Payment"
            description="100% secure transactions"
            color="blue"
          />
         

          {/* Easy Returns */}
          <FeaturesCard
            icon={<RotateCcw size={24} />}
            title="Easy Returns"
            description="14-day return policy"
            color="orange"
          />

          
          {/* 24/7 Support */}
          <FeaturesCard
            icon={<Headphones size={24} />}
            title="24/7 Support"
            description="Dedicated support team"
            color="purple"
          />
        </div>

       
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Shop By <span className="text-green-600">Category</span>
            </h2>

            <Link href="/categories" className="text-green-600 hover:underline">
              View All Categories →
            </Link>
          </div>

          {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories?.map((cat) => (
              <SubCategoriesCard
                key={cat._id}
                id={cat._id}
                name={cat.name}
                image={cat.image}
              />
            ))}
          </div> */}
          <Suspense fallback={<div className="animate-pulse h-40 bg-gray-200 flex items-center justify-center" ><BarLoader color="green" /></div>}><CategoryList /></Suspense>
        </div>

        <div className="flex flex-row mx-auto mt-6">
          <AdCard
          hint="Deal of the Day"
          title="Fresh Organic Fruits"
          description="Get up to 40% off on selected organic fruits"
          code="ORGANIC40"
          discount="40% OFF"
          buttonText="Shop Now"
          bagroundClass="linear-gradient(135deg, #05B67A, #008F62)"
          buttonTextColor="#008F62"
        />

        <AdCard
          hint="New Arrivals"
          title="Exotic Vegetables"
          description="Discover our latest collection of premium vegetables"
          code="FRESH25"
          discount="25% OFF"
          buttonText="Explore Now"
          bagroundClass="linear-gradient(135deg, #FF8515, #FF3652)"
          buttonTextColor="#FF3652"
        />
        </div>

        <h2 className="text-3xl font-bold mb-6 mt-6">Featured Products</h2>

        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allproducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}
        <Suspense fallback={<div className="animate-pulse h-40 bg-gray-200 flex items-center justify-center" ><BarLoader color="green" /></div>}>
        <ProductList />
      </Suspense>
      </div>
    </div>
  );
}
