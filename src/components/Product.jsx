import React from 'react'
import { IMAGE_BASE_URL } from '../constants/contant'

const Product = ({ product }) => {
    return (
        <>
        <a href="">
            <div className="product_box mb-4">
                <div className="card overflow-hidden">
                    <div className="card_img overflow-hidden img_hover position-relative">
                        <img src={`${IMAGE_BASE_URL}${product.icon}`} className="img-fluid" alt="..." />
                        <div className="bedg prim_color_bg py-1 px-2 text-white rounded-1 position-absolute label_detail">{product.productType}</div>
                        <div class="product-hover-action position-absolute">
                            <ul className="p-0 m-0 d-flex align-items-center justify-content-center">
                                <li>
                                    <div>
                                        <i class="fa fa-eye"></i>
                                    </div>
                                </li>
                                <li title="Cart">
                                    <div>
                                        <i class="fa fa-shopping-cart"></i>
                                    </div>
                                </li>
                                {/* <li title="Wishlist">
                                        <div>
                                            <i class="fa fa-heart"></i>
                                        </div>
                                    </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="card-body">
                        <h6 className="card-title text_clip_head fw-semibold">{product.name}</h6>
                        {
                            !(product.stock > 0) && <p className='pb-1 text-danger'>Currently not available</p>
                        }
                        <p className='text-dark fw-semibold pb-1'>{product.unit_value} {product.unit}</p>
                        <div className="product-ratting">
                            <ul className="d-flex align-items-center p-0 m-0">
                                {/* If the rating is greater than 0, display filled stars and half stars */}
                                {
                                    product.rating > 0 ? (
                                        <>
                                            {[...Array(Math.floor(product.rating))].map((_, i) => (
                                                <li className="me-1" key={i}>
                                                    <a href="#" tabIndex="0">
                                                        <i className="fa fa-star"></i>
                                                    </a>
                                                </li>
                                            ))}
                                            {product.rating % 1 !== 0 && (
                                                <li className="me-1">
                                                    <a href="#" tabIndex="0">
                                                        <i className="fa fa-star-half"></i>
                                                    </a>
                                                </li>
                                            )}
                                            {/* Display empty stars to complete 5 stars */}
                                            {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                                                <li className="me-1" key={i + Math.floor(product.rating)}>
                                                    <a href="#" tabIndex="0">
                                                        <i className="fa fa-star-o"></i>
                                                    </a>
                                                </li>
                                            ))}
                                        </>
                                    ) : (
                                        /* If no rating, display 5 blank stars */
                                        [...Array(5)].map((_, i) => (
                                            <li className="me-1" key={i}>
                                                <a href="#" tabIndex="0">
                                                    <i className="fa fa-star-o"></i>
                                                </a>
                                            </li>
                                        ))
                                    )
                                }
                            </ul>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className="me-2 prim_color d-flex align-items-center">
                                <span className="currency-symbol prim_color pe-1"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value prim_color">{product.price}</span>
                            </p>
                            <p className="d-flex align-items-center">
                                <span className="del_line">
                                    <span className="currency-symbol text-secondary"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value">{product.regularPrice}</span>
                                </span>
                                <span className="ps-1 text-secondary"> {`${((product.regularPrice - product.price) / product.regularPrice * 100).toFixed(2)}% off`} </span>
                            </p>
                        </div>
                        <p className='d-flex align-items-center text-secondary'>You are saving  <span className="currency-symbol text-secondary px-1"><i class="fa fa-inr" aria-hidden="true"></i></span> {(product.regularPrice - product.price).toFixed(2)}</p>

                        <p className="card-text text_clip_para_1" dangerouslySetInnerHTML={{ __html: product.shortDescription.substring(0, 30) + "..." }}></p>
                    </div>
                </div>
            </div>
            </a>
        </>
    )
}

export default Product
