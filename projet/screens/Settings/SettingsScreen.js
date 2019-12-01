import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';

export default class SettingsScreen extends Component {
  render() {
    return(
        <View>

        </View>
    );
  }
}

SettingsScreen.navigationOptions = {
  headerTitle: (
      <HeaderScreen title={'Mes paramètres'} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
