import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { Register } from './components/Auth/Register/Register';
import { Login } from './components/Auth/Login/Login';
import { ScrollToTop } from './utils/scrollToTop';
import { ProductPage } from './pages/components/ProductPage/ProductPage';
import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { Order } from './components/Order/Order';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { startTokenRefresh, stopTokenRefresh } from './utils/tokenManger';
import { Favorite } from './pages/components/Favorite/Favorite';
import { Profile } from './pages/components/Profile/Profile';
import { Footer } from './components/Footer/Footer';
import { About } from './pages/components/About/About';
import { NotFound } from './components/NotFound/NotFound';

export default function App() {
  // Trigger, if the user is already logged in, and start refresh token
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');

    if (token) {
      startTokenRefresh();
    }

    return () => {
      stopTokenRefresh();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductPage />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/products/:category' element={<ProductSlider />} />
          <Route
            path='/products/product/:product_id'
            element={<ProductDetail />}
          />
          <Route path='/order/create' element={<Order />} />
          <Route path='/favorites' element={<Favorite />} />
          <Route path='/profile/data' element={<Profile />} />
          <Route path='/profile/orders' element={<Profile />} />
          <Route path='/about-us' element={<About />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}
