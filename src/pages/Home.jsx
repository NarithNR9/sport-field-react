import { useState, useEffect } from 'react'
import {
  FaFutbol,
  FaMedal,
  FaTableTennis,
  FaVolleyballBall,
} from 'react-icons/fa'
import SliderSection from '../components/SliderSection'

const Home = () => {
  const [type, setType] = useState('All')

  useEffect(() => {
// change the on active click for each field type
    document.getElementById(type).classList.add('bg-emerald-900')
    const a = [...document.getElementsByClassName('clicked')].forEach((sth) => {
      if (document.getElementById(type) !== sth) {
        sth.classList.remove('bg-emerald-900')
      }
    })
  }, [type])

  return (
    <>
      <div
        className='inline-flex rounded-md shadow-sm bg-emerald-400 my-5 ml-10'
        role='group'
      >
        <button
          onClick={() => {
            setType('All')
            // document.getElementById(type).classList.toggle('bg-red-900')
          }}
          id='All'
          type='button'
          className='clicked inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-emerald-800 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-emerald-900 '
        >
          <FaMedal className='mr-2 fill-current' />
          All
        </button>
        <button
          id='Football'
          onClick={() => {
            setType('Football')
          }}
          type='button'
          className='clicked inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-transparent border border-b border-gray-900 hover:bg-emerald-800 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-emerald-900 '
        >
          <FaFutbol className='mr-2 fill-current' />
          Football
        </button>
        <button
          onClick={() => {
            setType('Volleyball')
          }}
          id='Volleyball'
          type='button'
          className='clicked inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-emerald-800 hover:text-white focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-emerald-900 '
        >
          <FaVolleyballBall className='mr-2 fill-current' />
          Volleyball
        </button>
        <button
          onClick={() => {
            setType('Tennis')
          }}
          id='Tennis'
          type='button'
          className='clicked inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-emerald-800 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-emerald-900 '
        >
          <FaTableTennis className='mr-2 fill-current' />
          Tennis
        </button>
      </div>
      <div className='ml-10 text-emerald-500 text-2xl font-semibold'>
        New To Town
      </div>
      <SliderSection category={type} />
    </>
  )
}

export default Home
