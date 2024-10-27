// import React, { useState, useRef, useEffect } from 'react';
// import { fetchProductsAsync } from '../features/productSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import './SearchComponent.css'; // Assuming you add custom CSS here

// const SearchComponent = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products); // Array of products
//   const [isActive, setIsActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const searchFieldRef = useRef(null);

//   // Toggle the search bar
//   const toggleSearch = () => {
//     setIsActive(!isActive);
//     if (!isActive) {
//       searchFieldRef.current.focus();
//     }
//   };

//   // Handle form submission for search
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Filter products based on the search query (product name)
//     const results = products.filter((product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(results);
//   };
//   const handleProductClick = (productId) => {
//     navigate(`/product-list/${productId}`);
//   };

//   useEffect(() => {
//     dispatch(fetchProductsAsync());
//   }, [dispatch]);

//   return (
//     <div className="header-search-wrapper">
//       <span className="search-icon" onClick={toggleSearch}>
//         <i className="fa fa-search"></i>
//       </span>
//       <div className={`search-form-container ${isActive ? 'active' : ''}`}>
//         <form role="search" className="search-form d-flex align-items-center" onSubmit={handleSubmit}>
//           <label>
//             <input
//               type="search"
//               className="search-input"
//               placeholder="Find your product..."
//               ref={searchFieldRef}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </label>
//           <input
//             type="submit"
//             className="search-button"
//             value="Search"
//           />
//         </form>
//               {/* Display filtered products */}
//               {filteredProducts.length > 0 && (
//           <div className="search-results position-absolute">
//             <h5 className='fw-semibold'>Search Results:</h5>
//             <ul>
//               {filteredProducts.map((product) => (
//                 <li key={product._id} onClick={() => handleProductClick(product._id)}>
//                   {product.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//     </div>
//      </div>
//   );
// };

// export default SearchComponent;

import React, { useState, useRef, useEffect } from 'react';
import { fetchProductsAsync } from '../features/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SearchComponent.css';

const SearchComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [isActive, setIsActive] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchFieldRef = useRef(null);

  // Toggle the search bar
  const toggleSearch = () => {
    setIsActive(!isActive);
    if (!isActive) {
      searchFieldRef.current.focus();
    }
  };

  // Handle form submission for search
  const handleChange = (e) => {
    e.preventDefault();
    const query = e.target.value;
    if (query) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };
  const handleProductClick = (productId) => {
    navigate(`/product-list/${productId}`);
    setFilteredProducts([]);
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="header-search-wrapper">
      <span className="search-icon" onClick={toggleSearch}>
        <i className="fa fa-search"></i>
      </span>
      <div className={`search-form-container ${isActive ? 'active' : ''}`}>
        <label>
          <input
            type="search"
            className="search-input"
            placeholder="Find your product..."
            ref={searchFieldRef}
            onChange={handleChange}
          />
        </label>
        {/* Display filtered products */}
        {filteredProducts.length > 0 && (
          <div className="search-results position-absolute">
            <ul>
              {filteredProducts.map((product) => (
                <li key={product._id} onClick={() => handleProductClick(product._id)}>
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;

