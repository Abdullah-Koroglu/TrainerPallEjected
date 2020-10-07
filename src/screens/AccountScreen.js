import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { SafeAreaView } from "react-navigation";
import I18n from "../services/translation"
import { Context as AuthContext } from '../context/AuthContext'
import { Context as ProfileContext } from '../context/ProfileContext'
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

AccountScreen = (props) => {
    const { signout } = useContext(AuthContext)
    const { getProfile, state, updateProfile } = useContext(ProfileContext)
    const [count, setCount] = useState(false);
    const [name1, setName] = useState('');
    const [age1, setAge] = useState();
    const [refreshing, setrefreshing] = useState(false)

    const onRefresh = React.useCallback(() => {
        
        setTimeout(async function(){
            setrefreshing(true)
        let datas = await getProfile()
            console.log(datas);
        setrefreshing(!datas)
        datas = null
    console.log(datas); }, 0);
        
    }, [refreshing])


    React.useEffect(() => {
        if (count === false || !state)
            onRefresh()
    }, [count])

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => { signout() }}>
                    <Text style={{ fontSize: 23, color: "#fff", marginRight: 8 }}>{I18n.t('Signout')}</Text>

                </TouchableOpacity>)
        });
    }, [props.navigation]);

    return (
        <View style={{ backgroundColor: "#00C5C0", flex: 1 }}>
            <View style={styles.topFigure}>
                <View style={styles.container}>
                    {refreshing === false ? <SafeAreaView
                        forceInset={{ top: 'always' }}>{
                            count === false ?
                                <View>
                                    <MaterialCommunityIcons name="shield-account" size={window.height*0.30} color="#EFF8FB" />
                                    <Text style={styles.sigoutButton}>{state.name}</Text>
                                    <Text style={styles.sigoutButton}>{state.age}</Text>
                                    <TouchableOpacity onPress={() => { count === false ? setCount(true) : setCount(false) }}>
                                        <Text style={styles.sigoutButton}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View> :
                                <View><View style={styles.row}>
                                    <TextInput
                                    style={{width:"45%"}}
                                        onChangeText={(text) => { setName(text) }}
                                        placeholder={I18n.t('name')}
                                        placeholderTextColor="#fff"
                                        maxLength={23}
                                    /><TextInput
                                    style={{width:"45%"}}
                                        onChangeText={(text) => { setAge(parseInt(text)) }}
                                        placeholder="Age"
                                        placeholderTextColor="#fff"
                                        keyboardType='numeric'
                                        maxLength={3}
                                    />
                                </View>
                                    <TouchableOpacity onPress={() => {
                                        count === false ? setCount(true) : setCount(false)
                                        updateProfile(name1, age1);
                                    }}>
                                        <Text style={styles.sigoutButton}>Update Profile</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </SafeAreaView> : <ActivityIndicator size="large" color='white' style={{ marginTop: "5%" }} />}
                </View>
            </View></View>)
}

const window = Dimensions.get('window');



const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        //alignContent:"center",
        //backgroundColor:"black",
        alignSelf: "center"
    },
    sigoutButton: {
        paddingTop: "4%",
        color: '#EFF8FB',
        fontSize: 28,
        alignSelf:'center'
    }, topFigure: {
        height: "70%",
        borderBottomLeftRadius: window.width,
        backgroundColor: "#00d8d3",
        position: "absolute",
        left: 0,
        width: window.width,
    },
    row: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch"
    }

})

export default AccountScreen
