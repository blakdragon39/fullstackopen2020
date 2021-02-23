import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    textInput: {
        borderColor: theme.colors.textPrimary,
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    },
});

const TextInput = ({ style, ...props }) => {
    const textInputStyle = [
        styles.textInput,
        style,
    ];

   return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
