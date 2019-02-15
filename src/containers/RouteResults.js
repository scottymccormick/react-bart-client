import React from 'react';
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Row, Col , Button} from 'reactstrap';

const RouteResults = (props) => {
  const routeOptions = props.results.map((result, i) => {
    return (
      <div key={i} className="bg-secondary mb-3 py-2" >
        <CardTitle className="text-light">
          {result['@origin']} => {result['@destination']} ({result['@tripTime']} min)
        </CardTitle>
        <Row className="justify-content-center">
          {result.leg.map((eachLeg, j) => {
            return (
              <Col key={j} sm={result.leg.length > 1 ? 6 : 8}>
                <Card className="p-2 my-2 mx-3">
                  {/* <CardTitle> */}
                    {result.leg.length > 1 ? <CardTitle>Leg {j + 1}</CardTitle>	: null}
                  {/* </CardTitle> */}
                  <CardSubtitle>
                    {eachLeg['@trainHeadStation']}
                  </CardSubtitle>
                  <CardBody>
                    <CardText> Depart: <strong>{eachLeg['@origin']}</strong> at {eachLeg['@origTimeMin']}</CardText>
                    <CardText> Arrive: <strong>{eachLeg['@destination']}</strong> at {eachLeg['@destTimeMin']}</CardText>
                  </CardBody>
                </Card>
              </Col>
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
      {routeOptions}
      {
        props.logged ? 
        <div>
          {favIndex > -1 ? 
            <Button color="danger" onClick={props.deleteFavorite.bind(null, props.favorites[favIndex]._id)}>Remove from Favorites</Button> : 
            <Button color="success" onClick={props.addFavorite.bind(null, props.origin, props.destination)}>Add to Favorites</Button> }
        </div> : null
      }
    </div>
  )
}

export default RouteResults;