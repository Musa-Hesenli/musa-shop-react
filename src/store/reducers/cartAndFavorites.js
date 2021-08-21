import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import builder from "../../axios/builder";
import { getCookie } from "./authSlice";

import swal from 'sweetalert'

export const baseUrl = 'https://musa-shop.herokuapp.com';

export const fetchCartItems = createAsyncThunk('fetch/cartItems', async user_id => {
    const response = await builder.get(`/add-to/cart/${user_id}`);
    return response.data
});

export const deleteFromCart = createAsyncThunk('delete/cartItem', async ({ product_id }) => {
    const user_id = getCookie('user_id');
    await axios({
        method : 'DELETE',
        url : baseUrl + '/add-to/cart/' + user_id,
        data : {
            product_id
        }
    });
    return { product : product_id, user_id  }
});

export const postToCart = createAsyncThunk('post/cartItem', async ({user_id, product_id}) => {
    const response = await axios({
        method : "POST",
        url : `${baseUrl}/add-to/cart/` + user_id,
        data : {
            product : product_id,
            user_id,
            count : 1
        }
    });
    return response.data
});

export const fetchFavoriteItems = createAsyncThunk('fetch/favoriteItems', async () => {
    const response = await axios({
        method : "GET",
        url : `${baseUrl}/add-to/favorites`,
        params : {
            user_id : 1
        }
    });
    return response.data
});


export const postToFavorites = createAsyncThunk('post/favoriteItem', async ({ user_id, product_id }) => {
    console.log(product_id)
    const response = await axios({
        method : 'POST',
        url : `${baseUrl}/add-to/favorites`,
        data : {
            user_id,
            product : product_id
        }
    });
    return response.data
});

export const removeFromFavorites = createAsyncThunk('delete/favoriteItem', async({ user_id, product_id }) => {
    console.log(user_id, product_id);
    await axios({
        method : 'DELETE',
        url : baseUrl + '/add-to/favorites',
        data : {
            user_id : user_id,
            product : product_id
        }
    });
    return product_id
});

export const confirmCart = createAsyncThunk('confirm/cart', async ({cartItems, address}) => {
    
    const response = await axios({
        method : "POST",
        url : baseUrl + '/add-to/orders',
        data : {
            user_id : getCookie('user_id'),
            products : JSON.stringify(cartItems),
            address
        }
    });
    return response.data
})

const cartAndFavorites = createSlice({
    name : 'cartAndFavorites',
    initialState : {
        cart : [],
        favorites : [],
        status : 'idle'
    },
    reducers : {
        initializeCart(state, action) {
            state.cart = action.payload;
        },
        initializeFavorites(state, action) {
            state.favorites = action.payload;
        },
        addToCart(state, action) {
            state.cart.push(action.payload);
        },
        removeFromCart(state, action) {
            const product_id = action.payload;
            state.cart.filter(item => item.id !== product_id);
        },
        updateCartItem : {
            reducer(state, action) {
            
            },
            prepare(product_id, product_new_data) {
                return {
                    payload : {
                        product_id,
                        product_new_data
                    }
                }
            }
        },
        addFavorites(state, action) {
            state.favorites.push(action.payload);
        },
        removeFromFavorites(state, action) {
            state.favorites.filter(item => item.id !== action.payload);
        },
        updateFavoritesItem : {
            reducer(state, action) {
                
            },
            prepare(product_id, new_product_data) {
                return {
                    payload :{
                        product_id,
                        new_product_data
                    }
                }
            }

        } 
    },
    extraReducers : {
        [postToCart.pending] : (state, action) => {
            state.status = 'pending'
        },
        [postToCart.fulfilled] : (state, action) => {
            state.status = 'idle';
            swal("Good job!", "Item added to the cart successfully", "success");
            state.cart.push(action.payload);
        },
        [postToCart.rejected] : (state, action) => {
            state.status = 'idle';
            swal("Oops !", "Something went wrong", "error");
        },
        [fetchCartItems.pending] : (state, action) => {
            state.status = 'pending';
        },
        [fetchCartItems.fulfilled] : (state, action) => {
            state.status = 'idle';
            for(let el of action.payload) {
                state.cart.push(el);
            }
        },
        [fetchCartItems.rejected] : (state, action) => {
            state.status = 'idle';
        },
        [deleteFromCart.pending] : (state, action) => {
            state.status = 'pending';
        },
        [deleteFromCart.fulfilled] : (state, action) => {
            state.status = 'idle';
            swal("Good job!", "Item removed from your cart", "success");
            state.cart = state.cart.filter(item => item.product !== action.payload.product)
        },
        [deleteFromCart.rejected] : (state, status) => {
            state.status = 'idle';
            swal("Oops!", "Something went wrong", "error");
        },
        // Favorite items
        [fetchFavoriteItems.pending] : (state, action) => {
            state.status = 'pending'
        },
        [fetchFavoriteItems.fulfilled] : (state, action) => {
            state.status = 'idle';
            console.log(action.payload)
            state.favorites = action.payload
        },
        [fetchFavoriteItems.rejected] : (state, action) => {
            state.status = 'idle'
        },
        [postToFavorites.pending] : (state, action) => {
            state.status = 'pending'
        },
        [postToFavorites.fulfilled] : (state, action) => {
            state.status = 'idle';
            state.favorites.push(action.payload)
            swal('Success', 'Item added to your favorites', 'success');
        },
        [postToFavorites.rejected] : (state, action) => {
            state.status = 'idle';
            swal('Error', 'Something went wrong');
        },
        [removeFromFavorites.pending] : (state, action) => {
            state.status = 'pending';
        },
        [removeFromFavorites.fulfilled] : (state, action) => {
            state.status = 'idle';
            state.favorites = state.favorites.filter(item => item.product !== action.payload);
            swal('Success', 'Item removed from favorites', 'success');
        },
        [removeFromFavorites.rejected] : (state, action) => {
            state.status = 'idle';
            swal('Error', 'Something went wrong', 'error');
        } 
    }
});

export const { initializeCart, initializeFavorites } = cartAndFavorites.actions

export default cartAndFavorites.reducer;
