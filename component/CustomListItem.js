import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatmessages, setChatmessages] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatmessages(snapshot.docs.map((doc) => doc.data()))
      );
      return unsubscribe
  });
  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider={true}
    >
      <Avatar
        rounded
        size={"large"}
        source={{
          uri: chatmessages?.[0]?.photoURL ||
            "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode={"tail"}>
          {chatmessages?.[0]?.displayName} : {chatmessages?.[0]?.message} 
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
