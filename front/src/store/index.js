import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import register from "./modules/register";
import toaster from "./modules/toaster";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    register,
    auth,
    toaster,
  }
})
