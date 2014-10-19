class FluentXpoUrlObject {
    private xpoObject: XpoUrlObject;

    /*
     * Creates a new instance of the FluentXpoObject
     */
    constructor() {
        this.xpoObject = new XpoUrlObject();
    }
    
    /*
     * Returns the wrapped XpoObject
     */
    getXpoObject(): XpoUrlObject { return this.xpoObject; }

    /*
     * Sets the index for this object
     */
    setIndex(index: number) {
        this.xpoObject.setIndex(index);

        return this;
    }

    /*
     * Specifies object as design
     */
    design(fileName: string) {
        this.xpoObject.setObjectType(UrlGeneratorModule.XpoUrlObjectTypes.Design);
        var fluentXpoUrlDesign = new FluentXpoUrlDesign(fileName);
        this.xpoObject.setDesign(fluentXpoUrlDesign.xpoUrlDesign);

        return fluentXpoUrlDesign;
    }

    /*
     * Specifies object as text
     */
    text(text: string) {
        var fluentXpoUrlText = new FluentXpoUrlText(text);
        this.xpoObject.setText(fluentXpoUrlText.getXpoUrlText());

        return fluentXpoUrlText;
    }

    /*
     * Specifies object as color
     */
    color(color: string) {
        var fluentXpoUrlColor = new FluentXpoUrlColor(color);
        this.xpoObject.setColor(fluentXpoUrlColor.getXpoUrlColor());

        return fluentXpoUrlColor;
    }
 }