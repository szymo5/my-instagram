import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Stack, Typography, Button, TextField, Box, Divider} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneImg from '../assets/phone2.png'
import Logo from '../assets/logo.png'
import AppStore from '../assets/appstore.png'
import GooglePlay from '../assets/googleplay.png'

const Auth = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={10}>
        <img src={PhoneImg} alt="phone" className="phoneImg"></img>
        <Stack>
            <Stack sx={{border: '1px solid #ccc', width:'350px', boxSizing:'border-box'}} justifyContent="center" alignItems="center" p="20px" marginBottom="20px">
                <img src={Logo} alt="logo"/>
                <Stack type="form" mt={3} width="100%" spacing={1}>
                    <TextField label="Adres email" variant="outlined" size="small" fullWidth/>
                    <TextField label="Hasło" variant="outlined" size="small" fullWidth/>
                    <Button variant="contained" disabled={true}>Zaloguj się</Button>
                </Stack>
                <Stack direction="row" width="100%" alignItems="center" sx={{marginBottom: '8px'}}>
                    <Divider sx={{width: '40%'}}/>
                    <Typography fontSize="12px" m={2} color="#8e8e8e" sx={{fontWeight: '700'}}>
                        LUB
                    </Typography>
                    <Divider sx={{width: '40%'}}/>
                </Stack>
                <Stack direction="row" width="100%" alignItems="center" justifyContent="center" marginBottom="20px" color="#385185">
                    <FacebookIcon/>
                    <Typography fontSize="13px" marginLeft="5px" sx={{fontWeight: '600'}}>
                        Zaloguj się przez Facebooka
                    </Typography>
                </Stack>
                <Link to="/" className="link">
                    <Typography fontSize="12px">
                        Nie pamiętasz hasła?
                    </Typography>
                </Link>
            </Stack>
            <Stack sx={{border: '1px solid #ccc', width:'350px', boxSizing:'border-box'}} justifyContent="center" alignItems="center" p="20px">
                <Typography fontSize='13px'>
                    Nie masz konta? <span style={{color: '#0095f6', fontWeight: '600'}}>Zarejestruj się</span>
                </Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center" marginTop="20px">
                <Typography fontSize="13px">
                    Pobierz aplikację.
                </Typography>
                <Stack direction="row" alignItems="center justifyContent="center marginTop="20px" spacing={1}>
                    <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank"><img src={AppStore} alt="appstore" height="40px"/></a>
                    <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D5F6253FE-5BDC-45C7-8F3C-7F2B048928B8%26utm_content%3Dlo%26utm_medium%3Dbadge" target="_blank"><img src={GooglePlay} alt="googleplay" height="40px"/></a>
                </Stack>
            </Stack>
        </Stack>
    </Stack>
  )
}

export default Auth