import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getField, reset } from '../features/fields/fieldSlice'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import BackButton from '../components/BackButton'
import { FaStar } from 'react-icons/fa'

const FieldDetail = () => {
  const dispatch = useDispatch()
  const { fieldId } = useParams()

  useEffect(() => {
    dispatch(getField(fieldId))
  }, [dispatch])

  const { field, isLoading } = useSelector((state) => state.fields)

  if (isLoading) {
    return <Loading />
  } else
    return (
      <div className=''>
        <div className='flex justify-center mx-2'>
          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <BackButton
                url='/'
                className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mt-2'
                size='30px'
              />

              <button
                type='button'
                disabled
                className='focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-7 py-0 mt-2 dark:bg-green-500 dark:focus:ring-green-800'
              >
                {field.type}
              </button>
            </div>

            <div className='flex border flex-col rounded-lg shadow-md md:flex-row md:max-w-5xl dark:border-gray-700 dark:bg-green-400'>
              <img
                className='object-cover w-full rounded-t-lg h-96 md:h-full md:w-1/2 md:rounded-none md:rounded-l-lg'
                src={field.image_url}
                alt=''
              />

              <div className='flex flex-col justify-between border-l-2 p-4 leading-normal text-white'>
                <div className='flex justify-between'>
                  <h5 className='mb-2 text-3xl font-bold tracking-tight'>
                    {field.fieldName}
                  </h5>
                  <div className='flex justify-between'>
                    <FaStar size='25px' className='mt-1 mx-1' color='yellow' />
                    <div className='text-white text-lg mt-1.5'>4.5</div>
                  </div>
                </div>
                <div className='flex text-lg'>
                  <svg
                    className='w-4 mr-2'
                    fill='white'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 384 512'
                  >
                    <path d='M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z' />
                  </svg>
                  <span>Location: {field.location}, Phnom Penh</span>
                </div>

                <div className='flex justify-between'>
                  {field.parking === 1 && (
                    <div className='flex text-lg'>
                      <svg
                        className='w-4 mr-1'
                        fill='white'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                      >
                        <path d='M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM192 256h48c17.7 0 32-14.3 32-32s-14.3-32-32-32H192v64zm48 64H192v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V288 168c0-22.1 17.9-40 40-40h72c53 0 96 43 96 96s-43 96-96 96z' />
                      </svg>
                      Parking
                    </div>
                  )}
                  {field.online_payment === 1 && (
                    <div className='flex text-lg'>
                      <svg
                        className='w-5 mr-1'
                        fill='white'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                      >
                        <path d='M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164.1 160v6.3c6.6 1.2 16.6 3.2 21 4.4c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-3.8-1-17.4-3.7-21.7-4.3c-12.2-1.9-22.2-.3-28.6 2.6c-6.3 2.9-7.9 6.2-8.2 8.1c-.6 3.4 0 4.7 .1 5c.3 .5 1 1.8 3.6 3.5c6.1 4.2 15.7 7.2 29.9 11.4l.8 .2c12.1 3.7 28.3 8.5 40.4 17.4c6.7 4.9 13 11.4 16.9 20.5c4 9.1 4.8 19.1 3 29.4c-3.3 19-15.9 32-31.6 38.7c-4.9 2.1-10 3.6-15.4 4.6V352c0 11.1-9 20.1-20.1 20.1s-20.1-9-20.1-20.1v-6.4c-9.5-2.2-21.9-6.4-29.8-9.1c-1.7-.6-3.2-1.1-4.4-1.5c-10.5-3.5-16.1-14.8-12.7-25.3s14.8-16.1 25.3-12.7c2 .7 4.1 1.4 6.4 2.1l0 0 0 0c9.5 3.2 20.2 6.9 26.2 7.9c12.8 2 22.7 .7 28.8-1.9c5.5-2.3 7.4-5.3 8-8.8c.7-4 .1-5.9-.2-6.7c-.4-.9-1.3-2.2-3.7-4c-5.9-4.3-15.3-7.5-29.3-11.7l-2.2-.7c-11.7-3.5-27-8.1-38.6-16c-6.6-4.5-13.2-10.7-17.3-19.5c-4.2-9-5.2-18.8-3.4-29c3.2-18.3 16.2-30.9 31.1-37.7c5-2.3 10.3-4 15.9-5.1v-6c0-11.1 9-20.1 20.1-20.1s20.1 9 20.1 20.1z' />
                      </svg>
                      <span>Online Payment</span>
                    </div>
                  )}
                  {field.free_wifi === 1 && (
                    <div className='flex text-lg'>
                      <svg
                        className='w-5 mr-1'
                        fill='white'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 640 512'
                      >
                        <path d='M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z' />
                      </svg>
                      <span>Free Wifi</span>
                    </div>
                  )}
                </div>
                <div className='flex justify-between'>
                  <div className='flex text-lg'>
                    <svg
                      className='w-6 mr-1'
                      fill='#ffffff'
                      version='1.1'
                      id='Layer_1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      viewBox='0 0 455 455'
                      xmlSpace='preserve'
                      stroke='#ffffff'
                    >
                      <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                      <g
                        id='SVGRepo_tracerCarrier'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <g id='SVGRepo_iconCarrier'>
                        {' '}
                        <g>
                          {' '}
                          <path d='M104.859,227.5c0-41.98-34.153-76.133-76.134-76.133H0V212.5h50v30H0v61.133h28.726 C70.706,303.633,104.859,269.48,104.859,227.5z' />{' '}
                          <path d='M192.5,227.5c0,13.934,8.186,25.988,20,31.616v-63.232C200.686,201.512,192.5,213.566,192.5,227.5z' />{' '}
                          <path d='M262.5,227.5c0-13.934-8.186-25.988-20-31.616v63.232C254.314,253.488,262.5,241.434,262.5,227.5z' />{' '}
                          <path d='M350.141,227.5c0,41.98,34.153,76.133,76.134,76.133H455V242.5h-50v-30h50v-61.133h-28.726 C384.294,151.367,350.141,185.52,350.141,227.5z' />{' '}
                          <path d='M0,121.367h28.726c58.522,0,106.134,47.611,106.134,106.133S87.248,333.633,28.726,333.633H0V383.5h212.5v-92.766 c-28.631-6.792-50-32.556-50-63.234s21.369-56.442,50-63.234V71.5H0V121.367z' />{' '}
                          <path d='M242.5,71.5v92.766c28.631,6.792,50,32.556,50,63.234s-21.369,56.442-50,63.234V383.5H455v-49.867h-28.726 c-58.522,0-106.134-47.611-106.134-106.133s47.611-106.133,106.134-106.133H455V71.5H242.5z' />{' '}
                        </g>{' '}
                      </g>
                    </svg>
                    Total Pitch: {field.total_pitch}
                  </div>
                  <div className='flex text-lg'>
                    <svg
                      fill='#ffffff'
                      viewBox='0 0 20.40 20.40'
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6'
                      stroke='#ffffff'
                      strokeWidth='0.00020400000000000003'
                    >
                      <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                      <g
                        id='SVGRepo_tracerCarrier'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        stroke='#CCCCCC'
                        strokeWidth='2.7336'
                      />
                      <g id='SVGRepo_iconCarrier'>
                        <path d='M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-4.844 1.754a2.249 2.249 0 0 0-.556-1.477l-.001-.002a3.02 3.02 0 0 0-.835-.665l-.003-.002a3.498 3.498 0 0 0-.866-.313H9.31a3.78 3.78 0 0 0-.795-.083 2.849 2.849 0 0 1-.475-.037 1.8 1.8 0 0 1-.494-.158l-.002-.001a1.17 1.17 0 0 1-.371-.298L7.172 9a.733.733 0 0 1-.175-.44.749.749 0 0 1 .421-.63 2.157 2.157 0 0 1 1.11-.297 2.283 2.283 0 0 1 .391.066l.049.01a2.479 2.479 0 0 1 .473.166 1.33 1.33 0 0 1 .381.261.792.792 0 1 0 1.118-1.12 2.902 2.902 0 0 0-.85-.585 3.996 3.996 0 0 0-.785-.268h-.001l-.008-.002v-.786a.792.792 0 1 0-1.583 0v.763a3.557 3.557 0 0 0-1.14.454 2.328 2.328 0 0 0-1.159 1.967 2.296 2.296 0 0 0 .529 1.44 2.724 2.724 0 0 0 .894.717 3.342 3.342 0 0 0 .942.305 4.398 4.398 0 0 0 .736.059 2.202 2.202 0 0 1 .46.046 1.927 1.927 0 0 1 .467.168 1.431 1.431 0 0 1 .382.308.674.674 0 0 1 .165.436c0 .097 0 .324-.385.573a2.182 2.182 0 0 1-1.132.314 3.515 3.515 0 0 1-.494-.06 2.381 2.381 0 0 1-.459-.148h-.001a.953.953 0 0 1-.356-.274.792.792 0 1 0-1.197 1.037 2.516 2.516 0 0 0 .967.708 3.799 3.799 0 0 0 .774.237h.007v.783a.792.792 0 1 0 1.583 0v-.79a3.581 3.581 0 0 0 1.17-.479 2.215 2.215 0 0 0 1.107-1.9z' />
                      </g>
                    </svg>
                    Average Price: ${field.average_price}
                  </div>
                </div>

                <p className='mt-3 font-normal'>{field.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default FieldDetail
