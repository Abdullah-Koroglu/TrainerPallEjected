import React from 'react';
import {
    StyleSheet, TouchableOpacity, Text, View , Image
} from 'react-native';
import { Icon, Card } from 'react-native-elements';


const IteminList = (props) => {
    return (
        <>
        {props.name?
            <TouchableOpacity onPress={props.onPress}>
                <Card borderRadius={15} containerStyle={{ padding: 10 , backgroundColor:"#efe9f2"}}>
                    <View style={{ flexDirection: "row" , paddingTop:6}}>
                    <View style={styles.circleIcon }>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/img/unnamed.png')}
                        />
                    </View>
                    <View style={{ paddingLeft: 50 }}>
                        <Text style={styles.itemName}>{props.name}</Text>
                        <Text style={styles.itemRSSI}>RSSI: {props.rssi}</Text>
                        <Text style={styles.itemID}>{props.id}</Text>
                    </View>
                    <View style={{flex:1 , flexDirection:"row-reverse"}}>{props.connected ? <Image
                            style={styles.tinyLogo}
                            source={require('../assets/img/tick.png')}
                    /> : <View></View>}</View>
                    </View>
                </Card>
            </TouchableOpacity>
        :null}</>
    );
};

const styles = StyleSheet.create({
    itemName: {

    },
    itemRSSI: {

    },
    itemID: {

    },
    circleIcon:{
        width:25,
        height:25,
    },
    tinyLogo: {
        width: 48,
        height: 48,
      }
});

export default IteminList;
