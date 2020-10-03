import React, { useContext, useEffect } from 'react'
import { Context as authContext } from '../context/AuthContext'
import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native'
import { Card } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from "../services/translation"


import AuthForm from '../components/AuthForm'
import { color } from 'react-native-reanimated';
const window = Dimensions.get('window');


SignupScreen = ({ navigation }) => {
    const { state, signup, clearError } = useContext(authContext)


    const errorAlert = () => Alert.alert(
        state.errorMessage,
        '',
        [{ text: 'OK', onPress: () => clearError() }],
        { cancelable: false }
    )
    if (state.errorMessage !== '') { errorAlert() }

    useEffect(() => {
        // loginViaStored()
    }, [])

    return (<SafeAreaView style={styles.background} forceInset={{top:'always'}} >
        <View style={{
            backgroundColor: "#00C5C0", height: window.height * 0.5, width: window.height * 1.4, borderBottomEndRadius: window.height * 4.8,
            borderBottomStartRadius: window.height * 4.8, alignSelf: "center", alignItems: "center"
        }}>
            {/* <MaterialCommunityIcons name="bike" size={100} color="#fff" style={{paddingTop:window.height*0.1}} /> */}
            <Text style={{ fontSize: window.height*0.05, color: "#fff", paddingTop: window.height*0.13 }}>
                [YOUR LOGO HERE]
            </Text>
        </View>
        <View style={styles.container}>
            <View style={styles.Card}>
                <AuthForm
                    headerText='Trainer Pall'
                    submitButtonText={I18n.t('SignUp')}
                    onSubmit={signup}
                ><TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.gotoButton}>{I18n.t('haveAccount')}</Text>
                    </TouchableOpacity>
                </AuthForm>
            </View>
        </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    Card: {
        width: window.width * 0.9,
        alignSelf: "center",
        borderRadius: window.height * 0.03,
        borderBottomWidth: 0,
        // flex: 0.6,
        justifyContent: "space-around",
        position: "absolute",
        bottom: window.height * 0.28,
        height: window.height * 0.45,
        backgroundColor: "#fff",
        paddingTop:window.height*0.03
    },
    background: {
        flexDirection: "column",
        alignSelf: "center",
        flex: 1,
        width: window.height * 1.6,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: window.height*0.01,

    },
    // submitButton: {
    //     paddingTop: window.height,
    //     color: '#00C5C0',
    //     fontSize: 28,
    //     alignSelf: 'center'
    // },
    gotoButton: {
        marginTop: window.width * 0.03,
        marginLeft: window.width * 0.05,
        fontSize: window.height * 0.017

    },
    // headerText: {
    //     paddingBottom: window.width * 0.014,
    //     fontWeight: 'normal',
    //     fontSize: window.width * 0.033
    // }

})

export default SignupScreen



// import React , {useContext , useEffect} from 'react'
// import {Context as authContext} from '../context/AuthContext'
// import { Text,View , StyleSheet,TouchableOpacity , Alert , ActivityIndicator , SafeAreaView , Dimensions}   from 'react-native'
// import { Card} from 'react-native-elements'

// import AuthForm from '../components/AuthForm'
// const window = Dimensions.get('window');


// SignupTemp = ({navigation}) =>{
//     const {state,signup , clearError } = useContext(authContext)


//     const errorAlert = () => Alert.alert(
//         state.errorMessage,
//         '',
//         [{text: 'OK', onPress: () => clearError()}],
//         { cancelable: false }
//       )
//       if(state.errorMessage !== '' ){errorAlert()}

//         useEffect(() => {
//             // loginViaStored()
//         }, [])

//         return(<SafeAreaView style={styles.background}>
//             <View style={styles.container}>
//                 <Card containerStyle={styles.Card}>
//                     <View>
//                       <AuthForm 
//                 headerText='Trainer Pall' 
//                 submitButtonText='Sign Up' 
//                  onSubmit={signup}
//                  style={{marginBottom:50}}
//             ><TouchableOpacity  onPress={() => navigation.navigate('Signin')}>
//                 <Text style={styles.gotoButton}>Already have an account? Sign in.</Text>
//             </TouchableOpacity>
//             </AuthForm>  
//                     </View>

//                 </Card>
//                 {/* <View style={{}} > */}

//                 </View>
//             {/* </View> */}
//         </SafeAreaView>)
// }

// const styles = StyleSheet.create({
//     Card:{
//         width :window.width*0.9,
//         alignSelf:"center",
//         borderRadius:window.height*0.03,
//         borderBottomWidth:0,
//         flex:0.6,
//         justifyContent:"space-evenly"
//     },
//     background:{
//         flexDirection:"row",
//         alignSelf:"center",
//         flex:0.8,
//         width:2000,
//         borderBottomEndRadius:2000,
//         borderBottomStartRadius:2000,
//         backgroundColor:"#00C5C0",
//     },
//     container:{
//         flex:1,
//         justifyContent:'center',
//         paddingHorizontal:10,

//     },
//     submitButton:{
//         paddingTop:10,
//         color:'#6E9EC9',
//         fontSize:28,
//         alignSelf:'center'
//     },
//     gotoButton:{
//         marginTop:15,
//         fontSize:18

//     },
//     headerText:{
//         paddingBottom:13,
//         fontWeight:'normal',
//         fontSize:50
//     }

// })

// export default SignupTemp