import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import register from "./modules/register";

import toaster from "./modules/toaster";
import loader from "./modules/loader";

import user from "./modules/user";
import article from "./modules/article";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    register,
    auth,
    user,
    loader,
    toaster,
    article
  }
})
