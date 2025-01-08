import React, { useState, useEffect } from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    const mydata = JSON.parse(route.params.datastring);
    const myindex = route.params.index;

    const [title, setTitle] = useState(mydata[myindex].title);
    const [isbn, setIsbn] = useState(mydata[myindex].ISBN);
    const [copies, setCopies] = useState(mydata[myindex].copies);
    const [imageUrl, setImageUrl] = useState(mydata[myindex].image);

    const setData = async (value) => {
        await AsyncStorage.setItem('alphadata', value);
        navigation.navigate('Home', { updatedData: value });
    };

    return (
        <View>
            <Text>Title:</Text>
            <TextInput value={title} style={{ borderWidth: 1 }} onChangeText={(text) => setTitle(text)} />
            <Text>ISBN:</Text>
            <TextInput
                value={isbn ? String(isbn) : ''}
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setIsbn(text)}
            />
            <Text>Number of Copies:</Text>
            <TextInput
                value={String(copies)}
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setCopies(text)}
                keyboardType="numeric"
            />
            <Text>Image URL:</Text>
            <TextInput value={imageUrl} style={{ borderWidth: 1 }} onChangeText={(text) => setImageUrl(text)} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Save"
                        onPress={() => {
                            mydata[myindex] = { title, ISBN: isbn, copies: Number(copies), image: imageUrl, bgcolor: '#79b2e0' };
                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                        }}
                    />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            Alert.alert('Are you sure?', '', [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        mydata.splice(myindex, 1);
                                        let stringdata = JSON.stringify(mydata);
                                        setData(stringdata);
                                    },
                                },
                                { text: 'No' },
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;



