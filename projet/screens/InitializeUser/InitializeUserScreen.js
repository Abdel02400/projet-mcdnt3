import React, { Component } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
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

    _renderModal() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 50
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 15
                }}>
                    <Ionicons name="md-camera" style={{ fontSize: 50 }} />
                    <ButtonField
                        titleText="Prendre une photo"
                        titleTextSize={15}
                        textColor={'white'}
                        buttonColor={'black'}
                        onPress={() => this.updateProfilePictureFromCamera()}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Ionicons name="md-image" style={{ fontSize: 50 }} />
                    <ButtonField
                        titleText="Séléctionner une photo"
                        titleTextSize={15}
                        textColor={'white'}
                        buttonColor={'black'}
                        onPress={() => this.updateProfileImageFromGallery()}
                    />
                </View>
            </View>
        )
    }


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
                <ScrollView style={styles.form} keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Mes informations
                        </Text>
                    </View>
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
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Ma photo de profil
                        </Text>
                    </View>
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
                        {this._renderModal()}
                    </Modal>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Ma description
                        </Text>
                    </View>
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
                    {this.state.formNotComplete ?
                        <Text style={styles.formNotComplete}>Merci de remplir tout les champs</Text> : null
                    }
                    { this._renderButton() }
                    <Text>{this.state.resServer}</Text>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        flex:1,
        margin: 10,
        marginTop: 30,
    },
    formNotComplete: {
        color: 'red',
        fontSize: 20,
        marginTop: 2,
        marginBottom: 20,
    },
    avatarPlaceholder: {
        width: 150,
        height: 150,
        backgroundColor: "#E1E2E6",
        borderRadius: 100,
        marginBottom: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        marginBottom: 25
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    title: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    titleText: {
        fontSize: 30,
        fontFamily: 'Cochin',
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
