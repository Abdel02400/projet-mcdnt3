import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from "../../../components/InputField";
import ButtonField from "../../../components/ButtonField";
import AuthService from "../../../utils/AuthService";

export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formNotComplete: false,
            resServer: '',
        };
    }

    onPressBtn = e => {
        e.preventDefault();
        if(this.state.email === '' || this.state.password === '')
        {
            this.setState({
                ...this.state,
                formNotComplete : true
            });
        }else {
            AuthService.login(this.state.email, this.state.password).then((data) => {
                if(data.status === 200){
                    AuthService.setToken(data.headers['x-auth']);
                    this.props.navigation.navigate('Actuality');
                }else {
                    this.setState({
                        ...this.state,
                        resServer: data.data
                    })
                }
            },(error) => {
                alert(error)

                this.setState({
                    ...this.state,
                    resServer: "Echec server ! "
                })
            })
        }
    }

    onChangeTextInput = (stateName, value) => {
        this.setState({
            ...this.state,
            formNotComplete: false,
            resServer: '',
            [stateName] : value
        });
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
                    customStyle={{marginBottom:30}}
                    onChangeText={ (email) => this.onChangeTextInput('email', email) }
                />
                <InputField
                    labelText="MOT DE PASSE"
                    labelTextSize={14}
                    labelColor={'black'}
                    textColor={'black'}
                    borderBottomColor={'black'}
                    inputType="password"
                    customStyle={{marginBottom:30}}
                    onChangeText={ (password) => this.onChangeTextInput('password', password) }
                />
                <ButtonField
                    titleText="Se connecter"
                    titleTextSize={25}
                    textColor={'white'}
                    buttonColor={'black'}
                    onPress={ e => this.onPressBtn(e) }
                />
                {this.state.formNotComplete ?
                    <Text style={styles.formNotComplete}>Merci de remplir tout les champs</Text> : null
                }
                <Text>{this.state.resServer}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        flex:4,
        margin: 20,
    },
    formNotComplete: {
        color: 'red',
        fontSize: 20,
        marginTop: 2,
    }
});
