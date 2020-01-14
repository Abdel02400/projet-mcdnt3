import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  Dimensions,
  FlatList,
  Modal, TouchableOpacity
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import AuthService from "../../utils/AuthService";
import { connect } from "react-redux";
import { countElement } from "../../utils/GlobalSettings";
import { Spinner } from "../../components/Spinner";
import * as ImagePicker from 'expo-image-picker';
import { UpdateProfil } from "../../actions";
import { addPhoto } from "../../actions";
import ButtonField from "../../components/ButtonField";
import { Ionicons } from "@expo/vector-icons";

class ProfilScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      avatar: null,
      profilePictureModalVisible: false,
      photoModal: false,
      userId: null,
      add: null,
      images: null
    };
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
      headerTitle: () => <HeaderScreen title={'Mon profil'} />,
      headerRight: () => (
        <IconMat
          name="logout"
          size={35}
          onPress={navigation.getParam('logout')}
        />
      ),
      headerStyle: { height: 40 }
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({ logout: this._logout });
    let avatar = "http://172.20.10.2:8000/" + this.props.userId + "-" + this.props.user.avatar;
    this.setState({
      ...this.state,
      user: this.props.user,
      profilePictureModalVisible: false,
      avatar: avatar,
      userId: this.props.user._id,
      images: this.props.user.posts
    });

  }

  async componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.isaddPhoto && nextProps.user.posts) await this.setProfilePictureModalNotVisible();
    this.setState({
      ...this.state,
      user: nextProps.user,
      images: nextProps.user.posts
    });
  }

  async updateProfileImageFromGallery() {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false
    });


    if (result.cancelled) {
      this.setState({
        ...this.state,
        avatar: 'none',
      })
    }

    if (this.state.add === 'addAvatar') {
      this.setState({
        ...this.state,
        avatar: result.uri,
      });
    }


    if (this.state.add === 'addAvatar') this.props.UpdateProfil(result, this.state.userId);
    else this.props.addPhoto(result, this.state.userId);

  }

  async updateProfilePictureFromCamera() {
    // Montre la camera et attend que l'utilisateur prenne une pic
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      this.setState({
        ...this.state,
        avatar: 'none',
      });
      return;
    }

    if (this.state.add === 'addAvatar') {
      this.setState({
        ...this.state,
        avatar: result.uri,
      });
    }

    if (this.state.add === 'addAvatar') this.props.UpdateProfil(result, this.state.userId);
    else this.props.addPhoto(result, this.state.userId);
  }

  setProfilePictureModalVisible(add) {
    this.setState({
      ...this.state,
      profilePictureModalVisible: true,
      add: add
    });
  }

  setProfilePictureModalNotVisible() {
    this.setState({ ...this.state, profilePictureModalVisible: false });
  }

  _goToPost(idImage) {
    alert("Go To image Post number " + idImage);
  }

  _renderModal() {
    if (this.props.loadingAddPhoto) {
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
          <Ionicons name="md-camera" style={{ fontSize: 50 }}/>
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
    if (this.props.loadingAddPhoto) return <Spinner />
    return (
      <View style={styles.btnAdd}>
        <ButtonField
          titleText="Ajouter une Photo"
          titleTextSize={15}
          textColor={'white'}
          buttonColor={'black'}
          onPress={() => this.setProfilePictureModalVisible('addPhoto')}
        />
      </View>
    )
  }

  _logout = () => {
    AuthService.logout();
    this.props.navigation.navigate('Auth');
  };

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: "center", width: "100%" }}>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={() => this.setProfilePictureModalVisible('addAvatar')}>
              <Image source={{ uri: this.state.avatar }} style={styles.avatar} />
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

          <View style={styles.infoContainer}>
            <Text style={[styles.textMiddle, { fontWeight: "200", fontSize: 36 }]}>{this.state.user.firstname} {this.state.user.lastname}</Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.user.role === "tatoué" ? "Tatoué" : "Tatoueur"}</Text>
          </View>
          <View style={styles.descriptionBloc}>
            <Text style={styles.textMiddle}>{this.state.user.description}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{countElement(this.state.user.posts)}</Text>
              <Text style={[styles.text, styles.subText]}>Posts</Text>
            </View>
            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
              <Text style={[styles.text, { fontSize: 24 }]}> {countElement(this.state.user.followers)} </Text>
              <Text style={[styles.text, styles.subText]}>Followers</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{countElement(this.state.user.following)}</Text>
              <Text style={[styles.text, styles.subText]}>Following</Text>
            </View>
          </View>

          {this._renderButton()}

          <SafeAreaView style={styles.imageList}>
            <ScrollView>
              {countElement(this.state.images) > 0 &&
                <FlatList style={styles.flatListStyle} keyExtractor={(item, index) => index.toString()} data={this.state.images} numColumns={3} renderItem={({ item, index }) => {
                  return (
                      <View>
                        <TouchableHighlight focusedOpacity={0} onPress={() => this._goToPost(item.id)}>
                          <Image style={styles.imageListItem} source={{ uri: "http://172.20.10.2:8000/" + item.url }} />
                        </TouchableHighlight>
                      </View>
                  )
                }
                } />
              }
              {countElement(this.state.images) === 0 &&
                  <View style={styles.noPhotoBloc}>
                    <Text style={styles.noPhotoText}>Aucune photo ajoutée...</Text>
                  </View>
              }
            </ScrollView>
          </SafeAreaView>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionBloc: {
    borderColor: 'black',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    margin: 10,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMiddle: {
    textAlign: 'center',
    color: "black"
  },
  imageList: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'grey',
    minHeight: 100,
  },
  imageListItem: {
    width: (Dimensions.get('window').width / 3) - 10,
    height: 150,
    margin: 5,
  },
  flatListStyle: {
    flex: 1,
  },
  text: {
    color: "#52575D"
  },
  updateButton: {
    marginTop: 15,
    flexDirection: "row",
    alignSelf: "center",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
    backgroundColor: "transparent"
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  price: {
    color: "black"
  },
  unit: {
    color: "black"
  },
  aboutIcons: {
    fontSize: 30,
    marginRight: 8,
    bottom: 4
  },
  containerAboutIcons: {
    alignSelf: "center",
    alignItems: "center",

  },
  aboutText: {
    marginLeft: 10
  },
  aboutCity: {
    fontWeight: "400",
    color: "black"
  },
  aboutCountry: {
    fontWeight: "500",
    color: "black"
  },
  aboutShop: {
    fontWeight: "400",
    color: "blue",
    textDecorationLine: "underline"
  },
  touchableOpacity: {
    backgroundColor: "black",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 50,
    height: 40
  },
  modalProfilePictureIcons: {
    fontSize: 60
  },
  modalProfilePictureContainer: {
    width: 100,
    marginTop: "10%",
    marginBottom: "10%"
  },
  profilePictureModalTitle: {
    textAlign: "center",
    fontSize: 30
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#E1E2E6",
    borderRadius: 75,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'black'
  },
  btnAdd: {
    margin: 10,
    marginTop: 20
  },
  noPhotoText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Cochin',
    textAlign: 'center'
  },
  noPhotoBloc: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userId: state.auth.userId,
    loading: state.auth.loading,
    isaddPhoto: state.auth.isaddPhoto,
  }
};

export default connect(mapStateToProps, { UpdateProfil, addPhoto })(ProfilScreen)

