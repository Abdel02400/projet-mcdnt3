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
  TouchableWithoutFeedback, FlatList, Modal, TouchableOpacity, Platform
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import AuthService from "../../utils/AuthService";
import { connect } from "react-redux";
import { countElement } from "../../utils/GlobalSettings";
import { Spinner } from "../../components/Spinner";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {UpdateProfil} from "../../actions";
import {addPhoto} from "../../actions";
import ButtonField from "../../components/ButtonField";

class ProfilScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      avatar: null,
      profilePictureModalVisible: false,
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
  };

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
    if(nextProps.isaddPhoto) await this.setProfilePictureModalNotVisible();
    this.setState({
      ...this.state,
      user: nextProps.user,
      images: nextProps.user.posts
    });
  }

  /*askPermissionsAsync = async () => {
    const {status: cameraPermission} = await Permissions.askAsync(Permissions.CAMERA);
    const {status: cameraRollPermission} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
    alert("Permissions demandées");
  };*/

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

    if(this.state.add === 'addAvatar'){
      this.setState({
        ...this.state,
        avatar: result.uri,
      });
    }


    if(this.state.add === 'addAvatar') this.props.UpdateProfil(result, this.state.userId);
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

    if(this.state.add === 'addAvatar'){
      this.setState({
        ...this.state,
        avatar: result.uri,
      });
    }

    if(this.state.add === 'addAvatar') this.props.UpdateProfil(result, this.state.userId);
    else this.props.addPhoto(result, this.state.userId);
  }

  setProfilePictureModalVisible(add) {
    this.setState({ ...this.state,
      profilePictureModalVisible: true,
      add: add
    });
  }

  setProfilePictureModalNotVisible() {
    this.setState({ ...this.state, profilePictureModalVisible: false });
  }

  _goToPost(idImage) {
    // TODO : Chemin vers le post concerné
    alert("Go To image Post number " + idImage);
  }

  _renderModal() {
    if (this.props.loading){
      return <Spinner/>
    }
    return (
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
    )
  }

  _renderButton() {
    if(this.props.loading) return <Spinner />
    return (
        <View style={styles.btnAdd}>
          <ButtonField
              titleText="ajouter une photo"
              titleTextSize={15}
              textColor={'black'}
              buttonColor={'white'}
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
          <View style={{ alignItems: "center", marginTop: 5 }}>
            <View style={styles.profileImage}>
              <TouchableWithoutFeedback onLongPress={() => this.setProfilePictureModalVisible('addAvatar')} style={styles.touchableOpacity}>
                <Image source={{ uri : this.state.avatar}} style={styles.image} resizeMode="center"/>
              </TouchableWithoutFeedback>
            </View>
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
            { this._renderModal() }
          </Modal>

          <Text style={styles.descriptionBloc}>{this.state.user.description}</Text>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{this.state.user.firstname} {this.state.user.lastname}</Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.user.role}</Text>
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

          <View>
            { this._renderButton() }
          </View>

          <SafeAreaView style={styles.imageList}>
            <ScrollView style={styles.container}>
              <FlatList style={styles.flatListStyle} keyExtractor={(item, index) => index.toString()} data={this.state.images} numColumns={3} renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableHighlight focusedOpacity={0} onPress={() => this._goToPost(item.id)}>
                      <Image style={styles.imageListItem} source={{ uri : "http://172.20.10.2:8000/" + item.url }} />
                    </TouchableHighlight>
                  </View>
                )
              }
              } />
            </ScrollView>
          </SafeAreaView>


          {/* TODO : Itérer sur les photos en base de données utilisateur
              TODO : Rendre les images cliquables - FAIT
          <View style={{ marginTop: 32 }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
              <TouchableHighlight activeOpacity={0}  focusedOpacity={0} onPress={() => this._goToPost(1)} style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this._goToPost(2)} style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this._goToPost(3)} style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this._goToPost(4)} style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media4.jpg")} style={styles.image} resizeMode="cover"></Image>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this._goToPost(5)} style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media5.jpg")} style={styles.image} resizeMode="cover"></Image>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this._goToPost(6)} style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media6.jpg")} style={styles.image} resizeMode="cover"></Image>
              </TouchableHighlight>
            </ScrollView>
                <View style={styles.mediaCount}>
                  <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                  <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
            </View>
          </View>*/}
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
    margin: 5,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    textAlign: 'center'
  },
  imageList: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginTop: 10,
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
    marginTop: 16
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
    backgroundColor: "transparent",
    borderRadius: 0
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
  btnAdd : {
    margin: 10,
    marginTop: 30
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

