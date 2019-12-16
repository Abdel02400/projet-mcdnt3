import React, { Component } from 'react';
import {
  Platform, StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AuthService from "./utils/AuthService";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  async componentWillMount() {
    let isLogged = await AuthService.loggedIn();
  }

  render() {
    return(
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
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

