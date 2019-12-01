import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';

export default class ActualityScreen extends Component {
    render() {
        return(
            <View>

            </View>
        );
    }
}

ActualityScreen.navigationOptions = {
    headerTitle: (
        <HeaderScreen title={'Fil d\'actualité'} />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
