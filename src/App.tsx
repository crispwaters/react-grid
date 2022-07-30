import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Grid from './Grid'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Grid></Grid>
      </header>
    </div>
  );
}

export default App;
