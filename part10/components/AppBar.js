import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
    text: {
        color: '#ffffff',
        padding: 16,
    },
});

const AppBarTab = ({ text }) => (
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
        </View>
    );
};

export default AppBar;
