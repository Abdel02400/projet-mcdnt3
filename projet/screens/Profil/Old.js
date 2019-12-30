import {Image, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

{/* Section About
              TODO : Connecter a la base de données : Posts, Followers, guests*/}
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