import createDataContext from './createDataContext'
import trackerApi from "../api/tracker"
import { AsyncStorage , NativeEventEmitter,
    NativeModules, } from 'react-native';
import BleManager from 'react-native-ble-manager';


const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const authReducer = (state,action) =>{
    switch (action.type) {
        case 'add_error':
            return {...state , errorMessage:action.payload}
        case 'signin':
            return{errorMessage:'', logedin: true ,token : action.payload} 
        case 'clear_error':
            return{errorMessage:''}
        case 'signout':
            return {token : null , logedin :false, errorMessage: ''}
        default:
            state;
    }
}

loginViaStored = dispatch =>{
    // //------------------------------------------------------------------------
    // this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    // this.handleStopScan = this.handleStopScan.bind(this);
    // this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    // this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    // this.retrieveSaved = this.retrieveSaved.bind(this);

    // this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
    // this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
    // this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
    // this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    // // this.handlerSaved = bleManagerEmitter.addListener('retrieveSaved', this.retrieveSaved);
    // //------------------------------------------------------------

    return async() =>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            dispatch({type:'signin' , payload:token})
        }
    }
} 

signup = dispatch => async ({email, password})=>{
        try{
            const response = await trackerApi.post('/signup',{email,password})
            await AsyncStorage.setItem('token',response.data.token)
            dispatch({type:'signin' , payload:response.data.token})
        }catch(err){
            dispatch({type:'add_error' , payload:'Something went wrong  with sign up'})
            console.log(err.message)  
        
    } 
}

signin = dispatch =>{
    return async ({email, password})=>{
        try{
            const response = await trackerApi.post('/signin',{email,password})
            await AsyncStorage.setItem('token',response.data.token)
            dispatch({type:'signin' , payload:response.data.token})
            console.log(response.data.token)
        }catch(err){
            dispatch({type:'add_error' , payload:'Something went wrong with sign in'})
            console.log(err.message)  
        }
    } 
}

signout = dispatch =>{
    return async() =>{
        await AsyncStorage.removeItem('token')
        dispatch({type : 'signout' })
    }
}

clearError = dispatch =>{
    return()=>{
        dispatch({type:'clear_error'})
    }
}

// //--------------------------------------------------
// test = async(peripheral) =>{
//     if (peripheral) {
//       if (peripheral.connected) {
//         BleManager.disconnect(peripheral.id);
//       } else {
//         BleManager.connect(peripheral.id).then(async() => {
//           await AsyncStorage.setItem('savedItem', JSON.stringify(peripheral))
//           let peripherals = this.state.peripherals;
//           let p = peripherals.get(peripheral.id);
//           if (p) {
//             p.connected = true;
//             peripherals.set(peripheral.id, p);
//             this.setState({ peripherals });
//           }
//           console.log('Connected to ' + peripheral.id);
//           setTimeout(() => {
//             BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
//               console.log(peripheralInfo);
//               var service = '0000180D-0000-1000-8000-00805f9b34fb';
//               var bakeCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';
//               var crustCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';

//               setTimeout(() => {
//                 BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
//                   console.log('Started notification on ' + peripheral.id);
//                   this.props.isConnected=true;
//                   this.props.navigation.pop()
//                 }).catch((error) => {
//                   console.log('Notification error', error);
//                 });
//               }, 200);
//             });

//           }, 900);
//         }).catch((error) => {
//           console.log('Connection error', error);
//         });
//       }
//     }
//   }

//   handleDiscoverPeripheral = (peripheral) => {
//     var peripherals = this.state.peripherals;
//     console.log('Got ble peripheral', peripheral);
//     if (!peripheral.name) {
//       peripheral.name = 'NO NAME';
//     }
//     peripherals.set(peripheral.id, peripheral);
//     this.setState({ peripherals });
//     console.log(peripherals);
//   }

//   handleUpdateValueForCharacteristic = (data) => {
//     this.context.setHR(data.value[1])
//     // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
//   }

//   handleStopScan = () => {
//     console.log('Scan is stopped');
//     this.setState({ scanning: false });
//   }

// //-----------------------------------------------------

export const { Provider , Context} = createDataContext(
    authReducer,
    {signin, signup, signout,clearError , loginViaStored },
    {token : null, errorMessage:'' , logedin: false}
)