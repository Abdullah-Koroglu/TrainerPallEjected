import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ScrollView,
  AppState,
  FlatList,
  Dimensions,
  Button,
  SafeAreaView
} from 'react-native';
import { Context as WorkoutContext } from '../context/WorkoutContext'
import ExampleScreen from './ExampleScreen';
import IndexScreen from "./IndexScreen"


export default Naberi =()=> {
    const {state: {recording, datas, HR },
    stopRecording,
    startRecording,
    addInstant,
    createWorkout
} = useContext(WorkoutContext)
  
    if (HR) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 50 }}>
            {HR}
          </Text>
          <Button title="Go" onPress={() => this.props.navigation.navigate("Example")}></Button>
          <Button title="log" onPress={() => console.log(HR)}></Button>
        </View>
      )
    } else {
      return (
        <ExampleScreen>

        </ExampleScreen>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});