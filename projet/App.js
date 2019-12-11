import React, { Component } from 'react';
import {
  Platform, StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Login from './screens/Login/Login';
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
    let isLogged = await AuthService.loggedIn()
    this.setState({
      isLogged: isLogged
    });
  }

  render() {
    if(this.state.isLogged)
    {
      return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
      );
    }else {
      return(
          <View style={styles.container}>
            <Login />
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

