import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    ScrollView,
    View, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/AntDesign";
import AuthService from "../../utils/AuthService";
import {connect} from "react-redux";
import { getPostModal } from "../../actions";
import { addLikes } from "../../actions";
import {Spinner} from "../../components/Spinner";
import {countElement} from "../../utils/GlobalSettings";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postModal: {},
            loading: false,
        };
        //this._logout = this._logout.bind(this);
    }

    /*static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
            ),
            headerTitle: () => <HeaderScreen title={'Mes messages'} />,
            headerRight: () => (
                <IconMat
                    name="logout"
                    size={35}
                    onPress={navigation.getParam('logout')}
                />
            ),
            headerStyle: {height: 40}
        };
    };*/

    async componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.loading) {
            await this.setState({
                ...this.state,
                loading: true
            })
        } else if(nextProps.postModal) {
            await this.setState({
                ...this.state,
                postModal: nextProps.postModal,
                loading: false,
            })
        }
    }

    componentDidMount() {
        this.props.getPostModal(this.props.id);
        //this.props.navigation.setParams({ logout: this._logout });
    }

    _logout = () => {
        //AuthService.logout();
        //this.props.navigation.navigate('Auth');
    };

    render() {
        let url;
        let date;
        let likes;
        let isLikes;
        let idPhoto;
        let nbCom;
        if (this.state.postModal.url) {
            idPhoto = this.state.postModal._id;
            url = "http://172.20.10.2:8000/" + this.state.postModal.url
            date = new Date();
            date.setTime(this.state.postModal.url.split('-')[1].split('.')[0]);
            date = date.getDate() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
            likes = this.state.postModal.likes;
            isLikes = (likes.indexOf(this.props.userId) !== -1);
            likes = countElement(likes);
            nbCom = this.state.postModal.comments;
            nbCom = countElement(nbCom)
        }
        return(
            <KeyboardAvoidingView  style={styles.container} behavior={Platform.OS === 'ios' ? 'position' : undefined}>
                <ScrollView>
                    {this.state.loading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner/>
                    </View>
                    }
                    {!this.state.loading && this.state.postModal &&
                    <View>
                        <View style={{ borderWidth: 2, margin: 10, height: 300}}>
                            <Image source={{ uri: url }} style={styles.avatar} />
                        </View>
                        <View style={{ borderWidth: 2, height: 50, margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{ width: '50%',height: '100%', borderRightWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ textAlign: 'center'}}>Ajoutée le {date}</Text>
                            </View>
                            <View style={{ width: '50%',height: '100%', flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                {isLikes &&
                                <IconMat
                                    name="heart"
                                    color="red"
                                    size={35}
                                    /*onPress={navigation.getParam('logout')}*/
                                />
                                }
                                {!isLikes &&
                                <IconMat
                                    name="hearto"
                                    size={35}
                                    onPress={() => {this.props.addLikes(idPhoto)}}
                                />
                                }
                                <Text>{likes} Likes</Text>
                            </View>
                        </View>
                        <View style={{ height: 100, borderWidth: 5, margin: 10}}>
                            <TextInput
                                style={styles.textArea}
                                underlineColorAndroid="transparent"
                                placeholder="Mettre un commentaire"
                                placeholderTextColor="grey"
                                multiline={true}
                            />
                            <Text style={{position: 'absolute',fontSize: 18, right: 2, bottom: 2,color: 'blue'}}>
                                Publier
                            </Text>
                        </View>
                        <View style={{ borderWidth: 5, margin: 10}}>
                            {nbCom === 0 &&
                                <View style={{ height: 100 , justifyContent:'center', alignItems: 'center'}}>
                                    <Text>Aucun commentaire pour l'instant...</Text>
                                </View>
                            }
                        </View>
                    </View>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    avatar: {
        height: '100%',
        width: '100%',

    }
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        userId: state.auth.userId,
        loading: state.auth.loading,
        isaddPhoto: state.auth.isaddPhoto,
        postModal: state.auth.postModal,
    }
};

export default connect(mapStateToProps, { getPostModal, addLikes })(Post)