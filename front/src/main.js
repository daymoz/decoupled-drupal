import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

import ApiService from "./utils/api.service";
import { CSRFTokenService } from "./utils/api.service";
import { AUTH_CHECK } from "./store/actions/auth";

Vue.config.productionTip = false;

Vue.use(Vuesax, {
  // options here
});

ApiService.init();

router.beforeEach((to, from, next) => {
  //On vérifie qu'on a les données utilisateurs
  console.log(store.getters.getProfile);
  if(!store.getters.getProfile.length) {
    Promise.all([store.dispatch(AUTH_CHECK)]).then(next);
  }

  //Si l'utilisateur veut créer un compte, il faut s'assurer d'avoir un token CSRF
  if(!localStorage.getItem('SToken') && to.name === 'Register') {
    CSRFTokenService.getToken().then(response => {
      return CSRFTokenService.setToken(response.data);
    }).then(data => {
      next();
    }).catch(error => {

    });
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
