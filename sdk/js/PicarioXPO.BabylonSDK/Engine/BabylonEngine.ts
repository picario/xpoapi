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
        private meshClickCallback: Function;

        /*
            Create a new babylon sdk engine.
            xpoUrl: required to query the XPO for models, environments and materials.
            xpoApiKey: required to make API calls, can be found in XPO in the admin menu -> user management.
            canvasSelector: jQuery selector to find the canvas element to bind Babylon to. Example: #renderCanvas
        */
        constructor(xpoUrl: string, xpoApiKey: string, canvasSelector: string, meshClickCallback?: Function) {
            if (!xpoUrl)
                throw new Error("Invalid XPO URL");

            if (!xpoApiKey)
                throw new Error("Invalid API key");

            this.restApiService = new Services.RestApiService(xpoUrl, xpoApiKey);
            this.meshClickCallback = meshClickCallback;

            if (BABYLON.Engine.isSupported()) {
                this.canvas = <HTMLCanvasElement>document.getElementById(canvasSelector);
                this.engine = new BABYLON.Engine(this.canvas, true);
                this.engine.enableOfflineSupport = false;

                window.onresize = () => {
                    this.engine.resize();
                };
            } else
                throw new Error("Babylon is not supported by this browser");
        }

        /*
            Load a model with a specific environment.
            The SDK will query the XPO for a model with the given name and an environment with the given name.
            Can throw an error when:
            - Model can't be found
            - Model doesn't have a babylon file
            - Environment can't be found
        */
        public loadModelWithEnvironment = (modelName: string, environmentName: string, loadedCallback: Function) => {
            this.restApiService.getModelByName(modelName).then((data: Classes.ModelsApiResult) => {
                if (data.values.length === 1) {
                    if (data.values[0].babylonUrl) {
                        this.currentModel = data.values[0];
                        this.restApiService.getEnvironmentByName(environmentName).then((data: Classes.Environment[]) => {
                            if (data.length === 1) {
                                if (data[0].environmentJs) {
                                    this.environment = data[0];
                                    $("body").append("<script>" + this.environment.environmentJs + "</script>");
                                }

                                this.loadNewScene(loadedCallback);
                            } else
                                throw new Error("No environment found with name: " + environmentName);
                        });
                    } else
                        throw new Error("No model with name: " + modelName + " has no babylon file");
                } else
                    throw new Error("No model found with name: " + modelName);
            });
        }

        /*
            Gets the mesh info for all the meshes in the loaded model
        */
        public getModelMeshInfo = (): Classes.MeshObject[] => {
            return this.currentModel.meshes;
        }

        /*
            Queries XPO and returns a list of the materials that are allowed to placed on the specified mesh
        */
        public getAllowedMaterials = (meshName: string): JQueryPromise<Classes.Material[]> => {
            var mesh = this.getMeshByName(meshName);
            return this.restApiService.getMaterialByName(mesh ? mesh.materialRestrictionLabels : [], "", 25);
        }

        /*
            Place a material on a specified mesh.
            Use the name of the material and the name of the mesh.
            Can throw an error when:
            - Material can't be found
            - Material doesn't have a diffuse image to render
        */
        public addMaterialToMesh = (materialName: string, meshName: string, useEnvironmentReflectionTexture: boolean) => {
            var mesh = this.getMeshByName(meshName);
            this.restApiService.getMaterialByName(mesh ? mesh.materialRestrictionLabels : [], materialName, 1).then((data: Classes.MaterialsApiResult) => {
                if (data.totalRows === 1) {
                    if (data.values[0].renderDiffuseUrl)
                        this.addMaterial(mesh, data.values[0], useEnvironmentReflectionTexture);
                    else
                        throw new Error("Material with name: " + materialName + " has no diffuse render URL");
                } else
                    throw new Error("No material found with name: " + materialName);
            });
        }

        /*
            Set the x/y/z position of the camera.
            An animation will play to make the camera 'fly' to the given position.
        */
        public setCameraPosition = (x: number, y: number, z: number) => {
            this.setCameraPositionAnimation(x, y, z);
            this.currentScene.beginAnimation(this.currentScene.activeCamera, 0, 120, false);
        }

        /*
            Set the x/y/z target of the camera, this is where the camera is pointing towards.
            An animation will play to make the camera turn to the given target.
        */
        public setCameraTarget = (x: number, y: number, z: number) => {
            this.setCameraTargetAnimation(x, y, z);
            this.currentScene.beginAnimation(this.currentScene.activeCamera, 0, 120, false); 
        }

        /*
            Set the x/y/z position and x/y/z target of the camera in one call.
            An animation will play to make the camera 'fly' and turn to the given points.
        */
        public setCameraPositionAndTarget = (positionX: number, positionY: number, positionZ: number, targetX: number, targetY: number, targetZ: number) => {
            this.setCameraPositionAnimation(positionX, positionY, positionZ);
            this.setCameraTargetAnimation(targetX, targetY, targetZ);
            this.currentScene.beginAnimation(this.currentScene.activeCamera, 0, 120, false); 
        }

        private loadNewScene = (loadedCallback: Function) => {
            BABYLON.SceneLoader.Load("", this.currentModel.babylonUrl, this.engine, (scene) => {
                this.currentScene = scene;
                scene.executeWhenReady(() => {
                    this.setupLoadedScene(scene, loadedCallback);
                });
            }, progress => { }, scene => { }, this.currentModel.fileType);
        }

        private setupLoadedScene = (scene: BABYLON.Scene, loadedCallback: Function) => {
            if (typeof setupEnvironment === "function")
                setupEnvironment(scene);

            this.camera = new BABYLON.ArcRotateCamera("arcCamera1",
                                                      0, //horizontal viewpoint
                                                      1, //vertical viewpoint
                                                      10, //distance viewpoint
                                                      new BABYLON.Vector3(0, 0, 0), this.currentScene);
            
            var min = new BABYLON.Vector3(this.currentModel.boundingBoxMin[0], this.currentModel.boundingBoxMin[1], this.currentModel.boundingBoxMin[2]);
            var max = new BABYLON.Vector3(this.currentModel.boundingBoxMax[0], this.currentModel.boundingBoxMax[1], this.currentModel.boundingBoxMax[2]);
            this.camera.setTarget(min.add(max.subtract(min).scale(0.5)));
            var camera = this.currentModel.defaultCameraPosition;
            if (camera) {
                this.camera.setPosition(new BABYLON.Vector3(camera[0], camera[1], camera[2]));
            }
            else {
                this.camera.setPosition(new BABYLON.Vector3(
                    this.camera.target.x,
                    this.camera.target.y + (max.y - this.camera.target.y) * 3,
                    this.camera.target.z + (max.z - this.camera.target.z) * 6
                ));
            }
            this.camera.wheelPrecision = 1000/this.camera.position.subtract(this.camera.target).length();
            this.camera.pinchPrecision = this.camera.wheelPrecision;
            this.camera.minZ = 0;
            this.camera.lowerRadiusLimit = 0.1;
            this.camera.attachControl(this.canvas);

            this.currentScene.activeCamera = this.camera;

            if (typeof loadedCallback === "function")
                loadedCallback();

            this.engine.runRenderLoop(() => {
                if(this.currentScene.activeCamera)
                    this.currentScene.render();
            });

            this.currentScene.onPointerDown = (evt, pickResult) => {
                 if(evt.button > 0)
                    return;
                 
                 if (pickResult.hit && pickResult.pickedMesh) {
                     if (typeof this.meshClickCallback === "function")
                         this.meshClickCallback(pickResult.pickedMesh);
                 }
             };
        }

        private getMeshByName = (meshName: string) => {
            var meshes = this.currentModel.meshes.filter((meshObject) => {
                return meshObject.name === meshName;
            });
            return meshes.length > 0 ? meshes[0] : null;
        }

        private addMaterial = (mesh: Classes.MeshObject, material: Classes.Material, useEnvironmentReflectionTexture: boolean) => {
            var textureMaterial: BABYLON.PBRMetallicRoughnessMaterial = <BABYLON.PBRMetallicRoughnessMaterial>this.currentScene.getMaterialByName(material.name + mesh.name);

            if (!textureMaterial)
                textureMaterial = new BABYLON.PBRMetallicRoughnessMaterial(material.name + mesh.name, this.currentScene);

            if (material.renderDiffuseUrl) {
                textureMaterial.baseTexture = new BABYLON.Texture(material.renderDiffuseUrl, this.currentScene);
                textureMaterial.baseTexture.uScale = material.materialOptions.repeatX;
                textureMaterial.baseTexture.vScale = material.materialOptions.repeatY;
            }

            if (material.renderBumpUrl) {
                textureMaterial.bumpTexture = new BABYLON.Texture(material.renderBumpUrl, this.currentScene);
                textureMaterial.bumpTexture.uScale = material.materialOptions.repeatX;
                textureMaterial.bumpTexture.vScale = material.materialOptions.repeatY;
                textureMaterial.bumpTexture.level = 1;
            }

            if (material.renderSpecularUrl) {
                textureMaterial.specularTexture = new BABYLON.Texture(material.renderSpecularUrl, this.currentScene);
                textureMaterial.specularTexture.uScale = material.materialOptions.repeatX;
                textureMaterial.specularTexture.vScale = material.materialOptions.repeatY;
            }

            textureMaterial.metallic = material.materialOptions.metallic;
            textureMaterial.alpha = material.materialOptions.alpha;
            textureMaterial.roughness = material.materialOptions.roughness;
            textureMaterial.backFaceCulling = false;
            textureMaterial.needDepthPrePass = true;

            if (useEnvironmentReflectionTexture && this.environment.environmentImageUrls.length > 0)
                textureMaterial.environmentTexture = BABYLON.CubeTexture.CreateFromImages(this.environment.environmentImageUrls, this.currentScene);

            var sceneMesh = this.currentScene.getMeshByName(mesh.name);
            if (sceneMesh)
                sceneMesh.material = textureMaterial;

            sceneMesh = null;
            textureMaterial = null;
        }

        private setCameraTargetAnimation = (x: number, y: number, z: number) => {
            var targetXAnimation = new BABYLON.Animation("targetXAnimation", "target.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var targetYAnimation = new BABYLON.Animation("targetYAnimation", "target.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var targetZAnimation = new BABYLON.Animation("targetZAnimation", "target.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

            var targetXKeys = [{ frame: 0, value: (<BABYLON.ArcRotateCamera>this.currentScene.activeCamera).target.x }, { frame: 120, value: x }];
            var targetYKeys = [{ frame: 0, value: (<BABYLON.ArcRotateCamera>this.currentScene.activeCamera).target.y }, { frame: 120, value: y }];
            var targetZKeys = [{ frame: 0, value: (<BABYLON.ArcRotateCamera>this.currentScene.activeCamera).target.z }, { frame: 120, value: z }];

            targetXAnimation.setKeys(targetXKeys);
            targetYAnimation.setKeys(targetYKeys);
            targetZAnimation.setKeys(targetZKeys);

            this.currentScene.activeCamera.animations.push(targetXAnimation);
            this.currentScene.activeCamera.animations.push(targetYAnimation);
            this.currentScene.activeCamera.animations.push(targetZAnimation);
        }

        private setCameraPositionAnimation = (x: number, y: number, z: number) => {
            var alphaAnimation = new BABYLON.Animation("alphaAnimation", "alpha", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var betaAnimation = new BABYLON.Animation("betaAnimation", "beta", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var radiusAnimation = new BABYLON.Animation("radiusAnimation", "radius", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

            var alphaKeys = [{ frame: 0, value: (<BABYLON.ArcRotateCamera>this.currentScene.activeCamera).alpha }, { frame: 120, value: x }];
            var betaKeys = [{ frame: 0, value: (<BABYLON.ArcRotateCamera>this.currentScene.activeCamera).beta }, { frame: 120, value: y }];
            var radiusKeys = [{ frame: 0, value: (<BABYLON.ArcRotateCamera>this.currentScene.activeCamera).radius }, { frame: 120, value: z }];

            alphaAnimation.setKeys(alphaKeys);
            betaAnimation.setKeys(betaKeys);
            radiusAnimation.setKeys(radiusKeys);

            this.currentScene.activeCamera.animations.push(alphaAnimation);
            this.currentScene.activeCamera.animations.push(betaAnimation);
            this.currentScene.activeCamera.animations.push(radiusAnimation);
        }
    }
}