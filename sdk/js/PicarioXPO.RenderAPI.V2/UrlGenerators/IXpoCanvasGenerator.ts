module UrlGeneratorModule {
    
    export interface IXpoCanvasGenerator {
        
        /*
         * Returns the Canvas generated using XPO parameters
         */
        getCanvas(request: XpoUrlRequest): HTMLCanvasElement;
    }
}