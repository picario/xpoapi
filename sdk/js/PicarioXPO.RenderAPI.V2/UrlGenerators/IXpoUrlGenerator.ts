module UrlGeneratorModule {
    
    export interface IXpoUrlGenerator {
        
        /*
         * Returns the URL generated using XPO parameters
         */
        getUrl(request: XpoUrlRequest): string;
    }
}