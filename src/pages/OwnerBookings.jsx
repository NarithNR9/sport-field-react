import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerBookings } from "../features/booking/bookingSlice";
import { Link } from "react-router-dom";
import { getOwnerFields } from "../features/fields/fieldSlice";

const OwnerBookings = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [type, setType] = useState("Football");
  const [pitchNum, setPitchNum] = useState(1);

  const { bookings, isError, isLoading } = useSelector(
    (state) => state.booking
  );

  const { fields } = useSelector((state) => state.fields);

  const field = fields.filter((field) => field.type === type);

  const { owner } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (field[0]) {
      dispatch(getOwnerBookings([field[0]?.field_id, type, pitchNum, date]));
    }
  }, [fields, type, pitchNum, date]);

  useEffect(() => {
    dispatch(getOwnerFields(owner.id));
  }, []);

  return (
    <div className='m-2'>
      <div className='flex items-center justify-between lg:max-w-6xl 2xl:max-w-screen-xl mt-2 mr-2'>
        <div className='ml-2 font-bold'>{field[0]?.fieldName}</div>
        <select
          onChange={(e) => setType(e.target.value)}
          className='bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block p-2.5'
        >
          {fields?.map((field, index) => (
            <option
              value={field.type}
              key={index}
              selected={field.type === "Football" ? true : false}
            >
              {field.type}
            </option>
          ))}
        </select>
        <select
          className='bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block p-2.5'
          onChange={(e) => setPitchNum(e.target.value)}
        >
          {[...Array(field[0]?.total_pitch)].map((num, index) => (
            <option key={index} value={index + 1}>
              Pitch Number {index + 1}
            </option>
          ))}
        </select>
        <div className=''>
          <input
            type='date'
            pattern='yyyy-mm-dd'
            className='bg-green-50 border border-green-300 text-gray-900 text-sm w-36 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block p-2'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder='Select Date'
          />
        </div>
      </div>

      <div className='relative mt-2 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm sm:text-base text-left'>
          <thead className='text-xs sm:text-sm text-gray-700 uppercase bg-green-100  '>
            <tr>
              <th scope='col' className='px-5 py-3'>
                <div className='flex items-center'>
                  Date
                  <a href='#'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-3 h-3 ml-1'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 320 512'
                    >
                      <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope='col' className='px-5 py-3'>
                <div className='flex items-center'>Time</div>
              </th>
              <th scope='col' className='px-3 py-3'>
                <div className='flex items-center'>Pitch</div>
              </th>

              <th scope='col' className='px-3 py-3'>
                <div className='flex items-center'>Status</div>
              </th>
              <th scope='col' className='px-5 py-3'>
                <div className='flex items-center'>Phone Number</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, index) => (
              <tr key={index} className='bg-white border-b '>
                <td className='px-5 py-4'>{booking.date.slice(0, 10)}</td>
                <td className='px-5 py-4'>{booking.time}</td>
                <td className='px-3 py-4'>{booking.pitch_number}</td>
                <td className='px-3'>
                  <div
                    className={
                      "w-fit p-2 text-white rounded-md uppercase text-sm " +
                      (booking.status === "Half"
                        ? "bg-yellow-400"
                        : "bg-green-600")
                    }
                  >
                    {booking.status}
                  </div>
                </td>
                <td className='px-5 py-4 font-semibold'>
                  {booking.phone_number.substr(0, 3) +
                    " " +
                    booking.phone_number.substr(3, 3) +
                    " " +
                    booking.phone_number.substr(6, 4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookings?.length == 0 && <div className="flex justify-center text-xl mt-2 text-yellow-500">No booking records match this filter!</div>}
    </div>
  );
};

export default OwnerBookings;
