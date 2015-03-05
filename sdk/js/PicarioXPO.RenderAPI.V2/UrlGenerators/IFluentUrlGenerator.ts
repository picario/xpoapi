module UrlGeneratorModule {

    /*
    * Represents the Fluent XPO URL generator
    */
    export interface IFluentXpoUrlGenerator {

        /*
         * Sets the scene name (filename) for this URL
         */
        setPrimaryKey(primaryKey: string): IFluentXpoUrlGenerator;

        /*
         * Sets the output quality for this URL
         * @outputQuality: the output quality (in percentage from 0 to 100)
         */
        setOutputQuality(outputQuality: number): IFluentXpoUrlGenerator;

        /*
         * Sets the output type for this URL (Only used by non-Image request)
         */
        setOutputType(outputType: XpoUrlOutputTypes): IFluentXpoUrlGenerator;

        /*
         * Adds an object to this URL
         */
        addObject(xpoObject: Function, options?: any): IFluentXpoUrlGenerator;

        /*
         * Adds a template to the output
         */
        addTemplateParameter(index: number, parameterValue: string): IFluentXpoUrlGenerator;

        /*
         * Adds an overlay to the output
         */
        addOverlay(xpoOverlay: Function, options: any): IFluentXpoUrlGenerator;

        /*
         * Sets the filetype for this URL
         */
        setEntityType(fileType: XpoUrlFileTypes): IFluentXpoUrlGenerator;

        /*
         * Sets the width of the output image for this URL
         */
        setWidth(width: number): IFluentXpoUrlGenerator;

        /*
         * Sets the heigt of the output image for this URL
         */
        setHeight(height: number): IFluentXpoUrlGenerator;

        /*
         * Sets the resize method for the output image this URL
         * For designs only values: KeepAspect, Stretch & Repeat 
         * For scene thumbnails only values: KeepAspect & Stretch
         * For images only values: KeepAspect, Stretch, Full & KeepAspectMax
         * 
         * @resizeMethod The kind of resize method to be used
         */
        setResizeMethod(resizeMethod: XpoUrlResizeMethods): IFluentXpoUrlGenerator;

        /*
         * Sets the output image type for this URL
         * @type The type of the output image
         */
        setImageType(type: XpoUrlImageTypes): IFluentXpoUrlGenerator;

        /*
         * Enables or disables debugging for this URL
         * @debug True if debugging is enabled, otherwise false. Default is false
         */
        setDebug(debug: boolean): IFluentXpoUrlGenerator;


        /*
         * Sets the background color for this URL
         * @colorString A color string to indicate what color the background of the scene should be
         */
        setBackgroundColor(colorString: string): IFluentXpoUrlGenerator;

        /*
         * Enables or disables caching
         * @cache True if caching is enabled, otherwise false. Default is true
         */
        setCaching(cache: boolean): IFluentXpoUrlGenerator;

        /*
         * Enables or disables design-caching
         * @cache True if design caching is enabled, otherwise false. Default is true
         */
        setDesignCaching(cache: boolean): IFluentXpoUrlGenerator;

        /*
         * Sets the highlighted object number for this URL
         * @objectNumber The objectnumber to highlight
         */
        setHighlightObject(objectNumber: number): IFluentXpoUrlGenerator;

        /*
         * Specifies the color to use a transparency key.
         * This color will be made transparent when using the PNG output type.
         */
        setTransparencyColor(colorString: string): IFluentXpoUrlGenerator;

        /*
         * Specifies the object number when requesting a scene object thumbnail (FileType 4).
         * This parameter is used only when the ft is set to 4
         */
        setSceneThumbnailObjectNumber(objectNumber: number): IFluentXpoUrlGenerator;

        /*
         * Specifies all colors for all objects in one parameter.
         */
        setAllColor(colorString: string): IFluentXpoUrlGenerator;

        /*
         * When set to True the image will not be sent to the browser.
         */
        setPrefillCaching(cache: boolean): IFluentXpoUrlGenerator;

        /*
         * Specifies the name of the template to use
         */
        setTemplateName(name: string): IFluentXpoUrlGenerator;
        
        /*
         * Specifies the absolute URL to use
         */
        setAbsoluteUrl(absoluteUrl: string): IFluentXpoUrlGenerator;

        /*
         * Specifies the watermark image to use
         */
        setWatermarkImage(watermarkImageName: string): IFluentXpoUrlGenerator;

        /*
         * Adds a custom parameter to the URL
         */
        addCustom(key: string, value: Object): IFluentXpoUrlGenerator;

        /*
         * Specifies the frame to be rendered when using a MultiFrame scene
         */
        setFrame(frame: number): IFluentXpoUrlGenerator;

        /*
         * Specifies the id of the container to render the canvas in
         */
        setCanvasContainerId(canvasContainerId: string): IFluentXpoUrlGenerator;

        /*
         * Returns the URL generated using these parameters
         */
        getUrl(): string;

        /*
         * Returns the Canvas generated using these parameters
         */
        getCanvas(): HTMLCanvasElement;
    }
}