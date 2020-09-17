import React, { Component } from 'react';
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
import {ble} from './BleFunctions'


export default class Naber extends Component {
  static contextType = WorkoutContext

  constructor() {
    super()

    this.state = {
    }
  }


  render() {
    // const { state , setHR  } = this.context;
    // let hr = HR
    if (this.context.state.HR) {
      return (
        // <WorkoutContext.Consumer>
        <View style={styles.container}>
          <Text style={{ fontSize: 50 }}>
            {this.context.state.HR}
          </Text>
          <Button title="Go" onPress={() => ble.testi()}></Button>
          {/* <Button title="log" onPress={() => console.log(HR)}></Button> */}
        </View>
        // </WorkoutContext.Consumer>
      )
    } else {
      return (
        <ExampleScreen>

        </ExampleScreen>
      )
    }
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