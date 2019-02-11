import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>BART React App</h1>
        <Login />
      </div>
    );
  }
}

export default App;
