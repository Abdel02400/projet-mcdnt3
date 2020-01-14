import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from "react-redux";
import { Spinner } from "../components/Spinner";
import { IsLoggedUser } from "../actions";

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps, nextContext) {
            this.__redirect(nextProps);
    }

    __redirect(props = this.props) {
        setTimeout(() => {
            if(props.isLogged && props.user && !props.loading){
                if(!props.initializeUser) this.props.navigation.navigate('Main');
                else this.props.navigation.navigate('InitializeUser');
            } else if(!props.loading) this.props.navigation.navigate('Auth');
        }, 1500)

    }

    componentWillMount() {
            this.props.IsLoggedUser();
    }

    __renderLoading() {
        if(!this.props.loading) {
             if(this.props.isLogged){
                 return (
                     <View style={styles.content}>
                         <Image
                             source={require('../assets/images/success.png')}
                             style={styles.success}
                         />
                         <Text style={styles.successText}>Utilisateur connecté</Text>
                     </View>
                 )
             }else {
                 return (
                     <View style={styles.content}>
                         <Image
                             source={require('../assets/images/failed.png')}
                             style={styles.failed}
                         />
                         <Text style={styles.failedText}>Aucun utilisateur connecté !</Text>
                     </View>
                 )
             }
        } else {
            return <Spinner />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
                { this.__renderLoading() }
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20
    },
    logo: {
        width: 200,
        height: 200
    },
    success: {
        width: 50,
        height: 50,
    },
    successText: {
        fontFamily: 'Cochin',
        fontSize: 20
    },
    failed: {
        width: 50,
        height: 50,
    },
    failedText: {
        fontFamily: 'Cochin',
        fontSize: 20
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default connect(mapStateToProps, { IsLoggedUser })(AuthLoadingScreen)