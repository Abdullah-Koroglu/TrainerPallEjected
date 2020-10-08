import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'add_curret_instant':
            return { ...state, currentInstant: action.payload }
        case 'fetch_workout':
            return { ...state, list: action.payload }
        case 'start_recording':
            return { ...state, recording: true }
        case 'stop_recording':
            return { ...state, recording: false }
        case 'change_name':
            return { ...state, name: action.payload }
        case 'add_instant':
            return { ...state, datas: [...state.datas, action.payload] }
        case 'reset':
            return { ...state, name: '', datas: [], HRa: 0, currentInstant: null }
        case 'set_hr':
            return { ...state, HRa: action.payload }
        case 'reset_workouts':
            return {}
        default:
            return state;
    }
}
fetchWorkout = dispatch => async () => {
    let data
    await trackerApi
        .post('/getUserWorkouts')
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
        });
    dispatch({ type: 'fetch_workout', payload: data.data })
    return data.data
}
createWorkout = dispatch => async (name, datas) => {
    await trackerApi.post('/saveUserWorkout', { name, datas })
    console.log("createWorkout")
}

deleteWorkout = dispatch => async (id) => {
    let data
    var strLink = "/deleteWorkout/" + id;
    await trackerApi.post(strLink)
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
        });
    return data
}

startRecording = dispatch => () => {
    dispatch({ type: 'start_recording' });
}
stopRecording = dispatch => () => {
    dispatch({ type: 'stop_recording' });
}
changeName = dispatch => (name) => {
    dispatch({ type: 'change_name', payload: name })
}
addInstant = dispatch => (instants, recording) => {
    dispatch({ type: 'add_curret_instant', payload: instants })
    if (recording) {
        dispatch({ type: 'add_instant', payload: instants })
    }
}
reset = dispatch => () => {
    dispatch({ type: 'reset' })
}

setHR = dispatch => (HR) => {
    dispatch({ type: "set_hr", payload: HR })
    // console.log("HR :" + HR)
}

resetWorkouts = dispatch => {
    return () => {
        dispatch({ type: 'reset_workouts' })
    }
}

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchWorkout, deleteWorkout, reset, createWorkout, startRecording, changeName, addInstant, stopRecording, setHR, resetWorkouts },
    { recording: false, datas: [], currentInstant: null, name: "", list: [], HRa: 0 }
)