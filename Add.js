import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const setData = async (value) => {
        await AsyncStorage.setItem('alphadata', value);
        navigation.navigate('Home', { updatedData: value });
    };

    return (
        <View>
            <StatusBar />
            <Text>Title:</Text>
            <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1 }} />
            <Text>ISBN:</Text>
            <TextInput value={isbn} onChangeText={setIsbn} style={{ borderWidth: 1 }} />
            <Text>Copies:</Text>
            <TextInput value={copies} onChangeText={setCopies} keyboardType="numeric" style={{ borderWidth: 1 }} />
            <Text>Image URL:</Text>
            <TextInput value={imageUrl} onChangeText={setImageUrl} style={{ borderWidth: 1 }} />
            <Button
                title="Add Book"
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastring);
                    mydata.push({
                        title,
                        ISBN: isbn,
                        copies: Number(copies),
                        image: imageUrl,
                        bgcolor: '#79b2e0',
                    });

                    let stringdata = JSON.stringify(mydata);
                    setData(stringdata);
                }}
            />
        </View>
    );
};

export default Add;






