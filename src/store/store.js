import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import cartAndFavorites from "./reducers/cartAndFavorites";
import productsSlice from "./reducers/productsSlice";

const store = configureStore({
    reducer : {
        products : productsSlice,
        auth : authSlice,
        cartAndFavorites,
    },
});



export default store;