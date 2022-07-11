import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Stack, Typography, Button, TextField, Box, Divider} from '@mui/material'
import PhoneImg from '../assets/phone2.png'
import Logo from '../assets/logo.png'

const Auth = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={10}>
        <img src={PhoneImg} alt="phone" className="phoneImg"></img>
        <Stack sx={{border: '1px solid #ccc', width:'350px', boxSizing:'border-box'}} justifyContent="center" alignItems="center" p="30px">
            <img src={Logo} alt="logo"></img>
            <Stack type="form" mt={4} width="100%" spacing={1}>
                <TextField label="Adres email" variant="outlined" size="small" fullWidth/>
                <TextField label="Hasło" variant="outlined" size="small" fullWidth/>
                <Button variant="contained" disabled={true}>Zaloguj się</Button>
            </Stack>
            <Stack direction="row" width="100%" alignItems="center">
                <Divider sx={{my: '20px', width: '40%'}}/>
                <Typography fontSize="12px" m={2} color="#aaa" sx={{fontWeight: '700'}}>
                    LUB
                </Typography>
                <Divider sx={{my: '20px', width: '40%'}}/>
            </Stack>
            <Link to="/" className="link">
                <Typography fontSize="12px">
                    Nie pamiętasz hasła?
                </Typography>
            </Link>
        </Stack>
    </Stack>
  )
}

export default Auth