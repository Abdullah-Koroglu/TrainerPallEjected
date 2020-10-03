import React, { useContext, useEffect, Component, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Button, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Context as WorkoutContext } from '../context/WorkoutContext'
import { CommonActions } from '@react-navigation/native';
import navigate from '../navigationRef'
const window = Dimensions.get('window');
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


MyWorkoutsListScreen = (props) => {
    const { state, fetchWorkout, startRecording } = useContext(WorkoutContext)
    const [refreshing, setrefreshing] = useState(false)
    useEffect(() => {
        fetchWorkout();
    }, [])

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout)
        })
    }
    const onRefresh = React.useCallback(() => {
        setrefreshing(true)

        wait(2000).then(() => {
            setrefreshing(false);
            fetchWorkout()
        })
    }, [refreshing])

    function datele(date) {
        let newDate = new Date(date)
        // if(newDate.getFullYear()===1970){
        //     return 1
        // }else{
            return newDate
        // }

    }

    const deneme = React.useCallback(() => {
        startRecording()
    }
        //, console.log(state.recording) 
        , [state.recording])
    return (
        <View style={{ backgroundColor: "#00d8d3", flex: 1 }}>
            <View style={styles.topFigure}>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                }
            >
                <View style={{ paddingHorizontal: window.height * 0.021 }}>
                    <FlatList
                        contentContainerStyle={{}}
                        data={state.list}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={{ paddingTop: window.height * 0.022, justifyContent: "center", }}
                                    onPress={() =>
                                        props.navigation.navigate('MyWorkoutDetail', { _id: item._id })
                                    }><View style={{ backgroundColor: "#fff", borderRadius: window.height * 0.022, flexDirection: "column", justifyContent: "center", height: window.height / 11 }}>
                                        <View style={{ alignContent: "flex-start", flexDirection: "row", justifyContent: "center" }}>
                                            <MaterialCommunityIcons name="bike" size={45} color="#000" style={{ alignSelf: "center", flex: 0.2, paddingLeft: window.width * 0.04 }} />
                                            <Text style={{ fontSize: window.height * 0.028, flex: 0.87, alignSelf: "center" }}>
                                                {item.name}
                                            </Text>{datele(item.date).getFullYear() !== 1970 ?
                                                <Text style={{ fontSize: 18 }}>created at {datele(item.date).getDay()}/{datele(item.date).getMonth()}/{datele(item.date).getFullYear()} </Text>
                                                : null}
                                            <AntDesign name="right" size={24} color="black" style={{ alignSelf: "center", paddingTop: window.height * 0.011, flex: 0.1 }} />
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topFigure: {
        height: window.height * 0.6,
        borderBottomLeftRadius: window.width,
        backgroundColor: "#00C5C0",
        position: "absolute",
        left: 0,
        width: window.width,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
export default MyWorkoutsListScreen


