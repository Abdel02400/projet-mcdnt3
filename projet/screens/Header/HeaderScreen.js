import React, { Component } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class HeaderScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.headerTitle}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerTitle : {
        fontSize: 25
    }
});
