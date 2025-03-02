import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FieldCard from './FieldCard'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getFields, getFieldByType, reset } from '../features/fields/fieldSlice'
import { useNavigate, Link } from 'react-router-dom'
import Loading from '../components/Loading'
import "../App.css"

const Left = (props) => {
  const { className, onClick, color } = props
  return (
    <div onClick={onClick} className={className}>
      <FaAngleLeft color='rgb(22 163 74)' size='40px' />
    </div>
  )
}

const Right = (props) => {
  const { className, onClick } = props
  return (
    <div className={className} onClick={onClick}>
      <FaAngleRight color='rgb(22 163 74)' size='40px' />
    </div>
  )
}

const SliderSection = ({ fields, type }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.fields
  )
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: fields.length >= 3 ? 3 : fields.length,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <Left />,
    nextArrow: <Right />,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: fields.length - 1 >= 2 ? 2 : fields.length,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  }
  if (type !== "All") {
  
    fields = fields.filter((field) => field.type === type)
  }

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])




  if (isLoading) {
    return <Loading />
  } else
    return (
      <div className='ml-6 mr-12 justify-center'>
        {fields.length > 0 && (
          <Slider {...settings}>
            {fields?.map((field, key) => (
              <div className='m-3' key={key}>
                <FieldCard field={field} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    )
}

export default SliderSection
