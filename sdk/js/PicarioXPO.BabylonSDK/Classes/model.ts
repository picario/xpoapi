module BabylonSdk.Classes {
    export class Model {
        id: number;
        name: string;
        meshes: MeshObject[];
        babylonUrl: string;
        defaultCameraPosition: number[];
        boundingBoxMin: number[];
        boundingBoxMax: number[];
    }
}