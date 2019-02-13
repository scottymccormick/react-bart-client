import React, { Component } from 'react';
import RouteForm from '../containers/RouteForm';

class RoutePlanner extends Component {
  render() {
    return (
      <div>
        <h2>Route Planner</h2>
        <RouteForm />
        <button onClick={this.props.hideRoutePlanner}>Close</button>
      </div>
    )
  }
}

export default RoutePlanner;