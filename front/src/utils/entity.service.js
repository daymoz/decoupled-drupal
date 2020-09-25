import ApiService from "./api.service";

const EntityService = {
    getAll(entityType) {
        return ApiService.get(ApiService.getInstance(), 'api/json/node', entityType, {
            'include': 'field_image'
        });
    },
};

export default EntityService;
