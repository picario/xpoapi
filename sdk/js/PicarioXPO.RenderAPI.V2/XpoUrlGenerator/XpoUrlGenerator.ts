class XpoUrlGenerator implements UrlGeneratorModule.IXpoUrlGenerator {
    
    getUrl(request: XpoUrlRequest) {
        if (request.urlType == UrlGeneratorModule.UrlTypes.Image)
            return this.getImageUrl(request);

        if (request.urlType == UrlGeneratorModule.UrlTypes.Coords)
            return this.getCoordsUrl(request);

        throw("Input type is not recognized");
    }

    getImageUrl(request: XpoImageUrlRequest) {
        var generalKeys = new GeneralKeys();
        var designKeys = new DesignKeys();
        var colorKeys = new ColorKeys();

        var baseUri = this.getXpoBaseUrl(request);

        var stringBuilder = baseUri;
        stringBuilder = stringBuilder.concat(request.getPrimaryKey());

        stringBuilder = generalKeys.appendRequest(stringBuilder, request); 
        stringBuilder = designKeys.appendDesigns(stringBuilder, request.getObjects().filter(value => value.getDesign() != null)); 
        stringBuilder = colorKeys.appendColors(stringBuilder, request.getObjects().filter(value => value.getColor() != null)); 

        return stringBuilder;
    }

    getCoordsUrl(request: XpoCoordinatesUrlRequest) {
        var generalKeys = new GeneralKeys();
        var baseUri = this.getXpoBaseUrl(request);

        var stringBuilder = baseUri;
        stringBuilder = stringBuilder.concat(request.getPrimaryKey());
        stringBuilder = generalKeys.appendRequest(stringBuilder, request);

        return stringBuilder;
    }

    getXpoBaseUrl(urlRequest: XpoUrlRequest) {
        if (urlRequest != null && urlRequest.getUseAbsoluteUrl())
            return urlRequest.getAbsoluteUrl().endsWith("/") ? urlRequest.getAbsoluteUrl() : urlRequest.getAbsoluteUrl() + "/";

        return "/";
    }

}