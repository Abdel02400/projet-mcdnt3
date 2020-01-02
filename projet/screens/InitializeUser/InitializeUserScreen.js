import React, { Component } from 'react';
import {Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import InputField from "../../components/InputField";
import ButtonField from "../../components/ButtonField";
import { Ionicons } from "@expo/vector-icons";
import {connect} from "react-redux";
import {InitializeUser} from "../../actions";
import {Spinner} from "../../components/Spinner";
import UserPermissions from "../../utils/UserPermissions";
import * as ImagePicker from 'expo-image-picker';

class InitializeUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            description: '',
            formNotComplete: false,
            resServer: '',
            avatar: 'none',
            iconisvisible: true,
            profilePictureModalVisible: false
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

    async updateProfileImageFromGallery() {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            allowsMultipleSelection: false
        });

        this.setProfilePictureModalNotVisible();


        if (result.cancelled) {
            this.setState({
                ...this.state,
                avatar: 'none',
            });
            return;
        }

        this.setState({
            ...this.state,
            avatar: result,
            iconisvisible: false
        })
    }

    async updateProfilePictureFromCamera() {
        // Montre la camera et attend que l'utilisateur prenne une pic
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this.setProfilePictureModalNotVisible();

        if (result.cancelled) {
            this.setState({
                ...this.state,
                avatar: 'none',
            });
            return;
        }

        this.setState({
            ...this.state,
            avatar: result,
            iconisvisible: false
        });

    }

    setProfilePictureModalVisible() {
        this.setState({ ...this.state, profilePictureModalVisible: true });
    }

    setProfilePictureModalNotVisible() {
        this.setState({ ...this.state, profilePictureModalVisible: false });
    }

    onPressBtn = e => {
        e.preventDefault();
        const { lastname, firstname, description, avatar } = this.state;
        if(lastname === '' || firstname === '' || description === '' || avatar === 'none'){ //a faire (validator de formulaire)
            this.setState({
                ...this.state,
                formNotComplete : true
            });
        }else {
            let id = this.props.userId;
            this.props.InitializeUser({ lastname, firstname, description, avatar , id });
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

    handlePickAvatar = async () => {

        UserPermissions.getCameraPermission();

        this.setProfilePictureModalVisible();

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
                <Text>Ma photo de profil</Text>
                <View style={{alignItems: "center", width: "100%" }}>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.avatar.uri }} style={styles.avatar} />
                        {this.state.iconisvisible &&
                            <Ionicons
                                name="ios-add"
                                size={40}
                                color="#FFF"
                                style={{marginTop: 6, marginLeft: 2}}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.profilePictureModalVisible}
                    presentationStyle="formSheet"
                    onRequestClose={() => {
                        this.setState({
                            ...this.state,
                            profilePictureModalVisible: false
                        });
                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <Text>Mes photo :</Text>
                        <TouchableOpacity onPress={() => this.updateProfilePictureFromCamera()}>
                            <Text>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.updateProfileImageFromGallery()}>
                            <Text>Gallerie</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Text>Description</Text>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Decrivez-vous"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={ (description) => this.onChangeTextInput('description', description) }
                    />
                </View>
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
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 15,
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        marginBottom: 15
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
});

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        userId: state.auth.userId,
        isLogged: state.auth.user,
    }
}

export default connect(mapStateToProps, { InitializeUser })(InitializeUserScreen)
