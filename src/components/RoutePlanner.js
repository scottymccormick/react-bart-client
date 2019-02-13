import React, { Component } from 'react';
import RouteForm from '../containers/RouteForm';
import axios from 'axios';
import RouteResults from '../containers/RouteResults';

class RoutePlanner extends Component {
  constructor() {
    super();

    this.state = {
      origin: '',
      destination: '',
      stations: [],
      routes: [],
      searched: false
    }
  }
  handleInput = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    console.log('reached route planner form submit');

    const urlString = `http://localhost:9000/api/routes?orig=${this.state.origin}&dest=${this.state.destination}`;

    this.setState({
      searched: true
    });

    axios.get(urlString)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          this.setState({
            routes: response.data.request.trip
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.setState({
      searched: false
    })
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
        {this.state.searched ?
          (this.state.routes.length > 0 ? 
          <RouteResults results={this.state.routes} /> : <p>Loading...</p>)
          : null }
      </div>
    )
  }
}

export default RoutePlanner;