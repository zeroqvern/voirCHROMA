import {
    USER_LOADED, USER_LOADING,
    LOGOUT_SUCCESS, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL,
    REGISTER_SUCCESS, REGISTER_FAIL,
    OPEN_LOGIN, OPEN_REGISTER, GET_AUTH
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    guest: false,
    openLogin: false,
    openRegister: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };

      case USER_LOADED:
        console.log(action.payload);
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };

      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        console.log(action.payload.user)
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload.user
        };

      // case GUEST_LOGIN:
        // return {

        // }

      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        console.log("fail");

        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        };
        

      case OPEN_LOGIN:
        return {
          ...state,
          openLogin: true,
          openRegister: false
        };

      case OPEN_REGISTER:
        return {
          ...state,
          openRegister: true,
          openLogin: false
        }
      
      case GET_AUTH:
        return {
          ...state
        }
      default:
        return state;
    }
  }