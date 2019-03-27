import React from 'react';
import { Row, Col } from 'reactstrap';

const StationPicker = (props) => {
  return (
    <Row className="justify-content-center">
      <Col sm={10} md={6}>
        <select className="custom-select custom-select-md" name="origin" value={props.match ? props.match.params.id : ''} onChange={props.chooseStation}>
          <option key={-1} className="text-center" value="">Please choose a station</option>
          {props.stations.map((station, i) => {
            return <option key={i} value={station.abbr}>{station.name}</option>
          })}
        </select>
      </Col>
    </Row>
  )
}

export default StationPicker;