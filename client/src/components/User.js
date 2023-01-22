import { Stack, Box, Avatar, Typography} from "@mui/material";

import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PortraitIcon from '@mui/icons-material/Portrait';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

const User = () => {
    const user = JSON.parse(localStorage.getItem("profile")).account;

    const options = [
        {name: 'POSTY', icon: <AppsIcon sx={{fontSize: '16px'}}/>},
        {name: 'ZAPISANE', icon: <BookmarkBorderIcon sx={{fontSize: '16px'}}/>},
        {name: 'Z OZNACZENIEM', icon: <PortraitIcon sx={{fontSize: '16px'}}/>},
    ]

    return ( 
        <Stack width='100%' sx={{background: '#121212', color: 'white'}} justifyContent='center' alignItems='center' p="30px 20px 0 20px">
            <Stack width='60%' height='100vh'  alignItems='center' sx={{background: 'transparent'}}>
                <Stack width='100%' direction='row'  justifyContent='center' mb="44px">
                    <Stack sx={{width: '35%'}} justifyContent='center' alignItems='center'>
                        <Avatar sx={{width: '150px', height: '150px'}}></Avatar>
                    </Stack>
                    <Stack sx={{width: '65%'}}>
                        <Stack direction='row' alignItems='center'>
                            <Typography variant='h1' sx={{fontSize: '20px', fontWeight: '400', fontFamily: 'Roboto'}}>{user.username}</Typography>
                            <Box sx={{
                                    padding: '7px 16px', 
                                    background:'#fff', 
                                    color: '#250250', 
                                    borderRadius: '10px', 
                                    ml:'20px', 
                                    fontFamily:'Roboto', 
                                    fontWeight: '500', 
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: '#dbdbdb'
                                    }
                                }}
                            >
                                Edytuj profil
                            </Box>
                            <Box sx={{width: '40px', height: '40px', display: 'grid', placeContent: 'center', ml:'5px', cursor: 'pointer'}}>
                                <SettingsIcon/>
                            </Box>
                        </Stack>
                        <Stack direction="row" sx={{fontFamily: 'Roboto', mt:'20px'}}>
                            <Typography sx={{mr: '40px', fontSize: '15px'}}>Posty:<strong> 0</strong></Typography>
                            <Typography sx={{mr: '40px', fontSize: '15px'}}><strong>9</strong> obserwujących</Typography>
                            <Typography sx={{fontSize: '15px'}}>Obserwowani: <strong>36</strong></Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center" width="100%" sx={{borderTop: '1px solid #262626'}}>
                    {
                        options.map((item, i) => (
                            <Stack direction="row" alignItems="center" justifyContent="center" mr="60px" height="52px" color="#a8a8a8" sx={{cursor: 'pointer'}} key={i}>
                                {item.icon}
                                <Typography sx={{fontSize: '12px', marginLeft: '6px', fontFamily: 'Roboto'}}>{item.name}</Typography>
                            </Stack>
                        ))
                    }
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
                    <Stack maxWidth="350px" alignItems="center" m="60px 44px">
                        <button style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>
                            <Avatar sx={{width: '62px', height: '62px', backgroundColor: 'transparent', border: '1px solid #373737'}}>
                                <PhotoCameraOutlinedIcon sx={{color: '#373737', fontSize: '36px'}}/>
                            </Avatar>
                        </button>
                        <Typography variant="h1" sx={{fontSize: '30px', fontWeight: 'bold', color: '#fafafa', textAlign: 'center', margin: '24px 0'}}>Udostępnij zdjęcia</Typography>
                        <Typography textAlign="center" fontSize="14px" color="#fafafa" mb="24px">
                            Gdy udostępniasz zdjęcia, pojawiają się one na Twoim profilu.
                        </Typography>
                        <button className="btn">Udostępnij swoje pierwsze zdjęcie</button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
 
export default User;  