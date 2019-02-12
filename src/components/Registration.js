import React, { Component } from 'react';
import RegistrationForm from '../containers/RegistrationForm';

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
  }
  render() {
    console.log(this.state)
    return (
      <RegistrationForm handleChange={this.handleChange} user={this.state} handleSubmit={this.handleSubmit}/>
    )
  }
}

export default Registration;