import axios from "axios";

const API_URL = "/owners/ban/";

// get all bookings
const getBlacklists = async (fieldId) => {
  const response = await axios.get(API_URL + fieldId);
  return response.data;
};

// ban player
const banPlayer = async (banData) => {
  const response = await axios.post(API_URL, banData);
  return response.data.message;
};

// unban player
const unbanPlayer = async (data) => {
  const response = await axios.delete(
    API_URL + "?player_id=" + data.player_id + "&field_id=" + data.field_id
  );
  return response.data.message;
};

const blacklistService = {
  getBlacklists,
  banPlayer,
  unbanPlayer,
};

export default blacklistService;
