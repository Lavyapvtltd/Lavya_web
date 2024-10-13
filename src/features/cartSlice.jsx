import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, BASE_URL } from '../constants/contant';
import axios from "axios";

const getLocalData = () => {
    const lists = localStorage.getItem("cart");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};
const initialState = {
    cart: getLocalData(),
    status: 'idle',
};

export const fetchCartsAsync = createAsyncThunk(
    'carts/fetchcarts',
    async (user_id) => {
        const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_CARTS}${user_id}`);
        return response.data.response;
    }
);
export const addToCart = createAsyncThunk(
    'carts/addtocart',
    async ({ product_id, user_id, producttocart }) => {
        const response = await axios.post(`${BASE_URL}${API_URL.ADD_TO_CART}${product_id}/${user_id}`, producttocart);
        return response.data.response.cartProduct[0];
    }
);
export const deleteToCart = createAsyncThunk(
    'carts/deletetocart',
    async ({product_id,user_id}) => {
        const response = await axios.get(`${BASE_URL}${API_URL.DELETE_TO_CART}${product_id}/${user_id}`);
        return response.data.response.cartProduct[0];
    }
);
export const CartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        AddProduct: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload._id)
            if (item) {
                return;
            }
            const product = action.payload;
            state.cart.push({ ...product, selQty: 1 });
        },
        IncProduct: (state, action) => {
            const index = state.cart.findIndex(item => item._id === action.payload._id);
            const updatedItems = state.cart.map((item) =>
                item._id === action.payload._id ? { ...item, selQty: item.selQty + 1 } : item
            );
            state.cart.splice(index, 1, updatedItems[index]);
        },
        DecProduct: (state, action) => {
            const index = state.cart.findIndex(item => item._id === action.payload._id);
            const updatedItems = state.cart.map((item) =>
                item._id === action.payload._id ? { ...item, selQty: item.selQty - 1 } : item
            );
            state.cart.splice(index, 1, updatedItems[index]);
        },
        DeleteProduct: (state, action) => {
            const index = state.cart.findIndex(item => item._id === action.payload._id);
            state.cart.splice(index, 1);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.cart = action.payload;
                localStorage.setItem('cart', JSON.stringify(state.cart));
            })
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.cart.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.cart[index] = { ...state.cart[index], ...action.payload };
                } else {
                    state.cart.push(action.payload);
                }
                localStorage.setItem('cart', JSON.stringify(state.cart));
            })
            .addCase(deleteToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteToCart.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.cart.findIndex(item => item._id === action.payload._id);
                state.cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(state.cart));
            })
    },
});

export const { AddProduct, IncProduct, DecProduct, DeleteProduct } = CartSlice.actions;

export default CartSlice.reducer;
