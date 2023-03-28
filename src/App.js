import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BackButton from './components/BackButton'
import Login from './pages/Login'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register'
import LoginOwner from './pages/LoginOwner'
import MyFields from './pages/MyFields'
import CreateField from './pages/CreateField'
import UpdateField from './pages/UpdateField'
import Footer from './components/Footer'
import FieldDetail from './pages/FieldDetail'
import SearchField from './pages/SearchField'
import MyBookings from './pages/MyBookings'


function App() {
  return (
    <> 
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login/owner' element={<LoginOwner />} />
          <Route path='/register' element={<Register />} />
          <Route path='/myfields' element={<MyFields />} />
          <Route path='/createfield' element={<CreateField />} />
          <Route path='/updatefield/:fieldId' element={<UpdateField />} />
          <Route path='/field/:fieldId' element={<FieldDetail />}/>
          <Route path='/search/:fieldName' element={<SearchField />}/>
          <Route path='/myBookings' element={<MyBookings />}/>
        </Routes> 
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
