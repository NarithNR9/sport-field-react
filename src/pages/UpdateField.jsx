import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import {
  uploadImg,
  updateField,
  reset,
  getField,
} from '../features/fields/fieldSlice'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const UpdateField = () => {
  const [image, setImage] = useState('')
  const [fileImage, setFileImage] = useState('')
  const {
    field,
    imgUrl,
    uploadSuccess,
    fieldSuccess,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.fields)
  const { owner } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { fieldId } = useParams()

  const [formData, setFormData] = useState({
    fieldID: '',
    fieldName: '',
    type: '',
    location: '',
    averagePrice: '',
    totalPitch: '',
    parking: '',
    onlinePayment: '',
    freeWifi: '',
    description: '',
    imageUrl: null,
    ownerId: '',
    lat: null,
    lng: null,
    mapLink: null,
  })

  const {
    fieldID,
    fieldName,
    type,
    location,
    averagePrice,
    totalPitch,
    parking,
    onlinePayment,
    freeWifi,
    description,
    imageUrl,
    ownerId,
    lat,
    lng,
    mapLink,
  } = formData

  // useEffect(() => {
  //   // if (!fieldSuccess) {
  //   //   console.log('juy')
  //   // }
  //   // setFormData((prevState) => ({
  //   //   ...prevState,
  //   //   fieldName: field.fieldName
  //   // }))
  //   if (isError) {
  //     toast.error(message)
  //   }

  //   if (isSuccess) {
  //     dispatch(reset())
  //     navigate('/myfields')
  //   }

  //   if (uploadSuccess) {
  //     formData.imageUrl = imgUrl
  //     formData.ownerId = owner.id
  //     dispatch(createOwnerField(formData))
  //   }
  //   dispatch(getField(fieldId))

  //   dispatch(reset())
  // }, [
  //   dispatch,
  //   isError,
  //   isSuccess,
  //   navigate,
  //   message,
  //   uploadSuccess,
  //   formData,
  //   imgUrl,
  //   owner.id,
  //   fieldSuccess
  // ])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      toast.success(message)
      navigate('/myfields')
    }

    if (uploadSuccess) {
      formData.imageUrl = imgUrl
      formData.description = description.replaceAll(`'`, `\\'`)
      dispatch(updateField(formData))
      return
    }

    dispatch(getField(fieldId))
  }, [fieldId, isError, isSuccess, uploadSuccess])

  const handleOnChange = (e) => {
    if (e.target.type === 'file') {
      const objectUrl = URL.createObjectURL(e.target.files[0])
      setImage(objectUrl)
      setFileImage(e.target.files[0])
      setFormData((prevState) => ({
        fieldID: fieldId,
        fieldName: document.getElementById('fieldName').value,
        type: document.getElementById('type').value,
        location: document.getElementById('location').value,
        averagePrice: document.getElementById('averagePrice').value,
        totalPitch: document.getElementById('totalPitch').value,
        parking: document.getElementById('parking').value,
        onlinePayment: document.getElementById('onlinePayment').value,
        freeWifi: document.getElementById('freeWifi').value,
        description: document.getElementById('description').value,
        imageUrl: document.getElementById('imageUrl').value,
        ownerId: '',
        lat: null,
        lng: null,
        mapLink: null,
      }))
    } else {
      setFormData((prevState) => ({
        fieldID: fieldId,
        fieldName: document.getElementById('fieldName').value,
        type: document.getElementById('type').value,
        location: document.getElementById('location').value,
        averagePrice: document.getElementById('averagePrice').value,
        totalPitch: document.getElementById('totalPitch').value,
        parking: document.getElementById('parking').value,
        onlinePayment: document.getElementById('onlinePayment').value,
        freeWifi: document.getElementById('freeWifi').value,
        description: document.getElementById('description').value,
        imageUrl: document.getElementById('imageUrl').value,
        ownerId: '',
        lat: null,
        lng: null,
        mapLink: null,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (fieldName === '' && !image) {
      toast.warning("You haven't updated anything yet")
      return
    }

    // if user change the image
    if (image) {
      /// upload image to cloudbinary and get data back
      const data = new FormData()
      data.append('file', fileImage)
      data.append('upload_preset', 'fieldImg')
      data.append('cloud_name', 'dzh7xzbbz')
      dispatch(uploadImg(data))
    } else {
      formData.description = description.replaceAll(`'`, `\\'`)
      dispatch(updateField(formData))
    }
  }

  if (!isLoading) {
    return (
      <form onSubmit={handleSubmit}>
        <div className='flex items-center justify-center'>
          <div className='grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2'>
            <div className='flex justify-between mt-2 px-4'>
              <BackButton url='/myfields' size='30' />
              <div></div>
            </div>
            <div className='flex justify-center'>
              <div className='flex'>
                <h1 className='text-gray-600 font-bold md:text-2xl text-xl'>
                  Update Field
                </h1>
              </div>
            </div>

            <div className='grid grid-cols-1 mt-5 mx-7'>
              <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
                Field Name
              </label>
              <input
                id='fieldName'
                value={fieldName || field.fieldName}
                onChange={handleOnChange}
                className='py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                type='text'
                placeholder='Field Name'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7'>
              <div className='grid grid-cols-1'>
                <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
                  Sport Type
                </label>
                <select
                  className='py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                  value={type || field.type}
                  id='type'
                  onChange={handleOnChange}
                  required
                >
                  <option defaultValue>Choose Sport Type</option>
                  <option>Football</option>
                  <option>Volleyball</option>
                  <option>Tennis</option>
                </select>
              </div>
              <div className='grid grid-cols-1'>
                <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
                  Field Location
                </label>
                <select
                  className='py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                  value={location || field.location}
                  id='location'
                  onChange={handleOnChange}
                  required
                >
                  <option defaultValue>Choose Location</option>
                  <option>Khan Chamkar Mon</option>
                  <option>Khan Daun Penh</option>
                  <option>Khan Prampir Makara</option>
                  <option>Khan Tuol Kouk</option>
                  <option>Khan Dangkao</option>
                  <option>Khan Mean Chey</option>
                  <option>Khan Russey Keo</option>
                  <option>Khan Sen Sok</option>
                  <option>Khan Pou Senchey</option>
                  <option>Khan Chroy Changvar</option>
                  <option>Khan Prek Pnov</option>
                  <option>Khan Chbar Ampov</option>
                  <option>Khan Boeng Keng Kang</option>
                  <option>Khan Kamboul</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7'>
              <div className='grid grid-cols-1'>
                <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
                  Average Price
                </label>
                <input
                  onChange={handleOnChange}
                  value={averagePrice || field.average_price}
                  type='number'
                  className='py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                  id='averagePrice'
                  placeholder='Average Price'
                  required
                />
              </div>
              <div className='grid grid-cols-1'>
                <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
                  Total Pitch
                </label>
                <input
                  onChange={handleOnChange}
                  value={totalPitch || field.total_pitch}
                  type='number'
                  className='py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                  id='totalPitch'
                  placeholder='Total Pitch'
                  required
                />
              </div>
            </div>

            <div className='flex justify-between mx-7 my-5'>
              <div className='form-check'>
                <input
                  className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='checkbox'
                  value={parking || field.parking}
                  id='parking'
                  onChange={handleOnChange}
                  checked={parking || field.parking === 1 ? true : false}
                  disabled
                />
                <label
                  className='form-check-label inline-block text-gray-800'
                  htmlFor='flexCheckChecked'
                >
                  Parking
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='checkbox'
                  value={onlinePayment || field.online_payment}
                  checked={
                    onlinePayment || field.online_payment === 1 ? true : false
                  }
                  id='onlinePayment'
                  onChange={handleOnChange}
                  disabled
                />
                <label
                  className='form-check-label inline-block text-gray-800'
                  htmlFor='flexCheckChecked'
                >
                  Online Payment
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='checkbox'
                  value={freeWifi || field.free_wifi}
                  id='freeWifi'
                  checked={field.free_wifi === 1 ? true : false}
                  onChange={handleOnChange}
                  disabled
                />
                <label
                  className='form-check-label inline-block text-gray-800'
                  htmlFor='flexCheckChecked'
                >
                  Free Wifi
                </label>
              </div>
            </div>

            <div className='grid grid-cols-1 mx-7'>
              <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
                Field Description
              </label>
              <textarea
                value={description || field.description}
                id='description'
                onChange={handleOnChange}
                className='py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                type='text'
                placeholder='Description'
                required
              ></textarea>
            </div>

            <div className='grid grid-cols-1 mt-5 mx-7'>
              <div className='flex justify-between'>
                <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1'>
                  Upload Field Image
                </label>
                {image && (
                  <svg
                    className='w-5 cursor-pointer'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                    onClick={(e) => setImage('')}
                  >
                    <path d='M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
                  </svg>
                )}
              </div>
              <div className='flex items-center justify-center w-full '>
                <label className='flex flex-col border-4 border-dashed w-full h-72 hover:bg-gray-100 hover:border-green-300 group'>
                  {image || field.image_url ? (
                    <img
                      className='h-full'
                      src={image || field.image_url}
                      alt=''
                    />
                  ) : (
                    <div className='flex flex-col items-center justify-center pt-24 hover:cursor-pointer'>
                      <svg
                        className='w-10 h-10 text-green-400 group-hover:text-green-600 '
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      <p className='lowercase text-sm text-gray-400 group-hover:text-green-600 pt-1 tracking-wider'>
                        Select a photo
                      </p>
                    </div>
                  )}
                  <input
                    type='file'
                    className='hidden'
                    accept='.jpg,.png,.jpeg'
                    onChange={handleOnChange}
                  />
                </label>
              </div>
              <input
                hidden
                type='text'
                id='imageUrl'
                value={imageUrl || field.image_url}
                onChange={handleOnChange}
              />
            </div>

            <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
              <Link to='/myfields'>
                <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                className='w-auto bg-green-500 hover:bg-green-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  } else {
    return <Loading />
  }
}

export default UpdateField
