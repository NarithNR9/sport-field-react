import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { times } from '../data/times'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getBookings,
  createBooking,
  reset,
} from '../features/booking/bookingSlice'
import Loading from '../components/Loading'

const data = []
for (let i = 0; i < 8; i++) {
  // generate 7 days from today
  const today = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000)
  data.push(today.toUTCString().slice(5, 16))
}

const Booking = ({ field }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookings, isError, isLoading } = useSelector((state) => state.booking)
  const { player } = useSelector((state) => state.auth)
  const [pitchNum, setPitchNum] = useState(1)
  const [timeSelect, setTimeSelect] = useState([])
  const [dateSelect, setDateSelect] = useState('')
  const [bookType, setBookType] = useState('Half')

  useEffect(() => {
    dispatch(getBookings())
    setDateSelect(document.getElementsByClassName('active')[0].innerHTML)
  }, [])

  useEffect(() => {
    Array.from(document.getElementsByClassName('bg-blue-500')).forEach((el) => {
      el.classList.contains('half')
        ? (el.classList.add('bg-yellow-400', 'text-white'),
          el.classList.remove('bg-blue-500'))
        : el.classList.remove('bg-blue-500', 'text-white')
    })
    setTimeSelect([])
  }, [pitchNum])

  // set color for btn booking
  const btnType = (date, time) => {
    // console.log(date)
    let data = ''
    bookings?.forEach((element) => {
      if (
        element.field_id === field.field_id &&
        element.date === date &&
        element.time.split(',').includes(time) &&
        element.status !== 'Cancel' &&
        element.pitch_number.toString() === pitchNum.toString()
      ) {
        if (element.status === 'Full') {
          data = 'bg-green-600 text-white border-black  pointer-events-none'
        } else {
          // if it's two half bookings then it gotta be full
          const twoHalfs = bookings?.filter(
            (ele) =>
              ele.date === date &&
              ele.time.split(',').includes(time) &&
              ele.field_id === field.field_id &&
              ele.pitch_number == pitchNum
          )
          if (twoHalfs.length > 1) {
            data = 'bg-green-600 text-white border-black pointer-events-none'
          } else data = 'bg-yellow-400 text-white border-black half'
        }
      }
    })
    return data
  }

  const selectBtn = (e) => {
    // first btn selection?
    if (timeSelect.length < 2) {
      // first btn
      if (timeSelect.length === 0) {
        timeSelect.push(e.target.innerHTML)
        setTimeSelect([...timeSelect])
        e.target.classList.contains('half')
          ? (e.target.classList.add('bg-blue-500', 'text-white'),
            e.target.classList.remove('bg-yellow-400'))
          : e.target.classList.add('bg-blue-500', 'text-white')
      }
      // second btn
      else if (timeSelect.length === 1) {
        // if btn near each other
        if (
          +e.target.innerHTML.split(':')[0] - +timeSelect[0].split(':')[0] ===
            1 ||
          +e.target.innerHTML.split(':')[0] - +timeSelect[0].split(':')[0] ===
            -1
        ) {
          timeSelect.push(e.target.innerHTML)
          timeSelect.sort()
          setTimeSelect([...timeSelect])
          e.target.classList.contains('half')
            ? (e.target.classList.add('bg-blue-500', 'text-white'),
              e.target.classList.remove('bg-yellow-400'))
            : e.target.classList.add('bg-blue-500', 'text-white')
        }
        // if btn not near each other then remove last btn and add new
        else {
          // remove unselected btn
          Array.from(document.getElementsByClassName('bg-blue-500')).forEach(
            (el) => {
              // if yellow btn just remove the blue background
              if (el.classList.contains('half')) {
                el.classList.add('bg-yellow-400')
                el.classList.remove('bg-blue-500')
              }
              //else remove blue bg and text
              else el.classList.remove('bg-blue-500', 'text-white')
            }
          )
          timeSelect.length = 0
          timeSelect.push(e.target.innerHTML)
          setTimeSelect([...timeSelect])
          e.target.classList.contains('half')
            ? (e.target.classList.add('bg-blue-500', 'text-white'),
              e.target.classList.remove('bg-yellow-400'))
            : e.target.classList.add('bg-blue-500', 'text-white')
        }
      }
    }
    // if cancel select 2 btn and select others
    else {
      Array.from(document.getElementsByClassName('bg-blue-500')).forEach(
        (el) => {
          if (el.classList.contains('half')) {
            el.classList.add('bg-yellow-400')
            el.classList.remove('bg-blue-500')
          } else el.classList.remove('bg-blue-500', 'text-white')
        }
      )
      timeSelect.length = 0
      timeSelect.push(e.target.innerHTML)
      setTimeSelect([...timeSelect])
      e.target.classList.contains('half')
        ? (e.target.classList.add('bg-blue-500', 'text-white'),
          e.target.classList.remove('bg-yellow-400'))
        : e.target.classList.add('bg-blue-500', 'text-white')
    }
    setDateSelect(document.getElementsByClassName('active')[0].innerHTML)
  }

  const handleBookNow = (e) => {
    e.preventDefault()

    if (!player) return toast.warn('Please log in first.')

    // swap bookedTimestamp month and day 03/23/2023 to 23/03/2023
    const dateArr = new Date().toLocaleDateString().split('/')
    dateArr[0] = dateArr.splice(1, 1, dateArr[0])[0]

    const formData = {
      fieldId: field.field_id,
      playerId: player.id,
      date: new Date(dateSelect + ' 17:00:00').toISOString().slice(0, -5),
      status: bookType,
      bookedTimestamp:
        dateArr.reverse().join('-') +
        ' ' +
        new Date().toLocaleTimeString().slice(0, -3),
      pitchNumber: pitchNum,
      time: timeSelect.toString(),
    }

    // if booking less than 2 hours
    if (timeSelect.length < 2) {
      return toast.error('Please book at lease 2 hours.')
    }

    let fresh = true
    Array.from(document.getElementsByClassName('bg-blue-500')).forEach((el) => {
      // if it's a half booked
      if (el.classList.contains('half')) {
        fresh = false
      }
    })

    // if it's a fresh booking
    if (fresh) {
      dispatch(createBooking(formData))
      toast.success('Field booked successfully.')
      navigate('/')
    }

    // if its a booking that is half booked
    else {
      bookings?.forEach((element) => {
        // if book the half booking
        if (
          element.date ===
            new Date(
              dateSelect.replace(
                dateSelect.split(' ')[0],
                +dateSelect.split(' ')[0] + 1
              )
            )
              .toISOString()
              .slice(0, 10) &&
          (element.time.split(',').includes(timeSelect[0]) ||
            element.time.split(',').includes(timeSelect[1])) &&
          element.pitch_number.toString() === pitchNum.toString()
        ) {
          // validating error
          // if field select full booking
          if (bookType === 'Full') {
            return toast.error(
              'This is half booked, you can not book the full booking.'
            )
          } else if (
            JSON.stringify(element.time.split(',')) ===
            JSON.stringify(timeSelect)
          ) {
            if (element.player_id === player.id) {
              return toast.error(
                'You have already book the half of this field already.'
              )
            } else {
              dispatch(createBooking(formData))
              toast.success('Field booked successfully.')
              navigate('/')
            }
          } else {
            return toast.error('Wrong booking time')
          }
        }
      })
    }

    //     console.log(
    //   document
    //     .getElementsByClassName('bg-yellow-400')[0]
    //     .classList.contains('bg-blue-500') &&
    //     e.target.classList.contains('bg-blue-500')
    // )
  }

  return (
    <div>
      <div className='flex justify-end lg:max-w-6xl 2xl:max-w-screen-xl mt-2 mr-2'>
        <select
          id='countries'
          onChange={(e) => setPitchNum(e.target.value)}
          className='bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
        >
          {[...Array(field?.total_pitch)].map((num, index) => (
            <option key={index} value={index + 1}>
              Pitch Number {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center flex-col items-center'>
        <ul
          className='nav nav-tabs flex md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4'
          id='tabs-tab'
          role='tablist'
        >
          {data.map((date, index) => (
            <li
              onClick={() => setDateSelect(date)}
              key={index}
              className='nav-item'
              role='presentation'
            >
              <a
                href='#tabs-profile'
                className={
                  (index === 0 ? 'active ' : ' ') +
                  ' nav-link  block font-medium leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent '
                }
                id='tabs-profile-tab'
                data-bs-toggle='pill'
                data-bs-target={'#tabs-' + index}
                role='tab'
                aria-controls='tabs-profile'
                aria-selected='false'
              >
                {date}
              </a>
            </li>
          ))}
        </ul>

        <div className='tab-content' id='tabs-tabContent'>
          {data.map((date, indexD) => (
            <div
              key={indexD}
              className={(indexD === 0 ? 'show active ' : ' ') + 'tab-pane fade'}
              id={'tabs-' + indexD}
              role='tabpanel'
              aria-labelledby='tabs-home-tab'
            >
              <div className='mx-2 flex justify-start flex-wrap max-w-6xl'>
                {times.map((time, index) => (
                  <button
                    onClick={selectBtn}
                    key={index}
                    type='button'
                    className={
                      btnType(
                        new Date(
                          new Date().getTime() + indexD * 24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .slice(0, 10),
                        time
                      ) +
                      ' mr-2 mb-2 w-20 inline-block py-2 border-2 border-blue-600 font-medium leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-end 2xl:mr-96 lg:mr-20 md:mr-16 mr-10 space-x-6'>
        <div>
          <span className='px-2 mr-2 ring-2 ring-blue-600 '></span>Available
        </div>
        <div>
          <span className='px-2 mr-1 bg-yellow-400'></span>Half Booked
        </div>
        <div>
          <span className='px-2 mr-1 bg-green-600'></span>Full Booked
        </div>
      </div>
      <form className='flex justify-center' onSubmit={handleBookNow}>
        <div className='max-w-sm p-6 bg-white border border-gray-200  rounded-lg shadow '>
          <h5 className='mb-2 text-2xl font-bold tracking-tight  '>
            Field booking detail:
          </h5>
          <p>Field Name: {field.fieldName}</p>
          <span>Booking Type: </span>
          <select
            value={bookType}
            onChange={(e) => setBookType(e.target.value)}
            className='ml-2 border-2 border-green-600 rounded focus:outline-none px-2'
          >
            <option value='Half'>Half</option>
            <option value='Full'>Full</option>
          </select>
          <p className='mb-3 font-normal text-gray-900 '>
            Date: {dateSelect}
            <br />
            Time: {timeSelect.map((time) => time + ' ')}
            <br />
            Pitch number: {pitchNum}
          </p>
          <button
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 '
            type='submit'
          >
            Book Now
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
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Booking
