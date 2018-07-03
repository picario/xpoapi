var BabylonSdk;
(function (BabylonSdk) {
    var Classes;
    (function (Classes) {
        var Environment = (function () {
            function Environment() {
            }
            return Environment;
        })();
        Classes.Environment = Environment;
    })(Classes = BabylonSdk.Classes || (BabylonSdk.Classes = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var Classes;
    (function (Classes) {
        var EnvironmentsApiResult = (function () {
            function EnvironmentsApiResult() {
            }
            return EnvironmentsApiResult;
        })();
        Classes.EnvironmentsApiResult = EnvironmentsApiResult;
    })(Classes = BabylonSdk.Classes || (BabylonSdk.Classes = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var Classes;
    (function (Classes) {
        var Material = (function () {
            function Material() {
            }
            return Material;
        })();
        Classes.Material = Material;
        var MaterialOptions = (function () {
            function MaterialOptions() {
            }
            return MaterialOptions;
        })();
        Classes.MaterialOptions = MaterialOptions;
    })(Classes = BabylonSdk.Classes || (BabylonSdk.Classes = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var Classes;
    (function (Classes) {
        var MaterialsApiResult = (function () {
            function MaterialsApiResult() {
            }
            return MaterialsApiResult;
        })();
        Classes.MaterialsApiResult = MaterialsApiResult;
    })(Classes = BabylonSdk.Classes || (BabylonSdk.Classes = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var Classes;
    (function (Classes) {
        var MeshObject = (function () {
            function MeshObject() {
            }
            return MeshObject;
        })();
        Classes.MeshObject = MeshObject;
    })(Classes = BabylonSdk.Classes || (BabylonSdk.Classes = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var Classes;
    (function (Classes) {
        var Model = (function () {
            function Model() {
            }
            return Model;
        })();
        Classes.Model = Model;
    })(Classes = BabylonSdk.Classes || (BabylonSdk.Classes = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var Classes;
    (function (Classes) {
        var ModelsApiResult = (function () {
            function ModelsApiResult() {
            }
            return ModelsApiResult;
        })();
        Classes.ModelsApiResult = ModelsApiResult;
    })(Classes = BabylonSdk.Classes || (BabylonSdk.Classes = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var Services;
    (function (Services) {
        var RestApiService = (function () {
            function RestApiService(xpoUrl, xpoApiKey) {
                this.xpoUrl = xpoUrl;
                this.xpoApiKey = xpoApiKey;
            }
            RestApiService.prototype.getModelByName = function (modelName) {
                return $.ajax({
                    type: 'POST',
                    url: this.xpoUrl + '/xpo/api/v2/models/query?api_key=' + this.xpoApiKey,
                    data: {
                        searchTerm: modelName,
                        skip: 0,
                        take: 1
                    },
                    success: function (modelsApiResult) {
                        return modelsApiResult;
                    },
                    error: function (error) {
                        return error;
                    }
                });
            };
            RestApiService.prototype.getEnvironmentByName = function (environmentName) {
                return $.ajax({
                    type: 'GET',
                    url: this.xpoUrl + '/xpo/api/v2/environments/getbyname/' + environmentName + '?api_key=' + this.xpoApiKey,
                    data: {
                        searchTerm: environmentName,
                        skip: 0,
                        take: 1
                    },
                    success: function (environments) {
                        return environments;
                    },
                    error: function (error) {
                        return error;
                    }
                });
            };
            RestApiService.prototype.getMaterialByName = function (materialRestrictionLabels, materialName, take) {
                return $.ajax({
                    type: 'POST',
                    url: this.xpoUrl + '/xpo/api/v2/materials/query?api_key=' + this.xpoApiKey,
                    data: {
                        labelIds: materialRestrictionLabels,
                        searchTerm: materialName,
                        skip: 0,
                        take: take
                    },
                    success: function (environments) {
                        return environments;
                    },
                    error: function (error) {
                        return error;
                    }
                });
            };
            return RestApiService;
        })();
        Services.RestApiService = RestApiService;
    })(Services = BabylonSdk.Services || (BabylonSdk.Services = {}));
})(BabylonSdk || (BabylonSdk = {}));
var BabylonSdk;
(function (BabylonSdk) {
    var BabylonEngine = (function () {
        function BabylonEngine(xpoUrl, xpoApiKey, canvasSelector, meshClickCallback) {
            var _this = this;
            this.loadModelWithEnvironment = function (modelName, environmentName, loadedCallback) {
                _this.restApiService.getModelByName(modelName).then(function (data) {
                    if (data.values.length === 1) {
                        if (data.values[0].babylonUrl) {
                            _this.currentModel = data.values[0];
                            _this.restApiService.getEnvironmentByName(environmentName).then(function (data) {
                                if (data.length === 1) {
                                    if (data[0].environmentJs) {
                                        _this.environment = data[0];
                                        $("body").append("<script>" + _this.environment.environmentJs + "</script>");
                                    }
                                    _this.loadNewScene(loadedCallback);
                                }
                                else
                                    throw new Error("No environment found with name: " + environmentName);
                            });
                        }
                        else
                            throw new Error("No model with name: " + modelName + " has no babylon file");
                    }
                    else
                        throw new Error("No model found with name: " + modelName);
                });
            };
            this.getModelMeshInfo = function () {
                return _this.currentModel.meshes;
            };
            this.getAllowedMaterials = function (meshName) {
                var mesh = _this.getMeshByName(meshName);
                return _this.restApiService.getMaterialByName(mesh ? mesh.materialRestrictionLabels : [], "", 25);
            };
            this.addMaterialToMesh = function (materialName, meshName, useEnvironmentReflectionTexture) {
                var mesh = _this.getMeshByName(meshName);
                _this.restApiService.getMaterialByName(mesh ? mesh.materialRestrictionLabels : [], materialName, 1).then(function (data) {
                    if (data.totalRows === 1) {
                        if (data.values[0].renderDiffuseUrl)
                            _this.addMaterial(mesh, data.values[0], useEnvironmentReflectionTexture);
                        else
                            throw new Error("Material with name: " + materialName + " has no diffuse render URL");
                    }
                    else
                        throw new Error("No material found with name: " + materialName);
                });
            };
            this.setCameraPosition = function (x, y, z) {
                _this.setCameraPositionAnimation(x, y, z);
                _this.currentScene.beginAnimation(_this.currentScene.activeCamera, 0, 120, false);
            };
            this.setCameraTarget = function (x, y, z) {
                _this.setCameraTargetAnimation(x, y, z);
                _this.currentScene.beginAnimation(_this.currentScene.activeCamera, 0, 120, false);
            };
            this.setCameraPositionAndTarget = function (positionX, positionY, positionZ, targetX, targetY, targetZ) {
                _this.setCameraPositionAnimation(positionX, positionY, positionZ);
                _this.setCameraTargetAnimation(targetX, targetY, targetZ);
                _this.currentScene.beginAnimation(_this.currentScene.activeCamera, 0, 120, false);
            };
            this.loadNewScene = function (loadedCallback) {
                BABYLON.SceneLoader.Load("", _this.currentModel.babylonUrl, _this.engine, function (scene) {
                    _this.currentScene = scene;
                    scene.executeWhenReady(function () {
                        _this.setupLoadedScene(scene, loadedCallback);
                    });
                }, function (progress) { }, function (scene) { }, _this.currentModel.fileType);
            };
            this.setupLoadedScene = function (scene, loadedCallback) {
                if (typeof setupEnvironment === "function")
                    setupEnvironment(scene);
                _this.camera = new BABYLON.ArcRotateCamera("arcCamera1", 0, 1, 10, new BABYLON.Vector3(0, 0, 0), _this.currentScene);
                var min = new BABYLON.Vector3(_this.currentModel.boundingBoxMin[0], _this.currentModel.boundingBoxMin[1], _this.currentModel.boundingBoxMin[2]);
                var max = new BABYLON.Vector3(_this.currentModel.boundingBoxMax[0], _this.currentModel.boundingBoxMax[1], _this.currentModel.boundingBoxMax[2]);
                _this.camera.setTarget(min.add(max.subtract(min).scale(0.5)));
                var camera = _this.currentModel.defaultCameraPosition;
                if (camera) {
                    _this.camera.setPosition(new BABYLON.Vector3(camera[0], camera[1], camera[2]));
                }
                else {
                    _this.camera.setPosition(new BABYLON.Vector3(_this.camera.target.x, _this.camera.target.y + (max.y - _this.camera.target.y) * 3, _this.camera.target.z + (max.z - _this.camera.target.z) * 6));
                }
                _this.camera.wheelPrecision = 1000 / _this.camera.position.subtract(_this.camera.target).length();
                _this.camera.pinchPrecision = _this.camera.wheelPrecision;
                _this.camera.minZ = 0;
                _this.camera.lowerRadiusLimit = 0.1;
                _this.camera.attachControl(_this.canvas);
                _this.currentScene.activeCamera = _this.camera;
                if (typeof loadedCallback === "function")
                    loadedCallback();
                _this.engine.runRenderLoop(function () {
                    if (_this.currentScene.activeCamera)
                        _this.currentScene.render();
                });
                _this.currentScene.onPointerDown = function (evt, pickResult) {
                    if (evt.button > 0)
                        return;
                    if (pickResult.hit && pickResult.pickedMesh) {
                        if (typeof _this.meshClickCallback === "function")
                            _this.meshClickCallback(pickResult.pickedMesh);
                    }
                };
            };
            this.getMeshByName = function (meshName) {
                var meshes = _this.currentModel.meshes.filter(function (meshObject) {
                    return meshObject.name === meshName;
                });
                return meshes.length > 0 ? meshes[0] : null;
            };
            this.addMaterial = function (mesh, material, useEnvironmentReflectionTexture) {
                var textureMaterial = _this.currentScene.getMaterialByName(material.name + mesh.name);
                if (!textureMaterial)
                    textureMaterial = new BABYLON.PBRMetallicRoughnessMaterial(material.name + mesh.name, _this.currentScene);
                if (material.renderDiffuseUrl) {
                    textureMaterial.baseTexture = new BABYLON.Texture(material.renderDiffuseUrl, _this.currentScene);
                    textureMaterial.baseTexture.uScale = material.materialOptions.repeatX;
                    textureMaterial.baseTexture.vScale = material.materialOptions.repeatY;
                }
                if (material.renderBumpUrl) {
                    textureMaterial.bumpTexture = new BABYLON.Texture(material.renderBumpUrl, _this.currentScene);
                    textureMaterial.bumpTexture.uScale = material.materialOptions.repeatX;
                    textureMaterial.bumpTexture.vScale = material.materialOptions.repeatY;
                    textureMaterial.bumpTexture.level = 1;
                }
                if (material.renderSpecularUrl) {
                    textureMaterial.specularTexture = new BABYLON.Texture(material.renderSpecularUrl, _this.currentScene);
                    textureMaterial.specularTexture.uScale = material.materialOptions.repeatX;
                    textureMaterial.specularTexture.vScale = material.materialOptions.repeatY;
                }
                textureMaterial.metallic = material.materialOptions.metallic;
                textureMaterial.alpha = material.materialOptions.alpha;
                textureMaterial.roughness = material.materialOptions.roughness;
                textureMaterial.backFaceCulling = false;
                textureMaterial.needDepthPrePass = true;
                if (useEnvironmentReflectionTexture && _this.environment.environmentImageUrls.length > 0)
                    textureMaterial.environmentTexture = BABYLON.CubeTexture.CreateFromImages(_this.environment.environmentImageUrls, _this.currentScene);
                var sceneMesh = _this.currentScene.getMeshByName(mesh.name);
                if (sceneMesh)
                    sceneMesh.material = textureMaterial;
                sceneMesh = null;
                textureMaterial = null;
            };
            this.setCameraTargetAnimation = function (x, y, z) {
                var targetXAnimation = new BABYLON.Animation("targetXAnimation", "target.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var targetYAnimation = new BABYLON.Animation("targetYAnimation", "target.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var targetZAnimation = new BABYLON.Animation("targetZAnimation", "target.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var targetXKeys = [{ frame: 0, value: _this.currentScene.activeCamera.target.x }, { frame: 120, value: x }];
                var targetYKeys = [{ frame: 0, value: _this.currentScene.activeCamera.target.y }, { frame: 120, value: y }];
                var targetZKeys = [{ frame: 0, value: _this.currentScene.activeCamera.target.z }, { frame: 120, value: z }];
                targetXAnimation.setKeys(targetXKeys);
                targetYAnimation.setKeys(targetYKeys);
                targetZAnimation.setKeys(targetZKeys);
                _this.currentScene.activeCamera.animations.push(targetXAnimation);
                _this.currentScene.activeCamera.animations.push(targetYAnimation);
                _this.currentScene.activeCamera.animations.push(targetZAnimation);
            };
            this.setCameraPositionAnimation = function (x, y, z) {
                var alphaAnimation = new BABYLON.Animation("alphaAnimation", "alpha", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var betaAnimation = new BABYLON.Animation("betaAnimation", "beta", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var radiusAnimation = new BABYLON.Animation("radiusAnimation", "radius", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var alphaKeys = [{ frame: 0, value: _this.currentScene.activeCamera.alpha }, { frame: 120, value: x }];
                var betaKeys = [{ frame: 0, value: _this.currentScene.activeCamera.beta }, { frame: 120, value: y }];
                var radiusKeys = [{ frame: 0, value: _this.currentScene.activeCamera.radius }, { frame: 120, value: z }];
                alphaAnimation.setKeys(alphaKeys);
                betaAnimation.setKeys(betaKeys);
                radiusAnimation.setKeys(radiusKeys);
                _this.currentScene.activeCamera.animations.push(alphaAnimation);
                _this.currentScene.activeCamera.animations.push(betaAnimation);
                _this.currentScene.activeCamera.animations.push(radiusAnimation);
            };
            if (!xpoUrl)
                throw new Error("Invalid XPO URL");
            if (!xpoApiKey)
                throw new Error("Invalid API key");
            this.restApiService = new BabylonSdk.Services.RestApiService(xpoUrl, xpoApiKey);
            this.meshClickCallback = meshClickCallback;
            if (BABYLON.Engine.isSupported()) {
                this.canvas = document.getElementById(canvasSelector);
                this.engine = new BABYLON.Engine(this.canvas, true);
                this.engine.enableOfflineSupport = false;
                window.onresize = function () {
                    _this.engine.resize();
                };
            }
            else
                throw new Error("Babylon is not supported by this browser");
        }
        return BabylonEngine;
    })();
    BabylonSdk.BabylonEngine = BabylonEngine;
})(BabylonSdk || (BabylonSdk = {}));
//* PicarioXPO Babylon SDK
//*
//* Authors : Picario
/// <reference path="scripts/typings/custom/custom.d.ts" />
/// <reference path="scripts/typings/babylonjs/babylonjs.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="classes/environment.ts" />
/// <reference path="classes/environmentsapiresult.ts" />
/// <reference path="classes/material.ts" />
/// <reference path="classes/materialsapiresult.ts" />
/// <reference path="classes/meshobject.ts" />
/// <reference path="classes/model.ts" />
/// <reference path="classes/modelsapiresult.ts" />
/// <reference path="services/restapiservice.ts" />
/// <reference path="engine/babylonengine.ts" /> 
