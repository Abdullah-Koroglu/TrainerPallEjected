import React, { useContext, useEffect, Component, useState } from 'react'
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
    Switch,
    Image
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { Context as TempContext } from '../context/TempContext'
import { Context as WorkoutContext } from '../context/WorkoutContext'
import BleManager from 'react-native-ble-manager';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-root-toast';

const window = Dimensions.get('window');
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


IndexScreen = (props) => { // const instants = [];
    const _id = props.route.params._id
    const [deger, setdeger] = useState([0])
    const [deger1, setdeger1] = useState([0])
    const [label, setlabel] = useState([0])
    const [HRs, setHRs] = useState([])
    const [HR, setHR] = useState(0)
    let tutmac = []
    let tutmac1 = []
    const myHRs = []
    const [clientHRs, setclientHRs] = useState([0])
    const [maxHR, setmaxHR] = useState(0)
    const [minHR, setminHR] = useState(0)
    const [endofworkot, setendofworkot] = useState(10)
    let rpm = 120;
    const [heartAttack, setheartAttack] = useState(false)
    const [detrain, setdetrain] = useState(false)
    const [session, setsession] = useState(1)
    const [time, settime] = useState(0)
    let sayac = 0;
    // let time = 0;
    const [maxHeartRate , setmaxHeartRate] = useState()
    const [minHeartRate , setminHeartRate] = useState()
    var interval;
    const [durations, setdurations] = useState([0])
    const [scanning, setscanning] = useState()
    const [peripherals, setperipherals] = useState([])
    const [sirla, setsirla] = useState(false)

    const { state } = useContext(TempContext)
    const { state: { recording, datas, HRa },
        stopRecording,
        startRecording,
        addInstant,
        createWorkout
    } = useContext(WorkoutContext)
    const tempDatas = state.temps.find(t => t._id === _id)

    useEffect(() => {
        datalarial()
        setendofworkot(durations[durations.length - 1])
        durations.pop()
        console.log(durations, endofworkot);
    }, [])

    datalarial = () => {
        for (let a of tempDatas.datas) {
            durations.push(a.instants.duration / 1000)
            tutukmax = a.instants.maxHR
            tutukmin = a.instants.minHR
            HRs.push({ tutukmax, tutukmin })
            for (let i = 0; i < a.instants.duration / 1000; i++) {
                tutmac.push(a.instants.maxHR)
                tutmac1.push(a.instants.minHR)
            }
        }
        setdeger(tutmac)
        setdeger1(tutmac1)
    }


    thingsinInterval = () => {
        setHR(HRa)
        var instants = { HR, rpm, time }
        addInstant({
            instants: instants
        }, true)
        if (endofworkot === time) {
            setsirla(true)
            let toast = Toast.show('You have done a realy great job!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                animation: true,
                backgroundColor: "#fff",
                textColor: "#000"
            });

        }

        if (durations.includes(time)) {
            // sayac++;
            setsession(session + 1)
            setmaxHR(HRs[session - 1].tutukmax)
            setmaxHeartRate(HRs[session - 1].tutukmax)
            setminHR(HRs[session - 1].tutukmin)
            setminHeartRate(HRs[session - 1].tutukmin)
            console.log(session, maxHR, minHR, minHeartRate);
        }


        maxHeartRate < HR ? setheartAttack(true) : setheartAttack(false)
        minHeartRate > HR ? setdetrain(true) : setdetrain(false)

        console.log( maxHeartRate , HR , heartAttack ,detrain)


        if (time % 10 == 0) {
            myHRs.push(HR)
            setclientHRs(myHRs)
        }
        // time++;
        // setHR(time)
        // console.log(HR);
        settime(time + 1)
        // console.log(time , time);
    }
    // let HR = 0;
    //   let endofworkot =10
    intervallama = () => {
        // time = time
        myInterval = setInterval(() => {
            thingsinInterval();
            //     HR = HRa
            // // setHR(HRa)
            // var instants = {HR,rpm,time}
            //     addInstant({
            //         instants: instants
            //     }, true)
            //     if (endofworkot === time) {
            //         setsirla(true)
            //         let toast = Toast.show('You have done a realy great job!', {
            //             duration: Toast.durations.LONG,
            //             position: Toast.positions.CENTER,
            //             animation: true,
            //             backgroundColor:"#fff",
            //             textColor:"#000"
            //         });

            //     }

            //     if (durations.includes(time)) {
            //         sayac++;
            //         setsession(sayac)
            //         setmaxHR(HRs[sayac - 1].tutukmax)
            //         maxHeartRate = HRs[sayac - 1].tutukmax
            //         setminHR(HRs[sayac - 1].tutukmin)
            //         minHeartRate = HRs[sayac - 1].tutukmin
            //     }

            //     maxHeartRate < HR ? setheartAttack(true) : setheartAttack(false)

            //     minHeartRate > HR ? setdetrain(true) : setdetrain(false)



            //     if (time % 10 == 0) {
            //         myHRs.push(HR)
            //         setclientHRs(myHRs)
            //     }
            //     // setHR(time)
            //     // console.log(HR);
            //     time++;
            //     settime(time)
            //     console.log(time , time  , HR);


        }, 1000)
    }

    const [baslatilmis, setbaslatilmis] = useState(0)
    startWorkout = React.useEffect(() => {
        if (recording === true) {
            intervallama()
            setbaslatilmis(1)
        }
        else {
            if (baslatilmis === 1)
                clearInterval(myInterval)
        }
    }, [recording])


    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    return (
        <View style={{
            paddingTop: SCREEN_WIDTH / 10
        }}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <Text style={styles.blogName}>
                            {maxHR} </Text>
                    </View>
                    <View style={[styles.row, { justifyContent: "center", height: window.width * 0.4 }]}>
                        {minHeartRate>HRa? <View><Image
                            style={[styles.tinyLogo, { width: window.width * 0.2, left: window.width * 0.25, bottom: 0, position: "absolute" }]}
                            source={require("../assets/img/up-arrow.png")}
                        /><View style={{ width: window.height * 0.061 }}></View>
                        </View>

                            : null
                        }
                        <Image
                            style={[styles.tinyLogo, { position: "absolute" }]}
                            source={require("../assets/img/heart.png")}
                        />
                        <Text style={{ position: "absolute", fontSize: window.height * 0.068, paddingBottom: 11 }}>
                            {HRa}
                        </Text>
                        {maxHeartRate<HRa ?
                            <View><View style={{ width: window.height * 0.061 }}></View><Image
                                style={[styles.tinyLogo, { width: window.width * 0.1, right: window.width * 0.25, bottom: 0, position: "absolute" }]}
                                source={require("../assets/img/down-arrow.png")}
                            /></View> : null}
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.blogName}>
                            {minHR} </Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Progress.Bar progress={sirla === true ? 1 : (session - 2) / (durations.length)} width={window.width * 0.93} animated={false} color={"#694fad"} />
            </View>
            {recording ?
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => { stopRecording() }}>
                        <View style={styles.cycleButton}>
                            <Feather name='pause' size={window.height * 0.04} color='white' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        stopRecording();
                        props.navigation.navigate('SaveWorkout')
                    }}>
                        <View style={styles.emptyCycleButton}>
                            <Text style={{ color: '#694fad' }}>
                                SAVE
                    </Text>
                        </View>
                    </TouchableOpacity>
                </View> : <View style={styles.row}>
                    <TouchableOpacity onPress={() => {
                        // HR ==! 0 ?
                        startRecording()
                        // :Toast.show('You should connect a HR band first.', {
                        //         duration: Toast.durations.LONG,
                        //         position: Toast.positions.CENTER,
                        //         animation: true,
                        //         backgroundColor:"#fff",
                        //         textColor:"#000"
                        //     }) 
                    }}>
                        <View style={styles.cycleButton}>
                            <Feather name='play' size={window.height * 0.04} color='white'
                                style={styles.playButton} />
                        </View>
                    </TouchableOpacity>
                </View>}
            <View style={styles.row, {
                justifyContent: 'center'
            }}>
                <Text style={{ fontSize: window.height * 0.021 }}></Text>
                <Text style={styles.blogName}>
                    Duration    {Math.floor(time / 60) < 10 ? 0 : null}{Math.floor(time / 60)} : {time % 60 < 10 ? 0 : null}{time % 60}
                </Text>
            </View>
            {/* <View>
            {HR<80?<Text>çok</Text>:<Text>az</Text>}
        </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    blogName: {
        paddingTop: window.height * 0.01,
        fontSize: window.height * 0.025,
        alignSelf: 'center'
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: window.height * 0.012,
        justifyContent: 'space-around'
    },
    column: {
        alignItems: 'center',
        flexDirection: 'column',
        margin: window.height * 0.012,
        justifyContent: 'space-around'
    },
    tinyLogo: {
        width: window.width * 0.4,
        height: null,
        // flex:1,
        aspectRatio: 1,
        resizeMode: "contain"
    },
    cycleButton: {
        width: window.height * 0.088,
        height: window.height * 0.088,
        borderRadius: 1000,
        backgroundColor: '#694fad',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCycleButton: {
        width: window.height * 0.088,
        height: window.height * 0.088,
        borderRadius: 1000,
        borderColor: '#694fad',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    absolute: {
        position: 'absolute',
        top: window.height * 0.1,
        left: window.height * -0.012
    },
    playButton: {
        marginLeft: window.height * 0.0074
    }

})
export default IndexScreen