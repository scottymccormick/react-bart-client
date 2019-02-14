import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const StationPage = (props) => {
  return (
    <div className="mt-2">
      {/* <button style={{display: "block", margin: 'auto'}} onClick={props.goBack}>Go Back</button> */}
      {
        props.logged ? 
        <div>
          
          {props.favIndex > -1 ? 
            <Button onClick={props.deleteFavorite.bind(null, props.favorites[props.favIndex]._id)}>Remove from Favorites</Button> : 
            <Button onClick={props.addFavorite.bind(null, props.currentStation)}>Add to Favorites</Button>}
          
        </div> : null
      }
      { props.etd ? 
        props.etd.map((direction, i) => {
          return <div key={i}  className="text-dark p-2">
            <h5 className="text-light">{direction.destination}</h5>
              <ListGroup className="bg-light p-3 m-3">
              {
                direction.estimate.map((est, j) => {
                  console.log(est)
                  return <ListGroupItem className="my-1 text-dark d-flex justify-content-between align-items-center" style={{boxShadow: "inset 0px 0px 0px 3px " + est.hexcolor + "66"}} key={j}>
                    {Number(est.delay) > 0 ? 
                    <span className="badge badge-warning badge-pill mx-1">{Math.ceil(Number(est.delay) / 60)} min delay</span> :
                    <span className="badge badge-success badge-pill mx-1">On Time</span>
                    }
                    
                    <strong>{est.minutes}{est.minutes !== 'Leaving' ? ' min' : ''}</strong>
                    <span className="badge badge-secondary badge-pill mx-1">{est.length} cars</span>
                    
                  </ListGroupItem>
                })
              }
              </ListGroup>
            </div>
        }) : null
      }
    </div>
  )
}

export default StationPage;