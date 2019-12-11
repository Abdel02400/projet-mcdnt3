import React, { Component } from 'react';
import {Picker, StyleSheet, Text, View} from 'react-native';
import InputField from "../../../components/InputField";
import ButtonField from "../../../components/ButtonField";
import AuthService from "../../../utils/AuthService";
import axios from "axios";

export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'tatoue',
            email: '',
            password: '',
            formNotComplete: false,
            resServer: ''
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
            AuthService.signup(this.state.email, this.state.password, this.state.role).then((data) => {
                this.setState({
                    ...this.state,
                    resServer: data.data
                })
            },(error) => {
                this.setState({
                    ...this.state,
                    resServer: 'Echec serveur'
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
                <Text style={styles.labelSelect}>Je suis :</Text>
                <Picker
                    selectedValue={this.state.role}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({role: itemValue})
                    }>
                    <Picker.Item label="Tatoué" value="tatoue" />
                    <Picker.Item label="Tatoueur" value="tatoueur" />
                </Picker>
                <ButtonField
                    titleText="S'inscrire"
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
    select: {
        display: 'flex',
        marginTop: 0
    },
    labelSelect: {
        color: 'black',
        fontSize: 20,
        fontWeight: "700"
    },
    formNotComplete: {
        color: 'red',
        fontSize: 20,
        marginTop: 2,
    }
});
