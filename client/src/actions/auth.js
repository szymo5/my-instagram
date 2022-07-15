import * as api from '../api';
import { authInfo, authError, loadingState } from '../redux/auth';

export const signup = (formData) => async (dispatch) => {
    try {
        // sign up the user ..
        dispatch(loadingState(true))

        const {data} = await api.signUp(formData);

        dispatch(authInfo(data))

        dispatch(loadingState(false))
    } catch (error) {
        // console.log(error.response.data);
        dispatch(loadingState(false))
        dispatch(authError(error.response.data))
        
        
    }
}