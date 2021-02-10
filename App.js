import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChat from "./screens/AddChat";
import ChatScreen from "./screens/ChatScreen";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: {backgroundColor:'#2C6BED'},
    headerTitleStyle: {color:'white',},
    headerTintColor:'white',
    headerTitleAlign:'center'
    
  } 
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={globalScreenOptions}>
        <Stack.Screen  name="Login" component={LoginScreen} />
        <Stack.Screen name="Register"  component={RegisterScreen} />
        <Stack.Screen name="Home"  component={HomeScreen} />
        <Stack.Screen name="addChat"  component={AddChat} />
        <Stack.Screen name="Chat"  component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
