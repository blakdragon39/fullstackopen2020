import React from 'react';
import Main from './components/Main';
import { NativeRouter } from 'react-router-native';

const App: () => React$Node = () => {
  return (
      <NativeRouter>
        <Main />
      </NativeRouter>
  );
};

export default App;
