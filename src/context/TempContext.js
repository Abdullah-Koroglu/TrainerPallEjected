import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"

const trackReducer = (state , action) =>{
    switch (action.type) {
        case 'fetch_workout':
            return{ ... state , temps : action.payload}
        default:
            return state;
    }
}

fetchTemp = dispatch => async() =>{
    let data
    await trackerApi
        .post('/getUserTemplate')
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
          });
    dispatch({type:'fetch_workout' , payload:data.data})
}
createTemp = dispatch => async (name , datas) =>{
    await trackerApi.post('/saveUserTemplate',{name , datas})
}

deleteTemp = dispatch => async (id) =>{
    var strLink = "/deleteTemplate/" + id;
    await trackerApi.post(strLink).then(fetchTemp())
    
}

export const { Provider , Context } = createDataContext(
    trackReducer,
    { fetchTemp , createTemp , deleteTemp } ,
    {temps :[]}
)