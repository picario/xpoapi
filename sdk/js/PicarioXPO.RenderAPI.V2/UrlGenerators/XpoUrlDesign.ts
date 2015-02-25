class XpoUrlDesign {
    private index: number;
    private sameIndex: number;
    private objectType: UrlGeneratorModule.XpoUrlObjectTypes;
    private entityName: string;
    private width: number;
    private height: number;
    private gloss: number;
    private contrast: number;
    private dropX: number;
    private dropY: number;
    private placingPointX: number;
    private placingPointY: number;
    private rotation: number;
    private flip: boolean;
    private repeat: boolean;
    private aspectRatio: boolean;

    constructor(fileName: string = "") {
        this.entityName = fileName;
    }

    /*
     * Gets or sets the index of this design
     */
    getIndex(): number { return this.index; }
    setIndex(val: number) { this.index = val; }

    /*
     * Gets or sets the index of this design
     */
    getSameIndex(): number { return this.sameIndex; }
    setSameIndex(val: number) { this.sameIndex = val; }

    /*
     * Gets or sets the type for this object
     */
    getObjectType(): UrlGeneratorModule.XpoUrlObjectTypes { return this.objectType; }
    setObjectType(val: UrlGeneratorModule.XpoUrlObjectTypes) { this.objectType = val; }

    /*
     * Gets or sets the filename for this object
     */
    getEntityName(): string { return this.entityName; }
    setEntityName(val: string) { this.entityName = val; }
    
    /*
     * Gets or sets the width of this object
     */
    getWidth(): number { return this.width; }
    setWidth(val: number) { this.width = val; }
    
    /*
     * Gets or sets the height of this object
     */
    getHeight(): number { return this.height; }
    setHeight(val: number) { this.height = val; }
    
    /*
     * Gets or sets the gloss of this object
     */
    getGloss(): number { return this.gloss; }
    setGloss(val: number) { this.gloss = val; }
    
    /*
     * Gets of sets the contrast of this object
     */
    getContrast(): number { return this.contrast; }
    setContrast(val: number) { this.contrast = val; }
    
    /*
     * Gets or sets the drop x of this object
     */
    getDropX(): number { return this.dropX; }
    setDropX(val: number) { this.dropX = val; }
    
    /*
     * Gets or sets the drop y of this object
     */
    getDropY(): number { return this.dropY; }
    setDropY(val: number) { this.dropY = val; }
    
    /*
     * Gets or sets the placing point x of this object
     */
    getPlacingPointX(): number { return this.placingPointX; }
    setPlacingPointX(val: number) { this.placingPointX = val; }
    
    /*
     * Gets or sets the placing point y of this object
     */
    getPlacingPointY(): number { return this.placingPointY; }
    setPlacingPointY(val: number) { this.placingPointY = val; }
    
    /*
     * Gets or sets the rotation for this object
     */
    getRotation(): number { return this.rotation; }
    setRotation(val: number) { this.rotation = val; }
    
    /*
     * Gets or sets whether the texture should be flipped
     */
    getFlip(): boolean { return this.flip; }
    setFlip(val: boolean) { this.flip = val; }
    
    /*
     * Specifies whether the design should repeat itself throughout the object.
     */
    getRepeat(): boolean { return this.repeat; }
    setRepeat(val: boolean) { this.repeat = val; }

    /*
     * Specifies whether the design should be rendered once while preserving the aspect ratio.
     */
    getAspectRatio(): boolean { return this.aspectRatio; }
    setAspectRatio(val: boolean) { this.aspectRatio = val; }
}