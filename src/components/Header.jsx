import React, { useEffect, useState } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cart_items = useSelector((state) => state.cart.cart);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        getAddress(lat, lng);
      },
        (error) => {
          setError('Error fetching location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const getAddress = (lat, lng) => {
    const API_KEY = "AIzaSyA76OKDCbizM99zuhLvExdBx666iLNEAm0";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "OK") {
          const addressComponents = response.data.results[0].address_components;
          let premise = "";
          let sublocality = "";
          let locality = "";
          let state = "";
          let postal_code = "";

          addressComponents.forEach((component) => {
            if (component.types.includes("premise")) {
              premise = component.long_name;
            }
            if (component.types.includes("sublocality")) {
              sublocality = component.long_name;
            }
            if (component.types.includes("locality")) {
              locality = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.long_name;
            }
            if (component.types.includes("postal_code")) {
              postal_code = component.long_name;
            }
          });

          const combinedAddress = `${premise} ${sublocality}, ${locality}, ${state} ${postal_code}`;
          setAddress(combinedAddress);
        } else {
          setError("Unable to fetch address");
        }
      })
      .catch(() => {
        setError("Error fetching address from API");
      });
  };
  useEffect(() => {
    getLocation();
  }, [])
  return (
    <>
      <div className="container-fluid top_bar py-2">
        <div className="container">
          <div className="row align-items-center top_heading_bar">
            <div className="col-md-7 col-12">
              <div className="left_sidebar">
                <ul className="d-flex align-items-center justify-content-md-start justify-content-center p-0 m-0">
                  <li className="me-4">
                    <a className="text-white" href=""><i class="fa fa-map-marker" aria-hidden="true"></i> {address}</a></li>
                  {/* <li><a className="text-white" href="mailto:"><i class="fa fa-envelope-o" aria-hidden="true"></i> info@webmail.com</a></li> */}
                </ul>
              </div>
            </div>
            <div className="col-md-5">
              <div className="top-bar-right d-md-flex d-none align-items-center justify-content-md-end justify-content-center">
                <div className="social-media_links">
                  <ul className="d-flex align-items-center p-0 m-0">
                    <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid header_sec py-1">
        <div className="container">
          <div className="row pt-2">
            <nav className="navbar navbar-expand-lg desk_header">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="col">
                  <NavLink className="navbar-brand" to="/">
                    <img src="/images/logo.png" alt="" className="img-fluid" />
                  </NavLink>
                </div>
                <div className="col">
                  <div className="collapse navbar-collapse d-lg-block d-none" id="navbarScroll">
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
                        <NavLink to="/Product-list">All Products</NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact">Contact</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="header_side_bar">
                    <ul className="side_list d-flex align-items-center justify-content-end p-0 m-0">
                      <li className="link_bx me-3">
                        <div className="nav_list_link">
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                      </li>
                      <li className="link_bx me-3">
                        <NavLink className="nav_list_link" to="/cart">
                          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                          <sup className="position-relative" style={{ top: '-7px', left: '4px', fontSize: '14px' }}>{cart_items.length}</sup>
                        </NavLink>
                      </li>
                      <li className="link_bx position-relative">
                        <div className="nav_list_link">
                          <i class="fa fa-user-o" aria-hidden="true"></i>
                        </div>
                        {
                          isLoggedIn ? (
                            <ul class="user_list position-absolute bg-white">
                              <li className='acc_brd'><NavLink to="/profile">Account Details</NavLink></li>
                              <li className='acc_brd'><NavLink to="/recharge">Recharge</NavLink></li>
                              <li className='acc_brd'><NavLink to="/vacation">Vacation</NavLink></li>
                              <li className='acc_brd'><NavLink to="/subscription-products">My Subscriptions</NavLink></li>
                              <li className='acc_brd'><NavLink to="/order-history">Order History</NavLink></li>
                              <li className='acc_brd'><NavLink to="/transaction-history">Transaction History</NavLink></li>
                              <li className='acc_brd'><NavLink to="/billing-details">Monthly Bill</NavLink></li>
                              <li className='acc_brd'><NavLink to="/term-conditions">Terms & conditions</NavLink></li>
                              <li><a href="" onClick={handleLogout}>Logout</a></li>
                            </ul>
                          ) : (
                            <ul class="user_list position-absolute bg-white">
                              <li><NavLink to="/login">Login</NavLink></li>
                            </ul>
                          )
                        }
                      </li>

                      <li className="link_bx ms-3 d-lg-none d-flex ">
                        <a className="nav_list_link" href="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                          <i class="fa-solid fa-bars"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
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
                  <NavLink to="/Product-list">All Products</NavLink>
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
