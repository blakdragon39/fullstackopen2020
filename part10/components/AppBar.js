import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.textPrimary,
    },
    text: {
        color: '#ffffff',
        padding: 16,
    },
});

const AppBarTab = ({ text, screenComponent }) => (
    <TouchableWithoutFeedback>
        <Text
            style={styles.text}
            fontWeight="bold"
            fontSize="subheading">
            { text }
        </Text>
    </TouchableWithoutFeedback>
);

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab text="Repositories" />
            <AppBarTab text="Sign In" />
        </View>
    );
};

export default AppBar;
