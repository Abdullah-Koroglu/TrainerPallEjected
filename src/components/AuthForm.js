import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity , Dimensions } from 'react-native'
import { Input, Text } from "react-native-elements"

const window = Dimensions.get('window');

AuthForm = ({ headerText, submitButtonText, onSubmit, children }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (<View style={styles.container}>
        <Text style={styles.headerText}>{headerText}</Text>
        <Input
            style={{fontSize:window.height*0.02}}
            inputContainerStyle={{height:window.height*0.033}}
            labelStyle={{fontSize:window.height*0.017}}
            label='Email'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
        ></Input>
        <Input
            style={{fontSize:window.height*0.02}}
            inputContainerStyle={{height:window.height*0.033}}
            labelStyle={{fontSize:window.height*0.017}}
            label='Password'
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
            secureTextEntry
        ></Input>
        <TouchableOpacity onPress={() => {
            console.log(email, password)
            ,onSubmit({ email, password })
        }}>
            <Text style={styles.submitButton}>{submitButtonText}</Text>
        </TouchableOpacity>
        {children}
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        paddingBottom: window.height*0.07,
        paddingHorizontal: window.height*0.01,
        paddingTop: window.height*0.031
    },
    submitButton: {
        paddingTop: window.height * 0.008,
        color: '#694fad',
        fontSize: window.height * 0.034,
        alignSelf: 'center'
    },
    // gotoButton: {
    //     marginTop: 15,
    //     fontSize: 18
    // },
    headerText: {
        paddingBottom: window.height * 0.014,
        fontWeight: 'normal',
        fontSize: window.height * 0.04,
        alignSelf: "center"
    }

})

export default AuthForm
