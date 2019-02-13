import React from 'react';

const RouteForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Origin:
        <select name="origin" value={props.formInfo.origin} onChange={props.handleInput}>
          <option key={-1} value="">Please choose a station</option>
          {props.formInfo.stations.map((station, i) => {
            return <option key={i} value={station.abbr}>{station.name}</option>
          })}
        </select>
      </label><br/>
      <label>
        Destination:
        <select name="destination" value={props.formInfo.destination} onChange={props.handleInput}>
          <option key={-1} value="">Please choose a station</option>
          {props.formInfo.stations.map((station, i) => {
            return <option key={i} value={station.abbr}>{station.name}</option>
          })}
        </select>
      </label><br/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

export default RouteForm;