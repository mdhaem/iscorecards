import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    // console.log(authData);
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        localId: authData.localId,
        refreshToken: authData.refreshToken
    };
};

export const authFail = (error) => {
    // console.log(error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);

    };
};

export const authAction = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
            
        //  console.log('ISSIGNUP',isSignup);

        let URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyARIE8g5lqDrKmMeEFfVDDBCp2EC_p7Woo';
        if(!isSignup){
            URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyARIE8g5lqDrKmMeEFfVDDBCp2EC_p7Woo';
        }
        // console.log(URL);
        axios.post(URL, authData)
        .then(response => {
            // console.log(response);
            const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationData);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            // console.log(err.response.data.error.message);
            // console.log(err.response.data.error);
       
            dispatch(authFail(err.response.data.error.message));
        });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationData = new Date(localStorage.getItem('expirationDate'));
            if(expirationData <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationData.getTime() - new Date().getTime())/1000));
            }
        }
    }
}