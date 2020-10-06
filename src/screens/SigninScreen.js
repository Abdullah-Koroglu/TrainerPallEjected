import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, Dimensions , Image} from 'react-native'
import { Context } from '../context/AuthContext'
import I18n from "../services/translation"


const window = Dimensions.get('window');
import AuthForm from '../components/AuthForm'
// import naber from "../../assets/TrainerPalWhite.png"

SigninScreen = ({ navigation }) => {
    const { state, signin, clearError } = useContext(Context)

    const errorAlert = () => Alert.alert(
        state.errorMessage,
        '',
        [{ text: 'OK', onPress: () => clearError() }],
        { cancelable: false }
    )
    if (state.errorMessage !== '') { errorAlert() }

    return (<SafeAreaView style={styles.background}>
        <View style={{
            backgroundColor: "#00C5C0", height: window.height * 0.5, width: window.height * 1.4, borderBottomEndRadius: window.height * 4.8,
            borderBottomStartRadius: window.height * 4.8, alignSelf: "center", alignItems: "center"
        }}>
            {/* <MaterialCommunityIcons name="bike" size={100} color="#fff" style={{paddingTop:window.height*0.1}} /> */}
            <Image source={require("../../assets/TrainerPalWhite.png")}
            style={[styles.tinyLogo, { position: "absolute" }]}>
            </Image>
        </View><View style={styles.container}>
            <View style={styles.Card}>
                <AuthForm
                    headerText='Trainer Pall'
                    submitButtonText={I18n.t('SignIn')}
                    onSubmit={({ email, password }) => signin({ email, password })}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.gotoButton}>{I18n.t('havenotAcconut')}</Text>
                    </TouchableOpacity>
                </AuthForm></View>
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

    },tinyLogo: {
        marginTop:98,
        width: window.width * 0.23,
        height: null,
        // flex:1,
        aspectRatio: 1,
        resizeMode: "contain"
    }

})

export default SigninScreen