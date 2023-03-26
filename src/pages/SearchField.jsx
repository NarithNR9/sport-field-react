import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { searchFieldByName } from '../features/fields/fieldSlice'
import FieldCard from '../components/FieldCard'

const SearchField = () => {
  const dispatch = useDispatch()
  const param = useParams()
  
  const { fields, isLoading } = useSelector((state) => state.fields)

  useEffect(() => {
    dispatch(searchFieldByName(param.fieldName))
  }, [param.fieldName])
  return (
    <div className='m-3'>
      <div className='flex justify-center text-2xl mb-4'>Search Results</div>
      <div className='grid grid-cols-1  gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {fields.map((key) => (
          <FieldCard key={key.field_id} field={key} />
        ))}
      </div>
    </div>
  )
}

export default SearchField
