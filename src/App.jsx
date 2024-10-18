import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GoToTop from './components/GoToTop';
import WhatsAppChat from './components/WhatsappChat';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const location = useLocation();

  // const isExcludedPage = location.pathname === '/login';

  return (
    <div>
      <ScrollToTop />
      <WhatsAppChat/>
      <GoToTop />
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
};

export default App;
