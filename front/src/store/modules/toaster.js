import {
    TOAST,
    REMOVE_TOAST
} from "../actions/toaster"

const state = {
    tStatus: false,
    tMessage: '',
};

const getters = {
    toasterStatus: state => state.tStatus,
    toasterMessage: state => state.tMessage,
};

const actions = {
    [TOAST]: ({ commit }, message) => {
        commit(TOAST, message);
        setTimeout(() => {
            commit(REMOVE_TOAST);
        }, 5000)
    },
};

const mutations = {
    [TOAST]: (state, message) => {
        state.tStatus = true;
        state.tMessage = message;
    },
    [REMOVE_TOAST]: state => {
        state.tStatus = false;
        state.tMessage = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
