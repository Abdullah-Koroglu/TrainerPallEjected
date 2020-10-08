import React, { useContext, useEffect, Component, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Button, FlatList, TouchableOpacity, Dimensions, RefreshControl , Alert} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Context as WorkoutContext } from '../context/WorkoutContext'
import { CommonActions } from '@react-navigation/native';
import navigate from '../navigationRef'
const window = Dimensions.get('window');
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign , MaterialIcons } from '@expo/vector-icons';
import I18n from "../services/translation"


MyWorkoutsListScreen = (props) => {
    const { state, fetchWorkout, startRecording , deleteWorkout } = useContext(WorkoutContext)
    const [refreshing, setrefreshing] = useState(true)
    useEffect(() => {
        onRefresh()
        // fetchWorkout()
    }, [])

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout)
        })
    }
    const onRefresh = React.useCallback(async() => {
        setrefreshing(true)
        let datas = await fetchWorkout()
        console.log(datas);
        setrefreshing(!datas)
    }, [refreshing])

    function datele(date) {
        let newDate = new Date(date)
        return newDate
    }

    function handleDelete(id) {
        Alert.alert(
            "Do you want to delete this workout from history?","",
            [
                { text: "Keep it", style: 'cancel', onPress: () => { } },
                {
                    text: "Delete",
                    style: 'destructive',
                    onPress: () => {deleteWorkout(id).then((data)=>{console.log(data); data ?fetchWorkout():null})},
                },
            ]
        );
        return true;
    }


    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={styles.blogName}>You have no activity</Text>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: "#00d8d3", flex: 1 }}>
            <View style={styles.topFigure}>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={state.list?refreshing:true}
                        onRefresh={onRefresh} />
                }
            >
                <View style={{ paddingHorizontal: window.height * 0.021 }}>
                    <FlatList
                    ListEmptyComponent={!refreshing?_listEmptyComponent:null}
                        contentContainerStyle={{}}
                        data={state.list}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (<TouchableOpacity
                                style={{ paddingTop: window.height * 0.022, justifyContent: "center", }}
                                onPress={() => props.navigation.navigate('MyWorkoutDetail', { _id: item._id })
                                }>
                                <View style={{ backgroundColor: "#fff", borderRadius: window.height * 0.022, flexDirection: "column", justifyContent: "center", height: window.height / 11 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <MaterialCommunityIcons name="bike" size={45} color="#000" style={{ alignSelf: "center", flex: 0.2, paddingLeft: window.width * 0.04 }} />
                                        <View style={{ alignContent: "flex-start", flex: 0.93 }}>
                                            <Text style={{ fontSize: window.height * 0.028 }}>
                                                {item.name}
                                            </Text>
                                            {datele(item.date).getFullYear() !== 1970 ?
                                                <Text style={{ fontSize: 18 }}>{I18n.t('CreatedAt')}{datele(item.date).getDate()}/{datele(item.date).getMonth()+1}/{datele(item.date).getFullYear()} </Text>
                                                : null}
                                        </View>
                                        <TouchableOpacity onPress={() => handleDelete(item._id)} style={{ alignSelf: "center", paddingRight: window.height * 0.012, flex: 0.1 }}>
                                            <MaterialIcons name="delete" size={30} color="black" style={{ alignSelf: "center" }} />
                                        </TouchableOpacity></View>
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
    },
    blogName: {
        color:"white",
        paddingTop: window.height * 0.01,
        fontSize: window.height * 0.023,
        alignSelf: 'center',
        alignContent:"center",
    }
})
export default MyWorkoutsListScreen


