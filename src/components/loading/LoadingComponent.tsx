import React from 'react'


function LoadingComponent() {
  return (
    <div>
      <img src={process.env.PUBLIC_URL + '/loadinganim.gif'}/>
    </div>
  )
}

export default LoadingComponent

