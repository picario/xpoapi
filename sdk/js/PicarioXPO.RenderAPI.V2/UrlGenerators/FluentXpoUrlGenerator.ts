class FluentXpoUrlGenerator implements UrlGeneratorModule.IFluentXpoUrlGenerator {

    generator: UrlGeneratorModule.IXpoUrlGenerator;
    request: XpoUrlRequest;

    constructor(generator: UrlGeneratorModule.IXpoUrlGenerator, request: XpoUrlRequest = new XpoUrlRequest) {
        if (generator == null)
            throw ("Generator cannot be null.");
        if (request == null)
            throw ("Request cannot be null");

        this.generator = generator;
        this.request = request;
    }

    private ensureUrlType(urlRequest: XpoUrlRequest): XpoUrlRequest {
        if (UrlGeneratorModule.UrlTypes[urlRequest.urlType] != null)
            return urlRequest;

        throw ("Could not cast url with type " + urlRequest.urlType + " to " + typeof XpoUrlRequest);
    }

    /*
     * Sets the scene name (filename) for this URL
     */
    setPrimaryKey(primaryKey: string) {
        this.request.setPrimaryKey(primaryKey);

        return this;
    }

    /*
     * Sets the output quality for this URL
     * @outputQuality: the output quality (in percentage from 0 to 100)
     */
    setOutputQuality(outputQuality: number) {
        this.ensureUrlType(this.request).setOutputQuality(outputQuality);

        return this;
    }

    /*
     * Sets the output type for this URL (Only used by non-Image request)
     */
    setOutputType(outputType: UrlGeneratorModule.XpoUrlOutputTypes) {
        this.ensureUrlType(this.request).setOutputType(outputType);

        return this;
    }

    /*
     * Adds an object to this URL
     */
    addObject(xpoObject: Function, options: any) {
        var fluentXpoObject = new FluentXpoUrlObject();
        fluentXpoObject.setIndex(this.ensureUrlType(this.request).getObjects().length);
        xpoObject(fluentXpoObject, options);

        this.ensureUrlType(this.request).objects.push(fluentXpoObject.getXpoObject());

        return this;
    }

    /*
     * Adds a template to the output
     */
    addTemplateParameter(index: number, parameterValue: string) {
        this.ensureUrlType(this.request).templateParameters.push(new XpoUrlTemplate (index, parameterValue));

        return this;
    }

    /*
     * Adds an overlay to the output
     */
    addOverlay(xpoOverlay: Function, options: any) {
        var fluentXpoOverlay = new FluentXpoUrlOverlay();
        fluentXpoOverlay.setIndex(this.ensureUrlType(this.request).getOverlays().length);
        xpoOverlay(fluentXpoOverlay, options);

        this.ensureUrlType(this.request).overlays.push(fluentXpoOverlay.getXpoOverlay());

        return this;
    }

    /*
     * Sets the filetype for this URL
     */
    setEntityType(fileType: UrlGeneratorModule.XpoUrlFileTypes) {
        this.ensureUrlType(this.request).setFileType(fileType);

        return this;
    }

    /*
     * Sets the width of the output image for this URL
     */
    setWidth(width: number) {
        this.request.setWidth(width);

        return this;
    }

    /*
     * Sets the heigt of the output image for this URL
     */
    setHeight(height: number) {
        this.request.setHeight(height);

        return this;
    }

    /*
     * Sets the resize method for the output image this URL
     * For designs only values: KeepAspect, Stretch & Repeat 
     * For scene thumbnails only values: KeepAspect & Stretch
     * For images only values: KeepAspect, Stretch, Full & KeepAspectMax
     * 
     * @resizeMethod The kind of resize method to be used
     */
    setResizeMethod(resizeMethod: UrlGeneratorModule.XpoUrlResizeMethods) {
        this.request.setResizeMethod(resizeMethod);

        return this;
    }

    /*
     * Sets the output image type for this URL
     * @type The type of the output image
     */
    setImageType(type: UrlGeneratorModule.XpoUrlImageTypes) {
        this.ensureUrlType(this.request).setImageType(type);

        return this;
    }

    /*
     * Enables or disables debugging for this URL
     * @debug True if debugging is enabled, otherwise false. Default is false
     */
    setDebug(debug: boolean) {
        this.request.setDebug(debug);

        return this;
    }


    /*
     * Sets the background color for this URL
     * @colorString A color string to indicate what color the background of the scene should be
     */
    setBackgroundColor(colorString: string) {
        this.ensureUrlType(this.request).setBackgroundColor(colorString);

        return this;
    }

    /*
     * Enables or disables caching
     * @cache True if caching is enabled, otherwise false. Default is true
     */
    setCaching(cache: boolean) {
        this.ensureUrlType(this.request).setCaching(cache);

        return this;
    }

    /*
     * Enables or disables design-caching
     * @cache True if design caching is enabled, otherwise false. Default is true
     */
    setDesignCaching(cache: boolean) {
        this.ensureUrlType(this.request).setDesignCaching(cache);

        return this;
    }

    /*
     * Sets the highlighted object number for this URL
     * @objectNumber The objectnumber to highlight
     */
    setHighlightObject(objectNumber: number) {
        this.ensureUrlType(this.request).setHighlightObject(objectNumber);

        return this;
    }

    /*
     * Specifies the color to use a transparency key.
     * This color will be made transparent when using the PNG output type.
     */
    setTransparencyColor(colorString: string) {
        this.ensureUrlType(this.request).setTransparencyColor(colorString);

        return this;
    }

    /*
     * Specifies the object number when requesting a scene object thumbnail (FileType 4).
     * This parameter is used only when the ft is set to 4
     */
    setSceneThumbnailObjectNumber(objectNumber: number) {
        this.ensureUrlType(this.request).setSceneThumbnailObjectNumber(objectNumber);

        return this;
    }

    /*
     * Specifies all colors for all objects in one parameter.
     */
    setAllColor(colorString: string) {
        this.ensureUrlType(this.request).setAllColor(colorString);

        return this;
    }

    /*
     * When set to True the image will not be sent to the browser.
     */
    setPrefillCaching(cache: boolean) {
        this.ensureUrlType(this.request).setPreFillCaching(cache);

        return this;
    }

    /*
     * Specifies the name of the template to use
     */
    setTemplateName(name: string) {
        this.ensureUrlType(this.request).setTemplateName(name);

        return this;
    }

    setAbsoluteUrl(absoluteUrl: string) {
        this.ensureUrlType(this.request).setAbsoluteUrl(absoluteUrl);

        return this;
    }

    setWatermarkImage(watermarkImageName: string) {
        this.ensureUrlType(this.request).setWatermarkImage(watermarkImageName);

        return this;
    }

    addCustom(key: string, value: Object) {
        this.request.customParameters.setValue(key, value);

        return this;
    }

    setFrame(frame: number) {
        this.request.setFrame(frame);

        return this;
    }

    getUrl() {
        return this.generator.getUrl(this.request);
    }
}