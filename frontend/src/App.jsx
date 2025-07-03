import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ScrollProgressCircle from './components/ScrollProgressCircle'

const App = () => {
  return (
    <main>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} /> 
      </Routes>

      <ScrollProgressCircle/>
    </main>
  )
}

export default App