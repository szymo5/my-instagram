import React from 'react'
import { Stack } from '@mui/material';

import Auth from '../components/Auth';

const Login = () => {
    return (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={10}>
            <Auth/>
        </Stack>
    )
}

export default Login