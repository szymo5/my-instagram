import React, {useState, useEffect} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Box} from '@mui/material'

import './App.css';

import Login from './pages/Login'
import Verification from './pages/Verification'
import Home from './pages/Home'


const App = () => {
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        function checkUser(){
            const userCheck = localStorage.getItem('profile');
            setUser(userCheck ? JSON.parse(localStorage.getItem('profile').account) : null);
        }
        
        window.addEventListener('storage', checkUser)

        return () => {
          window.removeEventListener('storage', checkUser)
        }
    }, [])

    return (
        <Box sx={{width: {xl: '1200px'}}} m='auto' p='0'>
            <Routes>
                <Route path='/' exact element={!user ? <Login/> : <Navigate replace to="/home"/>}/>
                <Route path='/user/:id/verify/:token' element={<Verification/>}/>
                <Route path='/home' element={user ? <Home/> : <Navigate replace to="/"/>} />
                {/* <Route path='/' element={<Verification/>}/> */}
            </Routes>
        </Box>
    )
}

export default App
