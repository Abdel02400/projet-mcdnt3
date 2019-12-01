import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';

export default class ChatScreen extends Component {
    render() {
        return(
            <View>

            </View>
        );
    }
}

ChatScreen.navigationOptions = {
    headerTitle: (
        <HeaderScreen title={'Mes messages'} />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
