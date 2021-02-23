import React from 'react';
import { Text } from 'react-native';

const SignIn = () => {
    return <Text>Sign in screen</Text>;
};

SignIn.options = {
    topBar: {
        title: {
            text: 'Sign In',
        },
    },
};

export default SignIn;
