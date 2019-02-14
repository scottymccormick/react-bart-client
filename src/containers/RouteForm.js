import React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';

const RouteForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit} className="bg-light">
      <FormGroup>
        <Label>Origin:</Label>
        <select className="custom-select custom-select-md" name="origin" value={props.formInfo.origin} onChange={props.handleInput}>
          <option key={-1} value="">Please choose a station</option>
          {props.formInfo.stations.map((station, i) => {
            return <option key={i} value={station.abbr}>{station.name}</option>
          })}
        </select>
      </FormGroup>
      <FormGroup>
        <Label>Destination:</Label>
        <select className="custom-select custom-select-md" name="destination" value={props.formInfo.destination} onChange={props.handleInput}>
          <option key={-1} value="">Please choose a station</option>
          {props.formInfo.stations.map((station, i) => {
            return <option key={i} value={station.abbr}>{station.name}</option>
          })}
        </select>
      </FormGroup>
      <input type="submit" value="Submit"/>
    </Form>
  )
}

export default RouteForm;