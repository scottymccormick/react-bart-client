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
          return <div key={i} style={{width: '50%', display: "inline-block"}} className="bg-light p-3">
            <h5 className="text-dark">{direction.destination}</h5>
              <ListGroup className="m-3">
              {
                direction.estimate.map((est, j) => {
                  console.log(est.hexcolor)
                  return <ListGroupItem className="my-1" style={{boxShadow: "inset 0px 0px 0px 3px " + est.hexcolor + "66"}} key={j}>{est.minutes}{est.minutes !== 'Leaving' ? ' minutes' : ''}</ListGroupItem>
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