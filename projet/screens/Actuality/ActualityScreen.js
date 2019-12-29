import React, { Component } from 'react';
import {
    Image,
    StyleSheet, Text,
    View,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import AuthService from "../../utils/AuthService";
import {connect} from "react-redux";

class ActualityScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
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
            headerTitle: () => <HeaderScreen title={'Fil d\'actualité'} />,
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

    componentWillMount() {
        alert(this.props.user.firstname);

        this.setState({
            ...this.state,
            user: this.props.user
        })
    }

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
                <Text>Bonjour {this.state.user.firstname} {this.state.user.lastname} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width:50,
        height:40
    },
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, { })(ActualityScreen)
