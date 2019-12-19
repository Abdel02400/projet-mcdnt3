import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import AuthService from "../../utils/AuthService";
import Swiper from 'react-native-swiper';

export default class ActualityScreen extends Component {

    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
            ),
            headerTitle: () => <HeaderScreen title={'Fil d\'actualité'} />,
            headerRight: () => (
                <IconMat
                    name="logout"
                    size={35}
                    onPress={navigation.getParam('logout')}
                />
            ),
            headerStyle: { height: 40 }
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout });
    }


    _logout = () => {
        AuthService.logout();
        this.props.navigation.navigate('Auth');
    };

    _onMomentumScrollEnd = (e, state, context) => {
        alert(state);
    };

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false} onMomentumScrollEnd={() => this._onMomentumScrollEnd()}>
                <View style={styles.slide1}>
                    <View style={styles.artistNameContainer}>
                        <Text style={styles.artistName}>
                            Nom du Tatoueur
                        </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require("../../assets/images/flash1.jpg")} style={styles.image}></Image>
                    </View>
                    <View style={styles.tags}>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>DotWork</Text>
                        </View>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>DotWork</Text>
                        </View>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tagText}>DotWork</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.slide2}>
                    <View style={styles.artistNameContainer}>
                        <Text style={styles.artistName}>
                            Nom du Tatoueur
                        </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require("../../assets/images/flash2.jpg")} style={styles.image}></Image>
                    </View>
                </View>
                <View style={styles.slide3}>
                    <View style={styles.artistNameContainer}>
                        <Text style={styles.artistName}>
                            Nom du Tatoueur
                        </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require("../../assets/images/flash3.jpg")} style={styles.image}></Image>
                    </View>
                </View>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 50,
        height: 40
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    imageContainer: {
        height: "80%",
        marginTop: "5%",
        marginBottom: "3%",
        width: "100%",
        backgroundColor: "transparent"
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    artistNameContainer: {
        height: 40,
        width: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    artistName: {
        fontSize: 20,
        fontWeight: 'bold',
        width: "100%",
        color: 'black',
        textAlign: "center",
        textDecorationLine: 'underline'
    },
    tags: {
        width: "100%"
    },
    tagContainer: {
        alignItems: "center"
    },
    tagText: {
        fontSize: 13,
    }
});
