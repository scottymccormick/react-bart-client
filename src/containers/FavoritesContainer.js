import React from 'react';
import { Button, Row, Col } from 'reactstrap';

const FavoritesContainer = (props) => {
  return (
    <div className="bg-light p-3 m-2">
      <h4>Quick Start: {props.quickStart ? 
        (props.quickStart.destination ?
          props.quickStart.origin + ' to ' + props.quickStart.destination : 
          props.quickStart.origin) : 
        'Not Set'}</h4>
      
      {props.favorites.length === 0 ? 
        <h5 className="mt-4">No Favorites Saved</h5> : null }

      {props.favorites.map((favorite, i) => {
        return (
          <Row key={i} className="my-1">
            <Col sm={4}>
              {props.quickStart && favorite._id === props.quickStart._id ? 
              <Button color="warning" onClick={props.removeQuickStart.bind(null, props.quickStart._id)}>Reset Quick Start</Button> : 
              <Button color="secondary" onClick={props.setQuickStart.bind(null, favorite._id)}>Set Quick Start</Button>}
            </Col>
            <Col sm={4}>
              <Button color="primary" outline onClick={props.navToFavorite.bind(null, favorite)}>
              {favorite.destination ?
                <strong>{favorite.origin} => {favorite.destination}</strong>
                : <strong>{favorite.origin}</strong>
              }</Button>
            </Col>
            <Col sm={2}>
              <Button color="danger" onClick={props.handleDelete.bind(null, favorite._id)}>X</Button>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

export default FavoritesContainer;