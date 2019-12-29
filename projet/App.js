import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import AppNavigator from "./navigation/AppNavigator";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

export default class App extends Component {
  render() {
    return(
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

