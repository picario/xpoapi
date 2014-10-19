class FluentXpoUrlText {
    private xpoUrlText: XpoUrlText;

    /*
     * Creates a new instance of the FluentXpoUrlDesign
     */
    constructor(text: string) {
        this.xpoUrlText = new XpoUrlText(text);
    }

    /*
     * Returns the wrapped XpoUrlText
     */
    getXpoUrlText(): XpoUrlText { return this.xpoUrlText; }

    /*
     * Sets the font name of this object
     */
    setFontName(fontName: string) {
        this.xpoUrlText.setFontname(fontName);

        return this;
    }

    /*
     *  Sets the font size of this object
     */
    setFontSize(fontSize: number) {
        this.xpoUrlText.setFontsize(fontSize);

        return this;
    }

    /*
     * Sets the color of this object
     */
    setColor(color: string) {
        this.xpoUrlText.setColor(color);

        return this;
    }

    /*
     * Sets the text alignment of this object 
     */
    setAlignment(alignment: UrlGeneratorModule.XpoUrlTextAlignment) {
        this.xpoUrlText.setAlignment(alignment);

        return this;
    }

    /*
     * Sets the text to be bold
     */
    bold() {
        this.xpoUrlText.decorations.push(UrlGeneratorModule.XpoUrlTextDecoration.bold);

        return this;
    }

    /*
     * Sets the text to be italic
     */
    italic() {
        this.xpoUrlText.decorations.push(UrlGeneratorModule.XpoUrlTextDecoration.italic);

        return this;
    }

    /*
     * Sets the text to be underline
     */
    underline() {
        this.xpoUrlText.decorations.push(UrlGeneratorModule.XpoUrlTextDecoration.underline);

        return this;
    }

    /*
     * Sets the drop x of this object
     */
    setDropX(dropX: number) {
        this.xpoUrlText.setDropX(dropX);

        return this;
    }

    /*
     * Sets the drop y of this object
     */
    setDropY(dropY: number) {
        this.xpoUrlText.setDropY(dropY);

        return this;
    }

    /*
     * Sets the placing point x of this object
     */
    setPlacingPointX(placingPointX: number) {
        this.xpoUrlText.setPlacingPointX(placingPointX);

        return this;
    }

    /*
     * Sets the placing point y of this object
     */
    setPlacingPointY(placingPointY: number) {
        this.xpoUrlText.setPlacingPointY(placingPointY);

        return this;
    }

    /*
     *  Sets the rotation for this object (only used in combination with transformation)
     */
    setRotation(rotation: number) {
        this.xpoUrlText.setRotation(rotation);

        return this;
    }
} 