import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, BASE_URL } from '../constants/contant';
import axios from "axios";

const getLocalData = () => {
    const lists = localStorage.getItem("subscription_cart");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};
const initialState = {
    subscription_cart: getLocalData(),
    status: 'idle',
};

export const fetchSubscriptionCartAsync = createAsyncThunk(
    'subscription_carts/fetchsubscriptioncart',
    async (user_id) => {
        const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_SUBSCRIPTION_CART}${user_id}`);
        return response.data.response;
    }
);
export const addToSubscriptionCart = createAsyncThunk(
    'subscription_carts/addtosubscriptioncart',
    async ({ product_id, user_id, producttosubscriptioncart }) => {
        const response = await axios.post(`${BASE_URL}${API_URL.ADD_TO_SUBSCRIPTION_CART}${product_id}/${user_id}`, producttosubscriptioncart);
        return response.data.response.subscriptionProduct;
    }
);
export const deleteToSubscriptionCart = createAsyncThunk(
    'subscription_carts/deletetosubscriptioncart',
    async ({product_id,user_id}) => {
        const response = await axios.get(`${BASE_URL}${API_URL.DELETE_TO_SUBSCRIPTION_CART}${product_id}/${user_id}`);
        return response.data.response.cartProduct[0];
    }
);
export const subscriptionCartSlice = createSlice({
    name: 'subscription_carts',
    initialState,
    reducers: {
        AddSubscriptionProduct: (state, action) => {
            const item = state.subscription_cart.find((item) => item._id === action.payload._id)
            if (item) {
                return;
            }
            const product = action.payload;
            state.subscription_cart.push({ ...product, selQty: 1 });
        },
        IncSubscriptionProduct: (state, action) => {
            const index = state.subscription_cart.findIndex(item => item._id === action.payload._id);
            const updatedItems = state.subscription_cart.map((item) =>
                item._id === action.payload._id ? { ...item, selQty: item.selQty + 1 } : item
            );
            state.subscription_cart.splice(index, 1, updatedItems[index]);
        },
        DecSubscriptionProduct: (state, action) => {
            const index = state.subscription_cart.findIndex(item => item._id === action.payload._id);
            const updatedItems = state.subscription_cart.map((item) =>
                item._id === action.payload._id ? { ...item, selQty: item.selQty - 1 } : item
            );
            state.subscription_cart.splice(index, 1, updatedItems[index]);
        },
        DeleteSubscriptionProduct: (state, action) => {
            const index = state.subscription_cart.findIndex(item => item._id === action.payload._id);
            state.subscription_cart.splice(index, 1);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptionCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubscriptionCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.subscription_cart = action.payload;
                localStorage.setItem('subscription_cart', JSON.stringify(state.subscription_cart));
            })
            .addCase(addToSubscriptionCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToSubscriptionCart.fulfilled, (state, action) => {
                state.status = 'idle';
                state.subscription_cart = action.payload;
                localStorage.setItem('subscription_cart', JSON.stringify(state.subscription_cart));
            })
            .addCase(deleteToSubscriptionCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteToSubscriptionCart.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.subscription_cart.findIndex(item => item._id === action.payload._id);
                state.subscription_cart.splice(index, 1);
                localStorage.setItem('subscription_cart', JSON.stringify(state.subscription_cart));
            })
    },
});

export const { AddSubscriptionProduct, IncSubscriptionProduct, DecSubscriptionProduct, DeleteSubscriptionProduct } = subscriptionCartSlice.actions;

export default subscriptionCartSlice.reducer;
