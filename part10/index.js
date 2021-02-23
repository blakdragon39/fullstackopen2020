import { Navigation } from "react-native-navigation";
import App from './App';
import SignIn from './components/SignIn';
import theme from './theme';

Navigation.registerComponent('HomeScreen', () => App);
Navigation.registerComponent('SignInScreen', () => SignIn);

Navigation.setDefaultOptions({
    statusBar: {
        backgroundColor: theme.colors.textPrimary,
    },
    topBar: {
        title: {
            color: 'white',
        },
        backButton: {
            color: 'white',
        },
        background: {
            color: theme.colors.textPrimary,
        },
    },
});


Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'HomeScreen',
                        },
                    },
                ],
            },
        },
    });
});
