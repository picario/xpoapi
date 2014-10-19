class XpoUrlRequest {
    primaryKey: string;
    private outputType: UrlGeneratorModule.XpoUrlOutputTypes;
    private outputQuality: number;
    objects: Array<XpoUrlObject>;
    templateParameters: Array<XpoUrlTemplate>;
    overlays: Array<string>;
    private fileType: UrlGeneratorModule.XpoUrlFileTypes;
    private width: number;
    customParameters: Collections.Dictionary<string, Object>;
    private frame: number;
    private watermarkImage: string
    private absoluteUrl: string;
    private useAbsoluteUrl: boolean;
    private sceneThumbnailObjectNumber: number;
    private highlightObject: number;
    private isEntity: boolean;
    private preFillCaching: boolean;
    private designCaching: boolean;
    private caching: boolean;
    private templateName: string;
    private allColor: string;
    private transparencyColor: string;
    private backgroundColor: string;
    private debug: boolean;
    private imageType: UrlGeneratorModule.XpoUrlImageTypes;
    private resizeMethod: UrlGeneratorModule.XpoUrlResizeMethods;
    private height: number;
    urlType: UrlGeneratorModule.UrlTypes;

    /*
     *  Constructs a new XpoRequest class
     */
    constructor() {
        this.objects = new Array<XpoUrlObject>();
        this.templateParameters = new Array<XpoUrlTemplate>();
        this.overlays = new Array<string>();
        this.customParameters = new Collections.Dictionary<string, Object>();

        this.caching = true;
        this.designCaching = true;
        this.urlType = UrlGeneratorModule.UrlTypes.Url;
    }

    /*
     *  Gets or sets the scene name (filename) for this URL
     */
    getPrimaryKey(): string { return this.primaryKey; }
    setPrimaryKey(val: string) { this.primaryKey = val; }

    /*
     *  Gets or sets the output type
     */
    getOutputType(): UrlGeneratorModule.XpoUrlOutputTypes { return this.outputType; }
    setOutputType(val: UrlGeneratorModule.XpoUrlOutputTypes) { this.outputType = val; }

    /*
     *  Gets or sets the output quality for this URL
     */
    getOutputQuality(): number { return this.outputQuality; }
    setOutputQuality(val: number) { this.outputQuality = val; }

    /*
     *  Gets or sets the object list for this URL
     */
    getObjects(): Array<XpoUrlObject> { return this.objects; }

    /*
     *  Gets or sets the template parameter list for this URL
     */
    getTemplateParameters(): Array<XpoUrlTemplate> { return this.templateParameters; }

    /*
     *  Specifies the optional overlay images to be rendered upon the scene or design.
     *  You can specify multiple images (has to be PNG).
     *  Images must be present in the Overlays folder.
     */
    getOverlays(): Array<string> { return this.overlays; }

    /*
     *  Gets or sets the filetype for this URL
     */
    getFileType(): UrlGeneratorModule.XpoUrlFileTypes { return this.fileType; }
    setFileType(val: UrlGeneratorModule.XpoUrlFileTypes) { this.fileType = val; }

    /*
     *  Gets or sets the width of the output image for this URL
     */
    getWidth(): number { return this.width; }
    setWidth(val: number) { this.width = val; }

    /*
     *  Gets or sets the height of the output image for this URL
     */
    getHeight(): number { return this.height; }
    setHeight(val: number) { this.height = val; }

    /*
     *  Gets or sets the resize method for the output image this URL
     */
    getResizeMethod(): UrlGeneratorModule.XpoUrlResizeMethods { return this.resizeMethod; }
    setResizeMethod(val: UrlGeneratorModule.XpoUrlResizeMethods) { this.resizeMethod = val; }

    /*
     *  Gets or sets the ouput image type for this URL
     */
    getImageType(): UrlGeneratorModule.XpoUrlImageTypes { return this.imageType; }
    setImageType(val: UrlGeneratorModule.XpoUrlImageTypes) { this.imageType = val; }

    /*
     *  Enables or disables debugging for this URL
     *  true if debugging is enabled, otherwise false. Default is false
     */
    getDebug(): boolean { return this.debug; }
    setDebug(val: boolean) { this.debug = val; }

    /*
     *  Gets or sets the background color for this URL
     */
    getBackgroundColor(): string { return this.backgroundColor; }
    setBackgroundColor(val: string) { this.backgroundColor = val; }

    /*
     *  Specifies the color to use a transparency key. 
     *  This color will be made transparent when using the PNG output type.
     */
    getTransparencyColor(): string { return this.transparencyColor; }
    setTransparencyColor(val: string) { this.transparencyColor = val; }

    /*
     *  Specifies all colors for all objects in one parameter.
     */
    getAllColor(): string { return this.allColor; }
    setAllColor(val: string) { this.allColor = val; }

    /*
     *  Specifies the name of the template to use.
     */
    getTemplateName(): string { return this.templateName; }
    setTemplateName(val: string) { this.templateName = val; }

    /*
     *  Enables or disables caching
     *  true if caching is enabled, otherwise false. Default is true
     */
    getCaching(): boolean { return this.caching; }
    setCaching(val: boolean) { this.caching = val; }

    /*
     *  Enables or disables design-caching
     *  true if design caching is enabled, otherwise false. Default is true
     */
    getDesignCaching(): boolean { return this.designCaching; }
    setDesignCaching(val: boolean) { this.designCaching = val; }

    /*
     *  When set to True  the image will not be sent to the browser.
     */
    getPreFillCaching(): boolean { return this.preFillCaching; }
    setPreFillCaching(val: boolean) { this.preFillCaching = val; }

    /*
     *  Option to save the rendered image. When set True
     *  the saved image will be streamed to the browser as a file instead of an Image
     */
    getIsEntity(): boolean { return this.isEntity; }
    setIsEntity(val: boolean) { this.isEntity = val; }

    /*
     *  Gets or sets the highlighted object number for this URL
     */
    getHighlightObject(): number { return this.highlightObject; }
    setHighlightObject(val: number) { this.highlightObject = val; }

    /*
     *  Specifies the object number when requesting a scene object thumbnail (FileType 4).
     *  This parameter is used only when the ft is set to 4
     */
    getSceneThumbnailObjectNumber(): number { return this.sceneThumbnailObjectNumber; }
    setSceneThumbnailObjectNumber(val: number) { this.sceneThumbnailObjectNumber = val; }

    /*
     *  Specifies whether the xpo url should be absolute or relative
     */
    getUseAbsoluteUrl(): boolean { return this.useAbsoluteUrl; }
    setUseAbsoluteUrl(val: boolean) { this.useAbsoluteUrl = val; }

    /*
     *  Specifies the absolute url to use
     */
    getAbsoluteUrl(): string { return this.absoluteUrl; }
    setAbsoluteUrl(val: string) { this.absoluteUrl = val; }

    /*
     *  Specifies the filename of the image that should be used as a watermark
     */
    getWatermarkImage(): string { return this.watermarkImage; }
    setWatermarkImage(val: string) { this.watermarkImage = val; }

    /*
     *  Specifies the frame to be rendered when using a MultiFrame scene (only for V2)
     */
    getFrame(): number { return this.frame; }
    setFrame(val: number) { this.frame = val; }

    /*
     *  Custom parameters and values to use in the URL
     */
    getCustomParameters(): Collections.Dictionary<string, Object> { return this.customParameters; }
    
}