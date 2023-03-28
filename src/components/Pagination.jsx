import React from 'react'

const Pagination = ({
  totalBookings,
  rowsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = []
  for (let i = 1; i <= Math.ceil(totalBookings / rowsPerPage); i++) {
    pages.push(i)
  }
  return (
    <div className='flex justify-end items-center mb-2 space-x-2'>
      <div>Page: </div>
      {pages.map((page, index) => (
        <div
          variant={page === currentPage ? 'primary' : 'outline-primary'}
          className={'cursor-pointer w-9 px-3 py-1 rounded-md  text-white border border-blue-700' + (page === currentPage ? ' bg-blue-700' : ' text-blue-900')}
          onClick={() => setCurrentPage(page)}
          key={index}
        >
          {page}
        </div>
      ))}
    </div>
  )
}

export default Pagination