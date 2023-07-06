import { useState, useEffect } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, logoutOwner, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { player, owner } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(logoutOwner());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav
      className="
  relative
  w-full
  flex flex-wrap
  items-center
  justify-between
  py-4
  px-8
  bg-gray-100
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light
  "
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button
          className="
      navbar-toggler
      text-gray-500
      border-0
      hover:shadow-none hover:no-underline
      py-2
      px-2.5
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
    "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div
          className=" navbar-collapse hidden flex-grow items-center"
          id="navbarSupportedContent"
        >
          <Link
            className="
        flex
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900
        mt-2
        lg:mt-0
        mr-1
        w-12
      "
            to=""
          >
            <img
              src={logo}
              // style={{ height: '15px' }}
              alt=""
              loading="lazy"
            />
          </Link>
          {/* Left links */}
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
            <li className="nav-item p-2">
              <Link
                className="nav-link text-xl text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0 font-semibold"
                to="/"
              >
                Sport Field Kh
              </Link>
            </li>
          </ul>
          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}
        {/* Right elements */}
        <div className="flex items-center relative">
          {/* Icon */}

          <div className="dropdown relative"></div>
          <ul className="flex space-x-5">
            {player || owner ? (
              <li className="nav-item p-2">
                <div className="flex justify-between">
                  <div className="flex justify-center mr-2">
                    <div className="xl:w-56">
                      <div className="input-group relative flex flex-wrap items-stretch w-full">
                        <input
                          type="search"
                          className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                          id="btnSearch"
                        />
                        <button
                          className="btn inline-block px-3 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                          type="button"
                          onClick={() => {
                            if (document.getElementById("btnSearch").value) {
                              navigate(
                                "/search/" +
                                  document.getElementById("btnSearch").value
                              );
                            }
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="search"
                            className="w-4"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="btn">
                    <div className="dropdown relative">
                      <a
                        className="dropdown-toggle flex items-center hidden-arrow"
                        href="/"
                        id="dropdownMenuButton2"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FaUserCircle size={30} />
                      </a>
                      <ul
                        className="
    dropdown-menu
    min-w-max
    absolute
    hidden
    bg-white
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
  "
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <li>
                          <a
                            className="
                          dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
                            href="/"
                          >
                            Profile-{player?.name} {owner?.name}
                          </a>
                        </li>

                        <li>
                          <Link
                            className="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
                            to={owner ? "ownerBookings" : "mybookings"}
                          >
                            {owner && <p>Owner Bookings</p>}
                            {player && <p>My Bookings</p>}
                          </Link>
                        </li>
                        {owner && (
                          <li>
                            <Link
                              className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-gray-700  hover:bg-gray-100"
                              to="/myFields"
                            >
                              My Fields
                            </Link>
                          </li>
                        )}

                        <li>
                          <a
                            className="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
                            href="/"
                          >
                            <div className="flex" onClick={onLogout}>
                              <FaSignOutAlt />
                              Logout
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </button>
                </div>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Right elements */}
      </div>
    </nav>
  );
}
