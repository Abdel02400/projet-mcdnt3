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
        const heightButtonValue = heightButton || 30;
        const borderColorValue = borderColor || 'black'
        return (
            <View style={styles.container}>
                {Platform.OS === "ios" &&
                <SafeAreaView>
                    <View>
                        <TouchableHighlight
                            style={{ backgroundColor: buttonColorBackground, height: heightButtonValue, justifyContent: 'center',
                                alignItems: 'center', borderColor: borderColorValue, borderWidth: 1 }}
                            onPress={onPress}
                        >
                            <Text style={{fontSize: fontSize, color: color, textAlign: 'center'}}>{titleText}</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
                }
                {Platform.OS === "android" &&
                <Button
                    title={titleText}
                    color={buttonColorBackground}
                    style={{fontSize: fontSize, textAlign: 'center', height: heightButtonValue, justifyContent: 'center',
                        alignItems: 'center', borderColor: borderColorValue, borderWidth: 1  }}
                    onPress={onPress}
                />
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: 350
    },
});