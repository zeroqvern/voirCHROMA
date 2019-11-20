import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED, USER_LOADING,
  LOGIN_SUCCESS, LOGIN_FAIL,
  AUTH_ERROR, LOGOUT_SUCCESS,
  REGISTER_SUCCESS, REGISTER_FAIL,
  OPEN_LOGIN, OPEN_REGISTER, GET_AUTH
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('user/getUser', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};


// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/user/register', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};


// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/user/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};


//update imageArr
export const updateImagesArr = (id, imagesId) =>{
  console.log("updating...");
  
  console.log(id, imagesId);

  // const userId = id.toString();
  // Headers
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };
  
  // Request body
  // const body = JSON.stringify({ id, imagesId});
  const query = "/updateImages?id=" + id + "&imagesId=" + imagesId;
  axios
    .post(query)
    .then(console.log("array updated!"))
    .catch(err => { console.log(err)
    });
}



// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};


export const openLogin = () => {
    return{
        type: OPEN_LOGIN
    };
}

export const openRegister = () => {
    return{
        type: OPEN_REGISTER
    };
}

export const getAuth = () => {
    return {
        type: GET_AUTH
    };
}


// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};