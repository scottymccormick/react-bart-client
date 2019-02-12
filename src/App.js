import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged: false,
      email: '',
      showLogin: false,
      showRegistration: false
    }
  }
  handleLogin = (user) => {
    console.log('handle login reached');
    console.log('user', user)
    this.setState({
      logged: true,
      email: user.email,
      showLogin: false,
      showRegistration: false
    });
  }
  handleLogoutClick = (e) => {
    console.log('reached logout');
    axios.get('http://localhost:9000/api/users/logout')
      .then((response) => {
        console.log('logout response',response);
        this.setState({
          logged: false,
          email: ''
        });
      })
  }
  toggleLoginModal = () => {
    this.setState({showLogin: !this.state.showLogin});
  }
  toggleRegistrationModal = () => {
    this.setState({showRegistration: !this.state.showRegistration});
  }
  render() {
    return (
      <div className="App">
        <h1>BART React App</h1>
        {!this.state.showLogin && !this.state.logged ? 
          <div>
            <button onClick={this.toggleLoginModal}>Login</button>
          </div> : null}
        
        {!this.state.showRegistration && !this.state.logged ? 
          <div>
            <button onClick={this.toggleRegistrationModal}>Register</button>
          </div> : null}
        {this.state.showLogin ?
          <Login handleLogin={this.handleLogin} handleLogout={this.handleLogout} currentUser={this.state}/> : null}
        {this.state.showRegistration ? 
          <Registration handleLogin={this.handleLogin} /> : null }
        {this.state.logged ? 
          <div>
            <p>{this.state.email} is logged in.</p><br/>
            <button onClick={this.handleLogoutClick}>Logout</button>
          </div> : null }
      </div>
    );
  }
}

export default App;
