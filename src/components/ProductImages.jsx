import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../constants/contant";

const ProductImages = ({ images = [{ filename: "" }] }) => {
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        setMainImage(images[0]?.filename)
    }, [images])

    return (
        <div className="d-flex product_detail_img_bx">
            <div className="d-flex flex-md-column flex-row me-2 justify-content-md-start justify-content-center product_detail_sideImg mb-md-0 mb-5">
                {images.map((curElm, index) => {
                    return (
                        <button type="button" className="border-0 shadow-none mb-2 overflow-hidden rounded-2" >
                                <img
                                    src={`${IMAGE_BASE_URL}${curElm.filename}`}
                                    alt="image"
                                    width={70}
                                    height={70}
                                    key={index}
                                    onClick={() => setMainImage(curElm.filename)}
                                    className="rounded-2 img-fluid"
                                />
                        </button>
                    );
                })}
            </div>
            <div className="main_side_screen w-100 h-100 overflow-hidden rounded-2 mb-md-0 mb-3">
                <img src={`${IMAGE_BASE_URL}${mainImage}`} alt="mainimage" width={330} height={330} className="img-fluid side_main_img w-100 rounded-2" />
            </div>
        </div>
    );
};

export default ProductImages;
