import * as api from '../api';
import { authInfo, authError } from '../redux/auth';

export const signup = (formData) => async (dispatch) => {
    try {
        // sign up the user ..
        const {data} = await api.signUp(formData);

        dispatch(authInfo(data))
    } catch (error) {
        // console.log(error.response.data);
        dispatch(authError(error.response.data))
        
    }
}