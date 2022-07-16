import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';

import {Box, Stack, Typography, Button} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Loader from '../components/Loader'

import { verify } from '../actions/auth';

const Verification = () => {
    const {id, token} = useParams();
    const {error, isLoading} = useSelector(state => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verify(id, token))
    }, [id, token])

    if(isLoading) {
        return (
            <Box width="100%" height="95vh" display="flex" justifyContent="center" alignItems="center">
                <Loader />
            </Box>
        )
    }

    return (
        <Box width="100%" height="95vh" display="flex" justifyContent="center" alignItems="center">
            {!error ? (
                <Stack>
                    <Box width="100%" textAlign="center" color="green">
                        <CheckCircleOutlineIcon sx={{width: '3em', height: '3em'}}/>
                    </Box>
                    <Typography textAlign="center" fontWeight="600" variant="h6" mt={1}>
                        Konto zostało pomyślnie aktywowane
                    </Typography>
                    <Typography color="#8e8e8e" textAlign="center" fontSize="17px" fontWeight="600" mt={1}>
                        Zaloguj się, aby przeglądać zdjęcia i filmy znajomych.
                    </Typography>
                    <Link to='/' className="link" style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button sx={{'&:hover': {backgroundColor: '#0095f6'}, backgroundColor: '#0095f6', color: '#fff', p:"5px 10px"}}>
                            Zaloguj się
                        </Button>
                    </Link>
                </Stack>
            ) : (
                <Stack>
                    <Box width="100%" textAlign="center" color="red">
                        <CancelOutlinedIcon sx={{width: '3em', height: '3em'}}/>
                    </Box>
                    <Typography textAlign="center" fontWeight="600" variant="h6" mt={1}>
                        Link aktywacyjny wygasł lub jest nieprawidłowy
                    </Typography>
                </Stack>
            )
            
        }
        </Box>
    )
}

export default Verification