import { useState, useEffect } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout, logoutOwner, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

export default function Header() {
  const [openNav, setOpenNav] = useState(false)
  const [theme, setTheme] = useState('light')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { player, owner } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(logoutOwner())
    dispatch(reset())
    navigate('/')
  }


  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      // document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      setTheme('light')
      // document.documentElement.classList.remove('dark')
    }
  }, [])
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const DarkModeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const Details = [
    {
      title: 'About Us',
      link: '/aboutus',
    },
    {
      title: 'Booking',
      link: '/booking',
    },
    {
      title: 'Service',
      link: '/service',
    },
    {
      title: 'Register',
      link: '/register',
    },
  ]

  const navList = (
    <div className='lg:flex'>
      {Details.map((items, key) => (
        <p className='relative group h-full py-3 ' key={key}>
          <Link
            to={items.link}
            className=' text-text-light dark:text-text-dark block px-4 py-2 text-sm'
            id='menu-item-0'
          >
            <span className='font-bold text-lg'>{items.title}</span>
            <span className='absolute -bottom-1 left-0 w-0 h-[2px] dark:bg-text-dark bg-text-light transition-all group-hover:w-full duration-500'></span>
          </Link>
        </p>
      ))}
    </div>
  )

  return (
    <nav
      className='
  relative
  w-full
  flex flex-wrap
  items-center
  justify-between
  py-4
  px-8
  bg-gray-100
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light
  '
    >
      <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
        <button
          className='
      navbar-toggler
      text-gray-500
      border-0
      hover:shadow-none hover:no-underline
      py-2
      px-2.5
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
    '
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='bars'
            className='w-6'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
          >
            <path
              fill='currentColor'
              d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'
            ></path>
          </svg>
        </button>
        <div
          className='collapse navbar-collapse flex-grow items-center'
          id='navbarSupportedContent'
        >
          <a
            className='
        flex
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900
        mt-2
        lg:mt-0
        mr-1
        w-12
      '
            href='/'
          >
            <img
              src={logo}
              // style={{ height: '15px' }}
              alt=''
              loading='lazy'
            />
          </a>
          {/* Left links */}
          <ul className='navbar-nav flex flex-col pl-0 list-style-none mr-auto'>
            <li className='nav-item p-2'>
              <Link
                className='nav-link text-xl text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0 font-semibold'
                to='/'
              >
                Sport Field Kh
              </Link>
            </li>
            {/* <li className='nav-item p-2'>
              <Link
                className='nav-link text-xl text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0'
                to='/'
              >
                Team
              </Link>
            </li>
            <li className='nav-item p-2'>
              <Link
                className='nav-link text-xl text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0'
                to='/'
              >
                Projects
              </Link>
            </li> */}
          </ul>
          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}
        {/* Right elements */}
        <div className='flex items-center relative'>
          {/* Icon */}

          <div className='dropdown relative'></div>
          <ul className='flex space-x-5'>
            {player || owner ? (
              <li className='nav-item p-2'>
                <span>Welcome {player?.name || owner?.name} </span>
                <button className='btn'>
                  <div className='dropdown relative'>
                    <a
                      className='dropdown-toggle flex items-center hidden-arrow'
                      href='/'
                      id='dropdownMenuButton2'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <FaUserCircle size={30} />
                    </a>
                    <ul
                      className='
    dropdown-menu
    min-w-max
    absolute
    hidden
    bg-white
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
  '
                      aria-labelledby='dropdownMenuButton2'
                    >
                      <li>
                        <a
                          className='
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      '
                          href='/'
                        >
                          Profile
                        </a>
                      </li>

                      <li>
                        <Link
                          className='
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      '
                          href='/'
                          to={owner ? 'myfields' : 'mybooking'}
                        >
                          {player && (<p>My Booking</p>)}
                          {owner && (<p>My Fields</p>)}
                        </Link>
                      </li>

                      <li>
                        <a
                          className='
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      '
                          href='/'
                        >
                          <div className='flex' onClick={onLogout}>
                            <FaSignOutAlt />
                            Logout
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li>
                  <Link to='/register'>
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Right elements */}
      </div>
    </nav>
  )
}
