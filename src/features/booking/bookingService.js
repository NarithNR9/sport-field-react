import axios from "axios";

const API_URL = "/bookings/";

// get all bookings
const getBookings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// get player bookings
const getMyBookings = async (playerId) => {
  const response = await axios.get(API_URL + "/mine/" + playerId);
  return response.data;
};

// get owner bookings
const getOwnerBookings = async (ref) => {
  const response = await axios.get(
    API_URL +
      "/owner?fieldId=" +
      ref[0] +
      "&type=" +
      ref[1] +
      "&pitchNumber=" +
      ref[2] +
      "&date=" +
      ref[3]
  );
  return response.data;
};

// create new booking
const createBooking = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData);
  return response.data.message;
};

// cancel booking
const cancelBooking = async (bookingId) => {
  const response = await axios.put(API_URL + "cancel/" + bookingId);
  return response.data.message;
};

const bookingService = {
  getBookings,
  getMyBookings,
  getOwnerBookings,
  createBooking,
  cancelBooking,
};

export default bookingService;
