import { useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'

import { Stack } from '@mui/material';

import Dashboard from '../components/Dashboard';
import User from '../components/User';
import Create from '../components/Create';
import Main from '../components/Main';

const Home = () => {
    const [isCreate, setIsCreate] = useState(false);
    const user = JSON.parse(localStorage.getItem("profile")).account;

    return ( 
        <Stack direction="row" sx={{width: '100%', height: '100vh', background: 'black', overflow: 'hidden'}}>
            {isCreate && <Create setIsCreate={setIsCreate}/>}
            <Dashboard user={user} setIsCreate={setIsCreate}/>
            <Routes>
                <Route path={`${user.username}`} element={<User/>}/>
                <Route path='/main' element={<Main/>}/>
            </Routes>
        </Stack>
     );
}
 
export default Home;