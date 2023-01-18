import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import {Box, Stack, Typography, TextField, Button, Avatar} from '@mui/material';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import Loader from '../components/Loader';
import { clearState } from '../redux/auth';
import { checkpasswordreset, passwordreset} from '../actions/auth';


const PasswordReset = () => {
    const [passsword, setPassword] = useState({password: false});

    const {id, token} = useParams();
    const {error, isLoading, message} = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const navigation = useNavigate();

    useEffect(() => {
        dispatch(checkpasswordreset(id, token));
    }, [id, token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(passwordreset(id, passsword, navigation));

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
            {!message ? (
                <Stack sx={{width: '388px', boxSizing: 'border-box'}}>
                    <Box width="100%" textAlign="center" color="red" mb="10px">
                        <KeyOffIcon sx={{width: '3em', height: '3em'}}/>
                    </Box>
                    <Box mb="10px">
                        <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: '16px', color: "#383838"}}>Link resetujący hasło wygasł</Typography>
                    </Box>
                    <Box>
                        <Link to="/" className="link">
                            <Typography textAlign="center" fontSize="14px" fontWeight="bold" color="#888" onClick={() => dispatch(clearState())}>Powrót do logowania</Typography>
                        </Link>
                    </Box>
                </Stack>
            ) : (
                <Stack sx={{width: '388px', border: '1px solid #ccc'}}>
                    <Box margin='30px 0 15px 0'>
                        <Avatar sx={{width: '65px', height: '65px', background: '#fff', color: '#000', margin: '0 auto', border: '2px solid black'}}>
                            <VpnKeyIcon sx={{fontSize: '50px'}}></VpnKeyIcon>
                        </Avatar>
                    </Box>
                    <Typography variant="h4" sx={{margin: '0 auto 15px auto', fontWeight: 'bold', fontSize: '15px', color: "#383838"}}>Zresetuj hasło</Typography>
                    <Box sx={{width: '100%', marginBottom:'15px'}}>
                        <Box sx={{width: '75%', margin: '0 auto'}}>
                            <Typography sx={{textAlign: 'center', fontSize: '14px', color: '#888', lineHeight: '1.3'}}>
                                Wprowadź nowe hasło, aby móc ponowanie zalogować się do swojego konta.
                            </Typography>
                        </Box>
                    </Box>
                    <Box mb="35px">
                        <Stack component="form" sx={{width: '80%', margin: '0 auto'}} onSubmit={handleSubmit}>
                            <TextField name="password" type="password" label="Nowe hasło" variant="outlined" size="small" fullWidth sx={{marginBottom: '15px'}} error={error.type === 'password' ? true : false} helperText={error.type === 'password' && error.errorMsg} onChange={(e) => setPassword({password: e.target.value})}/>
                            <Button type="submit" variant="contained" sx={{backgroundColor: '#0095f6', fontWeight: '600', textTransform: 'none', fontSize: '14px'}}>Zmień hasło</Button>
                        </Stack>
                    </Box>
                </Stack>
            )}
            
        </Box>
     );
}
 
export default PasswordReset;