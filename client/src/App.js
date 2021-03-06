import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Box} from '@mui/material'

import './App.css';

import Auth from './pages/Auth'
import Verification from './pages/Verification'


const App = () => {
  return (
      <Box sx={{width: {xl: '1200px'}}} m='auto' p='0'>
          <Routes>
              <Route path='/' element={<Auth/>}/>
              <Route path='/user/:id/verify/:token' element={<Verification/>}/>
              {/* <Route path='/' element={<Verification/>}/> */}
          </Routes>
      </Box>
  )
}

export default App
