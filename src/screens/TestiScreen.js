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
  SafeAreaView,
  BackHandler,
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Naber extends Component {

  constructor(props) {
    super(props)

    this.state = {
      petname:"naber"
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    console.log("unmount");
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton(state) {
    console.log("pressed");
    console.log(state)
    Alert.alert(
      'Discard workout?',
      'If you exit the workout will be discarded',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => { } },
        {
          text: 'Discard',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => {
            this.props.navigation.pop()
          },
        },
      ]
    );

    return true;

  }





  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=>this.handleBackButton()}>
          <Text>Back button example</Text>
        </TouchableOpacity>

      </View>
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