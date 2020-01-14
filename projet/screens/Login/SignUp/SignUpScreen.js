import React, { Component } from 'react';
import {Picker, StyleSheet, Text, View} from 'react-native';
import InputField from "../../../components/InputField";
import ButtonField from "../../../components/ButtonField";
import {connect} from "react-redux";
import {SignUpUser} from "../../../actions";
import {Spinner} from "../../../components/Spinner";
import {testEmail} from "../../../utils/GlobalSettings";

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'tatoué',
            email: '',
            password: '',
            formNotComplete: false,
            resServer: '',
            validate: 'Merci de remplir tout les champs'
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.__redirect(nextProps);
    }

    __redirect(props = this.props) {
        if(props.isLogged){
            this.props.navigation.navigate('InitializeUser');
        } else if(props.error) {
            this.setState({
                ...this.state,
                error: props.error
            })
        }
    }

    onPressBtn = e => {
        e.preventDefault();
        const { email, password, role } = this.state;
        if(email === '' || password === ''){ //a faire (validator de formulaire)
            this.setState({
                ...this.state,
                formNotComplete : true,
                validate: 'Merci de remplir tout les champs'
            });
        }else if (!testEmail(email)){
            this.setState({
                ...this.state,
                formNotComplete: true,
                validate: 'Email au format invalide'
            });
        }
        else {
            this.props.SignUpUser({ email, password, role });
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

    _renderButton() {
        if(this.props.loading) return <Spinner />;
        return (
            <ButtonField
                titleText="S'inscrire"
                titleTextSize={25}
                textColor={'white'}
                buttonColor={'black'}
                onPress={ e => this.onPressBtn(e) }
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
                { this._renderButton() }
                {this.state.formNotComplete ?
                    <Text style={styles.formNotComplete}>{this.state.validate}</Text> : null
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

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        isLogged: state.auth.isLogged,
    }
}

export default connect(mapStateToProps, { SignUpUser })(SignUpScreen)
