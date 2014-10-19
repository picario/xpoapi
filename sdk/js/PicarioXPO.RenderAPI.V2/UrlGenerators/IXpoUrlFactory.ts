 module UrlGeneratorModule {

     export interface IXpoUrlFactory {
         /*
          * Creates a new instance of the currently implemented <c>IXpoUrlGenerator</c> and wraps it
          * inside the <c>FluentXpoGenerator</c>
          */
         createUrlGenerator(): IXpoUrlGenerator ;
     }

 }