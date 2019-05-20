import React from 'react';
import Navigation from './src/router/router';
import GlobalProvider, { GlobalConsumer } from './src/contexts/Context';

// Render Pertama Kali Taruh disini!
const App = (props) => {
  return(
      <Navigation {...props} />
  )
}

export default 
GlobalProvider(
  GlobalConsumer(
    App
  )
);