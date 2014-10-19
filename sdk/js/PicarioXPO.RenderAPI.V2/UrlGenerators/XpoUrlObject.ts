class XpoUrlObject {
    private index: number;
    private objectType: UrlGeneratorModule.XpoUrlObjectTypes;
    private text: XpoUrlText;
    private color: XpoUrlColor;
    private design: XpoUrlDesign;
    
    /*
     * Gets or sets the index of this overlay
     */
    getIndex(): number { return this.index; }
    setIndex(val: number) { this.index = val; }

    /*
     * Gets or sets the type for this object
     */
    getObjectType(): UrlGeneratorModule.XpoUrlObjectTypes { return this.objectType; }
    setObjectType(val: UrlGeneratorModule.XpoUrlObjectTypes) { this.objectType = val; }

    /*
     * Gets or sets the text for this object
     */
    getText(): XpoUrlText { return this.text; }
    setText(val: XpoUrlText) { this.text = val; }

    /*
     * Gets or sets the color for this object
     */
    getColor(): XpoUrlColor { return this.color; }
    setColor(val: XpoUrlColor) { this.color = val; }

    /*
     * Gets or sets the design for this object
     */
    getDesign(): XpoUrlDesign { return this.design; }
    setDesign(val: XpoUrlDesign) { this.design = val; }
} 