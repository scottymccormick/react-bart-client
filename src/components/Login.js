import React, { Component } from 'react';
import LoginForm from '../containers/LoginForm';

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
  }
  render() {

    console.log(this.state);
    return (
      <LoginForm handleInput={this.handleInput} handleSubmit={this.handleSubmit}/>
    )
  }
}

export default Login;