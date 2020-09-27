import {
    ACCESS_TOKEN_REQUEST,
    ACCESS_TOKEN_VERIFICATION,
    AUTH_SUCCESS,
    AUTH_ERROR,
    ACCESS_TOKEN_REFRESH,
    AUTH_CHECK,
    AUTH_LOGOUT
} from '../actions/auth';

import {
    USER_PURGE,
    USER_REQUEST,
} from "../actions/user";

import { TOAST } from "../actions/toaster";
import authService from '../../utils/auth.service';
import {FINISH, LOADING} from "../mutations/loader";

const state = {
    token: localStorage.getItem('user-token') || "",
};

const getters = {
    connectionStatus: state => state.status,
};

const actions = {
    [ACCESS_TOKEN_REQUEST]: ({ commit, dispatch }, formLoginData) => {
        commit(LOADING, 'Connexion en cours...');
        return new Promise((resolve, reject) => {
            authService.getAccessToken(formLoginData).then(response => {
                localStorage.setItem('user-token', response.data.access_token);
                localStorage.setItem('refresh-token', response.data.refresh_token);
                return dispatch(ACCESS_TOKEN_VERIFICATION);
            })
            .then((response) => {
                commit(FINISH);
                console.log('Identification terminée');
                console.log(response);
                dispatch(TOAST, {message: 'Connexion réussie', type: 'success'});
                resolve();
            })
            .catch(error => {
                commit(FINISH);
                dispatch(TOAST, {message: 'La connexion a échoué', type: 'error'});
                reject(error);
            });
        });
    },
    [ACCESS_TOKEN_VERIFICATION]: ({ commit, dispatch }) => {
        commit(LOADING, 'Vérification...');
        return new Promise((resolve, reject) => {
            authService.verifyAccessToken().then(response => {
                console.log('Verification du token');
                console.log(response);
                return dispatch(USER_REQUEST, response.data);
            })
            .then((response) => {
                console.log('Données utilisateurs reçues');
                commit(FINISH);
                resolve(response);
            })
            .catch(error => {
                commit(FINISH);
                console.log('Utilisation du refresh token ?');
                localStorage.removeItem('user-token');
                reject(error);
            });
        });
    },
    [AUTH_CHECK]: ({ dispatch }) => {
        console.log("Toujours connecté ?");
        if(localStorage.getItem('user-token')) {
            dispatch(ACCESS_TOKEN_VERIFICATION);
        } else {
            console.log('On purge');
            dispatch(USER_PURGE);
        }
    },
    [AUTH_LOGOUT]: ({ dispatch }) => {
        dispatch(USER_PURGE);
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('user-token');
        dispatch(TOAST, {message: "Vous avez été déconnecté", type: 'success'});
    },
};

const mutations = {

};

export default {
    state,
    getters,
    actions,
    mutations
}
