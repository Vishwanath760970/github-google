import React, { Component } from 'react';

import './App.css';
import Navbar from './Components/layout/Navbar';

class App extends Component {
  render() {
    const name = 'John doe';
    return (
      <div className='App'>
        <Navbar />
      </div>
    );
  }
}

export default App;
