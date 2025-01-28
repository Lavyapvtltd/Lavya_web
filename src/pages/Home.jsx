import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { fetchProductsAsync } from '../features/productSlice';
import { fetchCategoriesAsync } from '../features/categorySlice';
import { fetchTestimonialsAsync } from '../features/testimonialSlice';
import { fetchCartsAsync } from '../features/cartSlice';
import { fetchSubscriptionCartAsync } from '../features/subscriptionCartSlice';
import Product from '../components/Product';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Category from '../components/Category';
import Spinner from '../components/Spinner';
import Slider from '../components/Slider';
import Testimonial from '../components/Testimonial';
import { fetchBannersAsync } from '../features/bannerSlice';
import { IMAGE_BASE_URL } from '../constants/contant';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user_id = useSelector((state) => state.auth.user_id);
  const products = useSelector((state) => state.products.products);
  let subscription_products = [];
  subscription_products = products?.filter((product) => {
    return product?.subscription_active === true;
  });
  let feature_products = [];
  feature_products = [...products].reverse();
  const categories = useSelector((state) => state.categories.categories);
  const product_status = useSelector((state) => state.products.status);
  const category_status = useSelector((state) => state.categories.status);
  const testimonials = useSelector((state) => state.testimonials.testimonials);
  const testimonial_status = useSelector((state) => state.testimonials.status);
  const banners = useSelector((state) => state.banners.banners);
  const topBanners = banners.slice(0, 4);
  const remainingBanners = banners.slice(4);
  const handleProductClick = (productId) => {
    navigate(`/product-list/${productId}`);
  };
  const handleCategoryClick = (categoryId) => {
    navigate('/product-list', { state: { categoryId: categoryId } });
  };
  const handleBannerClick = () => {
    navigate("/product-list")
  }
  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCategoriesAsync());
    dispatch(fetchTestimonialsAsync());
    dispatch(fetchBannersAsync());
    if (isLoggedIn) {
      dispatch(fetchCartsAsync(user_id));
      dispatch(fetchSubscriptionCartAsync(user_id))
    }
  }, []);

  const images = {
    "image1": "/images/For all your needs (1).jpg",
    "image2": "/images/For all your needs (3).jpg",
    "image3": "/images/For all your needs (4).jpg",
    "image4": "/images/For all your needs.jpg",
  };


  return (
    <>
      <Slider />
      <div className="container-fluid product_sliders categories_box py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="heading_sec text-center">
                <h2 className="fw-semibold">Top Categories</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12 col-12">
              <div className="row justify-content-center align-items-center">
                {category_status === "loading" ? (
                  <Spinner />
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
                        slidesPerView: 4,
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
                    {
                      categories?.map((category, index) => (
                        <SwiperSlide key={index} onClick={() => handleCategoryClick(category._id)}>
                          <Category category={category} />
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                ) : (
                  <h4 className="text-center">Categories not found</h4>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="container-fluid banner_sec py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                {
                  topBanners?.map((item, index) => (
                    <div className="col-lg-6 col-md-6 col-6" key={index} onClick={handleBannerClick}>
                      <div className="banner-item mb-4 img_hover rounded-2">
                        <img src={`${IMAGE_BASE_URL}${item.image}`} style={{ height: '300px', aspectRatio: '1/1', objectFit: 'cover' }} className="img-fluid w-100 rounded-2" alt="Banner Image" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid product_sliders py-md-3">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="heading_sec text-center">
                <h2 className="fw-semibold">Our Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {product_status === "loading" ? (
              <Spinner />
            ) : products?.length > 0 ? (
              <Swiper
                className="product_carousel"
                pagination={{ el: ".bannerPagination" }}
                modules={[Pagination, Autoplay]}
                slidesPerView={5}
                spaceBetween={10}
                loop={true}
                autoplay={{
                  delay: 2500,
                  reverseDirection: true,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
              >
                {
                  products?.map((product, index) => (
                    <SwiperSlide key={index} onClick={() => handleProductClick(product._id)}>
                      <Product product={product} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            ) : (
              <h4 className="text-center">Products not found</h4>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid product_sliders featured_products py-md-3">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="heading_sec text-center">
                <h2 className="fw-semibold">Featured Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {product_status === "loading" ? (
              <Spinner />
            ) : feature_products?.length > 0 ? (
              <Swiper
                className="product_carousel"
                pagination={{ el: ".bannerPagination" }}
                modules={[Pagination, Autoplay]}
                slidesPerView={5}
                spaceBetween={10}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
              >
                {
                  feature_products?.map((product, index) => (
                    <SwiperSlide key={index} onClick={() => handleProductClick(product._id)}>
                      <Product product={product} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            ) : (
              <h4 className="text-center">Feature products not found</h4>
            )}
          </div>
        </div>
      </div>


      <div className="container-fluid foot_banner py-md-5">
        <div className="container">
          <div className="row">
            {
              remainingBanners.map((item, index) => (
                <div className="col-lg-4" key={index} onClick={handleBannerClick}>
                  <div className="banner-item mb-4 img_hover rounded-2">
                    <a href="">
                      <img src={`${IMAGE_BASE_URL}${item.image}`}style={{ height: '200px', aspectRatio: '1/1', objectFit: 'cover' }} className="img-fluid w-100 rounded-2" alt="Banner Image" />
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="container-fluid product_sliders featured_products py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="heading_sec text-center">
                <h2 className="fw-semibold">Subscription Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {product_status === "loading" ? (
              <Spinner />
            ) : subscription_products?.length > 0 ? (
              <Swiper
                className="product_carousel"
                pagination={{ el: ".bannerPagination" }}
                modules={[Pagination, Autoplay]}
                slidesPerView={5}
                spaceBetween={10}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
              >
                {subscription_products.map((product, index) => (
                  <SwiperSlide key={index} onClick={() => handleProductClick(product._id)}>
                    <Product product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <h4 className="text-center">Subscription product not found</h4>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid foot_banner py-md-5">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="heading_sec text-center">
                <h2 className="fw-semibold">Trial Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {
              Object.values(images).map((image, index) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={index} onClick={()=>handleBannerClick()}>
                  <div className="banner-item mb-4 img_hover rounded-2">
                    <a href="#">
                      <img 
                        src={image} 
                        style={{ height: '200px', aspectRatio: '1/1', objectFit: 'contain' }} 
                        className="img-fluid w-100 rounded-2" 
                        alt={`Banner ${index + 1}`} 
                      />
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>


      <div className="container-fluid py-3 testimonial-section">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="heading_sec text-center">
                <h2 className="fw-semibold">Client Testimonial</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {testimonial_status === "loading" ? (
              <Spinner />
            ) : testimonials?.length > 0 ? (
              <Swiper
                className="testimonial"
                pagination={{
                  el: '.bannerPagination',
                  clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                slidesPerView={3}
                spaceBetween={10}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <Testimonial testimonial={testimonial} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <h4 className="text-center">Testimonials not found</h4>
            )}
          </div>
        </div>
      </div>

      {/* <div className="container-fluid blog-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="heading_sec text-center">
                <h2 className="fw-semibold">Our Blogs</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <a href="#">
                <div className="blog-box rounded-2 overflow-hidden">
                  <div className="img_hover overflow-hidden">
                    <img src="/images/banner-img.webp" className="img-fluid" alt="" />
                  </div>
                  <div className="p-4">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center pe-4">
                        <i className="fa fa-user pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">by: Admin</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-tags pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">Services</p>
                      </div>
                    </div>
                    <div className="my-3">
                      <h5 className="fw-semibold text_clip_head">Common Engine Oil Problems and Solutions</h5>
                      <p className="text_clip_para ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa non, illum, quis, sit voluptas velit optio soluta animi omnis molestias ullam adipisci? Voluptatem commodi veritatis voluptate incidunt obcaecati eos rerum.</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3" style={{ borderTop: '1px solid #e6e6e6' }}>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-calendar pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">June 24, 2020</p>
                      </div>
                      <div>
                        <a href="#" className="mb-0 read-more fw-semibold">READ MORE</a>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <a href="#">
                <div className="blog-box rounded-2 overflow-hidden">
                  <div className="img_hover overflow-hidden">
                    <img src="/images/banner-img.webp" className="img-fluid" alt="" />
                  </div>
                  <div className="p-4">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center pe-4">
                        <i className="fa fa-user pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">by: Admin</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-tags pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">Services</p>
                      </div>
                    </div>
                    <div className="my-3">
                      <h5 className="fw-semibold text_clip_head">Common Engine Oil Problems and Solutions</h5>
                      <p className="text_clip_para ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa non, illum, quis, sit voluptas velit optio soluta animi omnis molestias ullam adipisci? Voluptatem commodi veritatis voluptate incidunt obcaecati eos rerum.</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3" style={{ borderTop: '1px solid #e6e6e6' }}>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-calendar pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">June 24, 2020</p>
                      </div>
                      <div>
                        <a href="#" className="mb-0 read-more fw-semibold">READ MORE</a>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <a href="#">
                <div className="blog-box rounded-2 overflow-hidden">
                  <div className="img_hover overflow-hidden">
                    <img src="/images/banner-img.webp" className="img-fluid" alt="" />
                  </div>
                  <div className="p-4">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center pe-4">
                        <i className="fa fa-user pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">by: Admin</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-tags pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">Services</p>
                      </div>
                    </div>
                    <div className="my-3">
                      <h5 className="fw-semibold text_clip_head">Common Engine Oil Problems and Solutions</h5>
                      <p className="text_clip_para ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa non, illum, quis, sit voluptas velit optio soluta animi omnis molestias ullam adipisci? Voluptatem commodi veritatis voluptate incidunt obcaecati eos rerum.</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3" style={{ borderTop: '1px solid #e6e6e6' }}>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-calendar pe-2" aria-hidden="true"></i>
                        <p className="mb-0 blog-user fw-bold">June 24, 2020</p>
                      </div>
                      <div>
                        <a href="#" className="mb-0 read-more fw-semibold">READ MORE</a>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>

  );
};

export default Home;
