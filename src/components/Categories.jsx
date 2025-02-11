import React, { useEffect } from "react";
import CategoryShimmer from "../shimmer/CategoryShimmer";
import Category from "./Category";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../features/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10 col-md-12 col-12">
        <div className="row justify-content-center align-items-center">
          {status === "loading" ? (
            <CategoryShimmer />
          ) : categories?.length > 0 ? (
            <Swiper
              className="category_carousel"
              pagination={{ el: ".bannerPagination" }}
              modules={[Pagination, Autoplay]}
              slidesPerView={6}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1440: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
              }}
            >
              {categories?.map((category, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <Category category={category} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <h4 className="text-center">Categories not found</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
