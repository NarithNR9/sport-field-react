import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_URL + '/players'

// register
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData)

  return response.data
}

// login
const login = async (playerData) => {
  const response = await axios.post(API_URL + '/login', playerData)

  if (response.data) {
    localStorage.setItem('player', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('player')
}

// ----------------------------------------------------------------------------------- //

// register
const registerOwner = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData)

  return response.data
}

// login
const loginOwner = async (ownerData) => {
  const response = await axios.post('/owners/login', ownerData)

  if (response.data) {
    localStorage.setItem('owner', JSON.stringify(response.data))
  }

  return response.data
}

// Logout owner
const logoutOwner = () => {
  localStorage.removeItem('owner')
}

const authService = {
  register,
  logout,
  login,
  loginOwner,
  logoutOwner
}

export default authService