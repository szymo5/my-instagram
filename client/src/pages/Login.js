import React from 'react'
import { Stack } from '@mui/material';

import Auth from '../components/Auth';

const Login = ({setIsUser}) => {
    return (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={10}>
            <Auth setIsUser={setIsUser}/>
        </Stack>
    )
}

export default Login