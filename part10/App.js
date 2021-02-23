import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Button from './components/Button';
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
                style={styles.button}
                title="Sign In"
                onPress={navigateToSignIn}/>
            <RepositoryList/>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 8,
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
