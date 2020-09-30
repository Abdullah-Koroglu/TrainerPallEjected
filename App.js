import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SimpleLineIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { setNavigator } from './src/navigationRef'

import { Provider as WorkoutProvider } from './src/context/WorkoutContext'
import { Provider as TempProvider } from './src/context/TempContext'
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'

import IndexScreen from './src/screens/IndexScreen'
import TempSelectScreen from './src/screens/TempSelectScreen'
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'
import MyWorkoutsListScreen from './src/screens/MyWorkoutsListScreen'
import MyWorkoutDetailScreen from './src/screens/MyWorkoutDetailScreen'
import CreateTempScreen from './src/screens/CreateTempScreen'
import AccountScreen from './src/screens/AccountScreen'
import SaveWorkoutScreen from './src/screens/SaveWorkoutScreen'
import DeviceSelectScreen from './src/screens/DeviceSelectScreen'
import TestiScreen from './src/screens/TestiScreen'
import ExampleScreen from './src/screens/ExampleScreen';
import Naber from './src/screens/TestiScreen';
import Naberi from './src/screens/Testi2';
import BleFunctions from './src/screens/BleFunctions';
import I18n from "./src/services/translation"


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const loginFlow = () => {
  return (
    <Stack.Navigator
      headerMode={"none"}
      mode={"card"}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#694fad',
        }
      }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} options={{
        headerTitleAlign: "center",
        headerTintColor: "white"
      }} />
      <Stack.Screen name="Signin" component={SigninScreen} options={{
        headerTitleAlign: "center",
        headerTintColor: "white"
      }} />
    </Stack.Navigator>
  )
}

const testFlow = () => {
  return (
    <Stack.Navigator
      headerMode={"none"}
      mode={"card"}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#694fad',
        }
      }}
    >
      <Stack.Screen name="Test" component={Naber} options={{
        headerTitleAlign: "center",
        headerTintColor: "white"
      }} />
      <Stack.Screen name="Example" component={ExampleScreen} options={{
        headerTitleAlign: "center",
        headerTintColor: "white"
      }} />
    </Stack.Navigator>
  )
}

function tempFlow(props) {
  return (
    <Stack.Navigator
      mode={"card"}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#694fad',
        }
      }}
    >
      <Stack.Screen name="TempSelect" component={TempSelectScreen}
        options={{
          title: I18n.t('TempSelect'),
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerRight: () =>
            <TouchableOpacity onPress={() => props.navigation.navigate("CreateTemp")}>
              <Ionicons name="md-add-circle-outline" size={30} color="#fff" style={{ marginHorizontal: 12 }} />
            </TouchableOpacity>
        }} />
      <Stack.Screen name="Index" component={IndexScreen}
        options={{
          title: I18n.t('Index'),
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerRight: () =>
            <TouchableOpacity onPress={() => props.navigation.navigate("DeviceSelect")}>
              <FontAwesome name="bluetooth" size={30} color="#fff" style={{ marginHorizontal: 12 }} />
            </TouchableOpacity>
        }} />
      <Stack.Screen name="CreateTemp" component={CreateTempScreen}
        options={{
          title: I18n.t('CreateTemp'),
          headerTitleAlign: "center",
          headerTintColor: "white"
        }} />
      <Stack.Screen name="DeviceSelect" component={ExampleScreen}
        options={{
          title: I18n.t('DeviceSelect'),
          headerTitleAlign: "center",
          headerTintColor: "white"
        }} />
      <Stack.Screen name="SaveWorkout" component={SaveWorkoutScreen}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white"
        }} />
    </Stack.Navigator>
  )
}

const workoutFlow = () => {
  return (
    <Stack.Navigator
      mode={"card"}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#694fad',
        }
      }}
    >
      <Stack.Screen name="MyWorkoutsList" component={MyWorkoutsListScreen}
        options={{
          title: I18n.t('MyWorkoutsList'),
          headerTitleAlign: "center",
          headerTintColor: "white"
        }} />
      <Stack.Screen name="MyWorkoutDetail" component={MyWorkoutDetailScreen}
        options={{
          title: I18n.t('MyWorkoutDetail'),
          headerTitleAlign: "center",
          headerTintColor: "white"
        }} />
    </Stack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="workoutFlow"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen name="workoutFlow" component={workoutFlow} options={{
        tabBarLabel: I18n.t('History'),
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="file-document-outline" color={color} size={24} />
        ),
      }} />
      <Tab.Screen name="tempFlow" component={tempFlow} options={{
        tabBarLabel: I18n.t('Index'),
        tabBarIcon: ({ color }) => (
          <SimpleLineIcons name="fire" color={color} size={24} />
        ),
      }} />
      <Tab.Screen name={I18n.t('Account')} component={AccountScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
        ),
      }} />
    </Tab.Navigator>
  );
}

const App = function App() {
  const { state: { token, logedin }, loginViaStored } = useContext(AuthContext)
  useEffect(() => {
    loginViaStored()
  }, [])
  return (
    <AppearanceProvider>
      <NavigationContainer >
        <Stack.Navigator headerMode={"none"}>
          {logedin === true ? (
            <>
              <Stack.Screen name="Home" component={MyTabs} />
            </>
          ) : (
              <Stack.Screen name="SignIn" component={loginFlow} />
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <TempProvider>
          <BleFunctions></BleFunctions>
          <App />
        </TempProvider>
      </WorkoutProvider>
    </AuthProvider>
  )
};