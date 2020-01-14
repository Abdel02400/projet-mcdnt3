import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder,
    TouchableWithoutFeedback,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import AuthService from "../../utils/AuthService";
import { connect } from "react-redux";
import { GetFeed } from "../../actions";
import ButtonField from '../../components/ButtonField';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

// A REMPLACER AVEC CONTENU BASE DE DONNEES
let Posts = [
]



class ActualityScreen extends Component {

    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.state = {
            user: null,
            currentIndex: 0,
            postLoaded: false,
            post: {
                likes: {
                    liked: false,
                    likeNb: 998,
                    dislikeNb: 750
                },
                comments: {
                    commentNb: 1500
                }
            },
            feed: []
        };
        this.renderPosts = this.renderPosts.bind(this);
        this.position = new Animated.ValueXY();
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

        this.profileOpacity = this.position.y.interpolate({
            inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
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
                    });
                    // LIKE PHOTO BRANCHEMENT
                    this.toggleLike();
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    });
                    // DISLIKE PHOTO BRANCHEMENT

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
            user: this.props.user,
        });

        this._getFeed();
    }


    lastTap = null;
    handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
            this.toggleLike();
        } else {
            this.lastTap = now;
        }
    }

    toggleLike = (itemID) => {
        // Récupérer l'id du post avec itemID
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.feed) {
            Posts = nextProps.feed;
            this.setState({
                ...this.state,
                postLoaded: true
            })
        }
    }

    _getFeed = () => {

        this.props.GetFeed();
    }



    // Fonction de rendu des cards
    renderPosts = () => {
        return Posts.map((item, i) => {
            item.id = i + 1;
            if (i < this.state.currentIndex) {
                return null
            }
            else if (i === this.state.currentIndex) {

                return (
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute', borderRadius: 20 }]}>
                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
                        </Animated.View>

                        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
                        </Animated.View>

                        <Animated.View style={{ height: "5%", width: "100%", backgroundColor: "white", justifyContent: "center", }}>
                            <Text style={{ color: 'black', textDecorationLine: "underline", fontSize: 25, fontWeight: '400', padding: 10, textAlign: "center" }}>Artist Name</Text>
                        </Animated.View>

                        <Animated.View style={{ height: "80%", marginBottom: "2%" }}>
                            <Image
                                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 15 }}
                                source={{ uri: "http://172.20.10.2:8000/" + item.url }} />
                        </Animated.View>

                        <Animated.View style={{ height: "15%", width: "100%", backgroundColor: "transparent", flex: 1, flexDirection: "column" }}>
                            <Animated.View style={{ flex: 1, flexDirection: "row", height: "50%", justifyContent: "space-between" }}>
                                {/* BLOC LIKES */}
                                <Animated.View style={{ flex: 1 }}>
                                    <TouchableWithoutFeedback style={{}} onPress={() => this.toggleLike(item.id)}>
                                        <Animated.View style={{ flexDirection: "row" }}>
                                            <Ionicons name={this.state.post.likes.liked ? "md-heart" : "md-heart-empty"} style={{ fontSize: 30 }}></Ionicons>
                                            <Text style={{ fontSize: 30 }}>{item.likes.length >= 1000 ? Math.floor(item.likes.length / 1000) + "K" : item.likes.length}</Text>
                                        </Animated.View>
                                    </TouchableWithoutFeedback>
                                </Animated.View>
                                {/* FIN BLOC LIKES */}
                                {/* BLOC COMMENTS */}
                                <Animated.View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                                    <Ionicons name="md-text" style={{ fontSize: 50 }}></Ionicons>
                                    <Text style={{ fontSize: 30 }}>{item.comments.length >= 1000 ? Math.floor(item.comments.length / 1000) + "K" : item.comments.length}</Text>
                                </Animated.View>
                                {/* FIN BLOC COMMENTS */}
                            </Animated.View>


                            <Animated.View style={{ flexDirection: "row", flex: 1, height: "50%", marginTop: "2%", justifyContent: "center" }}>

                            </Animated.View>


                            <Animated.View>
                                <Text>Description lorem ipsum .......................</Text>
                            </Animated.View>

                        </Animated.View>
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                        key={item.id} style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute', borderRadius: 20
                        }]}>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
                        </Animated.View>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
                        </Animated.View>
                        <Animated.View style={{ height: "5%", width: "100%", backgroundColor: "white", justifyContent: "center", }}>
                            <Text style={{ color: 'black', textDecorationLine: "underline", fontSize: 25, fontWeight: '400', padding: 10, textAlign: "center" }}>Artist Name</Text>
                        </Animated.View>

                        <Animated.View style={{ height: "80%" }}>
                            <Image
                                style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }}
                                source={{ uri: "http://172.20.10.2:8000/" + item.url }} />
                        </Animated.View>

                        <Animated.View style={{ height: "15%", width: "100%", backgroundColor: "transparent", flex: 1, flexDirection: "column" }}>
                            <Animated.View style={{ flex: 1, flexDirection: "row", height: "50%", justifyContent: "space-between" }}>
                                {/* BLOC LIKES */}
                                <Animated.View style={{ flex: 1 }}>
                                    <TouchableWithoutFeedback style={{}} onPress={() => this.toggleLike(item.id)}>
                                        <Animated.View style={{ flexDirection: "row" }}>
                                            <Ionicons name={this.state.post.likes.liked ? "md-heart" : "md-heart-empty"} style={{ fontSize: 30 }}></Ionicons>
                                            <Text style={{ fontSize: 30 }}>{item.likes.length >= 1000 ? Math.floor(item.likes.length / 1000) + "K" : item.likes.length}</Text>
                                        </Animated.View>
                                    </TouchableWithoutFeedback>
                                </Animated.View>
                                {/* FIN BLOC LIKES */}
                                {/* BLOC COMMENTS */}
                                <Animated.View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                                    <Ionicons name="md-text" style={{ fontSize: 50 }}></Ionicons>
                                    <Text style={{ fontSize: 30 }}>{item.comments.length >= 1000 ? Math.floor(item.comments.length / 1000) + "K" : item.comments.length}</Text>
                                </Animated.View>
                                {/* FIN BLOC COMMENTS */}
                            </Animated.View>

                            <Animated.View style={{ flexDirection: "row", flex: 1, height: "50%", justifyContent: "center" }}>
                            </Animated.View>
                        </Animated.View>

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
        if (this.state.postLoaded) {
            console.log("SUCCESS : " + Posts);
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {this.renderPosts()}
                    </View>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text>Loading ...</Text>
                </View>
            )
        }
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
        fontSize: 17,
        textDecorationLine: "underline",
        color: "black",
    },
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        feed: state.auth.feed
    }
}

export default connect(mapStateToProps, { GetFeed })(ActualityScreen)
