import React from 'react';
import Main from './components/Main';
import { NativeRouter } from 'react-router-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

ReceiveSharingIntent.getReceivedFiles(
    (files) => {
        console.log("received", files);
    },
    (error) => {
        console.log(error);
    },
    'ShareMedia.com.part10.spike'
);

const App: () => React$Node = () => {
  return (
      <NativeRouter>
        <Main />
      </NativeRouter>
  );
};

export default App;
