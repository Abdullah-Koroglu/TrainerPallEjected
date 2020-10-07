import createDataContext from './createDataContext'
import trackerApi from "../api/tracker"

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
      if(data.data.length > 0 || data.data.age > 0){
        //   console.log(data);
        dispatch({type:'get_profile' , payload:data.data})
      }
      return data.data
} 




export const { Provider , Context} = createDataContext(
    profileReducer,
    { updateProfile , getProfile },
    { name : '' , age : null}
)