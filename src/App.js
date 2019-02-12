import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';

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
  handleLogout = () => {
    this.setState({
      logged: false,
      email: ''
    });
  }
  render() {
    return (
      <div className="App">
        <h1>BART React App</h1>
        <Login handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
        {this.state.logged ? <p>{this.state.email} is logged in.</p> : null }
        <Registration handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default App;
