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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default class ProfilScreen extends Component {
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

  componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
  }


  _logout = () => {
    AuthService.logout();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
            <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
          </View>

          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image source={require("../../assets/images/profile-pic.png")} style={styles.image} resizeMode="center"></Image>
            </View>
            <View style={styles.dm}>
              <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
            </View>
            <View style={styles.active}></View>
            <View style={styles.add}>
              <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Blondy</Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Tatoo Artist</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
              <Text style={[styles.text, styles.subText]}>Posts</Text>
            </View>
            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
              <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
              <Text style={[styles.text, styles.subText]}>Followers</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
              <Text style={[styles.text, styles.subText]}>Following</Text>
            </View>
          </View>

          {/* TODO : Itérer sur les photos en base de données utilisateur  
              TODO : Rendre les images cliquables */}
          <View style={{ marginTop: 32 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media4.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media5.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../../assets/images/media6.jpg")} style={styles.image} resizeMode="cover"></Image>
              </View>
            </ScrollView>
            {/*    <View style={styles.mediaCount}>
                  <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                  <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
            </View> */}
          </View>

          {/* Section About */}
          <Text style={[styles.subText, styles.recent]}>About</Text>
          <View style={{ alignItems: "center" }}>
            <View style={styles.recentItem}>
              <View style={styles.containerAboutIcons}>
                <Ionicons name="ios-home" size={48} color="#DFD8C8" style={styles.aboutIcons}></Ionicons>
              </View>
              <View style={[styles.aboutText, { width: 250 }]}>
                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                  Works in <Text style={styles.aboutCity}>Brussels</Text> - <Text style={styles.aboutCountry}>Belgium</Text>
                </Text>
              </View>
            </View>


            {/* Shop du Tatoueur */} 
            {/* TODO : Connecter a la base de données */}
            <View style={styles.recentItem}>
              <View style={styles.containerAboutIcons}>
                <Ionicons name="ios-briefcase" size={48} color="#DFD8C8" style={styles.aboutIcons}></Ionicons>
              </View>
              <View style={[styles.aboutText, { width: 250 }]}>
                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                  Works at <Text style={styles.aboutShop}>La Cave</Text>
                </Text>
              </View>
            </View>
          </View>


          <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
          <View style={{ alignItems: "center" }}>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                  Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                </Text>
              </View>
            </View>

            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                  Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                </Text>
              </View>
            </View>
          </View>


          {/*TODO : Rendre les éléments cliquables */}
          <Text style={[styles.subText, styles.recent]}>Store</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image source={require("../../assets/images/flash1.jpg")} style={styles.image} resizeMode="cover"></Image>
              <Text>
                <Text style={styles.price}>100</Text>
                <Text style={styles.unit}>$</Text>
              </Text>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require("../../assets/images/flash2.jpg")} style={styles.image} resizeMode="cover"></Image>
              <Text>
                <Text style={styles.price}>200</Text>
                <Text style={styles.unit}>$</Text>
              </Text>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require("../../assets/images/flash3.jpg")} style={styles.image} resizeMode="cover"></Image>
              <Text>
                <Text style={styles.price}>300</Text>
                <Text style={styles.unit}>$</Text>
              </Text>
            </View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
    color: "#52575D"
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
    width: 200,
    height: 200,
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
    marginHorizontal: 10
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
  }
});
