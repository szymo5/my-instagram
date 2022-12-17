import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';

import {Stack, Typography, Button, TextField, Box, Divider} from '@mui/material'
import Loader from '../components/Loader'

import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneImg from '../assets/phone2.png'
import Logo from '../assets/logo.png'
import AppStore from '../assets/appstore.png'
import GooglePlay from '../assets/googleplay.png'


import { signup, signin } from '../actions/auth';
import { clearState } from '../redux/auth';

const initialState = {email: '', username:'', password:'', confirmPassword: ''};

const Auth = ({setIsUser}) => {
    const {message, error, isLoading} = useSelector(state => state.auth)

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearState())
        
        if(isSignUp) {
            dispatch(signup(formData))
        } else {
            dispatch(signin(formData, navigate, setIsUser))
            //console.log('login')
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    const info = `Konto nie jest aktywowane.
                Wysłano link weryfikacyjny na podany email.`

    return (
        <>
            <img src={PhoneImg} alt="phone" className="phoneImg"></img>
            <Stack>
                {isLoading ? <Loader/> : (
                    <>
                    <Stack sx={{border: '1px solid #ccc', width:'350px', boxSizing:'border-box'}} justifyContent="center" alignItems="center" p="20px" marginBottom="20px">
                    <img src={Logo} alt="logo"/>
                    {isSignUp && <Typography color="#8e8e8e" textAlign="center" fontSize="17px" fontWeight="600" mt={2} sx={{lineHeight: '1.2'}}>Zarejestruj się, aby przeglądać zdjęcia i filmy znajomych.</Typography>}
                    <Stack component="form" mt={3} width="100%" spacing={1} onSubmit={handleSubmit}>
                        {isSignUp && <TextField name="username" label="Nazwa użytkownika" variant="outlined" size="small" fullWidth onChange={handleChange}/>}
                        <TextField value={formData.email} name="email" label="Adres email" variant="outlined" size="small" fullWidth sx={{fontSize: '12px'}} error={error.type === 'email' ? true : false} helperText={error.type === 'email' && error.errorMsg} onChange={handleChange}/>
                        <TextField value={formData.password} name="password" type="password" label="Hasło" variant="outlined" size="small" fullWidth error={error.type === 'password' ? true : false} helperText={error.type === 'password' && error.errorMsg} onChange={handleChange}/>
                        {isSignUp && <TextField name="confirmPassword" type="password" label="Powtórz hasło" variant="outlined" size="small" fullWidth error={error.type === 'password' ? true : false} helperText={error.type === 'password' && error.errorMsg} onChange={handleChange}/>}
                        <Button type="submit" variant="contained" sx={{marginTop: '20px !important', backgroundColor: '#0095f6', fontWeight: '600', textTransform: 'none'}}>{isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}</Button>
                    </Stack>
                    {(isSignUp && message) && (<Box mt={2} borderRadius="3px" p="6px 12px" sx={{backgroundColor: 'rgb(7,186, 121, 0.8)'}}><Typography fontSize="13px" color="#fff">Wysłano na podany email link weryfikacyjny.</Typography></Box>)}
                    {(!isSignUp && message) && (<Box mt={2} borderRadius="3px" p="6px 12px" sx={{backgroundColor: 'rgb(7,186, 121, 0.8)'}}><Typography fontSize="13px" color="#fff" textAlign="center" style={{whiteSpace: 'pre-line'}}>{info}</Typography></Box>)}
                    <Stack direction="row" width="100%" alignItems="center" sx={{marginBottom: '8px'}}>
                        <Divider sx={{width: '40%'}}/>
                        <Typography fontSize="12px" m={2} color="#8e8e8e" sx={{fontWeight: '700'}}>
                            LUB
                        </Typography>
                        <Divider sx={{width: '40%'}}/>
                    </Stack>
                    <Stack direction="row" width="100%" alignItems="center" justifyContent="center" marginBottom="20px" >
                        <Button sx={{'&:hover': {backgroundColor: isSignUp ? '#0095f6' : 'transparent'}, textTransform: 'none', backgroundColor: isSignUp ? '#0095f6' : 'transparent', color: isSignUp  ? "#fff" : '#385185'}}>
                            <FacebookIcon/>
                            <Typography fontSize="13px" marginLeft="5px" sx={{fontWeight: '600'}}>
                                Zaloguj się przez Facebooka
                            </Typography>
                        </Button>
                    </Stack>
                    {!isSignUp && (
                        <Link to="/" className="link">
                        <Typography fontSize="12px">
                            Nie pamiętasz hasła?
                        </Typography>
                    </Link>
                    )}
                </Stack>
                <Stack sx={{border: '1px solid #ccc', width:'350px', boxSizing:'border-box'}} justifyContent="center" alignItems="center" p="20px">
                    <Typography fontSize='13px'>
                        {isSignUp ? 'Masz konta?' : 'Nie masz konta?'} <span className="register" style={{color: '#0095f6', fontWeight: '600'}} onClick={() => {setIsSignUp(prev => !prev); dispatch(clearState())}}>{isSignUp ? 'Zaloguj się' : 'Zarejestruj się'}</span>
                    </Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center" marginTop="20px">
                    <Typography fontSize="13px">
                        Pobierz aplikację.
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="center" marginTop="20px" spacing={1}>
                        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank" rel="noreferrer"><img src={AppStore} alt="appstore" height="40px"/></a>
                        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D5F6253FE-5BDC-45C7-8F3C-7F2B048928B8%26utm_content%3Dlo%26utm_medium%3Dbadge" target="_blank" rel="noreferrer"><img src={GooglePlay} alt="googleplay" height="40px"/></a>
                    </Stack>
                </Stack>
                </>
                )}
                
            </Stack>
        </>
    )
}

export default Auth