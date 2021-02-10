import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const urlSignalImg =
    "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubcrbe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        navigation.replace('Home')
      }
    });
    return  unsubcrbe

  },[])


  const sıgnIn = () => {
    auth.signInWithEmailAndPassword(email,password)
    .catch(err => alert(err))
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <StatusBar style="dark" />

        <Image
          source={{
            uri: urlSignalImg,
          }}
          style={{ width: 200, height: 200 }}
        />

        <View style={styles.inputContainer}>
          <Input
            placeholder="Severus@email.com"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Secret Info"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={sıgnIn}
          />
          <Button
            containerStyle={styles.button}
            onPress={sıgnIn}
            title="Login"
          />
          <Button
            containerStyle={styles.button}
            type="outline"
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
          <View style={{ height: 100 }} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
      width:300,
  },
  button: {
      width:300,
      marginTop:10,

  },
});

export default LoginScreen;
