import * as api from '../api';
import { authInfo, authError, loadingState, authData, clearState} from '../redux/auth';

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
        if (data.account){
            dispatch(authData(data));
            // setIsUser(true);
            navigate(0)
        } else {
            dispatch(authInfo(data));
        }
        
        dispatch(loadingState(false));
    } catch (error) {
        dispatch(authError(error.response.data))
        dispatch(loadingState(false))
    }
}

export const requestpasswordreset = (formData) => async (dispatch) => {
    try {
        dispatch(loadingState(true));

        const {data} = await api.requestPasswordReset(formData)

        dispatch(authInfo(data))

        dispatch(loadingState(false))

    } catch (error) {
        dispatch(authError(error.response.data))
        dispatch(loadingState(false))
    }
}

export const checkpasswordreset = (id, token) => async (dispatch) => {
    try {
        dispatch(loadingState(true))
        const {data} = await api.checkPasswordReset(id, token);

        dispatch(authInfo(data))
        dispatch(loadingState(false))
    } catch (error) {
        dispatch(authError(error.response.data))
        dispatch(loadingState(false))
    }
}

export const passwordreset = (id, formData, navigation) => async (dispatch) => {
    try {
        dispatch(loadingState(true))
        const {data} = await api.passwordReset(id, formData);

        dispatch(authInfo(data))
        navigation('/password/reset/success');
        dispatch(loadingState(false))
        // dispatch(clearState());
    } catch (error) {
        dispatch(authError(error.response.data))
        dispatch(loadingState(false))
    }
}