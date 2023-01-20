import {Routes, Route, Navigate} from 'react-router-dom'
import { Stack } from '@mui/material';
import Dashboard from '../components/Dashboard';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("profile")).account;

    return ( 
        <Stack direction="row" sx={{width: '100%', height: '100vh', background: 'black', overflow: 'hidden'}}>
            <Dashboard user={user}/>
        </Stack>
     );
}
 
export default Home;