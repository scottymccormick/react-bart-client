import React, { Component } from 'react';
import LoginForm from '../containers/LoginForm';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }
  handleInput = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/api/users/login`, this.state)
      .then((response) => {
        this.props.handleLogin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <LoginForm handleInput={this.handleInput} handleSubmit={this.handleSubmit} handleLogoutClick={this.handleLogoutClick} email={this.state.email} password={this.state.password} currentUser={this.props.currentUser} toggleLoginModal={this.props.toggleLoginModal} showLogin={this.props.showLogin}/>
    )
  }
}

export default Login;