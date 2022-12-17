import * as api from '../api';
import { authInfo, authError, loadingState, authData} from '../redux/auth';

export const signup = (formData) => async (dispatch) => {
    try {
        // sign up the user ..
        dispatch(loadingState(true))

        const {data} = await api.signUp(formData);
        console.log(data.message);

        dispatch(authInfo(data))

        dispatch(loadingState(false))
    } catch (error) {
        // console.log(error.response.data);
        dispatch(authError(error.response.data))
        dispatch(loadingState(false))
    }
}

export const verify = (id, token) => async (dispatch) => {
    try {
        dispatch(loadingState(true))
        const {data} = await api.verify(id, token)

        dispatch(authInfo(data))
        dispatch(loadingState(false))
    } catch (error) {
        dispatch(authError(error.response.data))
        dispatch(loadingState(false))
    }
}

export const signin = (formData, navigate, setIsUser) => async (dispatch) => {
    try {
        // login user
        dispatch(loadingState(true));

        const {data} = await api.signIn(formData);
        //console.log(data);
        // check if user have veryfied account, backend send another data in this case, if not - dispatch authInfo instead authData
        if (data?.account){
            dispatch(authData(data));
            setIsUser(true);
            navigate('/home')
        } else {
            dispatch(authInfo(data));
        }
        
        dispatch(loadingState(false));
    } catch (error) {
        dispatch(authError(error.response.data))
        dispatch(loadingState(false))
    }
}