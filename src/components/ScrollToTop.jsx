import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();  
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname,type]); 

    return null;
};

export default ScrollToTop;
