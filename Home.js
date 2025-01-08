import React, { useState } from 'react';
import { StatusBar, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from './Data';  // Import your default data
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    imageStyle: {
        width: 100,
        height: 150,
        marginLeft: 10,
    },
    textContainer: {
        flex: 1,
    },
});

const Home = ({ navigation, route }) => {
    const [mydata, setMydata] = useState(datasource);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if (datastr) {
            const jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
    };

    getData();

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={[styles.opacityStyle, { backgroundColor: item.bgcolor }]}
                onPress={() => {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Edit', {
                        index: index,
                        type: item.title,
                        key: item.ISBN,
                        datastring: datastr,
                    });
                }}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.titleStyle}>{item.title}</Text>
                    <Text style={styles.textStyle}>ISBN: {String(item.ISBN)}</Text>
                    <Text style={styles.textStyle}>Copies: {String(item.copies)}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.imageStyle} />
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <StatusBar />
            <Button
                title="ADD NEW BOOK"
                onPress={() => {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Add', { datastring: datastr });
                }}
            />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.ISBN)}
            />
        </View>
    );
};

export default Home;

















