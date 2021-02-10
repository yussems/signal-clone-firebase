import React, { useState,useEffect, useLayoutEffect } from "react";
import {
  Button,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import CustomListItem from "../component/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {

const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        });
    };
    useEffect(() => {
      const unSubscribe = db.collection('chats').onSnapshot(snapshot => (
        setChats(snapshot.docs.map(doc => ({
          id:doc.id,
          data:doc.data()
        })))
      ))
      return unSubscribe
    },[])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }} >
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar
              rounded
              size={"medium"}
              source={{ uri: auth?.currentUser?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight : () => (
          <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              width:80,
              marginRight:20
          }}>
              <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name='camerao' size={24} color='black' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('addChat')} activeOpacity={0.5}>
                <SimpleLineIcons name='pencil' size={24} color='black' />
              </TouchableOpacity>
          </View>
    )

    });
  }, [navigation]);

  const enterChat = (id,chatName) =>{
    navigation.navigate('Chat', {
      id,
      chatName
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {
          chats.map(({id,data:{chatName}}) => (
            <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
          ))
        }
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    height:'100%'
  }
});
