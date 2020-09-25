import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";


const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    },

    setHeaders() {
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem('access-token')}`;
    },

    getInstance(type = "") {
        switch(type) {
            case 'register':
                return axios.create({
                    headers: {
                        'X-CSRF-Token': localStorage.getItem('SToken') || '',
                        'Content-Type': 'application/hal+json'
                    }
                });
            case 'authenticated':
                return axios.create({
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                    }
                });
            //Default instance is for no specific headers
            default:
                console.log('default Instance');
                return axios.create({});
        }
    },

    get(instance, resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`ApiService ${error}`);
        })
    },

    post(instance, resource, params) {
        return instance.post(`${resource}`, params);
    }
};

export default ApiService;

export const CSRFTokenService = {
    getInstance() {
        return ApiService.getInstance();
    },

    getToken() {
        return ApiService.get(this.getInstance(), 'session/token');
    },

    setToken(token) {
        localStorage.setItem('SToken', token);
    }
};
