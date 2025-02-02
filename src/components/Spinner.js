import React from 'react'
import { PropagateLoader } from 'react-spinners'

function Spinner() {
  return (
    <div className='flex justify-between p-8'>
        <PropagateLoader
        className='mx-auto self-center'
        color='#2196F3'
        size={20}
        />
    </div>
  )
}

export default Spinner
