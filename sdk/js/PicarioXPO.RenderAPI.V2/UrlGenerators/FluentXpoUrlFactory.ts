class FluentXpoUrlFactory implements UrlGeneratorModule.IFluentXpoUrlFactory {
    
    createFluentUrlGenerator(generator: UrlGeneratorModule.IXpoUrlGenerator, urlType: UrlGeneratorModule.FluentXpoUrlType)
    {
        return new FluentXpoUrlGenerator(generator, this.getUrlRequest(urlType));
    }

    getUrlRequest(urltype: UrlGeneratorModule.FluentXpoUrlType )
    {
        switch (urltype) {
            case UrlGeneratorModule.FluentXpoUrlType.Image:
                return new XpoImageUrlRequest();
            case UrlGeneratorModule.FluentXpoUrlType.Coordinates:
                return new XpoCoordinatesUrlRequest();
            default:
                throw("Cannot determine correct URL type");
        }
    }
}