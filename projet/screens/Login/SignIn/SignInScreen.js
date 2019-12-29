import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from "../../../components/InputField";
import ButtonField from "../../../components/ButtonField";
import { connect } from 'react-redux';
import { SignInUser } from "../../../actions";
import {Spinner} from "../../../components/Spinner";

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

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.isLogged && nextProps.user){
            this.props.navigation.navigate('Main');
        } else if(nextProps.error) {
            this.setState({
                ...this.state,
                error: nextProps.error
            })
        }
    }

    onPressBtn = e => {
        e.preventDefault();
        const { email, password } = this.state;
        if(email === '' || password === ''){ //a faire (validator de formulaire)
            this.setState({
                ...this.state,
                formNotComplete : true
            });
        }else {
            this.props.SignInUser({ email, password });
        }
    }

    onChangeTextInput = (stateName, value) => {
        this.setState({
            ...this.state,
            formNotComplete: false,
            error: '',
            [stateName] : value
        });
   }

    _renderButton() {
        if(this.props.loading) return <Spinner />
        return (
            <ButtonField
                titleText="Se connecter"
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
                { this._renderButton() }
                {this.state.formNotComplete ?
                    <Text style={styles.formNotComplete}>Merci de remplir tout les champs</Text> : null
                }
                <Text>{this.state.error}</Text>
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

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        isLogged: state.auth.isLogged,
    }
}

export default connect(mapStateToProps, { SignInUser })(SignInScreen)
