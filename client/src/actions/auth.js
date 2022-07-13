import * as api from '../api';
import { authInfo } from '../redux/auth';

export const signup = (formData) => async (dispatch) => {
    try {
        // sign up the user ..
        const {data} = await api.signUp(formData);

        dispatch(authInfo(data))
    } catch (error) {
        console.log(error);
    }
}