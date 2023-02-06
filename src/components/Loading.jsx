import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center flex-col	mt-12'>
        <div
          className='
    spinner-grow inline-block w-28 h-28 bg-current rounded-full opacity-0
      text-green-500
    '
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className=' text-green-500 text-4xl mt-2' role='status'>
          <span className=''>Loading...</span>
        </div>
      </div>
  )
}

export default Loading
