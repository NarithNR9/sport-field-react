import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {
  const [Lat, setLat] = useState(0)
  const [Lng, setLong] = useState(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { player, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    district: '',
    lat: '',
    lng: '',
  })

  const {
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
    district,
    lat,
    lng
  } = formData

  const District = [
    {
      name: 'Choose your current location',
      value: '',
    },
    {
      name: 'Khan Chamkar Mon',
      value: 'Khan Chamkar Mon',
    },
    {
      name: 'Khan Daun Penh ',
      value: 'Khan Daun Penh ',
    },
    {
      name: 'Khan Prampir Makara',
      value: 'Khan Prampir Makara',
    },
    {
      name: 'Khan Tuol Kouk',
      value: 'Khan Tuol Kouk',
    },
    {
      name: 'Khan Dangkao',
      value: 'Khan Dangkao',
    },
    {
      name: 'Khan Mean Chey',
      value: 'Khan Mean Chey',
    },
    {
      name: 'Khan Russey Keo',
      value: 'Khan Russey Keo',
    },
    {
      name: 'Khan Sen Sok ',
      value: 'Khan Sen Sok ',
    },
    {
      name: 'Khan Pou Senchey',
      value: 'Khan Pou Senchey',
    },
    {
      name: 'Khan Chroy Changvar ',
      value: 'Khan Chroy Changvar ',
    },
    {
      name: 'Khan Prek Pnov',
      value: 'Khan Prek Pnov',
    },
    {
      name: 'Khan Chbar Ampov',
      value: 'Khan Chbar Ampov',
    },
    {
      name: 'Khan Boeng Keng Kang',
      value: 'Khan Boeng Keng Kang',
    },
    {
      name: 'Khan Kamboul ',
      value: 'Khan Kamboul ',
    },
  ]

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // redirect when registered
    if (isSuccess) {
      navigate('/login')
    }

    dispatch(reset())
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);

        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        // console.log(lat)
      })
    }
  },[isError, isSuccess, player, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      dispatch(register(formData))
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      lat: Lat,
      lng: Lng
    }))
  }

  return (
    <section className=' bg-light dark:bg-dark'>
      <div className='container py-10 px-6 mx-auto'>
        <div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800 '>
          <div className='xl:w-10/12'>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap dark:bg-slate-700 dark:text-white lg:rounded-lg'>
                <div className='lg:w-6/12 px-4 md:px-0 '>
                  <div
                    className={`md:p-12 md:mx-6 ${'lg:translate-x-[100%] '} duration-[1.5s] `}
                  >
                    <div className='text-center'>
                      <img className='mx-auto w-48' src={logo} alt='logo' />
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Welcome to Sport Field Kh
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p className='mb-4 text-xl'>Register</p>
                      <div className='mb-4'>
                        <input
                          required
                          name='username'
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='username'
                          placeholder='Username'
                          value={username}
                          onChange={onChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          required
                          name='email'
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='email'
                          placeholder='Email'
                          value={email}
                          onChange={onChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          required
                          name='phoneNumber'
                          type='number'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='phonenumber'
                          placeholder='Phonenumber'
                          value={phoneNumber}
                          onChange={onChange}
                        />
                      </div>
                      <div className='mb-4 flex gap-3'>
                        <div>
                          <label htmlFor='lat' className='block'>
                            Latitude
                          </label>
                          <input
                            required
                            type='text'
                            className='form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id='lat'
                            disabled
                            value={Lat}
                          />
                        </div>
                        <div>
                          <label htmlFor='lng' className='block'>
                            Longitude
                          </label>
                          <input
                            required
                            type='text'
                            className='form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id='lng'
                            disabled
                            value={Lng}
                          />
                        </div>
                      </div>
                      <div className='mb-4'>
                        <select
                          name='district'
                          id='district'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          value={district}
                          onChange={onChange}
                        >
                          {District.map((items, index) => (
                            <option key={index} value={items.value}>
                              {items.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='mb-4'>
                        <input
                          required
                          name='password'
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='password'
                          placeholder='Password'
                          value={password}
                          onChange={onChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          required
                          name='confirmPassword'
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='confirmpassword'
                          placeholder='Confirm Password'
                          value={confirmPassword}
                          onChange={onChange}
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green-500 duration-300 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='submit'
                          data-mdb-ripple='true'
                          data-mdb-ripple-color='light'
                        >
                          Register
                        </button>
                      </div>
                      <Link to='/login'>
                        <label htmlFor='changeForm' className='cursor-pointer'>
                          Already have account?
                        </label>
                      </Link>
                    </form>
                  </div>
                </div>
                <div
                  className={`${'lg:translate-x-[-100%] lg:rounded-l-lg'} z-10 duration-700 lg:w-6/12 flex items-center bg-gradient-to-r from-green-500 to-blue-500 `}
                >
                  <div className='text-white px-4 py-6 md:p-12 md:mx-6'>
                    <h4 className='text-xl font-semibold mb-6'>
                      We are more than just a company
                    </h4>
                    <p className='text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
