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
    console.log('submitted');
    axios.post('http://localhost:9000/api/users/login', this.state)
      .then((response) => {
        console.log(response);
        this.props.handleLogin(this.state);
        this.setState({
          email: '',
          password: ''
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleLogoutClick = (e) => {
    console.log('reached logout');
    axios.get('http://localhost:9000/api/users/logout')
      .then((response) => {
        console.log(response);
        this.props.handleLogout();
      })
  }
  render() {

    console.log(this.state);
    return (
      <LoginForm handleInput={this.handleInput} handleSubmit={this.handleSubmit} handleLogoutClick={this.handleLogoutClick} email={this.state.email} password={this.state.password}/>
    )
  }
}

export default Login;