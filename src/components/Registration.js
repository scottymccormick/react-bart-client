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
    axios.post(`${process.env.REACT_APP_API}/api/users/register`, this.state)
      .then((response) => {
        this.props.handleLogin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <RegistrationForm handleChange={this.handleChange} user={this.state} handleSubmit={this.handleSubmit} toggleRegistrationModal={this.props.toggleRegistrationModal} showRegistration={this.props.showRegistration}/>
    )
  }
}

export default Registration;