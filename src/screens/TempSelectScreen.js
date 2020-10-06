import React, { useContext, useEffect, Component, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Dimensions, RefreshControl, ScrollView } from 'react-native'
import { Context as TempContext } from '../context/TempContext'
const window = Dimensions.get('window');
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign , MaterialIcons } from '@expo/vector-icons';
import I18n from "../services/translation"


TempSelectScreen = (props) => {
    const { state, fetchTemp , deleteTemp } = useContext(TempContext)
    const [refreshing, setrefreshing] = useState(false)

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout)
        })
    }
    const onRefresh = React.useCallback(async() => {
        setrefreshing(true)
        let datas = await fetchTemp()
        console.log(datas);
        setrefreshing(!datas)
    }, [refreshing])

    useEffect(() => {
        onRefresh();
    }, [])

    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={styles.blogName}>You have no workout</Text>
            </View>
        )
    }
    function datele(date) {
        let newDate = new Date(date)
        return newDate
    }

    return (
        <View style={{ backgroundColor: "#00C5C0", flex: 1 }}>
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
                <FlatList
                    style={{ paddingHorizontal: window.height * 0.022 }}
                    data={state.temps}
                    ListEmptyComponent={!refreshing?_listEmptyComponent:null}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={{ paddingTop: window.height * 0.022, justifyContent: "center", }}
                                onPress={() => props.navigation.navigate('Index', { _id: item._id })
                                }>
                                <View style={{ backgroundColor: "#fff", borderRadius: window.height * 0.022, flexDirection: "column", justifyContent: "center", height: window.height / 11 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <MaterialCommunityIcons name="bike" size={45} color="#000" style={{ alignSelf:"center" ,flex: 0.2, paddingLeft: window.width * 0.04 }} />
                                        <View style={{alignContent:"flex-start", flex: 0.93 }}>
                                            <Text style={{ fontSize: window.height * 0.028 }}>
                                                {item.name}
                                            </Text>
                                            {datele(item.date).getFullYear() !== 1970 ?
                                            <Text style={{fontSize:18}}>{I18n.t('CreatedAt')}{datele(item.date).getDay()}/{datele(item.date).getMonth()}/{datele(item.date).getFullYear()} </Text> 
                                            : null}
                                        </View>
                                        <TouchableOpacity onPress={()=>deleteTemp(item._id)} style={{ alignSelf:"center",paddingRight: window.height * 0.012, flex: 0.1 }}>
                                        <MaterialIcons name="delete" size={30} color="black" style={{ alignSelf:"center" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                /></ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    blogName: {
        paddingTop: window.height * 0.01,
        fontSize: window.height * 0.023,
        alignSelf: 'center',
        color:"#fff",
        justifyContent:"center"
    }, topFigure: {
        height: window.height * 0.6,
        borderBottomLeftRadius: window.width,
        backgroundColor: "#00d8d3",
        position: "absolute",
        left: 0,
        width: window.width,
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
        fontSize: window.height * 0.026
    },
    cycleButton: {
        width: window.height * 0.068,
        height: window.height * 0.068,
        borderRadius: 1000,
        backgroundColor: '#b210ab',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCycleButton: {
        width: window.height * 0.078,
        height: window.height * 0.078,
        borderRadius: 1000,
        borderColor: '#b210ab',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }



})
export default TempSelectScreen
