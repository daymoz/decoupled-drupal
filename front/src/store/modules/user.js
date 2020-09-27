import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_ERROR,
    USER_PURGE
} from "../actions/user";
import userService from "../../utils/user.service";
import {FINISH, LOADING} from "../mutations/loader";


const state = {
    isAuthenticated: false,
    profile: {},
};

const getters = {
    getProfile: state => state.profile,
    isAuthenticated: state => state.isAuthenticated,
};

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }, userData) => {
        commit(LOADING, "Récupération de l'utilisateur...");
        return new Promise((resolve, reject) => {
            console.log(userData);
            userService.me(userData.id).then((response) => {
                console.log(response);
                console.log(response.data);
                const includedData = response.data.included ? response.data.included[0] : [];
                commit(USER_SUCCESS, [userData, response.data.data[0], includedData]);
                resolve(response);
            })
            .catch(error => {
                commit(FINISH);
                console.log('Données utilisateur non reçues');
                reject(error);
            })
        });
    },
    [USER_PURGE]: ({ commit }) => {
        commit(FINISH);
        commit(USER_PURGE);
    }
};

const mutations = {
    [USER_SUCCESS]: (state, data) => {
        state.isAuthenticated = true;
        state.profile = [...data];
    },
    [USER_PURGE]: state => {
        state.isAuthenticated = false;
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
