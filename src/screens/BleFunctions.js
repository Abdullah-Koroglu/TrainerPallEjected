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
    SafeAreaView, AsyncStorage
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Context as WorkoutContext } from '../context/WorkoutContext'
import Toast from 'react-native-root-toast'
const window = Dimensions.get('window');
import I18n from "../services/translation"


const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class BleFunctions extends Component {
    static contextType = WorkoutContext;
    constructor() {
        super()

        this.state = {
            scanning: false,
            peripherals: new Map(),
            appState: ''
        }

        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        // this.context.setHR(10)
        AppState.addEventListener('change', this.handleAppStateChange);

        BleManager.start({ showAlert: false });

        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);



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

    handleAppStateChange(nextAppState) {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
                console.log('Connected peripherals: ' + peripheralsArray.length);
            });
        }
        this.setState({ appState: nextAppState });
    }

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
            //this.setState({peripherals: new Map()});
            BleManager.scan([], 3, true).then((results) => {
                console.log('Scanning...');
                this.setState({ scanning: true });
            });
        }
    }

    retrieveConnected() {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
            }
            console.log(results);
            var peripherals = this.state.peripherals;
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                this.setState({ peripherals });
            }
        });
    }

    handleDiscoverPeripheral(peripheral) {
        var peripherals = this.state.peripherals;
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
    }

    test(peripheral) {
        if (peripheral) {
            if (peripheral.connected) {
                BleManager.disconnect(peripheral.id);
            } else {
                BleManager.connect(peripheral.id).then(async() => {
                    await AsyncStorage.setItem('savedItem', JSON.stringify(peripheral))
                    let peripherals = this.state.peripherals;
                    let p = peripherals.get(peripheral.id);
                    peripheral.connected = true
                    Toast.show(I18n.t('connected'), {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.CENTER,
                        animation: true,
                        backgroundColor: "#fff",
                        textColor: "#000"
                    });
                    if (p) {
                        p.connected = true;
                        peripherals.set(peripheral.id, p);
                        this.setState({ peripherals });
                    }
                    console.log('Connected to ' + peripheral.id);


                    setTimeout(() => {
                        BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                            console.log(peripheralInfo);
                            var service = '0000180D-0000-1000-8000-00805f9b34fb';
                            var bakeCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';
                            var crustCharacteristic = '00002A37-0000-1000-8000-00805f9b34fb';

                            setTimeout(() => {
                                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                                    console.log('Started notification on ' + peripheral.id);
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


    testi = () => {
        console.log("testi");
    }




    render() {
        return null
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

const ble = new BleFunctions();
export { ble };
