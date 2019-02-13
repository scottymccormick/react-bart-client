import React, { Component } from 'react';
import RouteForm from '../containers/RouteForm';
import axios from 'axios';

class RoutePlanner extends Component {
  constructor() {
    super();

    this.state = {
      origin: '',
      destination: '',
      stations: []
    }
  }
  handleInput = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    console.log('reached route planner form submit')
  }
  componentDidMount() {
    axios.get('http://localhost:9000/api/stations')
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            stations: response.data
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <h2>Route Planner</h2>
        <RouteForm handleSubmit={this.handleSubmit} handleInput={this.handleInput} formInfo={this.state}/>
        <button onClick={this.props.hideRoutePlanner}>Close</button>
      </div>
    )
  }
}

export default RoutePlanner;