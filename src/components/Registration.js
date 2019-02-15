import React, { Component } from 'react';
import RegistrationForm from '../containers/RegistrationForm';
import axios from 'axios';

class Registration extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      password: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('registration submit reached');
    axios.post(`${process.env.REACT_APP_API}/api/users/register`, this.state)
      .then((response) => {
        console.log('register response', response);
        this.props.handleLogin(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state)
    return (
      <RegistrationForm handleChange={this.handleChange} user={this.state} handleSubmit={this.handleSubmit} toggleRegistrationModal={this.props.toggleRegistrationModal} showRegistration={this.props.showRegistration}/>
    )
  }
}

export default Registration;