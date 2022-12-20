import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

// import Register from './Register'
// import login from '../../api/admin'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { player, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  const [IsRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const OnclickHandler = () => {
    navigate('/register')
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
    // const data = await login(formData)
    // if (data.status !== 200) {
    //   alert('khos aii bro')
    // } else {
    //     navigate('/')
    // }
  }
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC

    if (isError) {
      toast.error(message)
    }

    // redirect when logged in
    if (isSuccess || player) {
      navigate('/')
    }

    dispatch(reset())

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isError, isSuccess, player, message, navigate, dispatch])
  return (
    <section className=' bg-light dark:bg-dark'>
      <div className='container py-10 px-6 mx-auto'>
        <div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800 '>
          <div className='xl:w-10/12'>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap dark:bg-slate-700 dark:text-white lg:rounded-lg'>
                <div className='lg:w-6/12 px-4 md:px-0 '>
                  <div
                    className={`md:p-12 md:mx-6 ${
                      IsRegister ? 'lg:translate-x-[100%] ' : ''
                    } duration-[1.5s] `}
                  >
                    <div className='text-center'>
                      <img className='mx-auto w-48' src={logo} alt='logo' />
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Welcome to Sport Field Kh
                      </h4>
                    </div>
                    <form onSubmit={handleLogin}>
                      <p className='mb-4'>Login</p>
                      <div className='mb-4'>
                        <input
                          required
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='email'
                          placeholder='email'
                          value={email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          required
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='password'
                          placeholder='Password'
                          value={password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green-500 duration-300 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='submit'
                          data-mdb-ripple='true'
                          data-mdb-ripple-color='light'
                        >
                          Log in
                        </button>
                        <a
                          className='text-gray-500 dark:text-slate-300'
                          href='#'
                        >
                          Forgot password?
                        </a>
                      </div>
                      <input
                        type='checkbox'
                        id='changeForm'
                        className='mb-0 mr-2 hidden'
                        onChange={OnclickHandler}
                      />
                      <label htmlFor='changeForm' className='cursor-pointer'>
                        Don't have an account?
                      </label>
                    </form>
                  </div>
                </div>
                <div
                  className={`${'lg:rounded-r-lg'} z-10 duration-700 lg:w-6/12 flex items-center bg-gradient-to-r from-green-500 to-blue-500 `}
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

export default Login
