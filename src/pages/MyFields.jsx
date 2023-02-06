import React, { useEffect } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getOwnerFields,
  deleteField,
  reset,
} from '../features/fields/fieldSlice'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const MyFields = () => {
  const dispatch = useDispatch()
  const { owner } = useSelector((state) => state.auth)
  const ownerId = owner.id

  const { fields, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.fields
  )
  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       dispatch(reset())
  //     }
  //     if (isError) {
  //       toast.error(message)
  //     }
  //   }
  // }, [dispatch, isSuccess, isError, message])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(reset())
    }
    if (isError) {
      toast.error(message)
    }

    dispatch(getOwnerFields(ownerId))
  }, [dispatch, ownerId, isSuccess, message, isError])

  const handleDelete = (fieldId) => {
    dispatch(deleteField(fieldId))
  }

  if (isLoading) {
    return <Loading />
  } else
    return (
      <>
        <div className='flex justify-center px-16 py-6 text-3xl'>
          <p>My Fields</p>
        </div>
        <div className='grid grid-cols-3 gap-4 mx-3'>
          {fields.map((field) => (
            <div className='' key={field.field_id}>
              <div className='rounded-lg shadow-lg bg-white'>
                <a href='#!'>
                  <img
                    className='rounded-t-lg h-60 w-full'
                    src={field.image_url}
                    alt=''
                  />
                </a>
                <div className='p-3'>
                  <div className='flex justify-between'>
                    <h5 className='text-gray-900 text-xl font-medium mb-2'>
                      {field.fieldName}
                    </h5>
                    <div className='flex justify-between'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='star'
                        className='w-4 text-yellow-500 mr-1 pb-4'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                      >
                        <path
                          fill='currentColor'
                          d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'
                        ></path>
                      </svg>
                      4.5
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <h5 className='text-gray-900 font-medium mb-2'>
                      {field.type}
                    </h5>
                  </div>
                  <div className='flex justify-between'>
                    <button
                      type='button'
                      className='inline-block px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
                      data-bs-toggle='modal'
                      data-bs-target={'#deleteModal'+field.field_id}
                    >
                      Delete
                    </button>
                    <Link to={'/updatefield/' + field.field_id}>
                      <button
                        type='button'
                        className='inline-block px-5 py-2 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out'
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Modal Delete */}
              <div
                className='modal bg-gray-100/50 fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id={'deleteModal'+field.field_id}
                data-bs-backdrop='static'
                data-bs-keyboard='false'
                tabIndex='-1'
                aria-labelledby='staticBackdropLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog modal-sm relative w-auto pointer-events-none'>
                  <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
                    <div className='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
                      <h5
                        className='text-xl font-medium leading-normal text-gray-800'
                        id='deleteModalLabel'
                      >
                        Delete Field
                      </h5>
                      <button
                        type='button'
                        className='btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      />
                    </div>
                    <div className='modal-body relative p-4'>
                      Are you sure want to delete this field?
                    </div>
                    <div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
                      <button
                        type='button'
                        className='px-6
    py-2.5
    bg-gray-600
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    hover:bg-gray-700 hover:shadow-lg
    focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-gray-800 active:shadow-lg
    transition
    duration-150
    ease-in-out'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        onClick={() => handleDelete(field.field_id)}
                        type='button'
                        className='px-6
py-2.5
bg-red-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-red-700 hover:shadow-lg
focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-red-800 active:shadow-lg
transition
duration-150
ease-in-out
ml-1'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}

          <div className=''>
            <div className='block p-6 rounded-lg shadow-lg bg-white max-w-sm border-solid border-2 border-zinc-900'>
              <h5 className='text-gray-900 text-3xl leading-tight font-medium mb-2'>
                Add new field
              </h5>
              <Link to='/createfield'>
                <FaPlusCircle className='' size={60} />
              </Link>
            </div>
          </div>
        </div>
      </>
    )
}

export default MyFields
