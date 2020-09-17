import React , { useContext }from 'react'
import {Text , View , StyleSheet , Button, TouchableHighlight} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { TouchableOpacity } from 'react-native-gesture-handler';

CreateTempScreen = () =>{
    return(
    <SafeAreaView forceInset={{top:'always'}}>
            <Text style={styles.sigoutButton}>In This page you can create your custom workout.</Text>
            <Text style={styles.sigoutButton}>This page is only for premium users.</Text>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sigoutButton:{
        padding:10,
        color:'#98ceb7',
        fontSize:28,
        // alignSelf:'center'
    }

})

export default CreateTempScreen
