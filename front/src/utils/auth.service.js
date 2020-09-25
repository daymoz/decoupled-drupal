import ApiService from './api.service';

const AuthService = {
    register(params) {
        const finalParams = {
            "_links": {
                "type": {
                    "href": `${process.env.VUE_APP_API_URL}/rest/type/user/user`
                }
            },
            "name": [{
                value: params.name,
            }],
            "mail": [{
                value: params.mail,
            }],
            "pass": [{
                value: params.pass,
            }]
        };
        return ApiService.post(ApiService.getInstance('register'), 'user/register?_format=hal_json', finalParams);
    },

    getAccessToken(params) {
        //C'est le standard du "body" OAuth2 pour recevoir un access token (Grant Password)
        const OAuthGrantPasswordStandard = {
            "grant_type": "password",
            "client_id": process.env.VUE_APP_CLIENT_ID,
            "scope": "client",
        };
        const finalParams =  new formData();
        for(let param of Object.entries(OAuthGrantPasswordStandard)) {
            finalParams.append(param[0], param[1]);
        }
        //Les données du formulaires
        for(let param of Object.entries(params)) {
            finalParams.append(param[0], param[1]);
        }
        return ApiService.post(ApiService.getInstance(), 'oauth/token', finalParams);
    },

    verifyAccessToken() {
        //On vérifie toujours la validité de l'access token
        return ApiService.get(ApiService.getInstance('authenticated'), 'oauth/debug?_format=json');
    }
};

export default AuthService;
