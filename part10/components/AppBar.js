import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.textPrimary,
    },
    tab: {
        color: '#ffffff',
        padding: 16,
    },
});

const AppBarTab = ({ text }) => (
    <TouchableHighlight onPress={() => {}}>
        <Text
            style={styles.tab}
            fontWeight="bold"
            fontSize="subheading">
            { text }
        </Text>
    </TouchableHighlight>
);

const AppBar = () => {
    return (
        <View style={styles.container}>
            <Link
                to="/repositories"
                component={AppBarTab}
                text="Repositories" />
            <Link
                to="/sign-in"
                component={AppBarTab}
                text="Sign In" />
        </View>
    );
};

export default AppBar;
