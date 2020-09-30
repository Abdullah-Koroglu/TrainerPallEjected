import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Transition, Transitioning } from "react-native-reanimated"
import { Context as TempContext } from "../context/TempContext"

const transition = (
    <Transition.Together>
        <Transition.In type="scale" durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={10} />
    </Transition.Together>
)

CreateTempScreen = () => {
    const { createTemp } = useContext(TempContext)
    const [currentIndex, setcurrentIndex] = useState(null)
    const [min1, setMin] = useState(0)
    const [max1, setMax] = useState(0)
    const [time1, setTime] = useState(0)
    const [name, setName] = useState('')
    const [datas, setDatas] = useState([])
    let naber = [];
    let totalTime = 0;

    const submit = async () => {
        for (let index = 0; index < list.length; index++) {
            totalTime = totalTime + list[index].time
            naber.push({ "instants": { "sessionID": list[index].id, "minHR": list[index].min, "maxHR": list[index].max, "duration": totalTime * 1000 } })
        }
        setDatas(naber)
        return (naber)
    }

    let [list, setList] = useState([
    ])

    const ref = React.useRef()

    async function gonder() {
        const newDatas = await submit()
        console.log(newDatas)
        createTemp(name, newDatas)
    }

    return (
        <Transitioning.View
            forceInset={{ top: 'always' }}
            transition={transition}
            ref={ref}
            style={styles.background}>
            <ScrollView style={{ margin: 37 }} >
                <TextInput
                    style={styles.Input}
                    onChangeText={(text) => { setName(text) }}
                    placeholder="name"
                />
                {list.map(({ id, min, max, time }, index) => {
                    return (
                        <View
                            style={styles.container}
                            key={id}>
                            <View style={{ flex: 0.5 }} >
                                {currentIndex !== index ?
                                    <View style={{}}><Text style={{ fontSize: 28 , color: "white" }}>
                                        {min}-{max} bpm
                                    </Text>
                                        <Text style={{ marginLeft: 3  ,  color: "#aaa"}} >
                                            {time} {time > 1 ? "seconds" : "second"}
                                        </Text>
                                    </View>
                                    :
                                    <View style={{ margin: 10 }}>
                                        <View style={styles.row}>
                                            <TextInput
                                                style={styles.Input}
                                                keyboardType='numeric'
                                                onChangeText={(text) => { setMin(parseInt(text)), list[id - 1].min = parseInt(text) }}
                                                placeholder="min "
                                                maxLength={3}
                                            />
                                            <TextInput
                                                style={styles.Input}
                                                keyboardType='numeric'
                                                onChangeText={(text) => { setMax(parseInt(text)), list[id - 1].max = parseInt(text) }}
                                                placeholder="max "
                                                maxLength={3}
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}>
                                            <TextInput
                                                style={styles.Input}
                                                keyboardType='numeric'
                                                onChangeText={(text) => { setTime(parseInt(text)), list[id - 1].time = parseInt(text) }}
                                                placeholder="time"
                                            />
                                            {/* <TouchableOpacity
                                                title="naber"
                                                style={styles.tus}
                                                onPress={() => { max = max1, min = min1, time = time1, console.log(list) }}>
                                                <Text style={{ fontSize: 23 }} >
                                                    
                                                </Text>
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>
                                }
                            </View>
                            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {
                                ref.current.animateNextTransition()
                                setcurrentIndex(index === currentIndex ? null : index)
                            }}>
                                {index !== currentIndex ?
                                    <AntDesign name="downcircle" size={32} style={{ marginVertical: 23 }} color="black" /> :
                                    <AntDesign name="upcircle" size={32} color="black" />}
                            </TouchableOpacity>
                        </View>
                    )
                })}
                <TouchableOpacity style={[styles.tus, { margin: 17 , backgroundColor:"#463c8a" }]} onPress={() => {
                    let newArray = [...list, {
                        id: list.length !== 0 ? list[list.length - 1].id + 1 : 1,
                        max: 0,
                        min: 0,
                        time: 0
                    }]
                    setList(newArray)
                    //  ,console.log(newArray);
                }}>
                    <Text style={{ fontSize: 23 , color:"white" }}>add session</Text>

                </TouchableOpacity>
                <Button title="submit" onPress={() => gonder()}></Button>
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
        backgroundColor: "#694fad",
        flex: 1
    },
    Input: {
        fontSize: 23,
        backgroundColor: "white",
        borderRadius: 4
    },
    row: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch"
    },
    container: {
        backgroundColor: "#463c8a",
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




})

export default CreateTempScreen
