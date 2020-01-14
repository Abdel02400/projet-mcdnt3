import React, { Component } from "react";
import {View, TouchableHighlight, StyleSheet, SafeAreaView, Text, Platform, Button} from "react-native";
export default class ButtonField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            titleText,
            titleTextSize,
            textColor,
            buttonColor,
            onPress,
            heightButton,
            borderColor
        } = this.props;
        const color = textColor || 'white';
        const fontSize = titleTextSize || 14;
        const buttonColorBackground = buttonColor || 'white';
        const heightButtonValue = heightButton || 50;
        const borderColorValue = borderColor || 'black'
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <View>
                        <TouchableHighlight
                            style={{ backgroundColor: buttonColorBackground, height: heightButtonValue, justifyContent: 'center',
                                alignItems: 'center', borderColor: borderColorValue, borderWidth: 1, borderRadius: 5, }}
                            onPress={onPress}
                        >
                            <Text style={{fontSize: fontSize, color: color, textAlign: 'center'}}>{titleText}</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});