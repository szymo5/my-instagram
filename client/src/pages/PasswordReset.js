import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

import { Avatar, Box, Stack, Typography, TextField, Button, Divider } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Loader from '../components/Loader'

import { requestpasswordreset } from "../actions/auth";
import { clearState } from "../redux/auth";



const PasswordReset = () => {
    const {message, error, isLoading} = useSelector(state => state.auth)

    const [email, setEmail] = useState({email: ''});

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(clearState());
        dispatch(requestpasswordreset(email));

    }

    if(isLoading) {
        return (
            <Box width="100%" height="95vh" display="flex" justifyContent="center" alignItems="center">
                <Loader />
            </Box>
        )
    }
    return ( 
        <Box sx={{height: '95vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0', margin:0}}>
            {message ? (
                <Stack sx={{width: '388px', boxSizing: 'border-box'}}>
                    <Box width="100%" textAlign="center" color="green" mb="10px">
                        <CheckCircleOutlineIcon sx={{width: '3em', height: '3em'}}/>
                    </Box>
                    <Box mb="10px">
                        <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: '16px', color: "#383838"}}>Na podany email wysłano link resetujący hasło</Typography>
                    </Box>
                    <Box>
                        <Link to="/" className="link">
                            <Typography textAlign="center" fontSize="14px" fontWeight="bold" color="#888" onClick={() => dispatch(clearState())}>Powrót do logowania</Typography>
                        </Link>
                    </Box>
                </Stack>
            ) : (
                <Stack sx={{width: '388px', border: '1px solid #ccc', boxSizing: 'border-box'}}>
                    <Box margin='30px 0 15px 0'>
                        <Avatar sx={{width: '95px', height: '95px', background: '#fff', color: '#000', margin: '0 auto', border: '2px solid black'}}>
                            <LockOpenIcon sx={{fontSize: '50px'}}></LockOpenIcon>
                        </Avatar>
                    </Box>
                    <Typography variant="h4" sx={{margin: '0 auto 15px auto', fontWeight: 'bold', fontSize: '15px', color: "#383838"}}>Problem z logowaniem?</Typography>
                    <Box sx={{width: '100%', marginBottom:'15px'}}>
                        <Box sx={{width: '75%', margin: '0 auto'}}>
                            <Typography sx={{textAlign: 'center', fontSize: '14px', color: '#888', lineHeight: '1.3'}}>
                                Wprowadź swój adres e-mail, numer telefonu lub nazwę użytkownika, a my wyślemy ci link, który umożliwi odzyskanie dostępu do konta.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{width: '100%', marginBottom: '15px'}}>
                        <Stack component="form" sx={{width: '80%', margin: '0 auto'}} onSubmit={handleSubmit}>
                            <TextField name="email" label="Adres email" variant="outlined" size="small" fullWidth sx={{marginBottom: '15px'}} error={error.type === 'email' ? true : false} helperText={error.type === 'email' && error.errorMsg} onChange={(e) => setEmail({email: e.target.value})}/>
                            <Button type="submit" variant="contained" sx={{backgroundColor: '#0095f6', fontWeight: '600', textTransform: 'none', fontSize: '14px'}}>Wyślij link do logowania</Button>
                        </Stack>
                    </Box>
                    <Box sx={{width: '100%', marginBottom: '15px'}}>
                        <a href="https://help.instagram.com/374546259294234" style={{textDecoration: 'none', color: 'black'}}>
                            <Typography sx={{textAlign: 'center', fontSize: '12px'}}>Nie możesz zresetować hasła?</Typography>
                        </a>
                    </Box>
                    <Stack direction="row" alignItems="center" justifyContent="center" width='100%'>
                        <Divider sx={{width: '35%'}}/>
                        <Typography fontSize="12px" m={2} color="#8e8e8e" sx={{fontWeight: '700'}}>
                                LUB
                        </Typography>
                        <Divider sx={{width: '35%'}}/>
                    </Stack>
                    <Box width="100%">
                        <Typography textAlign="center" fontSize="12px" fontWeight="bold">Utwórz nowe konto</Typography>
                    </Box>
                    <Stack width="100%" mt="40px" height="40px" alignItems="center" justifyContent="center" sx={{borderTop: '1px solid #ccc'}}>
                        <Link to="/" className="link" onClick={() => dispatch(clearState())}>
                            <Typography textAlign="center" fontSize="12px" fontWeight="bold">Powrót do logowania</Typography>
                        </Link>
                    </Stack>
                </Stack>
            )}
        </Box>
     );
}
 
export default PasswordReset;