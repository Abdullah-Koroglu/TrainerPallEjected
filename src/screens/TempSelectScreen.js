import React, { useContext, useEffect, Component, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { Context as TempContext } from '../context/TempContext'
const window = Dimensions.get('window');
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

TempSelectScreen = (props) => {
    const { state, fetchTemp } = useContext(TempContext)
    useEffect(() => {
        fetchTemp();
    }, [])

    _listEmptyComponent = () => {
        return (
            <View>
            </View>
        )
    }


    return (
        <View style={{ backgroundColor: "#694fad", flex: 1 }}>
            <View style={styles.topFigure}>
            </View>
            <FlatList
                style={{ paddingHorizontal: window.height * 0.022 }}
                data={state.temps}
                ListEmptyComponent={_listEmptyComponent}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{ paddingTop: window.height * 0.022, justifyContent: "center", }}
                            onPress={() => props.navigation.navigate('Index', { _id: item._id })
                            }>
                            <View style={{ backgroundColor: "#fff", borderRadius: window.height * 0.022, flexDirection: "column", justifyContent: "center", height: window.height / 11 }}>
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <MaterialCommunityIcons name="bike" size={45} color="#000" style={{ flex: 0.2, paddingLeft: window.width * 0.04 }} />
                                    <Text style={{ fontSize: window.height * 0.028, flex: 0.7 }}>
                                        {item.name}
                                    </Text>
                                    <AntDesign name="right" size={24} color="black" style={{ paddingTop: window.height * 0.012, flex: 0.1 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

"#694fad"
const styles = StyleSheet.create({
    blogName: {
        paddingTop: window.height * 0.01,
        fontSize: window.height * 0.023,
        alignSelf: 'center'
    }, topFigure: {
        height: window.height * 0.6,
        borderBottomLeftRadius: window.width,
        backgroundColor: "#8b6fcf",
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
