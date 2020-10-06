import createDataContext from './createDataContext'
import trackerApi from "../api/tracker"
import { AsyncStorage } from 'react-native';
import { act } from 'react-test-renderer';

const profileReducer = (state,action) =>{
    switch (action.type) {
        case 'get_profile':
            return {...state , name:action.payload[0].name , age : action.payload[0].age}
        default:
            state;
    }
}

updateProfile = dispatch => async (name , age) =>{
    await trackerApi.post("/updateProfile", {name , age})
} 

getProfile = dispatch => async () =>{
let data = null;
    await trackerApi
    .post("/getUserProfile" )
    .then(response => {data = response})
    .catch(error => {
        console.log(error);
      });
      if(data.data.length > 0 ){
        dispatch({type:'get_profile' , payload:data.data})
      }
} 




export const { Provider , Context} = createDataContext(
    profileReducer,
    { updateProfile , getProfile },
    { name : '' , age : null}
)