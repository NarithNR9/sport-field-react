import axios from 'axios'

const API_URL = '/players'

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

const authService = {
  register,
  logout,
  login
}

export default authService