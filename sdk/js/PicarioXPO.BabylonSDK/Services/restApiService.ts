module BabylonSdk.Services {
    export class RestApiService {
        private xpoUrl: string;
        private xpoApiKey: string;

        constructor(xpoUrl: string, xpoApiKey: string) {
            this.xpoUrl = xpoUrl;
            this.xpoApiKey = xpoApiKey;
        }

        public getModelByName(modelName: string): JQueryXHR {
            return $.ajax({
                type: 'POST',
                url: this.xpoUrl + '/xpo/api/v2/models/query?api_key=' + this.xpoApiKey,
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
                url: this.xpoUrl + '/xpo/api/v2/environments/getbyname/' + environmentName + '?api_key=' + this.xpoApiKey,
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
                url: this.xpoUrl + '/xpo/api/v2/materials/query?api_key=' + this.xpoApiKey,
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