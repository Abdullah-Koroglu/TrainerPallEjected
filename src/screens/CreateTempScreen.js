import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { AntDesign , MaterialIcons } from '@expo/vector-icons';
import { Transition, Transitioning } from "react-native-reanimated"
import { Context as TempContext } from "../context/TempContext"
import I18n from "../services/translation"


const transition = (
    <Transition.Together>
        <Transition.In type="scale" durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={10} />
    </Transition.Together>
)

CreateTempScreen = (props) => {
    const { createTemp } = useContext(TempContext)
    const [currentIndex, setcurrentIndex] = useState(null)
    const [min1, setMin] = useState(0)
    const [max1, setMax] = useState(0)
    const [time1, setTime] = useState(0)
    const [name, setName] = useState('')
    const [datas, setDatas] = useState([])
    // const [naber, setnaber] = useState([])
    let totalTime = 0;

    let naber = []


    // React.useLayoutEffect(() => {
    //     props.navigation.setOptions({
    //         headerRight: () => (
    //             <TouchableOpacity
    //               onPress={() => setCount(c => c + 1)}>
    //                 <Text style={{fontSize:23, color:"#fff" , marginRight:8}}>
    //                 {I18n.t('SAVEbtn')}
    //                 </Text>
    //             </TouchableOpacity>)
    //     });
    //   }, [props.navigation ]);

    const submit = () => {
        for (let index = 0; index < list.length; index++) {
            totalTime = totalTime + list[index].time
            naber.push({ "instants": { "sessionID": list[index].id, "minHR": list[index].min, "maxHR": list[index].max, "duration": totalTime * 1000 } })
            // setnaber([...naber, { "instants": { "sessionID": list[index].id, "minHR": list[index].min, "maxHR": list[index].max, "duration": totalTime * 1000 } }])            // naber.push({ "instants": { "sessionID": list[index].id, "minHR": list[index].min, "maxHR": list[index].max, "duration": totalTime * 1000 } })
        }
        setDatas(naber)
        // console.log("naber :", naber);
        return (naber)
    }

    let [list, setList] = useState([])

    const ref = React.useRef()

    async function gonder() {
        const newDatas = await submit()
        console.log("newDatas: ", newDatas);
        createTemp(name, newDatas)
    }

    function splicele(index) {
        console.log(index)
        index !== list.length + 1 ?
            list.splice(index - 1, 1) :
            list.pop()
        let newArray = list
        for (let index = 0; index < list.length; index++) {
            list[index].id = index + 1;
        }
        return newArray
    }

    function handleSave() {
        Alert.alert(
            "Do you want to save the workout?","",
            [
                { text: "Resume", style: 'cancel', onPress: () => { } },
                {
                    text: "Save",
                    style: 'destructive',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => {gonder()},
                },
            ]
        );
        return true;
    }

    return (
        <Transitioning.View
            forceInset={{ top: 'always' }}
            transition={transition}
            ref={ref}
            style={styles.background}>
            <TextInput
                style={styles.name}
                onChangeText={(text) => { setName(text) }}
                placeholder={I18n.t('name')}
                placeholderTextColor="#fff"
                maxLength={23}
            />
            <ScrollView style={{ margin: 37 }} >
                {list.map(({ id, min, max, time }, index) => {
                    return (
                        <View
                            style={styles.container}
                            key={id}>
                            <View>
                                <TouchableOpacity
                                    // onPress={()=>{setList(splicele(id)) ; console.log(list);}}
                                    onPress={() => {
                                        // let olsun = list.splice(id - 1,1)
                                        splicele(id)
                                        let newArray = [...list]
                                        setList(newArray)
                                        console.log(list);
                                    }}
                                >
                                    <AntDesign name="minuscircle" size={29} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.69 }} >
                                {currentIndex !== index ?
                                    <View style={{}}><Text style={{ fontSize: 28, color: "black" }}>
                                        {min}-{max} {I18n.t('bpm')}
                                    </Text>
                                        <Text style={{ marginLeft: 3, color: "#777" }} >
                                            {time} {time > 1 ? I18n.t('time') : I18n.t('time')}
                                        </Text>
                                    </View>
                                    :
                                    <View style={{ margin: 10 }}>
                                        <View style={styles.row}>
                                            <TextInput
                                                style={styles.Input}
                                                keyboardType='numeric'
                                                onChangeText={(text) => { setMin(parseInt(text)), list[id - 1].min = parseInt(text) }}
                                                placeholder=" min "
                                                maxLength={3}
                                            />
                                            <TextInput
                                                style={styles.Input}
                                                keyboardType='numeric'
                                                onChangeText={(text) => { setMax(parseInt(text)), list[id - 1].max = parseInt(text) }}
                                                placeholder=" max "
                                                maxLength={3}
                                            />
                                            <TextInput
                                                style={styles.Input}
                                                keyboardType='numeric'
                                                onChangeText={(text) => { setTime(parseInt(text)), list[id - 1].time = parseInt(text) }}
                                                placeholder={I18n.t('time')}
                                            />
                                        </View>
                                    </View>
                                }
                            </View>
                            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
                                ref.current.animateNextTransition()
                                setcurrentIndex(index === currentIndex ? null : index)
                            }}>
                                {index !== currentIndex ?
                                    <AntDesign name="downcircle" size={29} style={{ marginVertical: 23 }} color="black" /> :
                                    <AntDesign name="upcircle" size={29} color="black" />}
                            </TouchableOpacity>
                        </View>
                    )
                })}
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.tus, { margin: 17, backgroundColor: "#d2f9f8", flexDirection: "row" ,  width:"35%" , justifyContent: "center" }]} onPress={() => { handleSave() }}>
                        <MaterialIcons name="save" size={24} color="#999" style={{ alignSelf: "center", margin: 3 }} />
                        <Text style={{ fontSize: 23, marginBottom: 3, marginRight: 3 }}>{I18n.t('SAVEbtn')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tus, { margin: 17, backgroundColor: "#d2f9f8", flexDirection: "row" , width:"35%" , justifyContent: "center" }]} onPress={() => {
                        console.log(list);
                        let newArray = [...list, {
                            id: list.length !== 0 ? list[list.length - 1].id + 1 : 1,
                            max: 0,
                            min: 0,
                            time: 0
                        }]
                        setList(newArray)
                        console.log(list);
                    }}>
                        <AntDesign name="pluscircleo" size={24} color="#999" style={{ alignSelf: "center", margin: 3 }} />
                        <Text style={{ fontSize: 23, marginBottom: 3, marginRight: 3 }}>{I18n.t('AddSession')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Transitioning.View>
    )
}

const styles = StyleSheet.create({
    sigoutButton: {
        padding: 10,
        color: '#98ceb7',
        fontSize: 28,
        // alignSelf:'center'
    },
    background: {
        backgroundColor: "#00C5C0",
        flex: 1
    },
    Input: {
        fontSize: 23,
        backgroundColor: "white",
        borderRadius: 4,
        width: 65,
        textAlign: "center",
        flexDirection: "row"
    },
    row: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    container: {
        backgroundColor: "#d2f9f8",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 10,
    },
    tus: {
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 5
    },
    name: {
        backgroundColor: "#00d8d3",
        paddingHorizontal: 10,
        marginTop: 40,
    }




})

export default CreateTempScreen
