module BabylonSdk {
    export class BabylonEngine
    {
        private engine: BABYLON.Engine;
        private canvas: HTMLCanvasElement;
        private restApiService: Services.RestApiService;
        private currentModel: Classes.Model;
        private currentScene: BABYLON.Scene;
        private environment: Classes.Environment;
        private camera: BABYLON.ArcRotateCamera;

        constructor(canvasSelector: string) {
            this.restApiService = new Services.RestApiService();

            if (BABYLON.Engine.isSupported()) {
                this.canvas = <HTMLCanvasElement>document.getElementById(canvasSelector);
                this.engine = new BABYLON.Engine(this.canvas, true);
                this.engine.enableOfflineSupport = false;

                window.onresize = () => {
                    this.engine.resize();
                };

            } else {
                //show message??
            }
        }

        public loadModelWithEnvironment = (modelName: string, environmentName: string, loadedCallback: Function) => {
            this.restApiService.getModelByName(modelName).then((data: Classes.ModelsApiResult) => {
                if (data.totalRows === 1 && data.values[0].babylonUrl) {
                    this.currentModel = data.values[0];
                    this.restApiService.getEnvironmentByName(environmentName).then((data: Classes.Environment[]) => {
                        if (data.length === 1 && data[0].environmentJs) {
                            this.environment = data[0];
                            $("body").append("<script>" + this.environment.environmentJs + "</script>");
                            this.loadNewScene(loadedCallback);
                        } else {
                            //show message??
                        }
                    });
                } else {
                    //show message??
                }
            });
        }

        public getModelMeshInfo = (): Classes.MeshObject[] => {
            return this.currentModel.meshes;
        }

        public getAllowedMaterials = (meshName: string): JQueryPromise<Classes.Material[]> => {
            var mesh = this.getMeshByName(meshName);
            return this.restApiService.getMaterialByName(mesh ? mesh.materialRestrictionLabels : [], "", 25);
        }

        public addMaterialToMesh = (materialName: string, meshName: string) => {
            var mesh = this.getMeshByName(meshName);
            this.restApiService.getMaterialByName(mesh ? mesh.materialRestrictionLabels : [], materialName, 1).then((data: Classes.MaterialsApiResult) => {
                if (data.totalRows === 1 && data.values[0].renderDiffuseUrl) {
                    this.addMaterial(mesh, data.values[0]);
                } else {
                    //show message??
                }
            });
        }

        private loadNewScene = (loadedCallback: Function) => {
            BABYLON.SceneLoader.Load("", this.currentModel.babylonUrl, this.engine, (scene) => {
                this.currentScene = scene;
                scene.executeWhenReady(() => {
                    this.setupLoadedScene(scene, loadedCallback);
                });
            });
        }

        private setupLoadedScene = (scene: BABYLON.Scene, loadedCallback: Function) => {
            if (typeof setupEnvironment === "function")
                setupEnvironment(scene);

            this.camera = new BABYLON.ArcRotateCamera("arcCamera1",
                                                      0, //horizontal viewpoint
                                                      1, //vertical viewpoint
                                                      10, //distance viewpoint
                                                      new BABYLON.Vector3(0, 0, 0), this.currentScene);

            var size = this.currentScene.meshes[0].getBoundingInfo();
            this.camera.wheelPrecision = 75;
            this.camera.pinchPrecision = 75;
            this.camera.minZ = 0;
            this.camera.lowerRadiusLimit = 0.1;
            this.camera.setTarget(new BABYLON.Vector3(0, size.boundingBox.center.y, 0));
            this.camera.attachControl(this.canvas);

            if (typeof loadedCallback === "function")
                loadedCallback();

            this.engine.runRenderLoop(() => {
                this.currentScene.render();
            });
        }

        private getMeshByName = (meshName: string) => {
            var meshes = this.currentModel.meshes.filter((meshObject) => {
                return meshObject.name === meshName;
            });
            return meshes.length > 0 ? meshes[0] : null;
        }

        private addMaterial = (mesh: Classes.MeshObject, material: Classes.Material) => {
            var textureMaterial: BABYLON.StandardMaterial = <BABYLON.StandardMaterial>this.currentScene.getMaterialByName(material.name + mesh.name);
            if (!textureMaterial)
                textureMaterial = new BABYLON.StandardMaterial(material.name + mesh.name, this.currentScene);

            if (material.renderDiffuseUrl) {
                textureMaterial.diffuseTexture = new BABYLON.Texture(material.renderDiffuseUrl, this.currentScene);
                textureMaterial.diffuseTexture.uScale = 1;
                textureMaterial.diffuseTexture.vScale = 1;
            }

            if (material.renderBumpUrl) {
                textureMaterial.bumpTexture = new BABYLON.Texture(material.renderBumpUrl, this.currentScene);
                textureMaterial.bumpTexture.uScale = 1;
                textureMaterial.bumpTexture.vScale = 1;
                textureMaterial.bumpTexture.level = 1;
            }
            
            if (material.renderSpecularUrl) {
                textureMaterial.specularTexture = new BABYLON.Texture(material.renderSpecularUrl, this.currentScene);
                textureMaterial.specularTexture.uScale = 1;
                textureMaterial.specularTexture.vScale = 1;
            }

            var sceneMesh = this.currentScene.getMeshByName(mesh.name);
            if (sceneMesh)
                sceneMesh.material = textureMaterial;

            sceneMesh = null;
            textureMaterial = null;
        }
    }
}