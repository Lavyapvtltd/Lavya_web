import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShimmerDiv } from "shimmer-effects-react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const CategoryShimmer = ({ count = 8 }) => {
  return (
    <div className="container py-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 6 },
          768: { slidesPerView: 4 },
          480: { slidesPerView: 3 },
          320: { slidesPerView: 3 },
        }}
      >
        {[...Array(count)].map((_, index) => (
          <SwiperSlide key={index} className="d-flex flex-column align-items-center p-2">
            <ShimmerDiv height={120} width={120} rounded={60} mode="light" />
            <div className="mt-2 w-75">
              <ShimmerDiv height={10} width="100%" rounded={5} mode="light" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryShimmer;
