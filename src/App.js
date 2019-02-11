import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged: false,
      email: ''
    }
  }
  handleLogin = (user) => {
    console.log('handle login reached');
    console.log('user', user)
    this.setState({
      logged: true,
      email: user.email
    });
  }
  render() {
    return (
      <div className="App">
        <h1>BART React App</h1>
        <Login handleLogin={this.handleLogin}/>
        {this.state.logged ? <p>{this.state.email} is logged in.</p> : null }
      </div>
    );
  }
}

export default App;
