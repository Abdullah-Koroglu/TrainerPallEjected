import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"
import Toast from 'react-native-root-toast';
const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_workout':
            return { ...state, temps: action.payload }
        case 'reset_temps':
            return {}
        default:
            return state;
    }
}

fetchTemp = dispatch => async () => {
    let data
    await trackerApi
        .post('/getUserTemplate')
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
        });
    dispatch({ type: 'fetch_workout', payload: data.data })
    return data.data
}
createTemp = dispatch => async (name, datas) => {
    let err
    await trackerApi.post('/saveUserTemplate', { name, datas })
        .then(() => {
            Toast.show('Temp has been saved.', {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                animation: true,
                backgroundColor: "#fff",
                textColor: "#000"
            })
            err = 1
        }).catch((e) => {
            console.log(e)
            err = 0
            })
return err
    }

deleteTemp = dispatch => async (id) => {
    let data
    var strLink = "/deleteTemplate/" + id;
    await trackerApi.post(strLink)
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
        });
    return data
}

resetTemps = dispatch => {
    return () => {
        dispatch({ type: 'reset_temps' })
    }
}

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTemp, createTemp, deleteTemp, resetTemps },
    { temps: [] }
)