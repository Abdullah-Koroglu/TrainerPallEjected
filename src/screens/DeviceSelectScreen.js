import React, { Component , useEffect , useState , useContext}  from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ScrollView,
  AppState,
  FlatList,
  Dimensions,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Switch
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Context as WorkoutContext} from '../context/WorkoutContext'
import IteminList from '../components/IteminList';

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var peripherals =[];

const DeviceSelectScreen = (props) => {
  const {setHR} = useContext(WorkoutContext)
  const [scanning , setscanning] = useState(false)
  const [peripherals , setperipherals] = useState([])
  
  var handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral );
  var handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
  var handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
  var handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

  useEffect(() => {
    // setscanning(false);
    AppState.addEventListener('change', handleAppStateChange);
    BleManager.start({showAlert: false});

    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
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
    const list = Array.from(peripherals);
    console.log(list)
    }


  test =(peripheral) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          //  let p = peripheral.id
          // if (p) {
          //   p.connected = true;
          //   // peripherals.set(peripheral.id, p);
          // }
          console.log('Connected to ' + peripheral.name);
          setTimeout(() => {
            /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/
            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
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
    }
  }

    const list = Array.from(peripherals);
    const toggleSwitch = () => startScan();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{margin: 10 , flexDirection:"row" , justifyContent:"space-between", padding:14}}>
            {/* <Button title="navigate" onPress={() => {this.props.navigation.pop()} } /> */}
            <Text style={{fontSize:22 , fontWeight:"bold"}}>Toggle for Scanning</Text>
            <Switch
        trackColor={{ false: "#eeeeee", true: "#749f9c" }}
        thumbColor={scanning ? "#317873" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={scanning}
      />
      {/* <Button title="Retrieve connected peripherals" onPress={() => this.retrieveConnected() } /> */}
          </View>
          <ScrollView style={styles.scroll}>
            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            }
            <FlatList
              data={list}
              renderItem={({ item }) => 
                <IteminList id = {item.id} rssi = {item.rssi} name = {item.name} onPress={() => test(item)} connected={item.connected}/>
             }
              keyExtractor={item => item.id}
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
    margin: 10,
  },
  row: {
    margin: 10
  },
  itemName:{

  },
  itemRSSI:{

  },
  itemID:{

  }  
});


export default DeviceSelectScreen