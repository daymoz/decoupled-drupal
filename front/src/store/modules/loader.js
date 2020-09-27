import {
    LOADING,
    FINISH
} from "../mutations/loader";

const state = {
    loaderStatus: false,
    loaderMessage: '',
};

const getters = {
    isLoading: state => state.loaderStatus,
    loaderMessage: state => state.loaderMessage
};

const actions = {

};

const mutations = {
    [LOADING]: (state, message) => {
        console.log(message);
        state.loaderStatus = true;
        state.loaderMessage = message;
    },
    [FINISH]: state => {
        console.log('On ferme le loader');
        state.loaderStatus = false;
        state.loaderMessage = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
