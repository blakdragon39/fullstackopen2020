import React from 'react';
import Main from './components/Main';
import theme from './theme';

const App = () => {
  return <Main />;
};

App.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white',
    },
    background: {
      color: theme.colors.textPrimary,
    },
  },
};

export default App;
