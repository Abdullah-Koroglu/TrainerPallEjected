import React, { Component , useEffect , useState , useContext}  from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  AppState,
  FlatList,
  Dimensions,
  SafeAreaView,
  Switch,AsyncStorage
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Context as WorkoutContext} from '../context/WorkoutContext'
import IteminList from '../components/IteminList';
import { Button } from 'react-native-paper';

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var peripherals =[];

const DeviceSelectScreen = (props) => {
  const {setHR} = useContext(WorkoutContext)
  const [scanning , setscanning] = useState(false)
  const [peripherals , setperipherals] = useState([])
  const [list , setlist] = useState(Array.from(peripherals))

    // var handleDiscoverPeripheral = handleDiscoverPeripheral.bind(this);
    // var handleStopScan = handleStopScan.bind(this);
    // var handleUpdateValueForCharacteristic = handleUpdateValueForCharacteristic.bind(this);
    // var handleDisconnectedPeripheral = handleDisconnectedPeripheral.bind(this);
    // var handleAppStateChange = handleAppStateChange.bind(this);

  
   handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral );
   handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
   handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
   handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

  useEffect(() => {
    retrieveSaved();
    // setscanning(false);
    AppState.addEventListener('change', handleAppStateChange);
    BleManager.start({showAlert: true});

    handleDiscoverPeripheral = handleDiscoverPeripheral.bind()

    
    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log(result);
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
      });
    }
  });

  retrieveSaved  =async() =>{
    const savedItem = await AsyncStorage.getItem('savedItem')
    if(!peripherals.includes(JSON.parse(savedItem).id))
    peripherals.push(JSON.parse(savedItem).id,JSON.parse(savedItem));
    // const list = Array.from(peripherals);
    // setlist(peripherals)
    // console.log(list);
    // handleDiscoverPeripheral(JSON.parse(savedItem))
    // test(savedItem)
    // const retrievedItem =  await AsyncStorage.getItem("naber");
    // console.log(JSON.parse(retrievedItem));
  }
 
  handleAppStateChange = (nextAppState)=> {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }

  handleDisconnectedPeripheral=(data)=>{
    // let peripherals = state.peripherals;
    console.log(data)
    let peripheral = data.peripheral
    if (peripheral) {
      peripheral.connected = false;
      peripherals.push(peripheral.id, peripheral);
      setperipherals(peripherals)
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic=(data)=> {
    // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
      setHR(data.value[1])
  }

  handleStopScan=()=> {
    console.log('Scan is stopped');
    setscanning(false)
  }

  startScan=()=> {
    if (scanning === false) {
      //this.setState({peripherals: new Map()});
      BleManager.scan([], 5, true).then(() => {
        console.log('Scanning...');
        setscanning(true);
      });
    }
  }

  retrieveConnected = () =>{
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.push(peripheral.id, peripheral);
      }
    });
  }

  handleDiscoverPeripheral = (peripheral) =>{
    if (peripheral.name ===  null) {
      peripheral.name = 'NO NAME';
    }
    if(!peripherals.includes(peripheral.id))
        peripherals.push(peripheral.id, peripheral);
    // console.log('Got ble peripheral', peripheral);
    // const list = Array.from(peripherals);
    // setlist(list)
    console.log(peripherals)
    // setperipherals(peripherals)
    }

    


  test =(peripheral) => {
        BleManager.connect(peripheral.id).then(async() => {
          //  let p = peripheral.id
          // if (p) {
          //   p.connected = true;
          //   // peripherals.set(peripheral.id, p);
          // }
          await AsyncStorage.setItem('savedItem',JSON.stringify(peripheral))
          console.log('Connected to ' + peripheral.name);
          setTimeout(() => {
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              var service = '0000180D-0000-1000-8000-00805f9b34fb';
              var bakeCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';
              var crustCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';

              setTimeout(() => {
                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                  console.log('Started notification on ' + peripheral.id);
                  props.navigation.pop()
                  }).catch((error) => {
                  console.log('Notification error', error);
                });
              }, 200);
            });

          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
    }
    

    const toggleSwitch = () => startScan();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{ margin: 10 }}>
            <Button title="naber" onPress={() => startScan()} />
          </View>
          <Text>{HR}</Text>
          <View style={{ margin: 10 }}>
            <Button title="Retrieve connected peripherals" onPress={() => this.retrieveConnected()} />
          </View>

          <ScrollView style={styles.scroll}>
            {(list.length == 0) &&
              <View style={{ flex: 1, margin: 20 }}>
                <Text style={{ textAlign: 'center' }}>No peripherals</Text>
              </View>
            }
            <FlatList
              data={peripherals}
              renderItem={({ item }) => 
              <IteminList id = {item.id} rssi = {item.rssi} name = {item.name} onPress={() =>{test(item)}
                } connected={item.connected}/>
           }              keyExtractor={item => item.id}
            />

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    //backgroundColor: '#f0f0f0',
    margin: window.height*0.012,
  },
  row: {
    margin: window.height*0.0122
  },
  itemName:{

  },
  itemRSSI:{

  },
  itemID:{

  }  
});


export default DeviceSelectScreen