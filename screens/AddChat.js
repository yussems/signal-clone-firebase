import React, { useLayoutEffect,useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Input,Button } from 'react-native-elements'
import { db } from '../firebase';

const AddChat = ({navigation}) => {

    const [input, setInput] = useState('');
    

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Add New Chat',
            headerBackTitle:'Chat'
            
            
        })
    },[navigation])

    const createChat = async () => {
        await db
        .collection('chats')
        .add({
            chatName : input
        }).then(() => {
            navigation.goBack()
        }).catch(err => alert(err))
        
    }
        
    

    return (
        <View style={styles.container}>
            <Input
             placeholder='Enter Your Name'
             value={input}
             onChangeText={(text) => setInput(text)}
             onSubmitEditing={createChat}
             leftIcon= {
                <Icon name='wechat' type='antdesign' size={24}  color='black'/>
             }
            />
            <Button disabled={!input} title='Create new Chat' onPress={createChat} />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        padding:30,
        height:'100%'
    }
})
