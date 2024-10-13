import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBannersAsync } from '../features/bannerSlice';
import { IMAGE_BASE_URL } from '../constants/contant';
import { useNavigate } from 'react-router';

const Banner = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.banners.banners);

    useEffect(() => {
        dispatch(fetchBannersAsync());
    }, [dispatch]);

    return (
        <div id="carouselExampleCaptions" className="main_slider carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {banners?.map((banner, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner">
                {banners?.map((banner, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={`${IMAGE_BASE_URL}${banner.image}`} className="d-block w-100" alt={`Slide ${index + 1}`} />
                        <div className="carousel-caption d-none d-md-block">
                            <h6>100% genuine Products</h6>
                            <h1>
                                Tasty & Healthy <br /> Organic Food
                            </h1>
                            <p>Some representative placeholder content for the first slide.</p>
                            <div className="btn_wrapper mt-2">
                                <button className="prim_color_bg text-white btn-effect-1" onClick={()=>{navigate("/product-list")}}>Explore Products</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    );
};

export default Banner;
