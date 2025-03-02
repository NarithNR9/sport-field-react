import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const FieldCard = ({ field }) => {
  const [stars,setStars] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + '/field/stars/' + field.field_id).then((res) => {
      setStars(res.data[0].avgStars)
    })
  })

  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <Link to=''>
        <img
          className='rounded-t-lg h-60 w-[100%]'
          src={field.image_url}
          alt=''
        />
      </Link>
      <div className='p-5'>
        <Link to=''>
          <div className='flex justify-between'>
            <h5 className='mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {field.fieldName}
            </h5>
            <div className='flex justify-between'>
              <FaStar className='mt-2 mx-1' color='yellow' />
              <div className='text-white mt-1.5'>{stars}</div>
            </div>
          </div>
        </Link>
        <div className='flex justify-between'>
          <p className='text-base mb-1 font-normal text-gray-700 dark:text-slate-100'>
            {field.district}
          </p>
          <p className='text-base mb-1 font-normal text-gray-700 dark:text-slate-100'>
            {field.type}
          </p>
        </div>
        <p className='text-base mb-3 font-normal text-gray-700 dark:text-slate-100'>
          Average Price: ${field.average_price.split('-')[0]}-${field.average_price.split('-')[1]}
        </p>
        <Link
          to={`/field/${field.field_id}`}
          className='inline-flex items-center px-3 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-emerald-500 dark:hover:bg-emerald-700 dark:focus:bg-emerald-800'
        >
          More Details
          <svg
            aria-hidden='true'
            className='w-4 h-4 ml-2 -mr-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default FieldCard
