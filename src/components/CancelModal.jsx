import React from "react";
import { useDispatch } from "react-redux";
import { cancelBooking } from "../features/booking/bookingSlice";

const CancelModal = ({ booking }) => {
  const dispatch = useDispatch();

  const handleCancelBooking = () => {
    dispatch(cancelBooking(booking.booking_id));
    location.reload();
  };

  return (
    <div
      className="modal bg-gray-100/50 fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id={"deleteModal" + booking.booking_id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="deleteModalLabel"
            >
              Cancel booking [{booking?.date?.slice(0, 10)} {booking?.time}{" "}
              {booking?.pitch_number}]
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body relative p-4">
            {booking?.status === "Cancel" ? (
              <p>This booking is already been cancelled.</p>
            ) : (
              <div>
                Please make sure to inform the player after cancellation. <br />
                Player Number:{" "}
                {booking?.phone_number?.substr(0, 3) +
                  " " +
                  booking?.phone_number?.substr(3, 3) +
                  " " +
                  booking?.phone_number?.substr(6, 4)}
              </div>
            )}
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              className="px-6
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
    ease-in-out"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {booking?.status !== "Cancel" && (
              <button
                data-bs-dismiss="modal"
                onClick={() => handleCancelBooking()}
                type="button"
                className="px-6
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
ml-1"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
