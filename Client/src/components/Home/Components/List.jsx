import React, { useState } from 'react'

const Filters = () => {
    const [filter, setfilter] = useState(0);

    
  return (
    <div className='flex space-x-3 ml-3 items-center just text-sm mt-1'>
        <div className='rounded-full p-2 px-3 border-gray-600 border-2'>All</div>  
        <div className='rounded-full p-2 border-gray-600 border-2'>Unread</div>  
        <div className='rounded-full p-2 border-gray-600 border-2'>Favourite</div>  
    </div>
  )
}

export default Filters
