import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from '../actions/register';

import { TOAST } from "../actions/toaster";
import authService from '../../utils/auth.service';

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
            authService.register(formRegistrationData)
                .then(response => {
                    dispatch(TOAST, "Inscription réussie");
                    resolve(response);
                })
                .catch(error => {
                    dispatch(TOAST, "L'inscription a échoué");
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
