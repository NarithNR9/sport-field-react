import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BackButton = ({ url, size,className }) => {
  return (
    <>
      <Link to={url} className={className}>
        <FaArrowCircleLeft size={size} />
        <p className='text-base'>Back</p>
      </Link>
    </>
  )
}

export default BackButton
