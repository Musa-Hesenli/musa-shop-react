import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import builder from "../../axios/builder";

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const response = await(builder.get('api/products'));
    
    return response.data
});

const initialState = {
    products : [],
    status : 'idle'
}


const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        
    },
    extraReducers : {
        [fetchProducts.pending] : (state, action) => {
            state.status = 'pending';
        },
        [fetchProducts.fulfilled] : (state, action) => {
            state.status = 'idle';
            state.products = action.payload
        }
    }
});

export const selectProductById = (state, id) => {  
    const item = state.products.products.find(item => item.id === parseInt(id));
    return item;
}





export const allProducts = state => state.products.products;

export const requestStatus = state => state.products.status;


export default productSlice.reducer;