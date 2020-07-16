import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"
import BleManager from 'react-native-ble-manager';
import { dispatch } from "d3";

const trackReducer = (state , action) =>{
    switch (action.type) {
        case 'add_curret_instant':
            return {...state , currentInstant:action.payload}
        case 'fetch_workout':
            return {...state , list:action.payload}
        case 'start_recording':
            return {...state , recording: true}
        case 'stop_recording':
            return {...state , recording: false}
        case 'change_name':
            return{...state , name:action.payload}
        case 'add_instant':
        return{...state , datas : [...state.datas , action.payload]}
        case 'reset':
            return {...state , name:'' , datas:[]}
        case 'set_hr':
            return{ ... state , HR : action.payload}
        default:
            return state;
    }
}
fetchWorkout = dispatch => async() =>{
    let data
    await trackerApi
        .get('/workouts')
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
          });
    dispatch({type:'fetch_workout' , payload:data.data})
}
createWorkout = dispatch => async (name , datas) =>{
    await trackerApi.post('/workouts',{name , datas})
    console.log("createWorkout")
}
startRecording =  dispatch => () =>{
    dispatch({type:'start_recording'});
} 
stopRecording =  dispatch => () =>{
    dispatch({type:'stop_recording'});
} 
changeName = dispatch => (name) =>{
    dispatch({type:'change_name' , payload:name})
} 
addInstant = dispatch => (instants , recording) =>{
    dispatch({type:'add_curret_instant' , payload:instants})
    if(recording){
        dispatch({type:'add_instant' , payload:instants})
    }
}
reset = dispatch =>()=>{
    dispatch({type:'reset'})
}

setHR = dispatch => (HR) =>{
    dispatch({type:"set_hr" , payload:HR})
    console.log(HR)
}

export const { Provider , Context } = createDataContext(
    trackReducer,
    { fetchWorkout , reset , createWorkout , startRecording , changeName , addInstant , stopRecording , setHR} ,
    {recording : false , datas : [] , currentInstant : null ,  name : ""  , list: [] , HR : 120}
)