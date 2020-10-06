import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-navigation";
import I18n from "../services/translation"
import { Context as AuthContext } from '../context/AuthContext'
import { Context as ProfileContext } from '../context/ProfileContext'
import { TextInput } from 'react-native-paper';

AccountScreen = (props) => {
    const { signout } = useContext(AuthContext)
    const { getProfile, state , updateProfile} = useContext(ProfileContext)
    const [count, setCount] = useState(0);
    const [name1, setName] = useState('');
    const [age1, setAge] = useState();


    React.useEffect(() => {
        getProfile()
    }, [count])

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => setCount(c => c + 1)}>
                    <Text style={{ fontSize: 23, color: "#fff", marginRight: 8 }}>{count % 2 === 0 ?
                          count
                        : "Save"}</Text>

                </TouchableOpacity>)
        });
    }, [props.navigation]);

    return (<View style={styles.container}>

        <SafeAreaView forceInset={{ top: 'always' }}>{
            count % 2 === 0 ?
                <View><TouchableOpacity onPress={() => { signout() }}>
                    <Text style={styles.sigoutButton}>{I18n.t('Signout')}</Text>
                </TouchableOpacity>
                    <Text style={styles.sigoutButton}>{state.name} - {state.age}</Text></View> :
                <View><View style={styles.row}>
                    <TextInput
                        onChangeText={(text) => { setName(text) }}
                        placeholder={I18n.t('name')}
                        placeholderTextColor="#fff"
                        maxLength={23}
                    /><TextInput
                    onChangeText={(text) => { setAge(parseInt(text)) }}
                    placeholder="Age"
                    placeholderTextColor="#fff"
                    keyboardType='numeric'
                    maxLength={3}
                />
                </View>
                <TouchableOpacity onPress={() => { updateProfile(name1 , age1) }}>
                <Text style={styles.sigoutButton}>Update Profile</Text>
            </TouchableOpacity>
            </View>
        }

        </SafeAreaView>
    </View>)
}




const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        //alignContent:"center",
        //backgroundColor:"black",
        alignSelf: "center"
    },
    sigoutButton: {
        paddingTop: 10,
        color: '#98ceb7',
        fontSize: 28,
        //alignSelf:'center'
    },
    row: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch"
    }

})

export default AccountScreen
