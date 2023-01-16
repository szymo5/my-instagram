import {Link, useNavigate} from 'react-router-dom'

import { Avatar, Box, Stack, Typography, TextField, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';



const PasswordReset = () => {
    return ( 
        <Box sx={{height: '95vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0', margin:0}}>
            <Stack sx={{width: '388px', border: '1px solid #ccc', boxSizing: 'border-box'}}>
                <Box margin='15px 0'>
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
                    <Stack component="form" sx={{width: '80%', margin: '0 auto'}}>
                        <TextField name="email" label="Adres email" variant="outlined" size="small" fullWidth sx={{marginBottom: '15px'}}/>
                        <Button type="submit" variant="contained" sx={{backgroundColor: '#0095f6', fontWeight: '600', textTransform: 'none', fontSize: '14px'}}>Wyślij link do logowania</Button>
                    </Stack>
                </Box>
                <Box sx={{width: '100%', marginBottom: '15px'}}>
                    <a href="https://help.instagram.com/374546259294234" style={{textDecoration: 'none', color: 'black'}}>
                        <Typography sx={{textAlign: 'center', fontSize: '12px'}}>Nie możesz zresetować hasła?</Typography>
                    </a>
                </Box>
            </Stack>
        </Box>
     );
}
 
export default PasswordReset;