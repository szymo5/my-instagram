import React, {useState, useEffect} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Box} from '@mui/material'

import './App.css';

import Login from './pages/Login'
import Verification from './pages/Verification'
import Home from './pages/Home'
import PasswordReset from './pages/PasswordReset';


const App = () => {
    const [isUser, setIsUser] = useState(false);
    const [user, setUser] = useState(null)
    // useEffect(() => {
    //     const userCheck = localStorage.getItem('profile');
    //     setUser(userCheck ? JSON.parse(localStorage.getItem('profile')).account : null);
    // }, [])

    useEffect(() => {
        const userCheck = localStorage.getItem('profile');
        
        if (userCheck) {
            // setUser(userCheck ? JSON.parse(localStorage.getItem('profile')).account : null);
            setUser(JSON.parse(localStorage.getItem('profile')).account);
        }

      }, [isUser])

    return (
        <Box sx={{width: {xl: '1200px'}}} m='auto' p='0'>
            <Routes>
                <Route path='/' exact element={!user ? <Login setIsUser={setIsUser}/> : <Navigate replace to="/home"/>}/>
                <Route path='/user/:id/verify/:token' element={<Verification/>}/>
                <Route path='/home' element={user ? <Home/> : <Navigate replace to="/"/>} />
                <Route path='/password/reset' element={!user ? <PasswordReset/> : <Navigate replace to="/"/>} />
                {/* <Route path='/' element={<Verification/>}/> */}
            </Routes>
        </Box>
    )
}

export default App
