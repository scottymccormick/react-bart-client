import React from 'react';
import { Button, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';

const StationPage = (props) => {
  return (
    <div className="mt-2">
      { props.etd ? 
        props.etd.map((direction, i) => {
          return <div key={i}  className="text-dark bg-secondary pt-2">
            <h5 className="text-light mx-3">  
              {direction.destination}
            </h5>
              <ListGroup className="p-2 mb-3 mt-1">
              {
                direction.estimate.map((est,  j) => {
                  console.log(direction)
                  return <ListGroupItem className="my-1 text-dark" style={{}} key={j}>
                    <Row className="justify-content-md-center">
                      <Col xs="4" md="3">{Number(est.delay) > 0 ? 
                        <span className="badge badge-warning badge-pill mx-1">{Math.ceil(Number(est.delay) / 60)} min delay</span> :
                        <span className="badge badge-success badge-pill mx-1">On Time</span>
                        }
                      </Col>
                      <Col xs="4" md="3">
                        <span>{est.minutes}{est.minutes !== 'Leaving' ? ' min' : ''}</span>
                      </Col>
                      <Col xs="4" md="3">
                        <span className="badge badge-secondary badge-pill mx-1">{est.length} cars</span>
                      </Col>
                    </Row>
                  </ListGroupItem>
                })
              }
              </ListGroup>
            </div>
        }) : null
      }
      {
        props.logged ? 
        <div>
          {props.favIndex > -1 ? 
            <Button color="warning" onClick={props.deleteFavorite.bind(null, props.favorites[props.favIndex]._id)}>Remove from Favorites</Button> : 
            <Button color="success" onClick={props.addFavorite.bind(null, props.currentStation)}>Add to Favorites</Button>}
          
        </div> : null
      }
    </div>
  )
}

export default StationPage;