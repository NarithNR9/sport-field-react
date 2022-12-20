import { useState, useEffect } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

export default function Header() {
  const [openNav, setOpenNav] = useState(false)
  const [theme, setTheme] = useState('light')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { player } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

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
      link: '/auth',
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
    <nav className=' px-4 lg:px-8 w-full dark:bg-dark bg-light '>
      <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
        <Link to='/' className='lg:flex'>
          <img src={logo} alt='' width={80} height={80} className='m-3' />
          <p className='text-text-light dark:text-text-dark self-center text-2xl lg:block hidden'>
            Sport Field KH
          </p>
        </Link>
        <div className='hidden lg:block'>{navList}</div>
        <div className='relative inline-block text-left'>
          <div className={`flex`}>
            <div className='px-2 rounded self-center'>
              <label
                htmlFor='default-toggle-2'
                className='inline-flex relative items-center w-full cursor-pointer'
              >
                <input
                  type='checkbox'
                  value=''
                  checked={theme === 'dark'}
                  id='default-toggle-2'
                  className='sr-only peer'
                  onChange={DarkModeHandler}
                />
                <div className="w-9 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                <span className='ml-3 text-sm font-medium text-text-light dark:text-text-dark'>
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </label>
            </div>
            <button
              type='button'
              onClick={() => setOpenNav(!openNav)}
              className='lg:hidden inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium dark:text-white text-text-light shadow-sm'
              id='menu-button'
              aria-expanded='true'
              aria-haspopup='true'
            >
              {openNav ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`${
              openNav ? 'absolute' : 'hidden'
            } right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
            tabIndex='-1'
          >
            {navList}
          </div>
        </div>
        <ul className='block'>
          {player ? (
            <li>
              <span>Welcome {player.name} </span>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt />
                Logout
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
    </nav>
  )
}
