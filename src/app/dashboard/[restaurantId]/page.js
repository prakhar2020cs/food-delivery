import React from 'react'

function page({params}) {
    let {restaurantId} = params;
  return (
    <div>
        <h2>Welcome to your Restaurant</h2>
        <h3>Your restaurant Id is {restaurantId}</h3>
     
        </div>
  )
}

export default page