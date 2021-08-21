import axios from "axios";

const builder = axios.create({
    baseURL : 'https://musa-shop.herokuapp.com'
});

export default builder;