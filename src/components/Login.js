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
  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('submitted');
      const response = await axios('http://localhost:9000/');
      console.log(response);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  render() {

    console.log(this.state);
    return (
      <LoginForm handleInput={this.handleInput} handleSubmit={this.handleSubmit}/>
    )
  }
}

export default Login;