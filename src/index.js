import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';

import { fetchProducts } from './store/reducers/productsSlice'

import 'swiper/swiper.scss';
import "swiper/components/pagination/pagination.min.css"

import 'react-credit-cards/es/styles-compiled.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/style/style.css'


import { fetchCartItems, fetchFavoriteItems } from './store/reducers/cartAndFavorites';
import { getCookie } from './store/reducers/authSlice';

store.dispatch(fetchProducts())
store.dispatch(fetchCartItems(getCookie('user_id')));
store.dispatch(fetchFavoriteItems())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
