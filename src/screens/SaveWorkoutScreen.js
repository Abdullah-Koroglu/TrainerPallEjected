import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native'
import { SafeAreaView } from "react-navigation";
import { CommonActions } from '@react-navigation/native';
import { Input } from "react-native-elements"


const window = Dimensions.get('window');
import { Context as WorkoutContext } from '../context/WorkoutContext'

SaveWorkoutScreen = ({ navigation }) => {
    const { state: { name, datas }, createWorkout,
        fetchWorkout, changeName, reset } = useContext(WorkoutContext)
    const [activityName, setactivityName] = useState('')
    const [alertFlag, setAlertFlag] = useState(false)

    if (alertFlag === true) {
        Alert.alert(
            '',
            'Do you want to save this activity.',
            [
                { text: 'Cancel', onPress: () => setAlertFlag(false) },
                {
                    text: 'Submit', onPress: () => {
                        createWorkout(name, datas),
                            setAlertFlag(false),
                            reset(),
                            navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'MyWorkoutsList',
                                })
                            ),
                            fetchWorkout()
                    },
                    style: 'cancel'
                },
            ],
            {
                cancelable: true,
                onDismiss: () => setAlertFlag(false)
            }
        )
    }

    return (
        <SafeAreaView style={styles.background} forceInset={{ top: 'always' }}>
            <View style={{
                backgroundColor: "#00C5C0", height: window.height * 0.4, width: window.height * 1.4, borderBottomEndRadius: window.height * 4.8,
                borderBottomStartRadius: window.height * 4.8, alignSelf: "center", alignItems: "center"
            }}>
                <Text style={{ alignSelf: "center", color: "white", paddingBottom:window.height*0.03}}>To see the details later on save the activity.</Text>
            </View><View style={styles.container}>
                <View style={styles.Card}>
                    <Text style={styles.headerText}>Save the activity</Text>
                        <Input
                            style={{ fontSize: window.height * 0.02 }}
                            inputContainerStyle={{ height: window.height * 0.034 , marginHorizontal:window.height * 0.02}}
                            labelStyle={{ fontSize: window.height * 0.017 , marginHorizontal:window.height * 0.02}}
                            label='Activity Name'
                            value={activityName}
                            onChangeText={setactivityName}
                        ></Input>
                    <TouchableOpacity
                        onPress={() => {
                            changeName(activityName),
                                setAlertFlag(true)
                        }}>
                        <Text style={styles.Button} >
                            Save Activity
            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>)
}


const styles = StyleSheet.create({
    Button: {
        paddingBottom: window.height * 0.01,
        paddingLeft: window.height * 0.023,
        paddingTop: window.height * 0.013,
        color: '#ffffff',
        backgroundColor: "#00C5C0",
        fontSize: window.height * 0.03,
        alignSelf: 'center',
        borderRadius: window.height * 0.023,
        borderEndWidth: window.height * 0.023,
        flexDirection: "column"
    },
    header: {
        fontSize: window.height * 0.047,
        padding: window.height * 0.019
    },
    input: {
        // paddingBottom:20,
        // margin:10,
        marginHorizontal: window.height * 0.023,
        // fontSize:24,
        // borderColor:"gray",
        paddingStart: window.height * 0.028
    }, Card: {
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
        paddingTop: window.height * 0.06
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
        paddingHorizontal: window.height * 0.012,

    },
    submitButton: {
        paddingTop: window.height * 0.012,
        color: '#6E9EC9',
        fontSize: window.height * 0.026,
        alignSelf: 'center'
    },
    gotoButton: {
        marginTop: window.width * 0.03,
        marginLeft: window.width * 0.05,
        fontSize: 18

    },
    headerText: {
        paddingBottom: window.height * 0.02,
        fontWeight: 'normal',
        fontSize: window.height * 0.045,
        alignSelf: "center"
    }

})

export default SaveWorkoutScreen
