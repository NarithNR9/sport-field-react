import axios from 'axios'

const API_URL = '/bookings/'

// get owner fields
const getBookings = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// create new booking
const createBooking = async (bookingData) => {
  const response = await axios.post(API_URL , bookingData)
  return response.data.message
}

const bookingService = {
  getBookings,
  createBooking
}

export default bookingService