import ApiService from "./api.service";

const UserService = {
    me(id) {
        return ApiService.get(ApiService.getInstance('authenticated'), 'api/json/user', 'user', {
            "filter[drupal_internal__uid]": id,
            "include": "user_picture"
        });
    }
};

export default UserService;
