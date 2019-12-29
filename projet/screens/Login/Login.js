import React, { Component } from 'react';
import {
    StyleSheet, Text,
    View,
} from 'react-native';
import SignInScreen from './SignIn/SignInScreen';
import SignUpScreen from './SignUp/SignUpScreen';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: true,
            signUp: false,
            isLogged: false
        };
        this.onPressLogin = this.onPressLogin.bind(this);
    }

    onPressLogin(id) {
        if(id === 'signUp'){
            this.setState({
                ...this.state,
                signIn: false,
                signUp: true
            })
        }else {
            this.setState({
                ...this.state,
                signIn: true,
                signUp: false
            })
        }

    }

    render() {
        let content;
        if(this.state.signUp) content = <SignUpScreen navigation={this.props.navigation}/>;
        else content = <SignInScreen navigation={this.props.navigation}/>

        return(
            <View style={styles.wrapper}>
                <View style={styles.login}>
                    <Text
                        style={
                            this.state.signIn
                                ? [styles.loginHeader,styles.loginHeaderActive]
                                : styles.loginHeader
                        }
                        onPress={() => this.onPressLogin('signIn')}>Se connecter</Text>
                    <Text
                        style={
                            this.state.signUp
                                ? [styles.loginHeader,styles.loginHeaderActive]
                                : styles.loginHeader
                        }
                        onPress={() => this.onPressLogin('signUp')}>S'inscrire</Text>
                </View>
                { content }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1
    },
    login: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        marginTop: 50
    },
    loginHeader: {
        fontSize: 28,
        color: 'black',
        fontWeight: "300",
        marginBottom: 40,
    },
    loginHeaderActive: {
        textDecorationLine: 'underline',
    }
});
