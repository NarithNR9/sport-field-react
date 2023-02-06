import axios from 'axios'

const API_URL = '/field/'
const API_Cloudinary = 'https://api.cloudinary.com/v1_1/dzh7xzbbz/image/upload'

// get owner fields
const getFields = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// create new field
const createField = async (fieldData) => {
  const response = await axios.post(API_URL + 'create', fieldData)
  return response.data.message
}

// update field by id
const updateField = async (fieldData) => {
  const response = await axios.put(API_URL + 'update/' + fieldData.fieldID, fieldData)
  return response.data.message
}

// get owner fields
const getOwnerFields = async (ownerId) => {
  const response = await axios.get(API_URL + 'ownerFields/' + ownerId)
  return response.data
}

// get field by type
const getFieldByType = async (type) => {
  const response = await axios.get(API_URL + 'type/' + type)
  return response.data
}

// get a field
const getField = async (fieldId) => {
  const response = await axios.get(API_URL + fieldId) 
  return response.data[0]
}
  
// upload img to cloudinary
const uploadImg = async (img) => {
  const response = await axios.post(API_Cloudinary, img)
  return response.data
}

// get user tickets
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + ticketId, config)
  return response.data
}

// close tickets
const deleteField = async (fieldId) => {
  const response = await axios.delete(API_URL + 'remove/' + fieldId)
  return response.data.message
}

const ticketService = {
  getFields,
  createField,
  updateField,
  getOwnerFields,
  getField,
  getFieldByType,
  deleteField,
  uploadImg
}

export default ticketService
