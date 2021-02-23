import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/sign-in" exact>
                    <SignIn />
                </Route>
                <Route path="/repositories" exact>
                    <RepositoryList />
                </Route>
                <Redirect to="/repositories" />
            </Switch>
        </View>
    );
};

export default Main;
