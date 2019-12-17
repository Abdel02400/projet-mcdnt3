import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import AuthService from "../../utils/AuthService";

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
            ),
            headerTitle: () => <HeaderScreen title={'Mes messages'} />,
            headerRight: () => (
                <IconMat
                    name="logout"
                    size={35}
                    onPress={navigation.getParam('logout')}
                />
            ),
            headerStyle: {height: 40}
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout });
    }

    _logout = () => {
        AuthService.logout();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return(
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    logo: {
        width:50,
        height:40
    },
});
