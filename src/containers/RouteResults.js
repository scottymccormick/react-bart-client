import React from 'react';
import { Card, CardTitle, CardBody, CardText, Row } from 'reactstrap';

const RouteResults = (props) => {
  const routeOptions = props.results.map((result, i) => {
    return (
      <div key={i} className=" bg-secondary mb-3" >
        <CardTitle className="text-primary">
          {result['@tripTime']} min
        </CardTitle>
        <Row className="d-flex justify-content-center">
          {result.leg.map((eachLeg, j) => {
            return (
              <Card key={j} className="w-50">
                {result.leg.length > 1 ? <CardTitle>Leg {j + 1}</CardTitle>	: null}
                <CardText> Leave from {eachLeg['@origin']} at {eachLeg['@origTimeMin']} on the {eachLeg['@trainHeadStation']} train</CardText>
                <CardText> Arrive at {eachLeg['@destination']} at {eachLeg['@destTimeMin']}</CardText>
              </Card>
            )
          })}
        </Row>
      </div>
    )
  });
  const favIndex = props.favorites.findIndex((fav) => {
    return fav.origin === props.origin && fav.destination === props.destination
  });
  return (
    <div>
      <h4>Route Results</h4>
      {
        props.logged ? 
        <div>
          <br/>
          {favIndex > -1 ? 
            <button onClick={props.deleteFavorite.bind(null, props.favorites[favIndex]._id)}>Remove from Favorites</button> : 
            <button onClick={props.addFavorite.bind(null, props.origin, props.destination)}>Add to Favorites</button>}
          
          <br/>
        </div> : null
      }
      {routeOptions}
    </div>
  )
}

export default RouteResults;