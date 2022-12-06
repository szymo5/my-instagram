import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Box} from '@mui/material'

import './App.css';

import Login from './pages/Login'
import Verification from './pages/Verification'


const App = () => {
  return (
      <Box sx={{width: {xl: '1200px'}}} m='auto' p='0'>
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/user/:id/verify/:token' element={<Verification/>}/>
              {/* <Route path='/' element={<Verification/>}/> */}
          </Routes>
      </Box>
  )
}

export default App
