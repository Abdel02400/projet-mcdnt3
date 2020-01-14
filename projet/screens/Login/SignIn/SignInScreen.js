import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import InputField from "../../../components/InputField";
import ButtonField from "../../../components/ButtonField";
import { connect } from 'react-redux';
import { SignInUser } from "../../../actions";
import { Spinner } from "../../../components/Spinner";
import * as ImagePicker from 'expo-image-picker';
import * as Facebook from "expo-facebook";
import Icon from 'react-native-vector-icons/FontAwesome';
import { testEmail } from '../../../utils/GlobalSettings';

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formNotComplete: false,
            error: '',
            validate: 'Merci de remplir tout les champs'
        };
    }

    async _handleFacebookLogin() {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('2512803462323237',{
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isLogged && nextProps.user) {
            this.props.navigation.navigate('Main');
        } else if (nextProps.error) {
            this.setState({
                ...this.state,
                error: nextProps.error
            })
        }
    }

    onPressBtn = e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (email === '' || password === '') { //a faire (validator de formulaire)
            this.setState({
                ...this.state,
                formNotComplete: true,
                validate: 'Merci de remplir tout les champs'
            });
        } else if (!testEmail(email)) {
            this.setState({
                ...this.state,
                formNotComplete: true,
                validate: 'Email au format invalide'
            });
        } else {
            this.props.SignInUser({ email, password });
        }
    };

    onChangeTextInput = (stateName, value) => {
        this.setState({
            ...this.state,
            formNotComplete: false,
            error: '',
            [stateName]: value
        });
    };

    _renderButton() {
        if (this.props.loading) return <Spinner />
        return (
            <ButtonField
                titleText="Se connecter"
                titleTextSize={25}
                textColor={'white'}
                buttonColor={'black'}
                onPress={e => this.onPressBtn(e)}
            />
        )
    }

    render() {
        return (
                <View style={styles.form}>
                    <InputField
                        labelText="ADRESSE EMAIL"
                        labelTextSize={14}
                        labelColor={'black'}
                        textColor={'black'}
                        borderBottomColor={'black'}
                        inputType="email"
                        customStyle={{ marginBottom: 30 }}
                        onChangeText={(email) => this.onChangeTextInput('email', email)}
                    />
                    <InputField
                        labelText="MOT DE PASSE"
                        labelTextSize={14}
                        labelColor={'black'}
                        textColor={'black'}
                        borderBottomColor={'black'}
                        inputType="password"
                        customStyle={{ marginBottom: 30 }}
                        onChangeText={(password) => this.onChangeTextInput('password', password)}
                    />
                    {this.state.formNotComplete ?
                        <Text style={styles.formNotComplete}>{this.state.validate}</Text> : null
                    }
                    <Text style={styles.errorServer}>{this.state.error}</Text>
                    <View style={{ marginBottom: 20}}>
                        {this._renderButton()}
                    </View>
                    <Icon.Button style={{ height: 50, borderRadius: 30,  justifyContent: 'center'}} name="facebook" backgroundColor="#3b5998" onPress={() => this._handleFacebookLogin()}>
                        <Text style={{ fontFamily: 'Arial', fontSize: 22, color: 'white', textAlign: 'center' }}>
                            Login with Facebook
                        </Text>
                    </Icon.Button>
                </View>
        );
    }
};

const styles = StyleSheet.create({
    form: {
        flex: 4,
        margin: 20,
    },
    formNotComplete: {
        color: 'red',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 30
    },
    errorServer: {
        color: 'red',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 30
    }
});

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        isLogged: state.auth.isLogged,
    }
}

export default connect(mapStateToProps, { SignInUser })(SignInScreen)
