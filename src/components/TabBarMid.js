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
import {SimpleLineIcons} from '@expo/vector-icons'

export default class TabBarMid extends Component {
    constructor() {
        super()

        this.state = {
        }
    }




    render() {
        return (
            <View style={styles.View}>
                <View style={styles.Button} >
                    <SimpleLineIcons name="fire"  size={24} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View:{
        position:"absolute",
        alignItems:"center"
    },
    Button:{
        backgroundColor:'#000',
        alignItems:"center",
        justifyContent:"center",
        width:72,
        height:72,
        borderRadius:36,
        position:"absolute",
        top:-60,
        shadowColor:"#000",
        shadowRadius:5,
        shadowOpacity:0.7,
        borderWidth:3,
        borderColor:"#fff"
    }

});


