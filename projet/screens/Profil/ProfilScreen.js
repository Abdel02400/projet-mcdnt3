import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';

export default class ProfilScreen extends Component {
  render() {
    return(
        <View>

        </View>
    );
  }
}

ProfilScreen.navigationOptions = {
  headerTitle: (
      <HeaderScreen title={'Mon profil'} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
