import React from 'react';
import { Form, FormGroup, Label, Button, Row, Col } from 'reactstrap';

const RouteForm = (props) => {
  return (
    <div>
      <Form onSubmit={props.handleSubmit} className="bg-light p-2">
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>Origin:</Label>
              <select className="custom-select custom-select-md" name="origin" value={props.formInfo.origin} onChange={props.handleInput}>
                <option key={-1} value="">Please choose a station</option>
                {props.formInfo.stations.map((station, i) => {
                  return <option key={i} value={station.abbr}>{station.name}</option>
                })}
              </select>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Destination:</Label>
              <select className="custom-select custom-select-md" name="destination" value={props.formInfo.destination} onChange={props.handleInput}>
                <option key={-1} value="">Please choose a station</option>
                {props.formInfo.stations.map((station, i) => {
                  return <option key={i} value={station.abbr}>{station.name}</option>
                })}
              </select>
            </FormGroup>
          </Col>
        </Row>
        { props.formInfo.origin === '' || props.formInfo.destination === '' || props.formInfo.origin === props.formInfo.destination ? 
          <Button color="success" type="submit" disabled>Submit</Button> : 
          <Button color="success" type="submit" >Submit</Button>  }
        
        <Button color="light" onClick={props.clearForm}>Clear</Button>
      </Form>
      
    </div>
  )
}

export default RouteForm;