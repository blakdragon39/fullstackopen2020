import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        padding: 12,
        borderRadius: 6,
    },
    text: {
        color: '#ffffff',
    },
});

const Button = ({ title, color, style, ...props }) => {
    const buttonStyle = [
        styles.button,
        style,
    ];

    return (
        <TouchableOpacity style={buttonStyle} {...props}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
