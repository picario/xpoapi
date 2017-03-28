module BabylonSdk.Services {
    export class RestApiService {
        public getModelByName(modelName: string): JQueryXHR {
            return $.ajax({
                type: 'POST',
                url: 'http://localhost:63639/xpo/api/v2/models/query?api_key=5420d4187ceb48c19eb6416a46c8562e',
                data: {
                    searchTerm: modelName,
                    skip: 0,
                    take: 1
                },
                success: (modelsApiResult: Classes.ModelsApiResult) => {
                    return modelsApiResult;
                },
                error: (error) => {
                    return error;
                }
            });
        }

        public getEnvironmentByName(environmentName: string): JQueryXHR {
            return $.ajax({
                type: 'GET',
                url: 'http://localhost:63639/xpo/api/v2/environments/getbyname/' + environmentName + '?api_key=5420d4187ceb48c19eb6416a46c8562e',
                data: {
                    searchTerm: environmentName,
                    skip: 0,
                    take: 1
                },
                success: (environments: Classes.Environment[]) => {
                    return environments;
                },
                error: (error) => {
                    return error;
                }
            });
        }

        public getMaterialByName(materialRestrictionLabels: string[], materialName: string, take: number): JQueryXHR {
            return $.ajax({
                type: 'POST',
                url: 'http://localhost:63639/xpo/api/v2/materials/query?api_key=5420d4187ceb48c19eb6416a46c8562e',
                data: {
                    labelIds: materialRestrictionLabels,
                    searchTerm: materialName,
                    skip: 0,
                    take: take
                },
                success: (environments: Classes.MaterialsApiResult) => {
                    return environments;
                },
                error: (error) => {
                    return error;
                }
            });
        }
    }
}