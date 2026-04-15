"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MySwiper({ imagesList }: { imagesList: string[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-100 bg-green-600/60 animate-pulse rounded-2xl" />;

  return (
    <div className="relative w-full group overflow-hidden custom-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
      >
        {imagesList.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-100">
               <img src={imgSrc} className="absolute inset-0 w-full h-full object-cover" alt="" />
               <div className="absolute inset-0 bg-green-600/60 flex flex-col justify-center px-20 text-white">
                  <h2 className="text-4xl font-bold max-w-md mb-4">Fresh Products Delivered to your Door</h2>
                  <p className="text-lg mb-8 opacity-90">Get 20% off your first order</p>
                  <div className="flex gap-4">
                    <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold">Shop Now</button>
                    <button className="bg-black/20 border border-white/50 text-white px-6 py-2 rounded-lg font-bold">View Deals</button>
                  </div>
               </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}