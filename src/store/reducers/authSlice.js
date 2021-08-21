import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import builder from "../../axios/builder";

const initialState = {
    status : 'idle',
    is_authenticated : false,
    error_message : ''
}

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  

export const getToken = createAsyncThunk('auth/getToken', async ({ username, password }) => {
    const { data } = await builder.post('user/api/token/', {
        username: username,
        password: password
    });

    if (data.access && data.refresh) {
        setCookie('access_token', data.access, 10);
        setCookie('refresh_token', data.refresh, 10);
        setCookie('username', data.username, 10);
        setCookie('email', data.email, 10);
        setCookie('is_authenticated', true, 10);
        setCookie('user_id', data.user_id, 10);
    }
});


export const clearCookies = () => {
    setCookie('access_token', '', -20);
    setCookie('refresh_token','', -20);
    setCookie('username', '', -20);
    setCookie('email', '', -20);
    setCookie('is_authenticated', false, -20);
    setCookie('user_id', null, -20)
}

export const register = createAsyncThunk('auth/createAccount', async ({ username, email, password }) => {
    const response = await builder.post('/user/create-account', {
        username, email, password
    });
    return response.data;
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers : {
        [getToken.pending] : (state, action) => {
            state.status = 'pending';
        },
        [getToken.fulfilled] : (state, action) => {
            state.status = 'idle';
            state.is_authenticated = true
        },
        [getToken.rejected] : (state, action) => {
            state.status = 'idle'
        },
        [register.pending] : (state, action) => {
            state.status = 'pending';
            state.error_message = ''
        },
        [register.fulfilled] : (state, action) => {
            state.status = 'idle';
            state.error_message = '';
            state.is_authenticated = true
        },
        [register.rejected] : (state, action) => {
            state.status = 'idle'
            state.error_message = 'This credentials are already exists in the database, login instead or try another account'
        }
    }
});




export default authSlice.reducer;