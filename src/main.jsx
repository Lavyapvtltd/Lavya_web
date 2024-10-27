import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AuthRoute from './components/AuthRoute.jsx';
import { ROUTES_CONST } from "./constants/contant.jsx";
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import ProductList from './pages/ProductList.jsx';
import UserDetail from './pages/UserDetail.jsx';
import Vacation from './pages/Vacation.jsx';
import Recharge from './pages/Recharge.jsx';
import BillingDetails from './pages/BillingDetails.jsx';
import Orders from './pages/Orders.jsx';
import TransactionHistory from './pages/TransactionHistory.jsx';
import TermsCondition from './pages/TermsCondition.jsx';
import Checkout from './pages/Checkout.jsx';
import SubscriptionCheckout from './pages/SubscriptionCheckout.jsx';
import SubscriptionProducts from './pages/SubscriptionProducts.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import RechargeSuccess from './pages/RechargeSuccess.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: `${ROUTES_CONST.LOGIN}`,
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.INDEX}`,
        element: (
          <Home />
        ),
      },
      {
        path: `${ROUTES_CONST.PRODUCT_LIST}`,
        element: (
          <ProductList />
        ),
      },
      {
        path: `${ROUTES_CONST.PRODUCT_DETAIL}`,
        element: (
          <ProductDetail />
        ),
      },
      {
        path: `${ROUTES_CONST.ABOUT}`,
        element: (
          <About />
        ),
      },
      {
        path: `${ROUTES_CONST.CONTACT}`,
        element: (
          <Contact />
        ),
      },
      {
        path: `${ROUTES_CONST.CART}`,
        element: (
          <Cart />
        ),
      },
      {
        path: `${ROUTES_CONST.CHECKOUT}`,
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.SUBSCRIPTION_CHECKOUT}`,
        element: (
          <ProtectedRoute>
            <SubscriptionCheckout />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.PROFILE}`,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.USER_DETAIL}`,
        element: (
          <ProtectedRoute>
            <UserDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.RECHARGE}`,
        element: (
          <ProtectedRoute>
            <Recharge />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.TERMS_CONDITIONS}`,
        element: (
          <ProtectedRoute>
            <TermsCondition />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.VACATION}`,
        element: (
          <ProtectedRoute>
            <Vacation />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.BILLING_DETAILS}`,
        element: (
          <ProtectedRoute>
            <BillingDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.SUBSCRIPTION_PRODUCTS}`,
        element: (
          <ProtectedRoute>
            <SubscriptionProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.ORDERS}`,
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.RECHARGE_SUCCESS}`,
        element: (
          <ProtectedRoute>
            <RechargeSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.ORDER_SUCCESS}`,
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES_CONST.TRANSACTION_HISTORY}`,
        element: (
          <ProtectedRoute>
            <TransactionHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="whiteToast"
        bodyClassName="toastBody"
      />
    </Provider>
  </StrictMode>
);
