import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from "../../components/InputField";
import ButtonField from "../../components/ButtonField";
import {connect} from "react-redux";
import {InitializeUser} from "../../actions";
import {Spinner} from "../../components/Spinner";

class InitializeUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            formNotComplete: false,
            resServer: '',
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.isLogged && nextProps.user.firstname){
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
        const { lastname, firstname } = this.state;
        if(lastname === '' || firstname === ''){ //a faire (validator de formulaire)
            this.setState({
                ...this.state,
                formNotComplete : true
            });
        }else {
            this.props.InitializeUser({ lastname, firstname });
        }
    }

    onChangeTextInput = (stateName, value) => {
        this.setState({
            ...this.state,
            formNotComplete: false,
            resServer: '',
            [stateName] : value
        });
    };

    _renderButton() {
        if(this.props.loading) return <Spinner />
        return (
            <ButtonField
                titleText="Valider"
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
                    labelText="Mon nom"
                    labelTextSize={14}
                    labelColor={'black'}
                    textColor={'black'}
                    borderBottomColor={'black'}
                    inputType="text"
                    customStyle={{marginBottom:30}}
                    onChangeText={ (lastname) => this.onChangeTextInput('lastname', lastname) }
                />
                <InputField
                    labelText="Mon prenom"
                    labelTextSize={14}
                    labelColor={'black'}
                    textColor={'black'}
                    borderBottomColor={'black'}
                    inputType="text"
                    customStyle={{marginBottom:30}}
                    onChangeText={ (firstname) => this.onChangeTextInput('firstname', firstname) }
                />
                { this._renderButton() }
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

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        isLogged: state.auth.user,
    }
}

export default connect(mapStateToProps, { InitializeUser })(InitializeUserScreen)
