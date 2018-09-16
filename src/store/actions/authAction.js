import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    console.log(authData);
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        localId: authData.localId,
        refreshToken: authData.refreshToken
    };
};

export const authFail = (error) => {
    console.log(error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
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
            
         console.log('ISSIGNUP',isSignup);

        let URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDeKOpe1xnMXtQqotnI4piKZ2yfq8_3Km0';
        if(!isSignup){
            URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDeKOpe1xnMXtQqotnI4piKZ2yfq8_3Km0';
        }
        axios.post(URL, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.error.message);
       
            dispatch(authFail(err.response.data.error.message));
        });
    };
};