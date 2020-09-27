import {
    TOAST,
    REMOVE_TOAST
} from "../actions/toaster"

const state = {
    tStatus: false,
    tMessage: '',
    tType: 'success',
};

const getters = {
    toasterStatus: state => state.tStatus,
    toasterMessage: state => state.tMessage,
    toasterType: state => state.tType,
};

const actions = {
    [TOAST]: ({ commit }, data) => {
        console.log(data.type);
        commit(TOAST, data);
        setTimeout(() => {
            commit(REMOVE_TOAST);
        }, 5000)
    },
};

const mutations = {
    [TOAST]: (state, data) => {
        state.tStatus = true;
        state.tMessage = data.message;
        state.tType = data.type;
    },
    [REMOVE_TOAST]: state => {
        state.tStatus = false;
        state.tMessage = '';
        state.tType = 'success';
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
