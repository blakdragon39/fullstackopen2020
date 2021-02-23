import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import RepositoryList from './components/RepositoryList';

const App = (props) => {
    const navigateToSignIn = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'SignInScreen',
            },
        });
    };

    return (
        <View>
            <Button
                style={styles.navigation}
                title="Sign In"
                onPress={navigateToSignIn}/>
            <RepositoryList/>
        </View>
    );
};

const styles = StyleSheet.create({
    navigation: {
        margin: 16,
    },
});

App.options = {
    topBar: {
        title: {
            text: 'Repository List',
        },
    },
};

export default App;
