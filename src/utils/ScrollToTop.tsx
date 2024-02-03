import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (props: { children: JSX.Element }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return props.children;
};

export default ScrollToTop;
