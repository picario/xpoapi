class GeneralKeys {
    private entityName = "fn";
    private width = "width";
    private height = "height";
    private backgroundColor = "bgcolor";
    private designCaching = "p.dc";
    private resizeMethod = "mode";
    private textureRepeat = "p.r";
    private outputQuality = "quality";
    private imageType = "format";
    private outputType = "ot";
    private sceneThumbnailObjectNumber = "p.objectthumb";
    private highlightObject = "p.highlight";
    private caching = "Cache";
    private coords = "p.coords";
    private watermark = "watermark";
    private frame = "p.frame";
    private renderMode = "p.mode";

    queryStringFormat = "&{0}={1}";

    appendRequest(stringBuilder: string, request: XpoUrlRequest) {

        stringBuilder = stringBuilder.concat("?1=1")
                                     .concat(this.getQueryStringValue(this.width, request.getWidth()))
                                     .concat(this.getQueryStringValue(this.backgroundColor, request.getBackgroundColor()))
                                     .concat(this.getQueryStringValue(this.caching, this.getCachingMethod(request)))
                                     .concat(this.getQueryStringValue(this.height, request.getHeight()))
                                     .concat(this.getQueryStringValue(this.designCaching, request.getDesignCaching()))
                                     .concat(this.getQueryStringValue(this.resizeMethod, this.getResizeMethod(request)))
                                     .concat(this.getQueryStringValue(this.textureRepeat, this.getRepeatMethod(request)))
                                     .concat(this.getQueryStringValue(this.outputQuality, request.getOutputQuality()))
                                     .concat(this.getQueryStringValue(this.imageType, this.getFormat(request.getImageType())))
                                     .concat(this.getQueryStringValue(this.sceneThumbnailObjectNumber, this.getStringValue(request.getSceneThumbnailObjectNumber())))
                                     .concat(this.getQueryStringValue(this.highlightObject, request.getHighlightObject()))
                                     .concat(this.getQueryStringValue(this.watermark, request.getWatermarkImage()))
                                     .concat(this.getQueryStringValue(this.frame, request.getFrame()))
                                     .concat(this.getQueryStringValue(this.renderMode, request.getSceneRenderMode()))
                                     .appendDictionary(request.customParameters);

        if (request.urlType == UrlGeneratorModule.UrlTypes.Coords) {
            stringBuilder = stringBuilder.concat(this.getQueryStringValue(this.coords, true));
        }

        return stringBuilder;
    }

    private getQueryStringValue(key: string, value: any) {
        if (!value)
            return "";

        return this.queryStringFormat.format(key, value);
    }

    private getCachingMethod(request: XpoUrlRequest){
        return request.getCaching() ? "Default" : "No";
    }

    private getRepeatMethod(request: XpoUrlRequest) {
        if (request.getResizeMethod() == UrlGeneratorModule.XpoUrlResizeMethods.Repeat && request.getFileType() == UrlGeneratorModule.XpoUrlFileTypes.Design) {
            return "1";
        }

        return "";
    }

    private getFormat(imageType: UrlGeneratorModule.XpoUrlImageTypes) {
        switch (imageType) {
            case UrlGeneratorModule.XpoUrlImageTypes.Bmp:
                return "bmp";
            case UrlGeneratorModule.XpoUrlImageTypes.Jpg:
                return "jpg";
            case UrlGeneratorModule.XpoUrlImageTypes.Png:
                return "png";
            default:
                return "jpg";
        }
    }

    private getResizeMethod(request: XpoUrlRequest) {
        switch (request.getResizeMethod()) {
            case UrlGeneratorModule.XpoUrlResizeMethods.KeepAspectMax:
                return "max";
            case UrlGeneratorModule.XpoUrlResizeMethods.Crop:
                return "crop";
            case UrlGeneratorModule.XpoUrlResizeMethods.Stretch:
                return "stretch";
            case UrlGeneratorModule.XpoUrlResizeMethods.Canvas:
                return "canvas";
        }

        return "";
    }

    private getStringValue(value: any) {
        return value != null ? value.toString() : "";
    }
}