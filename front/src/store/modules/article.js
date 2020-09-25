import {
    GET_ALL_ARTICLES
} from "../actions/article";
import entityService from "../../utils/entity.service";

const state = {
    articles: [],
    included: [],
    gettingArticles: false,
};

const getters = {
    articles: state => state.articles,
    included: state => state.included,
    gettingArticles: state => state.gettingArticles,
};

const actions = {
    [GET_ALL_ARTICLES]: ({ commit }) => {
        commit('LOADING');
        return new Promise((resolve, reject) => {
            entityService.getAll('article').then(response => {
                commit(GET_ALL_ARTICLES, response.data);
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
};

const mutations = {
    ['LOADING']: (state) => {
        state.gettingArticles = true;
    },
    [GET_ALL_ARTICLES]: (state, articles) => {
        state.articles = articles.data;
        state.included = articles.included;
        state.gettingArticles = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}
