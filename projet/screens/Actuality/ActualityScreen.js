import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    Animated,
    PanResponder
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import AuthService from "../../utils/AuthService";
import {connect} from "react-redux";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const Users = [
    { id: "1", uri: require('../../assets/images/1.jpg') },
    { id: "2", uri: require('../../assets/images/2.jpg') },
    { id: "3", uri: require('../../assets/images/3.jpg') },
    { id: "4", uri: require('../../assets/images/4.jpg') },
    { id: "5", uri: require('../../assets/images/5.jpg') },
]

class ActualityScreen extends Component {

    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
        this.state = {
            user: null,
            currentIndex: 0
        };
        this.renderUsers = this.renderUsers.bind(this);
        // SWIPE CARDS
        this.position = new Animated.ValueXY()

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-30deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })

        this.panResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
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

    componentWillMount() {
        this.props.navigation.setParams({ logout: this._logout });
        this.setState({
            ...this.state,
            user: this.props.user
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
            ),
            headerTitle: () => <HeaderScreen title={'Fil d\'actualitÃ©'} />,
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

        // Fonctiond de rendu des cards
        renderUsers = () => {

            return Users.map((item, i) => {
    
    
                if (i < this.state.currentIndex) {
                    return null
                }
                else if (i === this.state.currentIndex) {
    
                    return (
                        <Animated.View
                            {...this.panResponder.panHandlers}
                            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
                            <View>
                                <Text>Bonjour {this.state.user.firstname} {this.state.user.lastname} </Text>
                            </View>
                            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

                            </Animated.View>

                            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

                            </Animated.View>

                            <Image
                                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                                source={item.uri} />

                        </Animated.View>
                    )
                }
                else {
                    return (
                        <Animated.View
    
                            key={item.id} style={[{
                                opacity: this.nextCardOpacity,
                                transform: [{ scale: this.nextCardScale }],
                                height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                            }]}>
                            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
    
                            </Animated.View>
    
                            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
    
                            </Animated.View>
    
                            <Image
                                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                                source={item.uri} />
    
                        </Animated.View>
                    )
                }
            }).reverse()
        }


    _logout = () => {
        AuthService.logout();
        this.props.navigation.navigate('Auth');
    };

    _onMomentumScrollEnd = (e, state, context) => {

    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 60 }}>

                </View>
                <View style={{ flex: 1 }}>
                    {this.renderUsers()}
                </View>
                <View style={{ height: 60 }}>

                </View>
            </View>
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

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, {  })(ActualityScreen)
