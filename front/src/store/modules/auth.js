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

const state = {
    token: localStorage.getItem('user-token') || "",
    status: "Se connecter",
};

const getters = {
    connectionStatus: state => state.status,
};

const actions = {
    [ACCESS_TOKEN_REQUEST]: ({ commit, dispatch }, formLoginData) => {
        return new Promise((resolve, reject) => {
            commit(ACCESS_TOKEN_REQUEST);
            authService.getAccessToken(formLoginData).then(response => {
                localStorage.setItem('user-token', response.data.access_token);
                localStorage.setItem('refresh-token', response.data.refresh_token);
                return dispatch(ACCESS_TOKEN_VERIFICATION);
            })
            .then((response) => {
                console.log('Identification terminée');
                console.log(response);
                commit(AUTH_SUCCESS);
                dispatch(TOAST, 'Connexion réussie');
                resolve();
            })
            .catch(error => {
                commit(AUTH_ERROR);
                dispatch(TOAST, 'La connexion a échoué');
                reject(error);
            });
        });
    },
    [ACCESS_TOKEN_VERIFICATION]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(ACCESS_TOKEN_VERIFICATION);
            authService.verifyAccessToken().then(response => {
                console.log('Verification du token');
                console.log(response);
                return dispatch(USER_REQUEST, response.data);
            })
            .then((response) => {
                console.log('Données utilisateurs reçues');
                resolve(response);
            })
            .catch(error => {
                commit(AUTH_ERROR);
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
            dispatch(AUTH_LOGOUT);
        }
    },
    [AUTH_LOGOUT]: ({ dispatch }) => {
        dispatch(USER_PURGE);
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('user-token');
        dispatch(TOAST, "Vous avez été déconnecté");
    },
};

const mutations = {
    [ACCESS_TOKEN_REQUEST]: state => {
        state.status = 'En attente...';
    },
    [ACCESS_TOKEN_VERIFICATION]: state => {
        state.status = 'Verification...';
    },
    [AUTH_SUCCESS]: state => {
        state.status = 'Connexion';
    },
    [AUTH_ERROR]: state => {
        state.status = 'Connexion';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
