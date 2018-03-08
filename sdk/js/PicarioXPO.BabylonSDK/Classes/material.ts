module BabylonSdk.Classes {
    export class Material {
        id: number;
        name: string;
        displayDiffuseUrl: string;
        displayBumpUrl: string;
        displaySpecularUrl: string;
        renderDiffuseUrl: string;
        renderBumpUrl: string;
        renderSpecularUrl: string;
        materialOptions: MaterialOptions;
    }

    export class MaterialOptions {
        repeatX : number;
        repeatY : number;
    }
}