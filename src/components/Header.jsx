import React, { useEffect, useState } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import { BASE_URL, API_URL } from '../constants/contant';

const Header = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const cart_items = useSelector((state) => state.cart.cart);
  const [toggle, setToggle] = useState(false);
  const [offerHeadings,setOfferHeadings] = useState([]);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getAllOfferHeadings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${API_URL.GET_ALL_OFFER_HEADINGS}`);
      const result = res.data;
      const { baseResponse, response } = result;
      if (baseResponse.status == 1) {
        setOfferHeadings(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAllOfferHeadings();
  },[])
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const lat = position.coords.latitude;
  //       const lng = position.coords.longitude;
  //       getAddress(lat, lng);
  //     },
  //       (error) => {
  //         setError('Error fetching location');
  //       }
  //     );
  //   } else {
  //     setError('Geolocation is not supported by this browser.');
  //   }
  // };

  // const getAddress = (lat, lng) => {
  //   const API_KEY = "AIzaSyA76OKDCbizM99zuhLvExdBx666iLNEAm0";
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  //   axios
  //     .get(url)
  //     .then((response) => {
  //       if (response.data.status === "OK") {
  //         const addressComponents = response.data.results[0].address_components;
  //         let premise = "";
  //         let sublocality = "";
  //         let locality = "";
  //         let state = "";
  //         let postal_code = "";

  //         addressComponents.forEach((component) => {
  //           if (component.types.includes("premise")) {
  //             premise = component.long_name;
  //           }
  //           if (component.types.includes("sublocality")) {
  //             sublocality = component.long_name;
  //           }
  //           if (component.types.includes("locality")) {
  //             locality = component.long_name;
  //           }
  //           if (component.types.includes("administrative_area_level_1")) {
  //             state = component.long_name;
  //           }
  //           if (component.types.includes("postal_code")) {
  //             postal_code = component.long_name;
  //           }
  //         });

  //         const combinedAddress = `${premise} ${sublocality}, ${locality}, ${state} ${postal_code}`;
  //         setAddress(combinedAddress);
  //       } else {
  //         setError("Unable to fetch address");
  //       }
  //     })
  //     .catch(() => {
  //       setError("Error fetching address from API");
  //     });
  // };
  // useEffect(() => {
  //   getLocation();
  // }, [])
  return (
    <>
      {
        !toggle && <div className="container-fluid promo_banner py-2" style={{ background: '#ffc673' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className='d-flex justify-content-between align-items-center'>
                <div className="w-auto px-1">
                  <button type='button' className='bg-transparent shadow-none border-0 text-dark' onClick={() => { setToggle(true) }}><i class="fa-regular fa-x text-dark"></i></button>
                </div>
                <div className="w-auto px-1"> <p><span>Get 10% off on first order+ 1% cashback on app! </span></p>  </div>
                <div className="w-auto px-1">
                  <NavLink to="https://play.google.com/store/apps/details?id=com.lavya_applications.Lavya" target="_blank" className="prim_color_bg text-white btn-effect-1 px-3 py-1">
                    Get App
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="container-fluid top_bar py-2">
        <div className="container">
          <div className="row align-items-center top_heading_bar">
            {/* <div className="col-md-7 col-12">
              <div className="left_sidebar">
                <ul className="d-flex align-items-center justify-content-md-start justify-content-center p-0 m-0">
                  <li className="me-4">
                    <a className="text-white" href=""><i class="fa fa-map-marker" aria-hidden="true"></i> {address}</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-5">
              <div className="top-bar-right d-md-flex d-none align-items-center justify-content-md-end justify-content-center">
                <div className="social-media_links">
                  <ul className="d-flex align-items-center p-0 m-0">
                    <li><NavLink to="https://www.facebook.com/profile.php?id=61564893940430&mibextid=ZbWKwL" title="Facebook" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></NavLink></li>
                    <li><NavLink to="https://www.instagram.com/lavyaorganic?igsh=enNsaWVmOTlzMmlk" title="Instagram" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></NavLink></li>
                    <li><NavLink to="https://youtube.com/@lavyaorganic?si=b4NzYkazmtnOnLEt" title="Youtube" target="_blank"><i class="fa fa-youtube" aria-hidden="true"></i></NavLink></li>
                  </ul>
                </div>
              </div>
            </div> */}
            <marquee direction="left"> <p class="text-white text-center"><span>{offerHeadings[0]?.description}</span></p>
            </marquee>
          </div>
        </div>
      </div>
      <div className="container-fluid header_sec py-1">
        <div className="container">
          <div className="row pt-2">
            <nav className="navbar navbar-expand-lg desk_header">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="col-lg col-md-auto col-auto">
                  <div className='d-flex align-items-center'>
                    <div className='me-2 d-lg-none d-flex'>
                      <a className="nav_list_link" href="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <svg stroke="currentColor" fill="#309a20" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path></svg>
                      </a>
                    </div>
                    <NavLink className="navbar-brand" to="/">
                      <img src="/images/logo.png" alt="" className="img-fluid" />
                    </NavLink>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 d-md-block d-none">
                  <div className='d-md-block d-none'>
                    <SearchComponent />
                  </div>
                </div>
                <div className="col">
                  <div className="header_side_bar">
                    <ul className="side_list d-flex align-items-center justify-content-end p-0 m-0">
                      <li className="position-relative me-3">
                          <button class="nav_list_link acnt_name d-flex align-items-center bg-transparent p-0 border-0 shadow-none" data-bs-toggle="dropdown" aria-expanded="false">
                             <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                             <span className='ms-1'>{user?.name}</span>
                             <span className='ms-1'><i class="fa-solid fa-chevron-down"></i></span>
                          </button>
                        {
                          isLoggedIn ? (
                            <ul class="user_list dropdown-menu position-absolute bg-white">
                              <li className='acc_brd'><NavLink to="/profile">Account Details</NavLink></li>
                              <li className='acc_brd'><NavLink to="/recharge">Recharge</NavLink></li>
                              <li className='acc_brd'><NavLink to="/vacation">Vacation</NavLink></li>
                              <li className='acc_brd'><NavLink to="/subscription-products">My Subscriptions</NavLink></li>
                              <li className='acc_brd'><NavLink to="/order-history">Order History</NavLink></li>
                              <li className='acc_brd'><NavLink to="/transaction-history">Transaction History</NavLink></li>
                              <li className='acc_brd'><NavLink to="/billing-details">Monthly Bill</NavLink></li>
                              <li className='acc_brd'><NavLink to="/term-conditions?type=2">Terms & conditions</NavLink></li>
                              <li><a href="" onClick={handleLogout}>Logout</a></li>
                            </ul>
                          ) : (
                            <ul class="user_list dropdown-menu position-absolute bg-white">
                              <li className='acc_brd'><NavLink to="/login">Login</NavLink></li>
                              <li><NavLink to="/term-conditions?type=2">Terms & conditions</NavLink></li>
                            </ul>
                          )
                        }
                      </li>
                      {/* <li className="link_bx me-3">
                        <SearchComponent />
                      </li> */}
                      <li className="link_bx">
                        <NavLink className="nav_list_link" to="/cart">
                          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                          <sup className="position-relative" style={{ top: '-7px', left: '4px', fontSize: '14px' }}>{cart_items.length}</sup>
                        </NavLink>
                      </li>


                      {/* <li className="link_bx ms-3 d-lg-none d-flex ">
                        <a className="nav_list_link" href="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                          <i class="fa-solid fa-bars"></i>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="row pt-0 pb-2 justify-content-center navbar navbar-expand-lg desk_header">
            <div className="collapse navbar-collapse justify-content-center d-lg-block d-none" id="navbarScroll">
              <ul className="nav_list m-0">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                {/* <li className="menu-icon">
                        <a href="#">Shop</a>
                        <ul>
                          <li>
                            <a href="#">Shop</a>
                          </li>
                          <li>
                            <a href="#">Shop Grid</a>
                          </li>
                          <li>
                            <a href="#">Shop Left sidebar</a>
                          </li>
                          <li>
                            <a href="#">Shop right sidebar</a>
                          </li>
                          <li>
                            <a href="#">Shop details </a>
                          </li>
                          <li>
                            <a href="#">Shop details no sidebar </a>
                          </li>
                        </ul>
                      </li> */}
                <li>
                  <NavLink to="/product-list">All Products</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
            <div className='d-md-none d-block'>
              <SearchComponent />
            </div>
          </div>
        </div>
      </div>

      <div className="mobilebar d-lg-none">
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header border-bottom">
            <NavLink className="navbar-brand" to="/">
              <img src="/images/logo.png" alt="" className="img-fluid" />
            </NavLink>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body prim_color_bg">
            <div className="mobile_menu">
              <ul className="nav_list">
                <li data-bs-dismiss="offcanvas">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <NavLink to="/about">About</NavLink>
                </li>
                {/* <li className="drop_btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <a href="#">Shop</a>
                  <ul className="collapse" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <li>
                      <a href="#">Shop</a>
                    </li>
                    <li>
                      <a href="#">Shop Grid</a>
                    </li>
                    <li>
                      <a href="#">Shop Left sidebar</a>
                    </li>
                    <li>
                      <a href="#">Shop right sidebar</a>
                    </li>
                    <li>
                      <a href="#">Shop details </a>
                    </li>
                    <li>
                      <a href="#">Shop details no sidebar </a>
                    </li>
                  </ul>
                </li> */}
                <li data-bs-dismiss="offcanvas">
                  <NavLink to="/product-list">All Products</NavLink>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Header
