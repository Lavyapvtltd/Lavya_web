import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentsAsync } from '../features/contentSlice';
import { useSearchParams } from 'react-router-dom';

const TermsCondition = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type'); 
    const dispatch = useDispatch();
    const contents = useSelector((state) => state.contents.contents);

    useEffect(() => {
        dispatch(fetchContentsAsync());
    }, [dispatch]);

    return (
        <>
            <div className="container-fluid conditions_sec py-5">
                <div className="container">
                    <div className="accordion accordion-flush rounded-2" id="accordionFlushExample" style={{boxShadow:'0 0 3px #dadada'}}>
                        {contents && contents.map((content, index) => (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button ${parseInt(type) === index + 1 ? '' : 'collapsed'}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#flush-collapse${index}`}
                                        aria-expanded={parseInt(type) === index + 1 ? 'true' : 'false'}
                                        aria-controls={`flush-collapse${index}`}>
                                        {content.title}
                                    </button>
                                </h2>
                                <div
                                    id={`flush-collapse${index}`}
                                    className={`accordion-collapse collapse ${parseInt(type) === index + 1 ? 'show' : ''}`}
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <p dangerouslySetInnerHTML={{ __html: content.content }}></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsCondition;
