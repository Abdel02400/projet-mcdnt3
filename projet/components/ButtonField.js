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
            onPress
        } = this.props;
        const color = textColor || 'white';
        const fontSize = titleTextSize || 14;
        const buttonColorBackground = buttonColor || 'white';
        return (
            <View>
                {Platform.OS === "ios" &&
                <SafeAreaView>
                    <View style={styles.wrapper}>
                        <TouchableHighlight
                            style={[
                                { backgroundColor: buttonColorBackground},
                                styles.buttonField
                            ]}
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
                    style={{fontSize: fontSize, textAlign: 'center'}}
                    onPress={onPress}
                />
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        display: "flex"
    },
    buttonField : {
        height: 50
    }
});