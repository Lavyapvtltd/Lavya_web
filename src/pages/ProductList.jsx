import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { fetchProductsAsync } from '../features/productSlice';
import { fetchCategoriesAsync } from '../features/categorySlice';
import Product from '../components/Product';
import Spinner from '../components/Spinner';

const ProductList = () => {
  const location = useLocation();
  const { categoryId } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const product_status = useSelector((state) => state.products.status);
  const category_status = useSelector((state) => state.categories.status);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(10000);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 10);
    setMinValue(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 10);
    setMaxValue(value);
  };

  const handleProductClick = (productId) => {
    navigate(`/product-list/${productId}`);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const isWithinCategory = selectedCategory ? product.subCategoryId === selectedCategory : true;
      const isWithinPriceRange = product.price >= minValue && product.price <= maxValue;
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
      return isWithinCategory && isWithinPriceRange && matchesSearchTerm;
    });
    setProductData(filteredProducts);
  }, [products, selectedCategory, searchTerm, minValue, maxValue]);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategory(categoryId);
  }, [categoryId])

  return (
    <>
      <div className="container-fluid product-sidebar">
        <div className="container-fluid breadcrumb py-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                  <ol className="breadcrumb m-0 d-flex justify-content-center">
                    <li className="breadcrumb-item">
                      <NavLink to="/" className='text-decoration-underline'>Home</NavLink>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      All Products
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mb-3 align-items-center">
            <div className="col-lg-2 col-md-2 col-3">
              <div className='d-lg-none d-md-none'>
                <button className="border-0 category_left_icon" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCategory" aria-controls="offcanvasCategory">
                  <i class="fa-solid fa-list fa-fade"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-9">
              <div className="product_search_input input-group justify-content-md-end justify-content-center" style={{ flexWrap: 'nowrap' }}>
                <input
                  type="text"
                  className="rounded-0"
                  placeholder="search your keyword"
                  onChange={handleChange}
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button className="search-btn border-0 px-3" type="button">
                  <i className="fa fa-search text-white search-icon"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <div className="col-12 position-sticky d-lg-block d-md-block d-none" style={{ top: '20px' }}>
                <div className="product_left_list">
                  <div className="product-categories p-4 rounded-1">
                    <div>
                      <h6 className="fw-semibold">Product Categories</h6>
                      <ul className="pt-4 ps-0">
                        {category_status === "loading" ? (
                          <Spinner />
                        ) : (
                          <>
                            <li
                              className="mb-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleCategoryClick(null)}
                            >
                              <div className="d-flex justify-content-between align-items-center text-decoration-none text-dark">
                                <div className="mb-0 fw-semibold">All</div>
                                <i className="fa fa-arrow-right arrow-icon"></i>
                              </div>
                            </li>
                            {categories?.map((category, index) => (
                              <li
                                className="mb-3"
                                style={{ cursor: "pointer" }}
                                key={index}
                                onClick={() => handleCategoryClick(category._id)}
                              >
                                <div className="d-flex justify-content-between align-items-center text-decoration-none text-dark">
                                  <div className="mb-0 fw-semibold">{category.subCategoryName}</div>
                                  <i className="fa fa-arrow-right arrow-icon"></i>
                                </div>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* <div className="filter-section p-4 mt-3 rounded-1">
                    <h6 className="pb-4 fw-semibold">Filter By Price</h6>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <p className="mb-0">Your Range:</p>
                      <h6 className="mb-0 fw-semibold">Rs{minValue} - Rs{maxValue}</h6>
                    </div>
                    <div className="multi-range">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={minValue}
                        onChange={handleMinChange}
                        id="lower"
                        style={{ marginRight: '10px' }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={maxValue}
                        onChange={handleMaxChange}
                        id="upper"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12 mt-md-0 mt-4">
              <div className="row align-items-center listing_filters">

                {product_status === "loading" ? (
                  <Spinner />
                ) : productData?.length > 0 ? (
                  productData?.map((product, index) => (
                    <div className="col-lg-4 col-md-6 col-6" key={index} onClick={() => handleProductClick(product._id)}>
                      <Product product={product} />
                    </div>
                  ))
                ) : (
                  <div>
                    <img src="/images/no-product-found.png" alt="" className='w-100 img-fluid' />
                  </div>
                )}
              </div>
              {/* <div className="col-lg-7 col-md-7 col-12">
                  <div className="d-flex align-items-center justify-content-md-end">
                    <div className='pe-2'>
                      <p className="mb-0 fw-semibold">Showing 9 of 20 results</p>
                    </div>
                    <select className="form-select w-50 rounded-0" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mob_product_category d-lg-none d-md-none">
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCategory" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header border-bottom">
            <h5>
              Product Categories
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul className="pt-4 ps-0">
              {category_status === "loading" ? (
                <Spinner />
              ) : (
                <>
                  <li
                    className="mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCategoryClick(null)}
                    data-bs-dismiss="offcanvas"
                  >
                    <div className="d-flex justify-content-between align-items-center text-decoration-none text-dark">
                      <div className="mb-0 fw-semibold">All</div>
                      <i className="fa fa-arrow-right arrow-icon"></i>
                    </div>
                  </li>
                  {categories?.map((category, index) => (
                    <li
                      className="mb-3"
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => handleCategoryClick(category._id)}
                      data-bs-dismiss="offcanvas"
                    >
                      <div className="d-flex justify-content-between align-items-center text-decoration-none text-dark">
                        <div className="mb-0 fw-semibold">{category.subCategoryName}</div>
                        <i className="fa fa-arrow-right arrow-icon"></i>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
