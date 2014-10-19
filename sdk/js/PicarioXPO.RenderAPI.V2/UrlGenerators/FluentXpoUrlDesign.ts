class FluentXpoUrlDesign {
    xpoUrlDesign: XpoUrlDesign;

    /*
     * Creates a new instance of the FluentXpoUrlDesign
     */
    constructor(fileName: string) {
        this.xpoUrlDesign = new XpoUrlDesign(fileName);
    }

    /*
     * Returns the wrapped XpoUrlDesign
     */
    getXpoUrlDesign(): XpoUrlDesign { return this.xpoUrlDesign; }

    /*
     * Sets the index for this object
     */
    setSameIndex(index: number) {
        this.xpoUrlDesign.setSameIndex(index);

        return this;
    }

    /*
     * Sets the type for this object
     */
    setType(type: UrlGeneratorModule.XpoUrlObjectTypes) {
        this.xpoUrlDesign.setObjectType(type);

        return this;
    }

    /*
     * Sets the width of this object
     */
    setWidth(width: number){
        this.xpoUrlDesign.setWidth(width);

        return this;
    }

    /*
     * Sets the height of this object
     */
    setHeight(height: number) {
        this.xpoUrlDesign.setHeight(height);

        return this;
    }

    /*
     * Sets the gloss of this object
     */
    setGloss(gloss: number) {
        this.xpoUrlDesign.setGloss(gloss);

        return this;
    }

    /*
     * Sets the contrast of this object
     */
    setContrast(contrast: number) {
        this.xpoUrlDesign.setContrast(contrast);

        return this;
    }

    /*
     * Sets the drop x of this object
     */
    setDropX(dropX: number) {
        this.xpoUrlDesign.setDropX(dropX);

        return this;
    }

    /*
     * Sets the drop y of this object
     */
    setDropY(dropY: number) {
        this.xpoUrlDesign.setDropY(dropY);

        return this;
    }

    /*
     * Sets the placing point x of this object
     */
    setPlacingPointX(placingPointX: number) {
        this.xpoUrlDesign.setPlacingPointX(placingPointX);

        return this;
    }

    /*
     * Sets the placing point y of this object
     */
    setPlacingPointY(placingPointY: number) {
        this.xpoUrlDesign.setPlacingPointY(placingPointY);

        return this;
    }

    /*
     * Sets the rotation for this object (only used in combination with transformation)
     */
    setRotation(rotation: number) {
        this.xpoUrlDesign.setRotation(rotation);

        return this;
    }

    /*
     * Sets whether the design should flip
     */
    setFlip(flip: boolean) {
        this.xpoUrlDesign.setFlip(flip);

        return this;
    }

    /*
     * Sets the repeat for this object
     */
    setRepeat(repeat: boolean){
        this.xpoUrlDesign.setRepeat(repeat);

        return this;
    }
} 