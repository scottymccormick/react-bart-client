import React from 'react';

const RouteResults = (props) => {
  const routeOptions = props.results.map((result, i) => {
    return (
      <div key={i}>
        {result.leg.map((eachLeg, j) => {
          return (
            <div key={j}>
              {result.leg.length > 1 ? <h4>Leg {j + 1}</h4>	: null}
              <p> Leave from {eachLeg['@origin']} at {eachLeg['@origTimeMin']} on the {eachLeg['@trainHeadStation']} train</p>
              <p> Arrive at {eachLeg['@destination']} at {eachLeg['@destTimeMin']}</p>
            </div>
          )
        })}
        <hr/>
      </div>
    )
  })
  return (
    <div>
      <h4>Route Results</h4>
      {routeOptions}
    </div>
  )
}

export default RouteResults;