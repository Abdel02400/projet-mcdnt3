import React, { Component } from 'react';
import {
  Platform, StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AppNavigator from "./navigation/AppNavigator";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <View style={styles.container}>
          <AppNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

