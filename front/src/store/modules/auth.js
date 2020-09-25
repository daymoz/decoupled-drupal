import {
    ACCESS_TOKEN_REQUEST,
    ACCESS_TOKEN_VERIFICATION,
    AUTH_SUCCESS,
    AUTH_ERROR,
    ACCESS_TOKEN_REFRESH,
    AUTH_LOGOUT
} from '../actions/auth';

const state = {
    token: localStorage.getItem('user-token') || "",
    status: "",
};

const getters = {

};

const actions = {

};

const mutations = {

};

export default {
    state,
    getters,
    actions,
    mutations
}
