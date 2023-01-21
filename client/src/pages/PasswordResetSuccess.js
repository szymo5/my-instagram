import { useDispatch } from "react-redux";

import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { clearState } from "../redux/auth";

const PasswordResetSuccess = () => {
    const dispatch = useDispatch();

    return ( 
        <Box sx={{height: '95vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0', margin:0}}>
            <Stack sx={{width: '388px', boxSizing: 'border-box'}}>
                    <Box width="100%" textAlign="center" color="green" mb="10px">
                        <VpnKeyIcon sx={{width: '3em', height: '3em'}}/>
                    </Box>
                    <Box mb="10px">
                        <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: '16px', color: "#383838"}}>Hasło zostało zresetowane</Typography>
                    </Box>
                    <Box>
                        <Link to="/" className="link">
                            <Typography textAlign="center" fontSize="14px" fontWeight="bold" color="#888" onClick={() => dispatch(clearState())}>Powrót do logowania</Typography>
                        </Link>
                    </Box>
                </Stack>
        </Box>
     );
}
 
export default PasswordResetSuccess;