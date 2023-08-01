import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import IntroPage from './components/IntroPage'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Spending from './components/Spending'
import Main from './components/Main'
import './App.css'
import UserContext from './UserContext'

function App() {
  
  // localStorage.getItem('businessInfo')
  return (

    <Routes>
      <Route path='/' element={<IntroPage />}/>
      <Route path='/dashboard/*' element={<Main />} />
    </Routes>
  )
}

export default App
