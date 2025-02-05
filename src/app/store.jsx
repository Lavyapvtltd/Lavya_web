// src/app/store.js
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';
import categoryReducer from '../features/categorySlice';
import productDetailReducer from '../features/productDetailSlice';
import bannerReducer from '../features/bannerSlice';
import sliderReducer from '../features/sliderSlice';
import cartReducer from '../features/cartSlice';
import testimonialReducer from '../features/testimonialSlice';  
import transactionReducer from '../features/transactionSlice';
import subscriptionCartReducer from '../features/subscriptionCartSlice';
import vacationReducer from '../features/vacationSlice';
import rechargeReducer from '../features/rechargeSlice';
import orderReducer from '../features/orderSlice';
import monthlyBillReducer  from '../features/monthlyBillSlice';
import contentReducer from '../features/contentSlice';
import addressReducer from '../features/addressSlice';
import locationReducer from "../features/locationSlice";
import ratingReducer from '../features/ratingSlice';
import firstTimeRechargeReducer from '../features/firstTimeRechargeSlice';
import trialReducer from '../features/trialSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productReducer,
    categories:categoryReducer,
    productdetail:productDetailReducer,
    sliders:sliderReducer,
    banners:bannerReducer,
    cart:cartReducer,
    subscription_cart:subscriptionCartReducer,
    testimonials:testimonialReducer,
    transactions:transactionReducer,
    vacations:vacationReducer,
    recharges:rechargeReducer,
    orders:orderReducer,
    monthlybill:monthlyBillReducer,
    contents:contentReducer,
    addresses:addressReducer,
    locations:locationReducer,
    ratings:ratingReducer,
    firsttimerecharges:firstTimeRechargeReducer,
    trials:trialReducer
  },
});
