import React , { useContext }from 'react'
import {Text , View , StyleSheet , Button, TouchableHighlight} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { TouchableOpacity } from 'react-native-gesture-handler';
import I18n from "../services/translation"


MyWorkoutDetailScreen = () =>{
    return(
    <SafeAreaView forceInset={{top:'always'}}>
        <TouchableOpacity >
            <Text style={styles.sigoutButton}>{I18n.t('WOdetailR1')}</Text>
    <Text style={styles.sigoutButton}>{I18n.t('WOdetailR2')}</Text>
        </TouchableOpacity>
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

export default MyWorkoutDetailScreen