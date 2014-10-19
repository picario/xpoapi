module UrlGeneratorModule {
    
    export interface IFluentXpoUrlFactory {
        
        /*
         * Creates a new instance of the currently implemented <c>IXpoUrlGenerator</c> and wraps it
         * inside the <c>IFluentXpoUrlGenerator</c>
         */
        createFluentUrlGenerator(generator: IXpoUrlGenerator, urlType: FluentXpoUrlType): IFluentXpoUrlGenerator;
    }

}