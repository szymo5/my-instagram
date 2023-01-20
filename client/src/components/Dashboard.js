import { useState } from 'react';

import { Box, Stack, Typography, Avatar, Menu, MenuItem } from "@mui/material";

import instagramLogo from '../assets/instagram_dashboard.PNG'

// import {HomeIcon, SearchIcon, ExploreIcon, LiveTvIcon, NearMeIcon, FavoriteBorderIcon, AddCircleOutlineIcon} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import NearMeIcon from '@mui/icons-material/NearMe';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("profile")).account;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        { name: "Strona Główna", icon: <HomeIcon sx={{height: '30px', width: '30px'}}/> },
        { name: "Szukaj", icon: <SearchIcon sx={{height: '30px', width: '30px'}}/> },
        { name: "Eksploruj", icon: <ExploreIcon sx={{height: '30px', width: '30px'}}/> },
        { name: "Reels", icon: <OndemandVideoIcon sx={{height: '30px', width: '30px'}}/> },
        { name: "Wiadomości", icon: <NearMeIcon sx={{height: '30px', width: '30px'}}/> },
        { name: "Powiadomienia", icon: <FavoriteBorderIcon sx={{height: '30px', width: '30px'}}/> },
        { name: "Utwórz", icon: <AddCircleOutlineIcon sx={{height: '30px', width: '30px'}}/> }
    ];

    const moreMenuItems = [
        {name: "Ustawienia", icon: <SettingsIcon/> },
        {name: "Zapisane", icon: <BookmarkBorderIcon/> },
        {name: "Zmień wygląd", icon: <DarkModeOutlinedIcon/> },
        {name: "Twoja aktywność", icon: <WatchLaterOutlinedIcon/> },
        {name: "Zgłoś problem", icon: <SmsFailedOutlinedIcon/> },
        {name: "Przełącz konto", icon: null },
        {name: "Wyloguj się", icon: null },
    ]

    return ( 
        <Stack width="336px" alignItems="center" sx={{background: 'black', borderRight: '1px solid #383838'}}>
            <Stack width="311px" alignItems="center" p="8px 12px 20px 12px">
                <Box width="100%" height="92px" p="25px 12px 16px 12px" sx={{boxSizing: 'border-box'}}>
                    <img src={instagramLogo} alt='' style={{padding: '12px'}}/>
                </Box>
                <Stack width="100%" height="80vh">
                    {menuItems.map((item, i) => (
                        <Stack direction="row" color="white" m="4px" p="12px" alignItems="center" sx={{borderRadius: '35px', cursor: 'pointer', transition: 'all 0.3s', '&:hover': {background: '#111'}}}>
                            {item.icon}
                            <Typography pl="12px">{item.name}</Typography>
                        </Stack>
                    ))}
                    <Stack direction="row" color="white" m="4px" p="12px" alignItems="center" sx={{borderRadius: '35px', cursor: 'pointer', transition: 'all 0.3s', '&:hover': {background: '#111'}}}>
                        <Avatar sx={{height: '25px', width: '25px'}} src={user?.image}/>
                        <Typography pl="12px">Profil</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" width="279px" color="white" m="4px" p="12px" alignItems="center" sx={{borderRadius: '35px', cursor: 'pointer', transition: 'all 0.3s', '&:hover': {background: '#111'}}} onClick={handleClick}>
                    <MenuIcon sx={{height: '30px', width: '30px'}}/>
                    <Typography pl="12px">Więcej</Typography>
                </Stack>
                <Menu
                    elevation={0}
                    disableAutoFocusItem={true}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{
                        '& .MuiPaper-root': {
                            width: '240px',
                            // height: '100px',
                            marginBottom: '100px',
                            background: '#222',
                            color: '#fff'
                        }
                    }}
                >
                    {moreMenuItems.map((item, i) => (
                        <MenuItem onClick={handleClose} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p:"10px 15px"}}>
                            {item.name}
                            {item?.icon}
                        </MenuItem>
                    ))}
                </Menu>
            </Stack>
        </Stack>
     );
}
 
export default Dashboard;