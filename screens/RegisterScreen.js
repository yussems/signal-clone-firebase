import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { auth } from '../firebase';


const RegisterScreen = ( ) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerBackTitle:'abc',

    //     });
    // },[navigation])
    // apple cihazda çalışacak şekilde geri butonuna yazı ekleme


    // burada kaldık firebase bak 
  const register = () => {
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 
                'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            })
      }).catch((err) => alert(err.message));
      
  };

  return (
    <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <StatusBar style="light" />
        <Text h3 style={{ marginBottom: 50 }}>
          Create a Signal account{" "}
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            type="password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Progile Picture URL (optional)"
            type="Image"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register}
          />
        </View>

        <Button
          containerStyle={styles.button}
          raised
          onPress={register}
          title="Register"
        />
        <View style={{  }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
    padding:10,
    backgroundColor: "white",
  },
  button: {
      width:200,
      marginTop:10,
  },
  inputContainer:{
      width:300
  }
});
