import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import { getMyBookings, reset } from '../features/booking/bookingSlice'

const MyBookings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookings, isError, isLoading } = useSelector((state) => state.booking)
  const { player } = useSelector((state) => state.auth)
  const [myBookings, setMyBookings] = useState([])
  const [sortType, setSortType] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const lastPageIndex = currentPage * rowsPerPage
  const firstPageIndex = lastPageIndex - rowsPerPage

  useEffect(() => {
    setMyBookings(bookings.slice(firstPageIndex, lastPageIndex))
  }, [currentPage])

  useEffect(() => {
    dispatch(getMyBookings(player.id))
  }, [])

  useEffect(() => {
    setMyBookings(bookings.slice(firstPageIndex, lastPageIndex))
  }, [bookings])

  const sortName = () => {
    setMyBookings(
      [...myBookings].sort(function (a, b) {
        const z = a.fieldName
        // ascending sort
        if (sortType === '' || sortType === 'Desc') {
          setSortType('Asc')
          if (a.fieldName < b.fieldName) {
            return -1
          }
          if (a.fieldName > b.fieldName) {
            return 1
          }
          return 0
        }
        // descending sort
        else if (sortType === 'Asc') {
          setSortType('Desc')
          if (a.fieldName > b.fieldName) {
            return -1
          }
          if (a.fieldName < b.fieldName) {
            return 1
          }
          return 0
        }
      })
    )
  }

  const sortDate = () => {
    setMyBookings(
      [...myBookings].sort(function (a, b) {
        const z = a.fieldName
        // ascending sort
        if (sortType === '' || sortType === 'Desc') {
          setSortType('Asc')
          if (a.date < b.date) {
            return -1
          }
          if (a.date > b.date) {
            return 1
          }
          return 0
        }
        // descending sort
        else if (sortType === 'Asc') {
          setSortType('Desc')
          if (a.date > b.date) {
            return -1
          }
          if (a.date < b.date) {
            return 1
          }
          return 0
        }
      })
    )
  }

  if (isLoading) return <Loading />
  else if (bookings.length === 0) return (
    <div className='flex justify-center my-4 text-lg sm:text-2xl'>
      <p>You have no bookings yet. <Link to='/' className='text-blue-700'>Start booking now!</Link></p> 
    </div>
  )
  else
    return (
      <div className='m-2'>
        <Pagination
          totalBookings={bookings.length}
          rowsPerPage={10}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm sm:text-base text-left'>
            <thead className='text-xs sm:text-sm text-gray-700 uppercase bg-green-100  '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  <div className='flex items-center'>
                    Field Name
                    <a href='#' onClick={sortName}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-3 h-3 ml-1'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 320 512'
                      >
                        <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope='col' className='px-6 py-3'>
                  <div className='flex items-center'>
                    Date
                    <a href='#' onClick={sortDate}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-3 h-3 ml-1'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 320 512'
                      >
                        <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope='col' className='px-6 py-3'>
                  <div className='flex items-center'>
                    Time
                  </div>
                </th>
                <th scope='col' className='px-6 py-3'>
                  <div className='flex items-center'>
                    Pitch
                  </div>
                </th>

                <th scope='col' className='px-6 py-3'>
                  <div className='flex items-center'>
                    Status
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {myBookings?.map((booking, index) => (
                <tr key={index} className='bg-white border-b '>
                  <td scope='row' className='px-5 py-4 text-gray-900 font-bold'>
                    <Link to={'/field/' + booking.field_id}>
                      {booking.fieldName}
                    </Link>
                  </td>
                  <td className='px-5 py-4'>{booking.date.slice(0, 10)}</td>
                  <td className='px-5 py-4'>{booking.time}</td>
                  <td className='px-5 py-4'>{booking.pitch_number}</td>
                  <td className='px-5'>
                    <div
                      className={
                        'w-fit p-2 text-white rounded-md uppercase text-sm ' +
                        (booking.status === 'Half'
                          ? 'bg-yellow-400'
                          : 'bg-green-600')
                      }
                    >
                      {booking.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default MyBookings
