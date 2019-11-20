import { GET_IMAGES, CHANGE_INDEX,
         DELETE_IMAGE, API_LOADING, CALL_API,
         GET_SAMPLE, SET_SAMPLE, GET_RESULT,
         VIEW_SAVED, HISTORY_SAVED,
         GET_STATES } 
from '../actions/types';


const initialState ={
    index: 0,
    image: [],
    imgUrl: "",
    loading: false,
    history_saved: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CALL_API:
            // if(userId != 0)
            //     this.props.updateImagesArr (userId, imageId);

            const img = action.payload.image;
            var isResulttEmpty = !Object.keys(img).length;
            if(isResulttEmpty){
                alert("Can't get colors from image or there is a problem with your connection");

            }
        
            return {
                ...state,
                index: 0,
                image: action.payload.image,
                loading: false
            }

        case VIEW_SAVED:
            // console.log(action.payload)
            return{
                ...state,
                index: 0,
                image: action.payload.image,
                history_saved: false,
                loading: false,
                
            }

        case HISTORY_SAVED:
            console.log(action.payload.Results);
            return{
                ...state,
                image: action.payload.Results,
                history_saved: true,
                loading: false
            }

        case GET_IMAGES:
        console.log(action.payload)
            return{
                ...state,
                history_saved: true,
                loading:false
            }
            
        case GET_RESULT:
            return {
                ...state,
                history_saved: false
                // loading: false
            }    
        

        case CHANGE_INDEX:
            return{
                ...state,
                index: action.payload
            }
        case DELETE_IMAGE:
            // console.log (action.payload, img);
            return{
                ...state,
                image: state.image.filter(image => image.imgId !== action.payload),
                loading:false
            }

            
        case GET_STATES:
            console.log(state);
            return{
                ...state
            }

        case GET_SAMPLE:
            return{
                imgUrl: state.imgUrl
            }
        case SET_SAMPLE:

            return{
                imgUrl: action.payload
            }
        case API_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            //return initialState
            return state;
    }
}
