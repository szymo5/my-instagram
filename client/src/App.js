import React, {useState, useEffect} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Box} from '@mui/material'

import './App.css';

import Login from './pages/Login'
import Verification from './pages/Verification'
import Home from './pages/Home'
import PasswordResetRequest from './pages/PasswordResetRequest';
import PasswordReset from './pages/PasswordReset';
import PasswordResetSuccess from './pages/PasswordResetSuccess';


const App = () => {
    const [isUser, setIsUser] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('profile'));
    // useEffect(() => {
    //     const userCheck = localStorage.getItem('profile');
    //     setUser(userCheck ? JSON.parse(localStorage.getItem('profile')).account : null);
    // }, [])

    // useEffect(() => {
    //     const userCheck = localStorage.getItem('profile');
        
    //     if (userCheck) {
    //         // setUser(userCheck ? JSON.parse(localStorage.getItem('profile')).account : null);
    //         setUser(JSON.parse(localStorage.getItem('profile')).account);
    //     }

    //   }, [isUser])

    return (
        <Box sx={{width: {xl: '1200px'}}} m='auto' p='0'>
            <Routes>
                <Route path='/' exact element={!user ? <Login setIsUser={setIsUser}/> : <Navigate replace to="/home"/>}/>
                <Route path='/user/:id/verify/:token' element={<Verification/>}/>
                <Route path='/home' element={user ? <Home/> : <Navigate replace to="/"/>} />
                <Route path='/password/reset' element={!user ? <PasswordResetRequest/> : <Navigate replace to="/"/>} />
                <Route path='/user/:id/password/reset/:token' element={<PasswordReset/>}/>
                <Route path='/password/reset/success' element={<PasswordResetSuccess/>}/>
                {/* <Route path='/' element={<Verification/>}/> */}
            </Routes>
        </Box>
    )
}

export default App
