import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
} from 'react-native';
import {connect} from "react-redux";
import { IsLoggedUser } from "../actions";

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.isLogged && nextProps.user){
            if(!nextProps.initializeUser) this.props.navigation.navigate('Main');
            else this.props.navigation.navigate('InitializeUser');
        } else this.props.navigation.navigate('Auth');
    }

    componentWillMount() {
        this.props.IsLoggedUser();
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        isLogged: state.auth.isLogged,
        initializeUser: state.auth.initializeUser
    }
}

export default connect(mapStateToProps, { IsLoggedUser })(AuthLoadingScreen)