import logo from './logo.svg';
import './App.css';
import MetamaskConnection from './components/MetamaskConnection/MetamaskConnection';
import React from 'react';

const App = () => {
  return (
    <div className= 'container'>
      <MetamaskConnection/>
    </div>
  )
}

export default App;
