import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from '../actions/register';

import { TOAST } from "../actions/toaster";
import authService from '../../utils/auth.service';
import {FINISH, LOADING} from "../mutations/loader";

const state = {
    status: "S'inscrire",
    registering: false,
};

const getters = {
    registerStatus: state => state.status,
};

const actions = {
    [REGISTER_REQUEST]: ({ commit, dispatch }, formRegistrationData) => {
        return new Promise((resolve, reject) => {
            commit(REGISTER_REQUEST);
            commit(LOADING, 'Inscription en cours...');
            authService.register(formRegistrationData)
                .then(response => {
                    dispatch(TOAST, { message: "Inscription réussie", type: 'success'});
                    resolve(response);
                    commit(REGISTER_SUCCESS);
                    commit(FINISH);
                })
                .catch(error => {
                    commit(FINISH);
                    dispatch(TOAST, { message: "L'inscription a échoué", type: "error"});
                    commit(REGISTER_ERROR);
                    reject(error);
                });
        })
    },
};

const mutations = {
    [REGISTER_REQUEST]: state => {
        state.status = "Je réfléchis...";
    },
    [REGISTER_SUCCESS]: state => {
        state.status = "S'incrire";
    },
    [REGISTER_ERROR]: state => {
        state.status = "S'inscrire";
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}
