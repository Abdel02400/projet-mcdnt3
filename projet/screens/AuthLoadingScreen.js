import React, { Component } from 'react';import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import AuthService from "../utils/AuthService";

export default class AuthLoadingScreen extends Component {

    async componentWillMount() {
        let isLogged = await AuthService.loggedIn();
        if(isLogged) this.props.navigation.navigate('Main');
        else this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}