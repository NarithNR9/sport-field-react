import axios from 'axios'

const API_URL = '/bookings/'

// get all bookings
const getBookings = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// get player bookings
const getMyBookings = async (playerId) => {
  const response = await axios.get(API_URL+"/mine/"+playerId)
  console.log(playerId)
  return response.data
}

// create new booking
const createBooking = async (bookingData) => {
  const response = await axios.post(API_URL , bookingData)
  return response.data.message
}

const bookingService = {
  getBookings,
  getMyBookings,
  createBooking
}

export default bookingService