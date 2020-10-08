import React, { Component } from 'react';
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
  Switch, AsyncStorage
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Context as WorkoutContext } from '../context/WorkoutContext'
import IteminList from '../components/IteminList';
import { ble } from './BleFunctions'
import I18n from "../services/translation"
import BluetoothStateManager from 'react-native-bluetooth-state-manager';




const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class ExampleScreen extends Component {
  static contextType = WorkoutContext;

  constructor() {
    super()

    this.state = {
      scanning: false,
      peripherals: new Map(),
      appState: '',
      HR: 10,
      list: []
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.retrieveSaved = this.retrieveSaved.bind(this);
  }

  componentDidMount() {
    // const context = this.context;
    // this.setState({ HR: context.state.HR });
    this.retrieveSaved();

    // console.log(this);

    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({ showAlert: false });

    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);
    this.handlerSaved = bleManagerEmitter.addListener('retrieveSaved', this.retrieveSaved);



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

  }

  // handleAppStateChange(nextAppState) {
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log('App has come to the foreground!')
  //     BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
  //       console.log('Connected peripherals: ' + peripheralsArray.length);
  //     });
  //   }
  //   this.setState({ appState: nextAppState });
  // }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals });
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data) {
    this.context.setHR(data.value[1])
    // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({ peripherals: new Map() });
      BleManager.scan([], 15, true).then((results) => {
        console.log('Scanning...');
        this.setState({ scanning: true });
      });
    }
  }

  // retrieveConnected() {
  //   BleManager.getConnectedPeripherals([]).then((results) => {
  //     if (results.length == 0) {
  //       console.log('No connected peripherals')
  //     }
  //     console.log(results);
  //     var peripherals = this.state.peripherals;
  //     for (var i = 0; i < results.length; i++) {
  //       var peripheral = results[i];
  //       peripheral.connected = true;
  //       peripherals.set(peripheral.id, peripheral);
  //       this.setState({ peripherals });
  //     }
  //   });
  // }

  handleDiscoverPeripheral(peripheral) {
    var peripherals = this.state.peripherals;
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    this.setState({ peripherals });
    console.log(peripherals);
  }

  retrieveSaved = async () => {
    var peripherals = this.state.peripherals;
    const savedItem = await AsyncStorage.getItem('savedItem')
    // console.log(JSON.parse(savedItem).id);
    // if (!peripherals.includes(JSON.parse(savedItem).id))
    if (JSON.parse(savedItem) !== null) {
      JSON.parse(savedItem).connected = false
      peripherals.set(JSON.parse(savedItem).id, JSON.parse(savedItem));
      this.setState({ peripherals });
    }

    // this.list.push(peripherals)
    // peripherals.push(JSON.parse(savedItem).id,JSON.parse(savedItem));
  }

  // test = async(peripheral) =>{
  //   if (peripheral) {
  //     if (peripheral.connected) {
  //       BleManager.disconnect(peripheral.id);
  //     } else {
  //       BleManager.connect(peripheral.id).then(async() => {
  //         await AsyncStorage.setItem('savedItem', JSON.stringify(peripheral))
  //         let peripherals = this.state.peripherals;
  //         let p = peripherals.get(peripheral.id);
  //         if (p) {
  //           p.connected = true;
  //           peripherals.set(peripheral.id, p);
  //           this.setState({ peripherals });
  //         }
  //         console.log('Connected to ' + peripheral.id);
  //         setTimeout(() => {
  //           BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
  //             console.log(peripheralInfo);
  //             var service = '0000180D-0000-1000-8000-00805f9b34fb';
  //             var bakeCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';
  //             var crustCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';

  //             setTimeout(() => {
  //               BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
  //                 console.log('Started notification on ' + peripheral.id);
  //                 this.props.isConnected=true;
  //                 this.props.navigation.pop()
  //               }).catch((error) => {
  //                 console.log('Notification error', error);
  //               });
  //             }, 200);
  //           });

  //         }, 900);
  //       }).catch((error) => {
  //         console.log('Connection error', error);
  //       });
  //     }
  //   }
  // }

  // renderItem(item) {
  //   const color = item.connected ? 'green' : '#fff';
  //   return (
  //     <TouchableHighlight onPress={() => this.test(item)}>
  //       <View style={[styles.row, { backgroundColor: color }]}>
  //         <Text style={{ fontSize: 12, textAlign: 'center', color: '#333333', padding: 10 }}>{item.name}</Text>
  //         <Text style={{ fontSize: 10, textAlign: 'center', color: '#333333', padding: 2 }}>RSSI: {item.rssi}</Text>
  //         <Text style={{ fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20 }}>{item.id}</Text>
  //       </View>
  //     </TouchableHighlight>
  //   );
  // }

  getState = () => {
    BluetoothStateManager.getState().then(bluetoothState => {
      switch (bluetoothState) {
        case 'Unknown':
          console.log("a");
        case 'Resetting':
          console.log("q");
        case 'Unsupported':
          console.log("w");
        case 'Unauthorized':
          console.log(3);
        case 'PoweredOff':
          BluetoothStateManager.enable().then(setTimeout(()=>{ this.startScan() }, 300))
        case 'PoweredOn':
          if (this.state.scanning !== true) {
            this.startScan()
          }
        default:
          break;
      }
    });
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    // const btnScanTitle = 'Scan Bluetooth (' + (this.state.scanning ? 'on' : 'off') + ')';
    // const { HR } = this.context;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: window.height * 0.028, fontWeight: "bold" }}>{I18n.t('Toggle')}</Text>
            <Switch
              trackColor={{ false: "#eeeeee", true: "#749f9c" }}
              thumbColor={this.state.scanning ? "#317873" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => { this.getState() }
              }
              value={this.state.scanning}
            />
          </View>
          <FlatList
            data={list}
            renderItem={({ item }) =>
              <IteminList id={item.id} rssi={item.rssi} name={item.name} onPress={() => { ble.test(item) }} connected={item.connected} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );

  }
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
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});