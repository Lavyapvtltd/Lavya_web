import React from 'react'
import { IMAGE_BASE_URL } from '../constants/contant'

const Testimonial = ({ testimonial }) => {
    return (
        <>
            <div className="col-md-12 col-12">
                <div className="testimonial-box rounded-2 p-4 position-relative">
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <div className='testimonial_img_sec'>
                            <img src={`${IMAGE_BASE_URL}${testimonial.image}`} className="img-fluid testimonial-image" alt="" />
                        </div>
                        <div className="mt-3 text-center">
                            <p className="text_clip_para_3 text_clip_para">{testimonial.description}</p>
                            <h6 className="testimonial-name fw-semibold pt-1">{testimonial.title}</h6>
                        </div>
                    </div>
                    <div className="quote_icon position-absolute" style={{ bottom: '12px', right: '12px',opacity:'0.3' }}>
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Testimonial
