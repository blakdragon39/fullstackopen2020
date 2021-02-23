import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from './TextInput';
import Button from './Button';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.spacing}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}/>
            <TextInput
                style={styles.spacing}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}/>
            <Button
                title="Sign In"
                onPress={() => console.log("yay!")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    spacing: {
        marginBottom: 8,
    },
});

SignIn.options = {
    topBar: {
        title: {
            text: 'Sign In',
        },
    },
};

export default SignIn;
