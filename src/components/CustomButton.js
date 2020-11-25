import React, {useState}from 'react'
import {Text, StyleSheet, View, Image, TextInput, SafeAreaView, Button, Alert, TouchableOpacity} from 'react-native';


const CustomButton = props => {
    return (
        <TouchableOpacity  style={{height: 60, marginTop: 2}}onPress={props.onPress}>
            <View style={{ ...styles.button, ...props.style}}>
                <Text style={{...styles.buttonText, ...props.textStyling}}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    button: {
        backgroundColor: "#7C1F44",
        borderRadius: 25
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18
    }
});

export default CustomButton