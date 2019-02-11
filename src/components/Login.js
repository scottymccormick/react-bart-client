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
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {

    console.log(this.state);
    return (
      <LoginForm handleInput={this.handleInput} handleSubmit={this.handleSubmit}/>
    )
  }
}

export default Login;