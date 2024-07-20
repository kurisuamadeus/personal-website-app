import React from 'react'
import LoadingComponent from './LoadingComponent'
import '../../styles/loading/LoadingComponent.css'

function LoadingCover() {
  return (
    <div className='loading-container'>

      <div className='loading-content'>
        <LoadingComponent/>
      </div>
    </div>
  )
}

export default LoadingCover