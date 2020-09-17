import React from 'react';
import {
    StyleSheet, TouchableOpacity, Text, View, Image,Dimensions
} from 'react-native';
import { Icon, Card } from 'react-native-elements';

const window = Dimensions.get('window');

const IteminList = (props) => {
    return (
        <>
            {props.name ?
                <TouchableOpacity onPress={props.onPress} >
                    <Card borderRadius={15} containerStyle={{ padding: window.height*0.012, backgroundColor: "#efe9f2" , justifyContent:"center"  }}>
                        <View style={{ flexDirection: "row", paddingVertical: window.height*0.009 ,alignSelf:"center" }}>
                            <View style={styles.circleIcon}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../assets/img/unnamed.png')}
                                />
                            </View>
                            <View style={{ paddingLeft: window.height*0.061 }}>
                                <Text style={styles.itemName}>{props.name}</Text>
                                <Text style={styles.itemRSSI}>RSSI: {props.rssi}</Text>
                                <Text style={styles.itemID}>{props.id}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>{props.connected ? <Image
                                style={styles.tinyLogo}
                                source={require('../assets/img/tick.png')}
                            /> : <View></View>}</View>
                        </View>
                    </Card>
                </TouchableOpacity>
                : null}</>
    );
};

const styles = StyleSheet.create({
    itemName: {

    },
    itemRSSI: {

    },
    itemID: {

    },
    circleIcon: {
        width: window.height*0.031,
        height: window.height*0.031,
    },
    tinyLogo: {
        width: window.height*0.06,
        height: window.height*0.06,
    }
});

export default IteminList;
