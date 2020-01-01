import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import InputField from "../../../components/InputField";
import ButtonField from "../../../components/ButtonField";
import { connect } from 'react-redux';
import { SignInUser } from "../../../actions";
import { Spinner } from "../../../components/Spinner";
import * as ImagePicker from 'expo-image-picker';
import * as Facebook from "expo-facebook";
class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formNotComplete: false,
            error: ''
        };
    }

    async _handleFacebookLogin() {

        /*    try {
                const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                    '2512803462323237', // Replace with your own app id in standalone app
                    'L-Ink-React',
                    { permissions: ['public_profile'] }
                );
    
                switch (type) {
                    case 'success': {
                        // Get the user's name using Facebook's Graph API
                        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                        const profile = await response.json();
                        console.log(
                            'Logged in!',
                            `Hi ${profile.name}!`,
                        );
                        break;
                    }
                    case 'cancel': {
                        console.log(
                            'Cancelled!',
                            'Login was cancelled!',
                        );
                        break;
                    }
                    default: {
                        console.log(
                            'Oops!',
                            'Login failed!',
                        );
                    }
                }
            } catch (e) {
                console.log(
                    'Oops!',
                    'Login failed!',
                );
            }
            */
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
                formNotComplete: true
            });
        } else {
            this.props.SignInUser({ email, password });
        }
    }

    onChangeTextInput = (stateName, value) => {
        this.setState({
            ...this.state,
            formNotComplete: false,
            error: '',
            [stateName]: value
        });
    }

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

    /*
        async takeAndUploadPhotoAsync() {
            // Display the camera to the user and wait for them to take a photo or to cancel
            // the action
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
            });
          
            if (result.cancelled) {
              return;
            }
          
            // ImagePicker saves the taken photo to disk and returns a local URI to it
            let localUri = result.uri;
            let filename = localUri.split('/').pop();
          
            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
          
            // Upload the image using the fetch and FormData APIs
            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('photo', { uri: localUri, name: filename, type });
          
            return await fetch(YOUR_SERVER_URL, {
              method: 'POST',
              body: formData,
              header: {
                'content-type': 'multipart/form-data',
              },
            });
          }
    
          async openLibraryPictures(options) {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                allowsMultipleSelection: true,
            });
            if (result.cancelled) {
                return;
            }
            
            alert("imageUploaded");
    
          } */

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
                {this._renderButton()}
                {this.state.formNotComplete ?
                    <Text style={styles.formNotComplete}>Merci de remplir tout les champs</Text> : null
                }
                <TouchableOpacity onPress={() => this._handleFacebookLogin()}><Text>Go FACEBOOK</Text></TouchableOpacity>
                <Text>{this.state.error}</Text>
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
        marginTop: 2,
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
