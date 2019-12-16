import React, { Component } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";


export default class HeaderScreen extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        alert(this.props.navigation)
    }

    onLogout()
    {
        //AuthService.logout();
        //alert(this.props.navigation)
        //this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.headerTitle}>{this.props.title}</Text>
                <IconMat
                    name="logout"
                    size={35}
                    onPress={() => this.onLogout()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    logo: {
        width:50,
        height:40
    },
    headerTitle : {
        fontSize: 25
    }
});
