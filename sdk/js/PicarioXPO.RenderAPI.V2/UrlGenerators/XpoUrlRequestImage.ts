class XpoImageUrlRequest extends XpoUrlRequest {
    constructor() {
        super();
        this.urlType = UrlGeneratorModule.UrlTypes.Image;
    }
}