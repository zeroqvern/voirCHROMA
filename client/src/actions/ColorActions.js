import axios from 'axios';
import { GET_IMAGES, CHANGE_INDEX,
         DELETE_IMAGE, API_LOADING, CALL_API,
         GET_SAMPLE, SET_SAMPLE, GET_RESULT,
         VIEW_SAVED, HISTORY_SAVED,
         GET_STATES } 
from './types';
import { set } from 'mongoose';


//call from components
export const callAPI = (url, userId) => (dispatch) => {
    dispatch(setApiLoading());
    const query = '/api?url=' + url + "&id=" + userId;
    console.log(query)
    axios
        .get(query)
        .then(function(res) {
            dispatch({
                type: CALL_API,
                payload: res.data,
            });
            
        })
           
        .catch(err => {
            // alert(err)
            dispatch({
                type: CALL_API,
                payload: []
            })
        });

}

export const getResult = () => {
    return {
        type: GET_RESULT
    }
    
}


export const viewSaved = (id) => dispatch => {
    dispatch(setApiLoading());

    const query = "/ViewSaved/"+ id;

    axios
    .get(query)
    .then(res => 
        dispatch({
            type: VIEW_SAVED,
            payload: res.data
        }))
}

export const historySaved = (id) => dispatch => {
    dispatch(setApiLoading());
    console.log("calling api history...");
    console.log(id)
    const query = "/get/images/"+ id;

    axios
    .get(query)
    .then(res =>
        dispatch({
            type: HISTORY_SAVED,
            payload: res.data
        }))
}


export const changeIndex = (id) => {
    return {
        type: CHANGE_INDEX,
        payload: id
    };
}

export const getImages = () => {
    return {
        type: GET_IMAGES
    }
    
};

export const getStates = () => {
    return {
        type: GET_STATES
    }
}

export const deleteImage = (userId,imgId) => dispatch => {
    dispatch(setApiLoading)
    console.log("removing...")
    const query = '/removeImage?id=' + userId + "&imgId=" + imgId;
    axios
    .delete(query)
    .then(res =>
        dispatch({
            type: DELETE_IMAGE,
            payload: imgId
        }))
        
};

export const getSample = () => {
    return{
        type: GET_SAMPLE
    }
}

export const setSample = link => {
    return{
        type: SET_SAMPLE,
        payload: link
    }
}

export const setApiLoading = () => {
    return {
        type: API_LOADING
    };
};