import React from 'react'
import { IMAGE_BASE_URL } from '../constants/contant'

const Category = ({ category }) => {
    return (
        <>
            <div className="col-12">
                <div class="categories_sec product_box text-center">
                    <div class="cat_img overflow-hidden img_hover">
                        <img src={`${IMAGE_BASE_URL}${category.subCategoryImage}`} className="img-fluid" alt="" />
                    </div>
                    <div class="text-center pt-2 fw-semibold">
                        <p className="fs-6">{category.subCategoryName}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category
